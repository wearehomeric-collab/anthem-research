/**
 * Prompt Loader
 *
 * Checks AI_LAB for an override prompt (is_current_default + matching prompt_type).
 * Falls back to code defaults if no override found or on error.
 *
 * Music Style prompts ALWAYS come from AI_LAB (no code fallback).
 */
import Airtable from "airtable";
import "dotenv/config";

const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base(
  process.env.AIRTABLE_BASE_ID || ""
);
const aiLabTable = base("tblyPCnOer7C7TZeC");

export interface AILabPrompt {
  id: string;
  recordId: string;
  promptName: string;
  version: number;
  systemPrompt: string;
  variablesUsed: string;
  source: "ai_lab" | "code_default";
}

/**
 * Fetch the current default prompt from AI_LAB for a given type.
 * Returns null if not found.
 */
async function fetchFromAILab(
  promptType: string
): Promise<AILabPrompt | null> {
  try {
    const records = await aiLabTable
      .select({
        filterByFormula: `AND({prompt_type} = "${promptType}", {is_current_default} = TRUE(), {status} = "Active")`,
        maxRecords: 1,
      })
      .firstPage();

    if (records.length === 0) return null;

    const rec = records[0];
    return {
      id: rec.get("id") as string,
      recordId: rec.id,
      promptName: rec.get("prompt_name") as string,
      version: rec.get("version") as number,
      systemPrompt: rec.get("system_prompt") as string,
      variablesUsed: rec.get("variables_used") as string,
      source: "ai_lab",
    };
  } catch (err) {
    console.warn(
      `  [prompt-loader] AI_LAB fetch failed for "${promptType}": ${(err as Error).message}`
    );
    return null;
  }
}

/**
 * Get a prompt by type. Checks AI_LAB first, falls back to code default.
 *
 * For "Music Style" prompts, there is no code fallback — must exist in AI_LAB.
 */
export async function getPrompt(
  promptType: "Research" | "Strategy" | "Script/Lyric" | "Music Style",
  options?: { skipAILab?: boolean }
): Promise<AILabPrompt> {
  // Check AI_LAB for override (unless explicitly skipped)
  if (!options?.skipAILab) {
    const override = await fetchFromAILab(promptType);
    if (override) {
      console.log(
        `  [prompt-loader] Using AI_LAB: "${override.promptName}" v${override.version}`
      );
      return override;
    }
  }

  // Music Style has no code fallback
  if (promptType === "Music Style") {
    throw new Error(
      `No active Music Style prompt found in AI_LAB. Create one with prompt_type "Music Style", status "Active", and is_current_default checked.`
    );
  }

  // Fall back to code defaults
  console.log(
    `  [prompt-loader] Using code default for "${promptType}"`
  );

  switch (promptType) {
    case "Research": {
      const mod = await import("./course-overview.js");
      return {
        id: mod.PROMPT_ID,
        recordId: "",
        promptName: "Course Overview Research (code default)",
        version: 1,
        systemPrompt: "__CODE_DEFAULT__",
        variablesUsed:
          "{COURSE_NAME}, {LOCATION}, {TEE_NAME}",
        source: "code_default",
      };
    }
    case "Strategy": {
      const mod = await import("./deep-strategy.js");
      return {
        id: mod.PROMPT_ID,
        recordId: "",
        promptName: "Deep Strategy Research (code default)",
        version: 1,
        systemPrompt: "__CODE_DEFAULT__",
        variablesUsed:
          "{COURSE_NAME}, {EVENT_NAME}, {LOCATION}, {TEE_NAME}, {TEE_YARDAGE}, {HOLE_DATA}, {PLAYER_*}, {STRATEGY_*}",
        source: "code_default",
      };
    }
    case "Script/Lyric": {
      const mod = await import("./script-writer.js");
      return {
        id: mod.PROMPT_ID,
        recordId: "",
        promptName: "Course Anthem Script Writer (code default)",
        version: 1,
        systemPrompt: "__CODE_DEFAULT__",
        variablesUsed:
          "{COURSE_NAME}, {RESEARCH_DATA}, {STRATEGY_NAME}, {PLAYER_NAME}, {MUSIC_STYLE}",
        source: "code_default",
      };
    }
    default:
      throw new Error(`Unknown prompt type: ${promptType}`);
  }
}

/**
 * Get all active Music Style prompts from AI_LAB.
 * Returns the list so users can choose which style to use.
 */
export async function getMusicStyles(): Promise<AILabPrompt[]> {
  const records = await aiLabTable
    .select({
      filterByFormula: `AND({prompt_type} = "Music Style", {status} = "Active")`,
    })
    .firstPage();

  return records.map((rec) => ({
    id: rec.get("id") as string,
    recordId: rec.id,
    promptName: rec.get("prompt_name") as string,
    version: rec.get("version") as number,
    systemPrompt: rec.get("system_prompt") as string,
    variablesUsed: rec.get("variables_used") as string,
    source: "ai_lab" as const,
  }));
}
