/**
 * Full end-to-end pipeline test: Pebble Beach
 *
 * Stages:
 * 1. Course Overview Research (Perplexity)
 * 2. Write results to new tables (COURSES, RESEARCH_OUTPUT)
 * 3. Script/Lyric Generation (ChatGPT)
 * 4. Write script to SCRIPTS
 * 5. Music Generation (Suno via KIE.ai)
 * 6. Write to SUNO_PARAMETERS, SUNO_GENERATIONS, TRACKS
 */
import Airtable from "airtable";
import { runCourseResearch } from "./research.js";
import { generateScript } from "./script-generator.js";
import { generateMusic, pollUntilComplete } from "./suno.js";
import "dotenv/config";

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(process.env.AIRTABLE_BASE_ID!);

// New table references by ID
const TABLES = {
  COURSES: base("tblUmMx0zgCP35j7N"),
  RESEARCH_OUTPUT: base("tblvAxDrSQMSTSdyL"),
  ANTHEM_REQUESTS: base("tblCS344T2dnzpusU"),
  SCRIPTS: base("tblX7FhAhbmDHOhOD"),
  SUNO_PARAMETERS: base("tblN5ffNIaSJE7yws"),
  SUNO_GENERATIONS: base("tbluijCk5bySJoyZE"),
  TRACKS: base("tblWyEOHAaGMp5Sh3"),
  STRATEGY_TYPES: base("tblWMQ46ow4hnEQBf"),
  USER_PROFILES: base("tbl4D4uPdzGdenax7"),
  TEE_BOXES: base("tblYekq8SiNHnBMbk"),
};

// Adapted from the Preston Trail AI Lab prompt — generalized for any course
function buildResearchPrompt(courseName: string, location: string, tees: string, playerDistances: string): string {
  return `You are an expert golf course historian and strategy architect. This is the RESEARCH PHASE ONLY for a creative project. The content will later be fed into a lyrics engine to create a song/track about the course and each hole. Do a deep, exhaustive research dive on the following golf course:

Course name: ${courseName}
Location: ${location}
Tees to focus on: ${tees}

Do NOT limit word count or level of detail. The goal is rich, vivid, insightful information that fully captures the course's story, personality, and strategy.

STRUCTURE THE OUTPUT INTO CLEAR SECTIONS AS FOLLOWS:

Course overview
Provide a short but vivid overview (3-6 sentences) of the course's overall vibe and identity, design style and major characteristics, and the emotional/visual experience a player can expect.

History, prestige, and key facts
Opening year, original architects, renovations. Notable tournaments hosted. Rankings and accolades. Signature features. Notable pros or personalities associated. Cultural/clubhouse elements.

Full course strategy and playing insights (from ${tees})
Overall difficulty from those tees. Repeated strategic themes: hazard types, approach-shot demands, tee-shot demands, wind patterns. How front nine and back nine differ. What kind of player the course suits. Key turning point stretches.

Full hole strategy overview (front nine and back nine)
For each hole: hole number, par, approximate yardage, 1-2 sentences capturing visual impression, main strategic idea, and most important hazards.

Detailed hole-by-hole strategy
For EACH HOLE from ${tees}, include:
Hole number, Par, Yardage
Tee Shot: specific club suggestions, ideal line, target, what to avoid.
Ideal Play: how the hole should be played strategically.
Hazards: all key hazards and trouble areas and why they matter.

Extra color and storytelling details
Nicknames, famous shots, unique visuals, local lore, emotional themes at different parts of the course.

Throughout, prioritize accuracy, depth, vivid descriptive language, and strategic clarity.

${playerDistances}`;
}

// Script generation prompt (based on the working Preston Trail pattern)
function buildScriptPrompt(courseName: string, researchData: string, strategyType: string): string {
  return `Write a full anthem/track script for ${courseName} using the 24/8 golf swing tempo framework.

RESEARCH DATA:
${researchData}

STRATEGY APPROACH: ${strategyType}

RULES:
- Structure: [INTRO], [CHORUS], [FRONT NINE], [INTERLUDE], [BACK NINE], [OUTRO]
- Each hole gets 3-5 lines covering strategy, hazards, and emotion
- Include the 24/8 tempo references: "Twenty four back, eight through" or variations
- Include production cues in brackets: BPM, dynamics, instrumentation hints
- Keep it singable — rhythm, meter, natural phrasing
- Reference specific course features, landmarks, and emotions
- Make it feel like a round of golf — building tension, moments of calm, dramatic finish
- Total script should be 4000-6000 characters`;
}

async function runPipeline() {
  console.log("========================================");
  console.log("FULL PIPELINE TEST: Pebble Beach");
  console.log("========================================\n");

  // --- Find existing Pebble Beach course in new tables ---
  console.log("Step 0: Finding Pebble Beach in new COURSES table...");
  const existingCourses = await TABLES.COURSES.select({
    filterByFormula: 'SEARCH("Pebble Beach", {course_name})'
  }).firstPage();

  let courseRecordId: string;
  if (existingCourses.length > 0) {
    courseRecordId = existingCourses[0].id;
    console.log(`  Found existing record: ${courseRecordId}`);
  } else {
    console.log("  Not found. Creating Pebble Beach course record...");
    const newCourse = await TABLES.COURSES.create({
      id: "COURSE-PB-001",
      course_name: "Pebble Beach Golf Links",
      city: "Pebble Beach",
      state: "CA",
      architect: "Jack Neville, Douglas Grant",
      year_built: 1919,
      par: 72,
      description: "Iconic coastal course with dramatic ocean views along the Monterey Peninsula.",
    });
    courseRecordId = newCourse.id;
    console.log(`  Created: ${courseRecordId}`);
  }

  // --- Find existing strategy type (Smart) ---
  console.log("\nStep 0b: Finding Smart strategy type...");
  const strategies = await TABLES.STRATEGY_TYPES.select({
    filterByFormula: '{strategy_name} = "Smart"'
  }).firstPage();
  const smartStrategyId = strategies[0]?.id;
  console.log(`  Smart strategy: ${smartStrategyId}`);

  // --- Find or use existing user profile ---
  console.log("\nStep 0c: Finding user profile...");
  const profiles = await TABLES.USER_PROFILES.select({ maxRecords: 1 }).firstPage();
  const profileId = profiles[0]?.id;
  const profileName = profiles[0]?.get("display_name") || profiles[0]?.get("username") || "Test Player";
  console.log(`  Profile: ${profileId} (${profileName})`);

  // --- Create Anthem Request ---
  console.log("\nStep 1: Creating ANTHEM_REQUEST...");
  const requestRecord = await TABLES.ANTHEM_REQUESTS.create({
    id: "REQ-PB-TEST-003",
    status: "Research Started",
    course_id: [courseRecordId],
    user_profile_id: profileId ? [profileId] : undefined,
    strategy_type_id: smartStrategyId ? [smartStrategyId] : undefined,
  });
  console.log(`  Request: ${requestRecord.id}`);

  // ========================================
  // STAGE 1: PERPLEXITY RESEARCH
  // ========================================
  console.log("\n========================================");
  console.log("STAGE 1: Course Research (Perplexity)");
  console.log("========================================\n");

  const researchPrompt = buildResearchPrompt(
    "Pebble Beach Golf Links",
    "Pebble Beach, CA",
    "White Tees",
    "Player hits driver about 265-275 carry, seven iron roughly 165 carry and PW about 135 carry."
  );

  console.log("  Calling Perplexity API...");
  const startResearch = Date.now();

  const researchResult = await runCourseResearch(
    {
      courseName: "Pebble Beach Golf Links",
      architect: "Jack Neville, Douglas Grant",
      yearBuilt: 1919,
      location: "Pebble Beach, CA",
    },
    researchPrompt
  );

  const researchTime = ((Date.now() - startResearch) / 1000).toFixed(1);
  console.log(`  Research complete in ${researchTime}s`);
  console.log(`  Output length: ${researchResult.rawOutput.length} chars`);
  console.log(`  Model: ${researchResult.model}`);
  console.log(`  First 500 chars:\n${researchResult.rawOutput.substring(0, 500)}...\n`);

  // Write to RESEARCH_OUTPUT
  console.log("  Writing to RESEARCH_OUTPUT...");
  const researchRecord = await TABLES.RESEARCH_OUTPUT.create({
    id: "RES-PB-TEST-003",
    request_id: [requestRecord.id],
    course_id: [courseRecordId],
    research_prompt_used: researchPrompt.substring(0, 100000), // Airtable field limit
    research_tool: "Perplexity",
    raw_output: researchResult.rawOutput,
    research_status: "Complete",
    confidence_score: 4,
  });
  console.log(`  Research record: ${researchRecord.id}`);

  // Update request status
  await TABLES.ANTHEM_REQUESTS.update(requestRecord.id, {
    status: "Research Complete",
  });

  // ========================================
  // STAGE 2: SCRIPT GENERATION (ChatGPT)
  // ========================================
  console.log("\n========================================");
  console.log("STAGE 2: Script Generation (ChatGPT)");
  console.log("========================================\n");

  const scriptPrompt = buildScriptPrompt(
    "Pebble Beach Golf Links",
    researchResult.rawOutput,
    "Smart"
  );

  console.log("  Calling OpenAI API...");
  const startScript = Date.now();

  const scriptResult = await generateScript({
    promptTemplate: scriptPrompt,
    courseName: "Pebble Beach Golf Links",
    architect: "Jack Neville, Douglas Grant",
    researchData: researchResult.rawOutput,
    strategyDetails: "Smart — calculated play with course knowledge",
    musicStyle: "Folk-rock anthem with raw acoustic power, dynamic build",
    userProfile: "Driver 275 carry, 7-iron 165, PW 135, Straight",
  });

  const scriptTime = ((Date.now() - startScript) / 1000).toFixed(1);
  console.log(`  Script complete in ${scriptTime}s`);
  console.log(`  Output length: ${scriptResult.rawResponse.length} chars`);
  console.log(`  Model: ${scriptResult.model}`);
  console.log(`  First 500 chars:\n${scriptResult.rawResponse.substring(0, 500)}...\n`);

  // Write to SCRIPTS
  console.log("  Writing to SCRIPTS...");
  const scriptRecord = await TABLES.SCRIPTS.create({
    id: "SCR-PB-TEST-003",
    request_id: [requestRecord.id],
    research_id: [researchRecord.id],
    version_number: 1,
    chatgpt_response_raw: scriptResult.rawResponse,
    chatgpt_prompt_sent: scriptPrompt.substring(0, 100000),
    // quality_assessment omitted — would need pre-configured singleSelect option
  });
  console.log(`  Script record: ${scriptRecord.id}`);

  // Update request status
  await TABLES.ANTHEM_REQUESTS.update(requestRecord.id, {
    status: "Script Review",
  });

  // ========================================
  // STAGE 3: MUSIC GENERATION (Suno)
  // ========================================
  console.log("\n========================================");
  console.log("STAGE 3: Music Generation (Suno/KIE.ai)");
  console.log("========================================\n");

  // Use the Folk-Rock Anthem style from old AI Lab
  const musicStyle = `Folk-rock anthem with raw acoustic power, dynamic build, and emotional storytelling. Start intimate with warm acoustic guitar and piano under a steady stomp-clap rhythm, then swell into layered harmonies, banjo strums, upright bass, and kick drum drive. Emphasize momentum and grit. Vocal: strong, heartfelt male lead with echoing gang harmonies. Target ~110-114 BPM, build from soft folk storytelling to stadium-sized acoustic thunder. Mood: bold, spiritual, witty, triumphant endurance.`;

  // Write SUNO_PARAMETERS
  console.log("  Writing SUNO_PARAMETERS...");
  const sunoParamsRecord = await TABLES.SUNO_PARAMETERS.create({
    id: "SUNO-PB-TEST-003",
    request_id: [requestRecord.id],
    style_prompt: musicStyle,
    tempo_bpm: "110-114",
    genre: "Folk-Rock Anthem",
    vocal_type: "Male",
    mood_descriptors: "bold, spiritual, witty, triumphant endurance",
    instrumentation: "acoustic guitar, piano, banjo, upright bass, kick drum",
  });
  console.log(`  Suno params: ${sunoParamsRecord.id}`);

  // Submit to Suno
  console.log("  Submitting to Suno API...");
  const startMusic = Date.now();

  const taskId = await generateMusic({
    prompt: scriptResult.rawResponse,
    style: musicStyle,
    title: "Pebble Beach - Course Anthem (Test)",
    model: "V4_5",
    callBackUrl: `${process.env.N8N_WEBHOOK_BASE_URL}/webhook/suno-callback`,
    vocalGender: "m",
  });

  console.log(`  Suno task submitted: ${taskId}`);

  // Write SUNO_GENERATIONS record
  const sunoGenRecord = await TABLES.SUNO_GENERATIONS.create({
    id: "GEN-PB-TEST-003",
    request_id: [requestRecord.id],
    parameters_id: [sunoParamsRecord.id],
    suno_task_id: taskId,
    status: "Queued",
  });
  console.log(`  Generation record: ${sunoGenRecord.id}`);

  // Poll for completion
  console.log("  Polling for completion (this may take 2-5 minutes)...");
  try {
    const result = await pollUntilComplete(taskId, 20, 30000);
    const musicTime = ((Date.now() - startMusic) / 1000).toFixed(1);

    console.log(`\n  Music generation complete in ${musicTime}s`);
    console.log(`  Tracks generated: ${result.tracks.length}`);
    for (const track of result.tracks) {
      console.log(`    - ${track.title} (${track.duration}s)`);
      console.log(`      Audio: ${track.audioUrl}`);
    }

    // Update generation record
    await TABLES.SUNO_GENERATIONS.update(sunoGenRecord.id, {
      status: "Complete",
      audio_url: result.tracks[0]?.audioUrl || "",
      suno_response_data: JSON.stringify(result.tracks[0], null, 2),
    });

    // Create TRACKS record
    console.log("\n  Creating TRACKS record...");
    const trackRecord = await TABLES.TRACKS.create({
      id: "TRK-PB-TEST-003",
      request_id: [requestRecord.id],
      course_id: [courseRecordId],
      script_id: [scriptRecord.id],
      suno_generation_id: [sunoGenRecord.id],
      research_id: [researchRecord.id],
      user_profile_id: profileId ? [profileId] : undefined,
      strategy_type_id: smartStrategyId ? [smartStrategyId] : undefined,
      track_title: "Pebble Beach - Course Anthem",
      audio_url: result.tracks[0]?.audioUrl || "",
      duration_seconds: result.tracks[0]?.duration || 0,
      model_used: "v4.5",
      lyrics_used: scriptResult.rawResponse,
      style_generated: musicStyle.substring(0, 200),
      status: "Draft",
    });
    console.log(`  Track record: ${trackRecord.id}`);

    // Final status
    await TABLES.ANTHEM_REQUESTS.update(requestRecord.id, {
      status: "Track QC",
    });

  } catch (err) {
    console.log(`\n  Music generation issue: ${(err as Error).message}`);
    console.log("  (Track may still be generating — check Suno dashboard)");

    // Update with whatever we have
    await TABLES.SUNO_GENERATIONS.update(sunoGenRecord.id, {
      status: "Failed",
    });
    await TABLES.ANTHEM_REQUESTS.update(requestRecord.id, {
      status: "Suno Generating",
    });
  }

  // ========================================
  // SUMMARY
  // ========================================
  console.log("\n========================================");
  console.log("PIPELINE TEST SUMMARY");
  console.log("========================================");
  console.log(`Course:     Pebble Beach Golf Links`);
  console.log(`Request:    ${requestRecord.id}`);
  console.log(`Research:   ${researchRecord.id} (${researchResult.rawOutput.length} chars)`);
  console.log(`Script:     ${scriptRecord.id} (${scriptResult.rawResponse.length} chars)`);
  console.log(`Suno Task:  ${taskId}`);
  console.log(`Gen Record: ${sunoGenRecord.id}`);
  console.log("\nAll records written to NEW tables.");
}

runPipeline().catch((err) => {
  console.error("\nPIPELINE ERROR:", (err as Error).message);
  console.error((err as Error).stack);
  process.exit(1);
});
