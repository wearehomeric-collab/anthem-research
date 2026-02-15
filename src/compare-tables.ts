/**
 * Compare old vs new tables to find missing fields
 */
import "dotenv/config";

async function main() {
  const BASE_ID = process.env.AIRTABLE_BASE_ID;
  const PAT = process.env.AIRTABLE_PAT;
  const resp = await fetch(`https://api.airtable.com/v0/meta/bases/${BASE_ID}/tables`, {
    headers: { Authorization: `Bearer ${PAT}` },
  });
  const data = await resp.json();

  const byId: Record<string, any> = {};
  for (const t of data.tables) {
    byId[t.id] = t;
  }

  const pairs = [
    { old: "tblvCpxZyvijFDJ1O", new: "tblUmMx0zgCP35j7N", label: "Courses → COURSES" },
    { old: "tbl0mtD5cGFnzdMoo", new: "tblYekq8SiNHnBMbk", label: "Tee Sets → TEE_BOXES" },
    { old: "tblBdaAyKraDn6Yae", new: "tbl4D4uPdzGdenax7", label: "Player Archetypes → USER_PROFILES" },
    { old: "tblJrkOKBJVVOzPnU", new: "tblWMQ46ow4hnEQBf", label: "Strategy Packs → STRATEGY_TYPES" },
    { old: "tblcuvhO8pnmPX5G7", new: "tblCS344T2dnzpusU", label: "Research Requests → ANTHEM_REQUESTS" },
    { old: "tblzOBkUNebJFLVYK", new: "tblvAxDrSQMSTSdyL", label: "Research Results → RESEARCH_OUTPUT" },
    { old: "tblxEGZLcAh0QJJdW", new: "tblX7FhAhbmDHOhOD", label: "Scripts → SCRIPTS" },
    { old: "tblNAwdZFFdKHJwtK", new: "tblWyEOHAaGMp5Sh3", label: "Track Outputs → TRACKS" },
    { old: "tblzfJ6xUIkfNgCub", new: "tblyPCnOer7C7TZeC", label: "AI Lab → AI_LAB" },
  ];

  for (const pair of pairs) {
    const oldT = byId[pair.old];
    const newT = byId[pair.new];
    if (!oldT || !newT) {
      console.log(`\n=== ${pair.label} ===`);
      console.log(`  OLD: ${oldT ? oldT.name : "NOT FOUND"}`);
      console.log(`  NEW: ${newT ? newT.name : "NOT FOUND"}`);
      continue;
    }

    const oldFields = new Set(oldT.fields.map((f: any) => f.name));
    const newFields = new Set(newT.fields.map((f: any) => f.name));
    const oldFieldMap: Record<string, any> = {};
    for (const f of oldT.fields) oldFieldMap[f.name] = f;

    const missing: string[] = [];
    for (const name of oldFields) {
      if (!newFields.has(name)) {
        missing.push(name);
      }
    }

    console.log(`\n=== ${pair.label} ===`);
    console.log(`Old: ${oldT.fields.length} fields | New: ${newT.fields.length} fields`);
    if (missing.length === 0) {
      console.log("  All old fields present in new table");
    } else {
      console.log(`Missing from new (${missing.length}):`);
      for (const m of missing) {
        const f = oldFieldMap[m];
        console.log(`  - ${m} (${f.type})`);
      }
    }
  }

  // Old tables with no direct new equivalent
  const extraOld = [
    { id: "tblQ9RSbvRTYHRiTJ", name: "HOLES (hidden)" },
    { id: "tblY6e7bEsAzWoNUu", name: "Hole Yardages" },
    { id: "tblOmspPj1ygEaXjz", name: "Tasks" },
  ];

  for (const t of extraOld) {
    const table = byId[t.id];
    if (table) {
      console.log(`\n=== ${t.name} — no new equivalent ===`);
      console.log(`Fields (${table.fields.length}):`);
      for (const f of table.fields) {
        console.log(`  - ${f.name} (${f.type})`);
      }
    }
  }
}

main().catch((err) => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
