import "dotenv/config";

const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const PAT = process.env.AIRTABLE_PAT!;
const META_URL = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`;

const headers = {
  Authorization: `Bearer ${PAT}`,
  "Content-Type": "application/json",
};

// Store created table IDs for linking
const tableIds: Record<string, string> = {};

async function createTable(name: string, fields: any[], description?: string) {
  console.log(`\nCreating table: ${name}...`);
  const body: any = { name, fields };
  if (description) body.description = description;

  const res = await fetch(META_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json();
    // If table already exists, try to get its ID
    if (err.error?.type === "INVALID_REQUEST" && err.error?.message?.includes("already exists")) {
      console.log(`  Table "${name}" already exists, fetching ID...`);
      return await getExistingTableId(name);
    }
    console.error(`  FAILED:`, JSON.stringify(err, null, 2));
    throw new Error(`Failed to create ${name}: ${err.error?.message}`);
  }

  const data = await res.json();
  console.log(`  Created: ${data.id}`);
  tableIds[name] = data.id;
  return data.id;
}

async function getExistingTableId(name: string) {
  const res = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
    headers: { Authorization: `Bearer ${PAT}` },
  });
  const data = await res.json();
  const table = data.tables?.find((t: any) => t.name === name);
  if (table) {
    tableIds[name] = table.id;
    console.log(`  Found existing: ${table.id}`);
    return table.id;
  }
  throw new Error(`Table "${name}" not found`);
}

async function addFieldToTable(tableId: string, field: any) {
  const res = await fetch(
    `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables/${tableId}/fields`,
    { method: "POST", headers, body: JSON.stringify(field) }
  );
  if (!res.ok) {
    const err = await res.json();
    if (err.error?.message?.includes("already exists")) {
      console.log(`    Field "${field.name}" already exists, skipping`);
      return;
    }
    console.error(`    Failed to add field "${field.name}":`, err.error?.message);
    return;
  }
  const data = await res.json();
  console.log(`    Added field: ${field.name}`);
  return data;
}

// Helper for select options
function selectOpts(...values: string[]) {
  return { choices: values.map((name) => ({ name })) };
}

async function main() {
  console.log("=== 24/8 Anthem - Airtable Schema Setup ===\n");
  console.log(`Base: ${BASE_ID}`);

  // ─── PHASE 1: Create tables with non-link fields ───

  // TABLE 1: STRATEGY_TYPES
  await createTable("STRATEGY_TYPES", [
    { name: "id", type: "singleLineText" },
    { name: "strategy_name", type: "singleLineText" },
    { name: "emoji", type: "singleLineText" },
    { name: "short_description", type: "singleLineText" },
    { name: "full_strategy_approach", type: "multilineText" },
    { name: "research_focus_keywords", type: "singleLineText" },
    { name: "lyrical_themes", type: "singleLineText" },
    { name: "music_tone", type: "singleLineText" },
    { name: "chatgpt_prompt_template", type: "multilineText" },
    { name: "is_active", type: "checkbox", options: { color: "greenBright", icon: "check" } },
  ], "4 strategy approaches: Smart, Aggressive, Conservative, Risk-Reward");

  // TABLE 2: COURSES
  await createTable("COURSES", [
    { name: "id", type: "singleLineText" },
    { name: "course_name", type: "singleLineText" },
    { name: "architect", type: "singleLineText" },
    { name: "year_built", type: "number", options: { precision: 0 } },
    { name: "location_city", type: "singleLineText" },
    { name: "location_state", type: "singleLineText" },
    { name: "location_country", type: "singleLineText" },
    { name: "latitude", type: "number", options: { precision: 4 } },
    { name: "longitude", type: "number", options: { precision: 4 } },
    { name: "par_total", type: "number", options: { precision: 0 } },
    { name: "total_yardage", type: "number", options: { precision: 0 } },
    { name: "holes_total", type: "number", options: { precision: 0 } },
    { name: "course_description", type: "multilineText" },
    { name: "designer_intent", type: "multilineText" },
    { name: "strategic_elements", type: "multilineText" },
    { name: "signature_hole", type: "singleLineText" },
    { name: "is_active", type: "checkbox", options: { color: "greenBright", icon: "check" } },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "notes", type: "multilineText" },
  ], "Master golf course records");

  // TABLE 3: TEE_BOXES (link fields added in phase 2)
  await createTable("TEE_BOXES", [
    { name: "id", type: "singleLineText" },
    { name: "standard_color", type: "singleSelect", options: selectOpts("Red", "White", "Blue", "Black", "Gold", "Other") },
    { name: "course_local_name", type: "singleLineText" },
    { name: "yardage", type: "number", options: { precision: 0 } },
    { name: "course_rating", type: "number", options: { precision: 1 } },
    { name: "slope_rating", type: "number", options: { precision: 0 } },
    { name: "par", type: "number", options: { precision: 0 } },
    { name: "difficulty_rank", type: "singleSelect", options: selectOpts("Easiest", "Medium-Easy", "Medium", "Medium-Hard", "Hardest") },
    { name: "skill_level_for", type: "singleSelect", options: selectOpts("Beginner", "Beginner-Int", "Intermediate", "Advanced", "Expert") },
    { name: "is_primary", type: "checkbox", options: { color: "greenBright", icon: "check" } },
    { name: "research_notes", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Tee box data per course");

  // TABLE 4: HOLES (link fields added in phase 2)
  await createTable("HOLES", [
    { name: "id", type: "singleLineText" },
    { name: "hole_number", type: "number", options: { precision: 0 } },
    { name: "par", type: "number", options: { precision: 0 } },
    { name: "handicap_index", type: "number", options: { precision: 0 } },
    { name: "hole_name", type: "singleLineText" },
    { name: "hole_description", type: "multilineText" },
    { name: "strategic_elements", type: "multilineText" },
    { name: "difficulty_descriptor", type: "singleLineText" },
    { name: "signature_feature", type: "singleLineText" },
    { name: "lyrical_inspiration", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Per-hole strategic data");

  // TABLE 5: USER_PROFILES
  await createTable("USER_PROFILES", [
    { name: "id", type: "singleLineText" },
    { name: "user_email", type: "email" },
    { name: "user_name", type: "singleLineText" },
    { name: "handicap", type: "number", options: { precision: 1 } },
    { name: "preferred_tee_level", type: "singleSelect", options: selectOpts("Beginner", "Beginner-Int", "Intermediate", "Advanced", "Expert") },
    { name: "play_style", type: "singleSelect", options: selectOpts("Smart", "Aggressive", "Conservative", "Risk-Reward") },
    { name: "experience_level", type: "singleSelect", options: selectOpts("Beginner", "Intermediate", "Advanced", "Expert") },
    { name: "strengths", type: "multilineText" },
    { name: "development_areas", type: "multilineText" },
    { name: "personality_traits", type: "multilineText" },
    { name: "golf_goals", type: "multilineText" },
    { name: "notes", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Golfer profiles");

  // TABLE 6: ANTHEM_REQUESTS (link fields added in phase 2)
  await createTable("ANTHEM_REQUESTS", [
    { name: "id", type: "singleLineText" },
    { name: "request_date", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "target_completion_date", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "status", type: "singleSelect", options: selectOpts(
      "Pending Review", "Research Started", "Research Complete",
      "Script Creation", "Script Review", "Script Approved",
      "Suno Generating", "Track QC", "Published", "On Hold", "Rejected"
    ) },
    { name: "priority", type: "singleSelect", options: selectOpts("Low", "Normal", "High") },
    { name: "request_notes", type: "multilineText" },
    { name: "internal_qa_notes", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Hub table — everything connects here");

  // TABLE 7: RESEARCH_OUTPUT (link fields added in phase 2)
  await createTable("RESEARCH_OUTPUT", [
    { name: "id", type: "singleLineText" },
    { name: "research_prompt_used", type: "multilineText" },
    { name: "research_tool", type: "singleSelect", options: selectOpts("Perplexity", "ChatGPT", "Manual Web Search", "Other") },
    { name: "research_date", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "raw_output", type: "multilineText" },
    { name: "course_history", type: "multilineText" },
    { name: "design_philosophy", type: "multilineText" },
    { name: "hole_strategy_notes", type: "multilineText" },
    { name: "strategic_elements", type: "multilineText" },
    { name: "notable_characteristics", type: "multilineText" },
    { name: "key_takeaways", type: "multilineText" },
    { name: "confidence_score", type: "number", options: { precision: 0 } },
    { name: "research_status", type: "singleSelect", options: selectOpts("Complete", "Partial", "Needs More", "Rejected") },
    { name: "internal_qa_notes", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Perplexity research results");

  // TABLE 8: SCRIPTS (link fields added in phase 2)
  await createTable("SCRIPTS", [
    { name: "id", type: "singleLineText" },
    { name: "version_number", type: "number", options: { precision: 0 } },
    { name: "chatgpt_prompt_sent", type: "multilineText" },
    { name: "chatgpt_response_raw", type: "multilineText" },
    { name: "your_edits_summary", type: "multilineText" },
    { name: "final_approved_script", type: "multilineText" },
    { name: "quality_assessment", type: "singleSelect", options: selectOpts("Perfect", "Minor Edits", "Major Edits", "Rejected") },
    { name: "approval_date", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "approved_by", type: "singleLineText" },
    { name: "internal_notes", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "ChatGPT lyrics + edits, versioned");

  // TABLE 9: SUNO_PARAMETERS (link fields added in phase 2)
  await createTable("SUNO_PARAMETERS", [
    { name: "id", type: "singleLineText" },
    { name: "genre", type: "singleLineText" },
    { name: "instrumentation", type: "singleLineText" },
    { name: "tempo_bpm", type: "singleLineText" },
    { name: "mood_descriptors", type: "singleLineText" },
    { name: "vocal_type", type: "singleSelect", options: selectOpts("Male", "Female", "Mixed", "Instrumental", "Duet") },
    { name: "duration_seconds", type: "number", options: { precision: 0 } },
    { name: "production_level", type: "singleSelect", options: selectOpts("Simple", "Polished", "Studio Quality", "Epic") },
    { name: "similar_artist_refs", type: "singleLineText" },
    { name: "style_prompt", type: "multilineText" },
    { name: "variables", type: "multilineText" },
    { name: "guidelines_24_8", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Music generation settings for Suno");

  // TABLE 10: SUNO_GENERATIONS (link fields added in phase 2)
  await createTable("SUNO_GENERATIONS", [
    { name: "id", type: "singleLineText" },
    { name: "suno_task_id", type: "singleLineText" },
    { name: "api_call_timestamp", type: "dateTime", options: { dateFormat: { name: "iso" }, timeFormat: { name: "24hour" }, timeZone: "America/Los_Angeles" } },
    { name: "status", type: "singleSelect", options: selectOpts("Queued", "Generating", "Polling", "Complete", "Failed") },
    { name: "polling_attempts", type: "number", options: { precision: 0 } },
    { name: "last_polled_at", type: "dateTime", options: { dateFormat: { name: "iso" }, timeFormat: { name: "24hour" }, timeZone: "America/Los_Angeles" } },
    { name: "suno_response_data", type: "multilineText" },
    { name: "audio_url", type: "url" },
    { name: "cover_image_url", type: "url" },
    { name: "error_message", type: "multilineText" },
    { name: "completion_date", type: "dateTime", options: { dateFormat: { name: "iso" }, timeFormat: { name: "24hour" }, timeZone: "America/Los_Angeles" } },
    { name: "api_notes", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Suno API tracking and polling");

  // TABLE 11: TRACKS (link fields added in phase 2)
  await createTable("TRACKS", [
    { name: "id", type: "singleLineText" },
    { name: "track_title", type: "singleLineText" },
    { name: "track_description", type: "multilineText" },
    { name: "audio_url", type: "url" },
    { name: "audio_file_local", type: "singleLineText" },
    { name: "cover_image_url", type: "url" },
    { name: "duration_seconds", type: "number", options: { precision: 0 } },
    { name: "style_generated", type: "singleLineText" },
    { name: "model_used", type: "singleSelect", options: selectOpts("v5", "v4.5_plus", "v4.5", "v4", "v3.5", "Other") },
    { name: "lyrics_used", type: "multilineText" },
    { name: "status", type: "singleSelect", options: selectOpts("Draft", "Approved", "Published", "Archived", "Rejected") },
    { name: "quality_rating", type: "singleSelect", options: selectOpts("★", "★★", "★★★", "★★★★", "★★★★★") },
    { name: "qa_notes", type: "multilineText" },
    { name: "approved_date", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "approved_by", type: "singleLineText" },
    { name: "release_date", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Final deliverable with full audit trail");

  console.log("\n=== Phase 1 complete: All 11 tables created ===\n");

  // ─── PHASE 2: Add linked record fields ───
  console.log("=== Phase 2: Adding linked record fields ===\n");

  // TEE_BOXES → COURSES
  console.log("TEE_BOXES links:");
  await addFieldToTable(tableIds["TEE_BOXES"], {
    name: "course_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["COURSES"] },
  });

  // TEE_BOXES formula: display_name
  await addFieldToTable(tableIds["TEE_BOXES"], {
    name: "display_name",
    type: "formula",
    options: { formula: `CONCATENATE({standard_color}, " Tees - ", {course_local_name})` },
  });

  // HOLES → COURSES
  console.log("HOLES links:");
  await addFieldToTable(tableIds["HOLES"], {
    name: "course_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["COURSES"] },
  });

  // ANTHEM_REQUESTS → COURSES, USER_PROFILES, STRATEGY_TYPES, TEE_BOXES
  console.log("ANTHEM_REQUESTS links:");
  await addFieldToTable(tableIds["ANTHEM_REQUESTS"], {
    name: "course_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["COURSES"] },
  });
  await addFieldToTable(tableIds["ANTHEM_REQUESTS"], {
    name: "user_profile_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["USER_PROFILES"] },
  });
  await addFieldToTable(tableIds["ANTHEM_REQUESTS"], {
    name: "strategy_type_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["STRATEGY_TYPES"] },
  });
  await addFieldToTable(tableIds["ANTHEM_REQUESTS"], {
    name: "tee_box_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["TEE_BOXES"] },
  });

  // RESEARCH_OUTPUT → ANTHEM_REQUESTS, COURSES
  console.log("RESEARCH_OUTPUT links:");
  await addFieldToTable(tableIds["RESEARCH_OUTPUT"], {
    name: "request_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["ANTHEM_REQUESTS"] },
  });
  await addFieldToTable(tableIds["RESEARCH_OUTPUT"], {
    name: "course_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["COURSES"] },
  });

  // SCRIPTS → ANTHEM_REQUESTS, RESEARCH_OUTPUT
  console.log("SCRIPTS links:");
  await addFieldToTable(tableIds["SCRIPTS"], {
    name: "request_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["ANTHEM_REQUESTS"] },
  });
  await addFieldToTable(tableIds["SCRIPTS"], {
    name: "research_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["RESEARCH_OUTPUT"] },
  });

  // SUNO_PARAMETERS → ANTHEM_REQUESTS
  console.log("SUNO_PARAMETERS links:");
  await addFieldToTable(tableIds["SUNO_PARAMETERS"], {
    name: "request_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["ANTHEM_REQUESTS"] },
  });

  // SUNO_GENERATIONS → ANTHEM_REQUESTS, SUNO_PARAMETERS
  console.log("SUNO_GENERATIONS links:");
  await addFieldToTable(tableIds["SUNO_GENERATIONS"], {
    name: "request_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["ANTHEM_REQUESTS"] },
  });
  await addFieldToTable(tableIds["SUNO_GENERATIONS"], {
    name: "parameters_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["SUNO_PARAMETERS"] },
  });

  // TRACKS → everything
  console.log("TRACKS links:");
  await addFieldToTable(tableIds["TRACKS"], {
    name: "request_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["ANTHEM_REQUESTS"] },
  });
  await addFieldToTable(tableIds["TRACKS"], {
    name: "course_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["COURSES"] },
  });
  await addFieldToTable(tableIds["TRACKS"], {
    name: "user_profile_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["USER_PROFILES"] },
  });
  await addFieldToTable(tableIds["TRACKS"], {
    name: "strategy_type_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["STRATEGY_TYPES"] },
  });
  await addFieldToTable(tableIds["TRACKS"], {
    name: "tee_box_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["TEE_BOXES"] },
  });
  await addFieldToTable(tableIds["TRACKS"], {
    name: "research_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["RESEARCH_OUTPUT"] },
  });
  await addFieldToTable(tableIds["TRACKS"], {
    name: "script_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["SCRIPTS"] },
  });
  await addFieldToTable(tableIds["TRACKS"], {
    name: "suno_generation_id",
    type: "multipleRecordLinks",
    options: { linkedTableId: tableIds["SUNO_GENERATIONS"] },
  });

  console.log("\n=== Phase 2 complete: All linked record fields added ===\n");

  // ─── SUMMARY ───
  console.log("=== TABLE ID MAP ===");
  for (const [name, id] of Object.entries(tableIds)) {
    console.log(`  ${name}: ${id}`);
  }
  console.log("\n=== SETUP COMPLETE ===");
  console.log("All 11 tables created with full field definitions and relationships.");
  console.log("Next: Run seed-data.ts to populate STRATEGY_TYPES and sample records.");
}

main().catch((err) => {
  console.error("\nFATAL ERROR:", err.message);
  process.exit(1);
});
