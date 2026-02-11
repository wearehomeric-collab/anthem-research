import { tables } from "./airtable-client.js";

async function testConnection() {
  console.log("Testing Airtable connection...\n");

  try {
    const records = await tables.strategyTypes
      .select({ maxRecords: 10 })
      .firstPage();

    console.log(`Found ${records.length} strategy types:`);
    for (const record of records) {
      console.log(`  - ${record.get("strategy_name")} (${record.get("id")})`);
    }

    if (records.length === 0) {
      console.log("  (no records found — have you created the 4 strategy type records yet?)");
    }

    console.log("\nConnection successful!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Connection failed:", error.message);
      if (error.message.includes("NOT_FOUND")) {
        console.error("Check that AIRTABLE_BASE_ID is correct and the STRATEGY_TYPES table exists.");
      }
      if (error.message.includes("AUTHENTICATION_REQUIRED") || error.message.includes("INVALID_API_KEY")) {
        console.error("Check that AIRTABLE_PAT is a valid Personal Access Token with data.records:read scope.");
      }
    } else {
      console.error("Connection failed:", error);
    }
    process.exit(1);
  }
}

testConnection();
