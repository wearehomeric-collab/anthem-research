import "dotenv/config";
import { getPrompt, getMusicStyles } from "./prompts/loader.js";

async function main() {
  console.log("=== Testing Prompt Loader ===\n");

  const research = await getPrompt("Research");
  console.log("Research:", research.promptName, "| source:", research.source);
  console.log("  Preview:", research.systemPrompt.substring(0, 100) + "...\n");

  const strategy = await getPrompt("Strategy");
  console.log("Strategy:", strategy.promptName, "| source:", strategy.source);
  console.log("  Preview:", strategy.systemPrompt.substring(0, 100) + "...\n");

  const script = await getPrompt("Script/Lyric");
  console.log("Script:", script.promptName, "| source:", script.source);
  console.log("  Preview:", script.systemPrompt.substring(0, 100) + "...\n");

  const styles = await getMusicStyles();
  console.log("Music Styles available:", styles.length);
  for (const s of styles) {
    console.log("  -", s.promptName, "| v" + s.version);
    console.log("   ", s.systemPrompt.substring(0, 80) + "...");
  }
}

main().catch((err) => {
  console.error("ERROR:", err.message);
  process.exit(1);
});
