/**
 * Pipeline Integration Test
 *
 * Looks up Pebble Beach, Smart strategy, White tees, and Nick's profile
 * from Airtable, then runs the full pipeline via the orchestrator.
 *
 * Usage: npx tsx src/test-orchestrator.ts
 */
import "dotenv/config";
import { tables } from "./airtable-client.js";
import { runPipeline } from "./pipeline/orchestrator.js";

async function main() {
  console.log("========================================");
  console.log("PIPELINE ORCHESTRATOR TEST");
  console.log("========================================\n");

  // Look up Pebble Beach course
  console.log("Finding Pebble Beach...");
  const courses = await tables.courses
    .select({ filterByFormula: 'SEARCH("Pebble Beach", {course_name})', maxRecords: 1 })
    .firstPage();
  if (courses.length === 0) throw new Error("Pebble Beach not found in COURSES table.");
  const courseId = courses[0].id;
  console.log(`  Course: ${courseId} — ${courses[0].get("course_name")}`);

  // Look up Smart strategy
  console.log("Finding Smart strategy...");
  const strategies = await tables.strategyTypes
    .select({ filterByFormula: '{strategy_name} = "Smart"', maxRecords: 1 })
    .firstPage();
  if (strategies.length === 0) throw new Error("Smart strategy not found in STRATEGY_TYPES table.");
  const strategyTypeId = strategies[0].id;
  console.log(`  Strategy: ${strategyTypeId}`);

  // Look up White tees for this course
  console.log("Finding White tees...");
  const teeBoxes = await tables.teeBoxes
    .select({
      filterByFormula: `AND(SEARCH("${courseId}", ARRAYJOIN({course_id})), OR({standard_color} = "White", SEARCH("White", {course_local_name})))`,
      maxRecords: 1,
    })
    .firstPage();

  let teeBoxId: string;
  if (teeBoxes.length > 0) {
    teeBoxId = teeBoxes[0].id;
    console.log(`  Tee Box: ${teeBoxId} — ${teeBoxes[0].get("standard_color") || teeBoxes[0].get("course_local_name")}`);
  } else {
    // Fall back to first tee box for the course
    console.log("  White tees not found, using first available...");
    const anyTees = await tables.teeBoxes
      .select({ filterByFormula: `SEARCH("${courseId}", ARRAYJOIN({course_id}))`, maxRecords: 1 })
      .firstPage();
    if (anyTees.length === 0) throw new Error("No tee boxes found for Pebble Beach.");
    teeBoxId = anyTees[0].id;
    console.log(`  Tee Box: ${teeBoxId} — ${anyTees[0].get("standard_color") || anyTees[0].get("course_local_name")}`);
  }

  // Look up Nick's profile (or any available)
  console.log("Finding user profile...");
  const profiles = await tables.userProfiles
    .select({ filterByFormula: '{profile_type} = "User"', maxRecords: 1 })
    .firstPage();

  let userProfileId: string | undefined;
  if (profiles.length > 0) {
    userProfileId = profiles[0].id;
    console.log(`  Profile: ${userProfileId} — ${profiles[0].get("display_name") || profiles[0].get("username")}`);
  } else {
    console.log("  No user profile found, will use Platform Default.");
  }

  // Run the pipeline
  console.log("\n--- Running Pipeline ---\n");
  const startTime = Date.now();

  const result = await runPipeline({
    courseId,
    strategyTypeId,
    teeBoxId,
    userProfileId,
  });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

  // Summary
  console.log("\n========================================");
  console.log("TEST RESULT");
  console.log("========================================");
  console.log(`  Success:     ${result.success}`);
  console.log(`  Status:      ${result.finalStatus}`);
  console.log(`  Stages:      ${result.stagesCompleted.join(" → ") || "None"}`);
  console.log(`  Elapsed:     ${elapsed}s`);
  console.log(`  Request:     ${result.requestRecordId}`);
  console.log(`  Overview:    ${result.courseOverviewRecordId || "—"}`);
  console.log(`  Deep Res:    ${result.deepResearchRecordId || "—"}`);
  console.log(`  Script:      ${result.scriptRecordId || "—"}`);
  console.log(`  Track:       ${result.trackRecordId || "—"}`);
  if (result.errors.length > 0) {
    console.log(`  Errors:`);
    for (const err of result.errors) {
      console.log(`    - [${err.stage}] ${err.message}`);
    }
  }
}

main().catch((err) => {
  console.error("\nTEST ERROR:", (err as Error).message);
  console.error((err as Error).stack);
  process.exit(1);
});
