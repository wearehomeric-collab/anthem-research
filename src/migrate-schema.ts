/**
 * Schema Migration: Align with Platform Vision
 *
 * 1. Add club yardage fields to USER_PROFILES
 * 2. Add facility/verification/hole info fields to COURSES
 * 3. Add hole data + verification fields to TEE_BOXES
 * 4. Add platform/publishing fields to TRACKS
 * 5. Add strategy + automation fields to ANTHEM_REQUESTS
 * 6. Add research type + deep research fields to RESEARCH_OUTPUT
 * 7. Add link fields to SUNO_PARAMETERS (for AI_LAB)
 * 8. Create AI_LAB table
 * 9. Delete HOLES table
 */
import "dotenv/config";

const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const PAT = process.env.AIRTABLE_PAT!;
const META_URL = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`;

const TABLE_IDS = {
  STRATEGY_TYPES: "tblWMQ46ow4hnEQBf",
  COURSES: "tblUmMx0zgCP35j7N",
  TEE_BOXES: "tblYekq8SiNHnBMbk",
  HOLES: "tblQ9RSbvRTYHRiTJ",
  USER_PROFILES: "tbl4D4uPdzGdenax7",
  ANTHEM_REQUESTS: "tblCS344T2dnzpusU",
  RESEARCH_OUTPUT: "tblvAxDrSQMSTSdyL",
  SCRIPTS: "tblX7FhAhbmDHOhOD",
  SUNO_PARAMETERS: "tblN5ffNIaSJE7yws",
  SUNO_GENERATIONS: "tbluijCk5bySJoyZE",
  TRACKS: "tblWyEOHAaGMp5Sh3",
};

async function addFieldsToTable(tableId: string, tableName: string, fields: any[]) {
  console.log(`\nAdding ${fields.length} fields to ${tableName}...`);

  for (const field of fields) {
    try {
      const resp = await fetch(`${META_URL}/${tableId}/fields`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${PAT}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(field),
      });

      if (!resp.ok) {
        const err = await resp.json();
        // Skip if field already exists
        if (JSON.stringify(err).includes("DUPLICATE_OR_EMPTY_FIELD_NAME")) {
          console.log(`  [skip] ${field.name} (already exists)`);
          continue;
        }
        console.error(`  [FAIL] ${field.name}: ${JSON.stringify(err)}`);
        continue;
      }

      const result = await resp.json();
      console.log(`  [ok] ${field.name} (${result.type})`);
    } catch (e) {
      console.error(`  [ERROR] ${field.name}: ${(e as Error).message}`);
    }
  }
}

async function createTable(name: string, fields: any[], description?: string) {
  console.log(`\nCreating table: ${name}...`);

  const resp = await fetch(META_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${PAT}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, fields }),
  });

  if (!resp.ok) {
    const err = await resp.json();
    console.error(`  [FAIL] ${JSON.stringify(err)}`);
    return null;
  }

  const result = await resp.json();
  console.log(`  [ok] Created ${name} (${result.id})`);
  return result.id as string;
}

async function deleteTable(tableId: string, tableName: string) {
  console.log(`\nDeleting table: ${tableName} (${tableId})...`);

  const resp = await fetch(`${META_URL}/${tableId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${PAT}` },
  });

  if (!resp.ok) {
    const err = await resp.text();
    console.error(`  [FAIL] ${err}`);
    return;
  }
  console.log(`  [ok] Deleted ${tableName}`);
}

function checkbox() {
  return { type: "checkbox", options: { color: "greenBright", icon: "check" } };
}
function singleSelect(choices: string[]) {
  return {
    type: "singleSelect",
    options: { choices: choices.map((name) => ({ name, color: "grayLight2" })) },
  };
}
function rating(max: number) {
  return { type: "rating", options: { max, color: "yellowBright" } };
}
function link(tableId: string) {
  return { type: "multipleRecordLinks", options: { linkedTableId: tableId } };
}

async function migrate() {
  console.log("========================================");
  console.log("SCHEMA MIGRATION: Platform Vision");
  console.log("========================================");

  // ── 1. USER_PROFILES: Club yardage data ──
  await addFieldsToTable(TABLE_IDS.USER_PROFILES, "USER_PROFILES", [
    { name: "archetype_name", type: "singleLineText" },
    { name: "is_platform_default", ...checkbox() },
    { name: "driver_carry", type: "number", options: { precision: 0 } },
    { name: "driver_total", type: "number", options: { precision: 0 } },
    { name: "three_wood_carry", type: "number", options: { precision: 0 } },
    { name: "hybrid_carry", type: "number", options: { precision: 0 } },
    { name: "seven_iron_carry", type: "number", options: { precision: 0 } },
    { name: "pw_carry", type: "number", options: { precision: 0 } },
    { name: "preferred_layup_range", type: "singleLineText" },
    { name: "shot_shape", ...singleSelect(["Draw", "Fade", "Straight", "Variable"]) },
    { name: "miss_tendency", type: "singleLineText" },
  ]);

  // ── 2. COURSES: Facility, verification, hole info ──
  await addFieldsToTable(TABLE_IDS.COURSES, "COURSES", [
    { name: "facility_name", type: "singleLineText" },
    { name: "common_name_aliases", type: "singleLineText" },
    { name: "course_type", ...singleSelect(["Public", "Private", "Resort", "Municipal", "Semi-Private"]) },
    { name: "course_address", type: "singleLineText" },
    { name: "website", type: "url" },
    { name: "social_accounts", type: "url" },
    { name: "course_image", type: "multipleAttachments" },
    { name: "course_logo", type: "multipleAttachments" },
    { name: "initial_research_status", ...singleSelect(["Not Started", "In Progress", "Complete", "Needs Review"]) },
    { name: "auto_populate_status", ...singleSelect(["Pending", "Complete", "Failed", "Manual Override"]) },
    { name: "recent_renovations", ...checkbox() },
    { name: "renovation_notes", type: "multilineText" },
    { name: "last_verified_date", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "is_on_release_schedule", ...checkbox() },
    // Merged from HOLES table
    { name: "signature_holes", type: "multilineText" },
    { name: "hole_descriptions", type: "multilineText" },
    { name: "course_par", type: "number", options: { precision: 0 } },
  ]);

  // ── 3. TEE_BOXES: Hole data + verification ──
  await addFieldsToTable(TABLE_IDS.TEE_BOXES, "TEE_BOXES", [
    { name: "tee_label_canonical", type: "singleLineText" },
    { name: "hole_data", type: "multilineText" },
    { name: "front_yardage", type: "number", options: { precision: 0 } },
    { name: "back_yardage", type: "number", options: { precision: 0 } },
    { name: "verification_method", ...singleSelect(["Scorecard", "Website", "Research", "Manual", "Both"]) },
    { name: "confidence", ...singleSelect(["High", "Medium", "Low", "Unverified"]) },
    { name: "scorecard_url", type: "url" },
  ]);

  // ── 4. TRACKS: Platform/publishing fields ──
  await addFieldsToTable(TABLE_IDS.TRACKS, "TRACKS", [
    { name: "is_official", ...checkbox() },
    { name: "official_version_label", ...singleSelect(["v1", "v2", "v3", "v4", "v5"]) },
    { name: "approved_for_platform", ...checkbox() },
    { name: "published_to_platform", ...checkbox() },
    { name: "platform_track_id", type: "singleLineText" },
    { name: "published_url", type: "url" },
    { name: "supabase_sync_status", ...singleSelect(["Pending", "Synced", "Failed"]) },
    { name: "art_status", ...singleSelect(["None", "AI Generated", "Custom", "Approved"]) },
    { name: "art_source", ...singleSelect(["Suno", "DALL-E", "Manual", "Stock"]) },
    { name: "art_prompt_used", type: "multilineText" },
    { name: "track_art", type: "multipleAttachments" },
    { name: "bpm_range", type: "singleLineText" },
    { name: "verified_bpm", type: "number", options: { precision: 0 } },
    { name: "weirdness", type: "number", options: { precision: 1 } },
    { name: "style_influence", type: "number", options: { precision: 1 } },
    { name: "track_distributed", ...checkbox() },
    { name: "is_default_version", ...checkbox() },
  ]);

  // ── 5. ANTHEM_REQUESTS: Automation fields ──
  await addFieldsToTable(TABLE_IDS.ANTHEM_REQUESTS, "ANTHEM_REQUESTS", [
    { name: "automation_log", type: "multilineText" },
    { name: "is_custom_request", ...checkbox() },
    { name: "parent_request_id", ...link(TABLE_IDS.ANTHEM_REQUESTS) },
  ]);

  // ── 6. RESEARCH_OUTPUT: Research type + deep research fields ──
  await addFieldsToTable(TABLE_IDS.RESEARCH_OUTPUT, "RESEARCH_OUTPUT", [
    { name: "research_type", ...singleSelect(["Course Overview", "Deep Research"]) },
    { name: "player_profile_id", ...link(TABLE_IDS.USER_PROFILES) },
    { name: "tee_box_id", ...link(TABLE_IDS.TEE_BOXES) },
    { name: "strategy_type_id", ...link(TABLE_IDS.STRATEGY_TYPES) },
    { name: "player_specific_strategy", type: "multilineText" },
    { name: "club_distance_analysis", type: "multilineText" },
  ]);

  // ── 7. Create AI_LAB table ──
  const aiLabId = await createTable("AI_LAB", [
    { name: "id", type: "singleLineText" },
    { name: "prompt_name", type: "singleLineText" },
    { name: "version", type: "number", options: { precision: 0 } },
    { name: "prompt_type", ...singleSelect(["Research", "Strategy", "Script/Lyric", "Music Style", "Persona", "Art"]) },
    { name: "system_prompt", type: "multilineText" },
    { name: "variables_used", type: "multilineText" },
    { name: "agent_type", ...singleSelect(["Perplexity", "ChatGPT", "Suno", "Manual"]) },
    { name: "hard_rules", type: "multilineText" },
    { name: "status", ...singleSelect(["Draft", "Testing", "Active", "Deprecated"]) },
    { name: "is_current_default", ...checkbox() },
    { name: "success_score", ...rating(5) },
    { name: "known_failure_modes", type: "multilineText" },
    { name: "what_worked_well", type: "multilineText" },
    { name: "what_needs_improvement", type: "multilineText" },
    { name: "change_notes", type: "multilineText" },
    { name: "created_at", type: "date", options: { dateFormat: { name: "iso" } } },
    { name: "last_updated", type: "date", options: { dateFormat: { name: "iso" } } },
  ], "Prompt versioning, music style templates, and persona references");

  // ── 8. Add AI_LAB link fields to SUNO_PARAMETERS ──
  if (aiLabId) {
    console.log(`\nAI_LAB table created: ${aiLabId}`);
    await addFieldsToTable(TABLE_IDS.SUNO_PARAMETERS, "SUNO_PARAMETERS", [
      { name: "music_style_template_id", ...link(aiLabId) },
      { name: "persona_reference_id", ...link(aiLabId) },
    ]);
  }

  // ── 9. Delete HOLES table ──
  await deleteTable(TABLE_IDS.HOLES, "HOLES");

  // ── Summary ──
  console.log("\n========================================");
  console.log("MIGRATION COMPLETE");
  console.log("========================================");
  console.log("Added fields to: USER_PROFILES, COURSES, TEE_BOXES, TRACKS, ANTHEM_REQUESTS, RESEARCH_OUTPUT");
  console.log("Created: AI_LAB" + (aiLabId ? ` (${aiLabId})` : " (FAILED)"));
  console.log("Deleted: HOLES");
  console.log("Added link fields: SUNO_PARAMETERS → AI_LAB");
  if (aiLabId) {
    console.log(`\n>> UPDATE TABLE_IDS.AI_LAB = "${aiLabId}" in airtable-client.ts`);
  }
}

migrate().catch((err) => {
  console.error("MIGRATION ERROR:", (err as Error).message);
  process.exit(1);
});
