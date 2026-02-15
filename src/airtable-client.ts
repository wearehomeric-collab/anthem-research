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

// Table references by ID (stable across renames)
export const tables = {
  strategyTypes: base("tblWMQ46ow4hnEQBf"),
  courses: base("tblUmMx0zgCP35j7N"),
  teeBoxes: base("tblYekq8SiNHnBMbk"),
  userProfiles: base("tbl4D4uPdzGdenax7"),
  anthemRequests: base("tblCS344T2dnzpusU"),
  researchOutput: base("tblvAxDrSQMSTSdyL"),
  scripts: base("tblX7FhAhbmDHOhOD"),
  anthemParameters: base("tblN5ffNIaSJE7yws"), // renamed from SUNO_PARAMETERS → ANTHEM_PARAMETERS
  anthemGenerations: base("tbluijCk5bySJoyZE"), // renamed from SUNO_GENERATIONS → ANTHEM_GENERATIONS
  tracks: base("tblWyEOHAaGMp5Sh3"),
  aiLab: base("tblyPCnOer7C7TZeC"),
};

export default base;
