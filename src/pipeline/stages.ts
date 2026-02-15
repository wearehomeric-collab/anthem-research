/**
 * Pipeline Stages
 *
 * Four standalone async functions — one per pipeline stage.
 * Each returns a StageResult so the orchestrator can track partial success.
 */
import { tables } from "../airtable-client.js";
import { runCourseResearch } from "../research.js";
import { generateScript } from "../script-generator.js";
import { generateMusic, pollUntilComplete, type SunoTrack } from "../suno.js";
import { getPrompt, getMusicStyles, type AILabPrompt } from "../prompts/loader.js";
import type { StageResult } from "./types.js";

// ─── Shared Helpers ───────────────────────────────────────

/** Generate a pipeline ID: PREFIX-ABBREV-YYYYMMDD-HHmmss */
export function generateId(prefix: string, courseName: string): string {
  const abbrev = courseName
    .split(/\s+/)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("")
    .slice(0, 4);
  const now = new Date();
  const ts = now.toISOString().replace(/[-:T]/g, "").slice(0, 15).replace(/^(\d{8})(\d{6}).*/, "$1-$2");
  return `${prefix}-${abbrev}-${ts}`;
}

// ─── Stage 1: Course Overview ─────────────────────────────

export interface CourseOverviewInput {
  courseName: string;
  location: string;
  architect: string;
  yearBuilt: number;
  teeName: string;
  courseRecordId: string;
  requestRecordId: string;
  skipCourseOverview?: boolean;
}

export interface CourseOverviewData {
  rawOutput: string;
  model: string;
  reused: boolean;
}

export async function runCourseOverviewStage(
  input: CourseOverviewInput
): Promise<StageResult<CourseOverviewData>> {
  try {
    // Check for existing completed Course Overview (reuse unless forced)
    if (!input.skipCourseOverview) {
      const existing = await tables.researchOutput
        .select({
          filterByFormula: `AND(SEARCH("${input.courseName}", ARRAYJOIN({course_id})), {research_type} = "Course Overview", {research_status} = "Complete")`,
          maxRecords: 1,
        })
        .firstPage();

      if (existing.length > 0) {
        console.log(`  Reusing existing Course Overview: ${existing[0].id}`);
        return {
          success: true,
          recordId: existing[0].id,
          data: {
            rawOutput: (existing[0].get("raw_output") as string) || "",
            model: "reused",
            reused: true,
          },
        };
      }
    }

    // Load prompt (AI_LAB first, code default fallback)
    const promptConfig = await getPrompt("Research");
    let customPrompt: string | undefined;

    if (promptConfig.source === "ai_lab") {
      customPrompt = promptConfig.systemPrompt;
    } else {
      const mod = await import("../prompts/course-overview.js");
      customPrompt = mod.buildPrompt({
        courseName: input.courseName,
        location: input.location,
        teeName: input.teeName,
      });
    }

    console.log("  Calling Perplexity for Course Overview...");
    const result = await runCourseResearch(
      {
        courseName: input.courseName,
        architect: input.architect,
        yearBuilt: input.yearBuilt,
        location: input.location,
      },
      customPrompt
    );

    // Write RESEARCH_OUTPUT record
    const researchId = generateId("RES", input.courseName);
    const record = await tables.researchOutput.create({
      id: researchId,
      request_id: [input.requestRecordId],
      course_id: [input.courseRecordId],
      research_type: "Course Overview",
      research_prompt_used: result.prompt.substring(0, 100000),
      research_tool: "Perplexity",
      raw_output: result.rawOutput,
      research_status: "Complete",
      confidence_score: 4,
    });

    console.log(`  Course Overview written: ${record.id} (${result.rawOutput.length} chars)`);
    return {
      success: true,
      recordId: record.id,
      data: { rawOutput: result.rawOutput, model: result.model, reused: false },
    };
  } catch (err) {
    return {
      success: false,
      error: { stage: "Course Overview", message: (err as Error).message },
    };
  }
}

// ─── Stage 2: Deep Research ───────────────────────────────

export interface DeepResearchInput {
  courseName: string;
  location: string;
  architect: string;
  yearBuilt: number;
  teeName: string;
  teeYardage: number;
  holeData: string;
  courseRecordId: string;
  requestRecordId: string;
  teeBoxId: string;
  strategyTypeId: string;
  userProfileId?: string;
  // Player distances
  playerName: string;
  driverCarry: number;
  driverTotal: number;
  threeWoodCarry: number;
  hybridCarry: number;
  fiveIronCarry: number;
  sevenIronCarry: number;
  pwCarry: number;
  shotShape: string;
  missBias: string;
  preferredApproachDistances: string;
  layupStrategy: string;
  // Strategy info
  strategyName: string;
  strategyApproach: string;
}

export interface DeepResearchData {
  rawOutput: string;
  model: string;
}

export async function runDeepResearchStage(
  input: DeepResearchInput
): Promise<StageResult<DeepResearchData>> {
  try {
    const promptConfig = await getPrompt("Strategy");
    let customPrompt: string | undefined;

    if (promptConfig.source === "ai_lab") {
      customPrompt = promptConfig.systemPrompt;
    } else {
      const mod = await import("../prompts/deep-strategy.js");
      customPrompt = mod.buildPrompt({
        courseName: input.courseName,
        eventName: "",
        location: input.location,
        teeName: input.teeName,
        teeYardage: input.teeYardage,
        holeData: input.holeData,
        playerName: input.playerName,
        driverCarry: input.driverCarry,
        driverTotal: input.driverTotal,
        threeWoodCarry: input.threeWoodCarry,
        hybridCarry: input.hybridCarry,
        fiveIronCarry: input.fiveIronCarry,
        sevenIronCarry: input.sevenIronCarry,
        pwCarry: input.pwCarry,
        shotShape: input.shotShape,
        missBias: input.missBias,
        preferredApproachDistances: input.preferredApproachDistances,
        layupStrategy: input.layupStrategy,
        strategyName: input.strategyName,
        strategyApproach: input.strategyApproach,
      });
    }

    console.log("  Calling Perplexity for Deep Research...");
    const result = await runCourseResearch(
      {
        courseName: input.courseName,
        architect: input.architect,
        yearBuilt: input.yearBuilt,
        location: input.location,
        strategyKeywords: input.strategyName,
        teeBoxInfo: `${input.teeName} (${input.teeYardage} yards)`,
      },
      customPrompt
    );

    // Write RESEARCH_OUTPUT record with deep research links
    const researchId = generateId("DRS", input.courseName);
    const record = await tables.researchOutput.create({
      id: researchId,
      request_id: [input.requestRecordId],
      course_id: [input.courseRecordId],
      research_type: "Deep Research",
      research_prompt_used: result.prompt.substring(0, 100000),
      research_tool: "Perplexity",
      raw_output: result.rawOutput,
      research_status: "Complete",
      confidence_score: 4,
      player_profile_id: input.userProfileId ? [input.userProfileId] : undefined,
      tee_box_id: [input.teeBoxId],
      strategy_type_id: [input.strategyTypeId],
    });

    console.log(`  Deep Research written: ${record.id} (${result.rawOutput.length} chars)`);
    return {
      success: true,
      recordId: record.id,
      data: { rawOutput: result.rawOutput, model: result.model },
    };
  } catch (err) {
    return {
      success: false,
      error: { stage: "Deep Research", message: (err as Error).message },
    };
  }
}

// ─── Stage 3: Script Generation ───────────────────────────

export interface ScriptInput {
  courseName: string;
  architect: string;
  researchData: string;
  strategyName: string;
  playerName: string;
  musicStyleText: string;
  playerSummary: string;
  requestRecordId: string;
  deepResearchRecordId: string;
}

export interface ScriptData {
  rawResponse: string;
  model: string;
}

export async function runScriptStage(
  input: ScriptInput
): Promise<StageResult<ScriptData>> {
  try {
    const promptConfig = await getPrompt("Script/Lyric");
    let promptTemplate: string;

    if (promptConfig.source === "ai_lab") {
      promptTemplate = promptConfig.systemPrompt;
    } else {
      const mod = await import("../prompts/script-writer.js");
      promptTemplate = mod.buildPrompt({
        courseName: input.courseName,
        researchData: input.researchData,
        strategyName: input.strategyName,
        playerName: input.playerName,
        musicStyle: input.musicStyleText,
      });
    }

    console.log("  Calling ChatGPT for script generation...");
    const result = await generateScript({
      promptTemplate,
      courseName: input.courseName,
      architect: input.architect,
      researchData: input.researchData,
      strategyDetails: input.strategyName,
      musicStyle: input.musicStyleText,
      userProfile: input.playerSummary,
    });

    // Write SCRIPTS record
    const scriptId = generateId("SCR", input.courseName);
    const record = await tables.scripts.create({
      id: scriptId,
      request_id: [input.requestRecordId],
      research_id: [input.deepResearchRecordId],
      version_number: 1,
      chatgpt_response_raw: result.rawResponse,
      chatgpt_prompt_sent: result.promptSent.substring(0, 100000),
    });

    console.log(`  Script written: ${record.id} (${result.rawResponse.length} chars)`);
    return {
      success: true,
      recordId: record.id,
      data: { rawResponse: result.rawResponse, model: result.model },
    };
  } catch (err) {
    return {
      success: false,
      error: { stage: "Script Generation", message: (err as Error).message },
    };
  }
}

// ─── Stage 4: Music Generation ────────────────────────────

export interface MusicInput {
  courseName: string;
  lyrics: string;
  musicStyleText: string;
  musicStyleName: string;
  requestRecordId: string;
  courseRecordId: string;
  scriptRecordId: string;
  deepResearchRecordId: string;
  courseOverviewRecordId?: string;
  teeBoxId: string;
  strategyTypeId: string;
  userProfileId?: string;
}

export interface MusicData {
  tracks: SunoTrack[];
  taskId: string;
  parametersRecordId: string;
  generationRecordId: string;
  trackRecordId: string;
}

export async function runMusicStage(
  input: MusicInput
): Promise<StageResult<MusicData>> {
  try {
    // Write ANTHEM_PARAMETERS
    const paramsId = generateId("PAR", input.courseName);
    const paramsRecord = await tables.anthemParameters.create({
      id: paramsId,
      request_id: [input.requestRecordId],
      style_prompt: input.musicStyleText,
      genre: input.musicStyleName,
    });
    console.log(`  Anthem Parameters written: ${paramsRecord.id}`);

    // Submit to Suno
    console.log("  Submitting to Suno API...");
    const taskId = await generateMusic({
      prompt: input.lyrics,
      style: input.musicStyleText,
      title: `${input.courseName} - Course Anthem`,
      model: "V4_5",
      callBackUrl: `${process.env.N8N_WEBHOOK_BASE_URL || "https://homericng.app.n8n.cloud"}/webhook/suno-callback`,
      vocalGender: "m",
    });
    console.log(`  Suno task submitted: ${taskId}`);

    // Write ANTHEM_GENERATIONS
    const genId = generateId("GEN", input.courseName);
    const genRecord = await tables.anthemGenerations.create({
      id: genId,
      request_id: [input.requestRecordId],
      parameters_id: [paramsRecord.id],
      suno_task_id: taskId,
      status: "Queued",
    });
    console.log(`  Generation record: ${genRecord.id}`);

    // Poll for completion
    console.log("  Polling for completion (may take 2-5 minutes)...");
    const pollResult = await pollUntilComplete(taskId, 20, 30000);

    console.log(`  Music complete! ${pollResult.tracks.length} track(s) generated.`);

    // Update generation record
    await tables.anthemGenerations.update(genRecord.id, {
      status: "Complete",
      audio_url: pollResult.tracks[0]?.audioUrl || "",
      suno_response_data: JSON.stringify(pollResult.tracks[0], null, 2),
    });

    // Create TRACKS record
    const trackId = generateId("TRK", input.courseName);
    const trackRecord = await tables.tracks.create({
      id: trackId,
      request_id: [input.requestRecordId],
      course_id: [input.courseRecordId],
      script_id: [input.scriptRecordId],
      suno_generation_id: [genRecord.id],
      research_id: [input.deepResearchRecordId],
      user_profile_id: input.userProfileId ? [input.userProfileId] : undefined,
      strategy_type_id: [input.strategyTypeId],
      track_title: `${input.courseName} - Course Anthem`,
      audio_url: pollResult.tracks[0]?.audioUrl || "",
      duration_seconds: pollResult.tracks[0]?.duration || 0,
      model_used: "v4.5",
      lyrics_used: input.lyrics,
      style_generated: input.musicStyleText.substring(0, 200),
      status: "Draft",
    });
    console.log(`  Track written: ${trackRecord.id}`);

    return {
      success: true,
      recordId: trackRecord.id,
      data: {
        tracks: pollResult.tracks,
        taskId,
        parametersRecordId: paramsRecord.id,
        generationRecordId: genRecord.id,
        trackRecordId: trackRecord.id,
      },
    };
  } catch (err) {
    return {
      success: false,
      error: { stage: "Music Generation", message: (err as Error).message },
    };
  }
}
