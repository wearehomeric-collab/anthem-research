/**
 * Gap Migration: Add missing fields identified from old→new table comparison.
 * Run after the initial migrate-schema.ts migration.
 */
import "dotenv/config";

const BASE_ID = process.env.AIRTABLE_BASE_ID!;
const PAT = process.env.AIRTABLE_PAT!;
const META_URL = `https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`;

const TABLE_IDS = {
  COURSES: "tblUmMx0zgCP35j7N",
  USER_PROFILES: "tbl4D4uPdzGdenax7",
  ANTHEM_REQUESTS: "tblCS344T2dnzpusU",
  SCRIPTS: "tblX7FhAhbmDHOhOD",
  TRACKS: "tblWyEOHAaGMp5Sh3",
  AI_LAB: "tblyPCnOer7C7TZeC",
  ANTHEM_PARAMETERS: "tblN5ffNIaSJE7yws",
};

async function addField(tableId: string, tableName: string, field: any) {
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
      if (JSON.stringify(err).includes("DUPLICATE_OR_EMPTY_FIELD_NAME")) {
        console.log(`  [skip] ${tableName}.${field.name} (already exists)`);
        return;
      }
      console.error(`  [FAIL] ${tableName}.${field.name}: ${JSON.stringify(err)}`);
      return;
    }

    const result = await resp.json();
    console.log(`  [ok] ${tableName}.${field.name} (${result.type})`);
  } catch (e) {
    console.error(`  [ERROR] ${tableName}.${field.name}: ${(e as Error).message}`);
  }
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
function link(tableId: string) {
  return { type: "multipleRecordLinks", options: { linkedTableId: tableId } };
}

async function migrate() {
  console.log("========================================");
  console.log("GAP MIGRATION: Missing Fields");
  console.log("========================================\n");

  // ── COURSES ──
  console.log("COURSES:");
  await addField(TABLE_IDS.COURSES, "COURSES", {
    name: "general_vibe",
    type: "multilineText",
  });
  await addField(TABLE_IDS.COURSES, "COURSES", {
    name: "scorecard_url",
    type: "url",
  });

  // ── USER_PROFILES ──
  console.log("\nUSER_PROFILES:");
  await addField(TABLE_IDS.USER_PROFILES, "USER_PROFILES", {
    name: "profile_type",
    ...singleSelect(["User", "Platform Default", "Preset"]),
  });

  // ── ANTHEM_REQUESTS ──
  console.log("\nANTHEM_REQUESTS:");
  await addField(TABLE_IDS.ANTHEM_REQUESTS, "ANTHEM_REQUESTS", {
    name: "priority",
    ...singleSelect(["High", "Medium", "Low"]),
  });

  // ── SCRIPTS ──
  console.log("\nSCRIPTS:");
  await addField(TABLE_IDS.SCRIPTS, "SCRIPTS", {
    name: "reference_script_id",
    ...link(TABLE_IDS.SCRIPTS),
  });
  await addField(TABLE_IDS.SCRIPTS, "SCRIPTS", {
    name: "generate_now",
    ...checkbox(),
  });
  // Note: character_count formula must reference the correct field name
  await addField(TABLE_IDS.SCRIPTS, "SCRIPTS", {
    name: "character_count",
    type: "formula",
    options: { formula: "LEN({chatgpt_response_raw})" },
  });

  // ── TRACKS ──
  console.log("\nTRACKS:");
  await addField(TABLE_IDS.TRACKS, "TRACKS", {
    name: "track_title",
    type: "singleLineText",
  });
  await addField(TABLE_IDS.TRACKS, "TRACKS", {
    name: "duration_seconds",
    type: "number",
    options: { precision: 0 },
  });
  await addField(TABLE_IDS.TRACKS, "TRACKS", {
    name: "audio_url",
    type: "url",
  });
  await addField(TABLE_IDS.TRACKS, "TRACKS", {
    name: "audio_file",
    type: "multipleAttachments",
  });
  await addField(TABLE_IDS.TRACKS, "TRACKS", {
    name: "generation_id",
    type: "singleLineText",
  });
  await addField(TABLE_IDS.TRACKS, "TRACKS", {
    name: "generation_status",
    ...singleSelect(["Queued", "Generating", "Complete", "Failed"]),
  });
  await addField(TABLE_IDS.TRACKS, "TRACKS", {
    name: "qa_status",
    ...singleSelect(["Pending", "Pass", "Fail", "Needs Revision"]),
  });
  await addField(TABLE_IDS.TRACKS, "TRACKS", {
    name: "qa_notes",
    type: "multilineText",
  });

  // ── AI_LAB ──
  console.log("\nAI_LAB:");
  await addField(TABLE_IDS.AI_LAB, "AI_LAB", {
    name: "documentation_link",
    type: "url",
  });
  await addField(TABLE_IDS.AI_LAB, "AI_LAB", {
    name: "observed_issues",
    type: "multipleSelects",
    options: {
      choices: [
        { name: "Too Long", color: "redLight2" },
        { name: "Too Short", color: "orangeLight2" },
        { name: "Off Topic", color: "yellowLight2" },
        { name: "Wrong Tone", color: "purpleLight2" },
        { name: "Missing Holes", color: "blueLight2" },
        { name: "Bad Structure", color: "grayLight2" },
        { name: "Factual Error", color: "pinkLight2" },
        { name: "Repetitive", color: "cyanLight2" },
      ],
    },
  });

  // ── ANTHEM_PARAMETERS ──
  console.log("\nANTHEM_PARAMETERS:");
  await addField(TABLE_IDS.ANTHEM_PARAMETERS, "ANTHEM_PARAMETERS", {
    name: "model",
    ...singleSelect(["V5", "V4_5PLUS", "V4_5", "V4_5ALL", "V4", "V3_5"]),
  });
  await addField(TABLE_IDS.ANTHEM_PARAMETERS, "ANTHEM_PARAMETERS", {
    name: "instrumental",
    ...checkbox(),
  });
  await addField(TABLE_IDS.ANTHEM_PARAMETERS, "ANTHEM_PARAMETERS", {
    name: "negative_tags",
    type: "singleLineText",
  });
  await addField(TABLE_IDS.ANTHEM_PARAMETERS, "ANTHEM_PARAMETERS", {
    name: "vocal_gender",
    ...singleSelect(["m", "f"]),
  });

  console.log("\n========================================");
  console.log("GAP MIGRATION COMPLETE");
  console.log("========================================");
}

migrate().catch((err) => {
  console.error("MIGRATION ERROR:", (err as Error).message);
  process.exit(1);
});
