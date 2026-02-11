import Airtable from "airtable";
import "dotenv/config";

if (!process.env.AIRTABLE_PAT) {
  throw new Error("Missing AIRTABLE_PAT environment variable. Copy .env.example to .env and fill in your Airtable Personal Access Token.");
}
if (!process.env.AIRTABLE_BASE_ID) {
  throw new Error("Missing AIRTABLE_BASE_ID environment variable. Copy .env.example to .env and fill in your Airtable Base ID.");
}

const base = new Airtable({
  apiKey: process.env.AIRTABLE_PAT,
}).base(process.env.AIRTABLE_BASE_ID);

// Table references matching the 11-table schema
export const tables = {
  strategyTypes: base("STRATEGY_TYPES"),
  courses: base("COURSES"),
  teeBoxes: base("TEE_BOXES"),
  holes: base("HOLES"),
  userProfiles: base("USER_PROFILES"),
  anthemRequests: base("ANTHEM_REQUESTS"),
  researchOutput: base("RESEARCH_OUTPUT"),
  scripts: base("SCRIPTS"),
  sunoParameters: base("SUNO_PARAMETERS"),
  sunoGenerations: base("SUNO_GENERATIONS"),
  tracks: base("TRACKS"),
};

export default base;
