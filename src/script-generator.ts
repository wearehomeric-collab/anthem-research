import OpenAI from "openai";
import "dotenv/config";

interface ScriptInput {
  promptTemplate: string;
  courseName: string;
  architect: string;
  researchData: string;
  strategyDetails: string;
  musicStyle: string;
  userProfile?: string;
}

interface ScriptOutput {
  promptSent: string;
  rawResponse: string;
  model: string;
}

/**
 * Generate anthem lyrics using OpenAI (GPT-4o).
 * Used by the Script Agent.
 */
export async function generateScript(
  input: ScriptInput
): Promise<ScriptOutput> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY environment variable.");
  }

  const client = new OpenAI({ apiKey });

  // Fill placeholders in the prompt template
  const promptSent = input.promptTemplate
    .replace(/\{COURSE_NAME\}/g, input.courseName)
    .replace(/\{ARCHITECT\}/g, input.architect)
    .replace(/\{RESEARCH_DATA\}/g, input.researchData)
    .replace(/\{STRATEGY_DETAILS\}/g, input.strategyDetails)
    .replace(/\{MUSIC_STYLE\}/g, input.musicStyle)
    .replace(/\{USER_PROFILE\}/g, input.userProfile ?? "General golfer");

  const model = "gpt-4o";

  const response = await client.chat.completions.create({
    model,
    temperature: 0.85,
    max_tokens: 2000,
    messages: [
      {
        role: "system",
        content:
          "You are a professional songwriter and lyricist specializing in anthemic sports music. You write vivid, emotional, singable lyrics with strong rhythm, meter, and rhyme. Your lyrics celebrate specific golf courses and playing strategies. Always structure output with clear section markers: [VERSE 1], [CHORUS], [VERSE 2], [BRIDGE], etc.",
      },
      {
        role: "user",
        content: promptSent,
      },
    ],
  });

  const rawResponse = response.choices[0]?.message?.content ?? "";

  return {
    promptSent,
    rawResponse,
    model,
  };
}
