/**
 * Pipeline Orchestrator
 *
 * Main entry point: runPipeline(config) → PipelineResult
 *
 * Fetches all referenced Airtable records, creates ANTHEM_REQUESTS,
 * then runs stages sequentially. Each stage failure halts the pipeline
 * but returns a partial result with everything completed so far.
 */
import { tables } from "../airtable-client.js";
import { getMusicStyles, type AILabPrompt } from "../prompts/loader.js";
import type { PipelineConfig, PipelineResult, StageError } from "./types.js";
import {
  generateId,
  runCourseOverviewStage,
  runDeepResearchStage,
  runScriptStage,
  runMusicStage,
} from "./stages.js";

// ─── Helpers ──────────────────────────────────────────────

async function updateRequestStatus(recordId: string, status: string): Promise<void> {
  try {
    await tables.anthemRequests.update(recordId, { status });
  } catch (err) {
    console.warn(`  [orchestrator] Failed to update request status to "${status}": ${(err as Error).message}`);
  }
}

async function getRecord(table: ReturnType<typeof tables.courses.select>["_table"] & { find: (id: string) => Promise<any> }, id: string) {
  return table.find(id);
}

/** Resolve music style: specific ID, or first active from AI_LAB */
async function resolveMusicStyle(musicStyleId?: string): Promise<AILabPrompt> {
  if (musicStyleId) {
    const rec = await tables.aiLab.find(musicStyleId);
    return {
      id: (rec.get("id") as string) || "",
      recordId: rec.id,
      promptName: (rec.get("prompt_name") as string) || "",
      version: (rec.get("version") as number) || 1,
      systemPrompt: (rec.get("system_prompt") as string) || "",
      variablesUsed: (rec.get("variables_used") as string) || "",
      source: "ai_lab",
    };
  }

  const styles = await getMusicStyles();
  if (styles.length === 0) {
    throw new Error("No active Music Style prompts found in AI_LAB.");
  }
  return styles[0];
}

/** Remove undefined/null values so they don't overwrite defaults during merge */
function stripUndefined(obj: Record<string, any>): Record<string, any> {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined && v !== null && v !== "")
  );
}

/** Build a compact player summary string from profile fields */
function buildPlayerSummary(profile: Record<string, any>): string {
  const driver = profile.driver_carry_yards || profile.driver_total_yards || "?";
  const sevenIron = profile.seven_iron_carry_yards || "?";
  const pw = profile.pw_carry_yards || "?";
  const shape = profile.shot_shape || "Straight";
  return `Driver ${driver}, 7-iron ${sevenIron}, PW ${pw}, ${shape}`;
}

// ─── Main Pipeline ────────────────────────────────────────

export async function runPipeline(config: PipelineConfig): Promise<PipelineResult> {
  const errors: StageError[] = [];
  const stagesCompleted: string[] = [];
  const result: PipelineResult = {
    success: false,
    requestRecordId: "",
    finalStatus: "Failed",
    stagesCompleted,
    errors,
  };

  // ── Setup: Fetch all referenced records ──

  console.log("\n=== Pipeline Setup ===\n");

  const [courseRec, strategyRec, teeBoxRec] = await Promise.all([
    tables.courses.find(config.courseId),
    tables.strategyTypes.find(config.strategyTypeId),
    tables.teeBoxes.find(config.teeBoxId),
  ]);

  const courseName = (courseRec.get("course_name") as string) || "Unknown Course";
  const location = `${courseRec.get("city") || ""}, ${courseRec.get("state") || ""}`.replace(/^, |, $/g, "");
  const architect = (courseRec.get("architect") as string) || "Unknown";
  const yearBuilt = (courseRec.get("year_built") as number) || 0;

  const strategyName = (strategyRec.get("strategy_name") as string) || "Smart";
  const strategyApproach = (strategyRec.get("strategy_approach") as string) || "";

  const teeName = (teeBoxRec.get("standard_color") as string) || (teeBoxRec.get("course_local_name") as string) || "Unknown";
  const teeYardage = (teeBoxRec.get("total_yardage") as number) || 0;
  const holeData = (teeBoxRec.get("hole_data") as string) || "";

  // Resolve user profile with Platform Default as baseline for missing fields
  let profileId = config.userProfileId;
  let playerName = "Golfer";
  let playerSummary = "Average golfer";
  let profileFields: Record<string, any> = {};

  // Always fetch Platform Default as baseline
  const defaultProfiles = await tables.userProfiles
    .select({ filterByFormula: '{profile_type} = "Platform Default"', maxRecords: 1 })
    .firstPage();
  const defaultFields: Record<string, any> = defaultProfiles.length > 0 ? defaultProfiles[0].fields : {};

  if (profileId) {
    const profileRec = await tables.userProfiles.find(profileId);
    playerName = (profileRec.get("display_name") as string) || (profileRec.get("username") as string) || "Golfer";
    // Merge: user fields take priority, Platform Default fills gaps
    profileFields = { ...defaultFields, ...stripUndefined(profileRec.fields) };
    playerSummary = buildPlayerSummary(profileFields);
  } else if (defaultProfiles.length > 0) {
    profileId = defaultProfiles[0].id;
    playerName = (defaultProfiles[0].get("display_name") as string) || "Default Player";
    profileFields = defaultFields;
    playerSummary = buildPlayerSummary(profileFields);
  }

  // Resolve music style
  const musicStyle = await resolveMusicStyle(config.musicStyleId);

  console.log(`  Course:    ${courseName} (${location})`);
  console.log(`  Strategy:  ${strategyName}`);
  console.log(`  Tee:       ${teeName} (${teeYardage} yards)`);
  console.log(`  Player:    ${playerName} — ${playerSummary}`);
  console.log(`  Style:     ${musicStyle.promptName}`);

  // ── Create ANTHEM_REQUESTS record ──

  const requestId = generateId("REQ", courseName);
  const requestRecord = await tables.anthemRequests.create({
    id: requestId,
    status: "Research Started",
    course_id: [config.courseId],
    user_profile_id: profileId ? [profileId] : undefined,
    strategy_type_id: [config.strategyTypeId],
  });
  result.requestRecordId = requestRecord.id;
  console.log(`  Request:   ${requestRecord.id}\n`);

  // ── Stage 1: Course Overview ──

  console.log("=== Stage 1: Course Overview Research ===\n");
  const overviewResult = await runCourseOverviewStage({
    courseName,
    location,
    architect,
    yearBuilt,
    teeName,
    courseRecordId: config.courseId,
    requestRecordId: requestRecord.id,
    skipCourseOverview: config.skipCourseOverview,
  });

  if (!overviewResult.success) {
    errors.push(overviewResult.error!);
    await updateRequestStatus(requestRecord.id, "On Hold");
    result.finalStatus = "On Hold";
    return result;
  }
  result.courseOverviewRecordId = overviewResult.recordId;
  stagesCompleted.push("Course Overview");
  await updateRequestStatus(requestRecord.id, "Research Started");

  // ── Stage 2: Deep Research ──

  console.log("\n=== Stage 2: Deep Strategy Research ===\n");
  const deepResult = await runDeepResearchStage({
    courseName,
    location,
    architect,
    yearBuilt,
    teeName,
    teeYardage,
    holeData,
    courseRecordId: config.courseId,
    requestRecordId: requestRecord.id,
    teeBoxId: config.teeBoxId,
    strategyTypeId: config.strategyTypeId,
    userProfileId: profileId,
    playerName,
    driverCarry: profileFields.driver_carry_yards || 0,
    driverTotal: profileFields.driver_total_yards || 0,
    threeWoodCarry: profileFields.three_wood_carry_yards || 0,
    hybridCarry: profileFields.hybrid_carry_yards || 0,
    fiveIronCarry: profileFields.five_iron_carry_yards || 0,
    sevenIronCarry: profileFields.seven_iron_carry_yards || 0,
    pwCarry: profileFields.pw_carry_yards || 0,
    shotShape: profileFields.shot_shape || "Straight",
    missBias: profileFields.miss_bias || "None",
    preferredApproachDistances: profileFields.preferred_approach_distances || "",
    layupStrategy: profileFields.layup_strategy || "",
    strategyName,
    strategyApproach,
  });

  if (!deepResult.success) {
    errors.push(deepResult.error!);
    await updateRequestStatus(requestRecord.id, "On Hold");
    result.finalStatus = "On Hold";
    return result;
  }
  result.deepResearchRecordId = deepResult.recordId;
  stagesCompleted.push("Deep Research");
  await updateRequestStatus(requestRecord.id, "Research Complete");

  // ── Stage 3: Script Generation ──

  console.log("\n=== Stage 3: Script Generation ===\n");
  const scriptResult = await runScriptStage({
    courseName,
    architect,
    researchData: deepResult.data!.rawOutput,
    strategyName,
    playerName,
    musicStyleText: musicStyle.systemPrompt,
    playerSummary,
    requestRecordId: requestRecord.id,
    deepResearchRecordId: deepResult.recordId!,
  });

  if (!scriptResult.success) {
    errors.push(scriptResult.error!);
    await updateRequestStatus(requestRecord.id, "On Hold");
    result.finalStatus = "On Hold";
    return result;
  }
  result.scriptRecordId = scriptResult.recordId;
  stagesCompleted.push("Script Generation");
  await updateRequestStatus(requestRecord.id, "Script Review");

  // ── Stage 4: Music Generation ──

  console.log("\n=== Stage 4: Music Generation ===\n");
  const musicResult = await runMusicStage({
    courseName,
    lyrics: scriptResult.data!.rawResponse,
    musicStyleText: musicStyle.systemPrompt,
    musicStyleName: musicStyle.promptName,
    requestRecordId: requestRecord.id,
    courseRecordId: config.courseId,
    scriptRecordId: scriptResult.recordId!,
    deepResearchRecordId: deepResult.recordId!,
    courseOverviewRecordId: overviewResult.recordId,
    teeBoxId: config.teeBoxId,
    strategyTypeId: config.strategyTypeId,
    userProfileId: profileId,
  });

  if (!musicResult.success) {
    errors.push(musicResult.error!);
    await updateRequestStatus(requestRecord.id, "On Hold");
    result.finalStatus = "On Hold";
    result.parametersRecordId = musicResult.data?.parametersRecordId;
    result.generationRecordId = musicResult.data?.generationRecordId;
    return result;
  }

  result.parametersRecordId = musicResult.data!.parametersRecordId;
  result.generationRecordId = musicResult.data!.generationRecordId;
  result.trackRecordId = musicResult.data!.trackRecordId;
  stagesCompleted.push("Music Generation");
  await updateRequestStatus(requestRecord.id, "Track QC");

  // ── Success ──

  result.success = true;
  result.finalStatus = "Track QC";

  console.log("\n=== Pipeline Complete ===\n");
  console.log(`  Request:        ${result.requestRecordId}`);
  console.log(`  Course Overview: ${result.courseOverviewRecordId}`);
  console.log(`  Deep Research:  ${result.deepResearchRecordId}`);
  console.log(`  Script:         ${result.scriptRecordId}`);
  console.log(`  Track:          ${result.trackRecordId}`);
  console.log(`  Status:         ${result.finalStatus}`);
  console.log(`  Stages:         ${stagesCompleted.join(" → ")}`);

  return result;
}
