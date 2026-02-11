import "dotenv/config";

const PERPLEXITY_API_URL = "https://api.perplexity.ai/chat/completions";

interface ResearchInput {
  courseName: string;
  architect: string;
  yearBuilt: number;
  location: string;
  strategyKeywords?: string;
  teeBoxInfo?: string;
}

interface ResearchOutput {
  prompt: string;
  rawOutput: string;
  model: string;
}

/**
 * Run course research using the Perplexity API (sonar model).
 * Used by the Research Initial and Research Deep agents.
 */
export async function runCourseResearch(
  input: ResearchInput,
  customPrompt?: string
): Promise<ResearchOutput> {
  const apiKey = process.env.PERPLEXITY_API_KEY;
  if (!apiKey) {
    throw new Error("Missing PERPLEXITY_API_KEY environment variable.");
  }

  const prompt =
    customPrompt ??
    buildDefaultPrompt(input);

  const model = "sonar";

  const response = await fetch(PERPLEXITY_API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content:
            "You are a golf course research specialist. Provide detailed, vivid, and factually accurate research about golf courses. Focus on specific details useful for creating custom music anthems — history, architect philosophy, strategic elements, signature holes, and emotional/sensory descriptions.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      max_tokens: 4000,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Perplexity API error (${response.status}): ${errorBody}`
    );
  }

  const data = (await response.json()) as {
    choices: Array<{ message: { content: string } }>;
  };

  const rawOutput = data.choices[0]?.message?.content ?? "";

  return {
    prompt,
    rawOutput,
    model,
  };
}

function buildDefaultPrompt(input: ResearchInput): string {
  let prompt = `Research ${input.courseName} golf course for a comprehensive overview.

Course details: Designed by ${input.architect}, built in ${input.yearBuilt}, located in ${input.location}.

I need:
1. Complete history: founding, architect, historical significance, championships hosted
2. Architect's design philosophy and intent
3. Course layout: par, yardage, terrain, elevation, water features
4. Signature holes and what makes them special (vivid descriptions)
5. Notable features that make this course unique
6. Typical playing conditions (wind, weather, green speed)
7. How different tee boxes change the experience

This research is for creating a custom music anthem about the course.
Focus on vivid, specific details that could inspire lyrics.
Emphasize emotional and sensory elements (views, sounds, feelings).`;

  if (input.strategyKeywords) {
    prompt += `\n\nAdditional focus areas for strategy research: ${input.strategyKeywords}`;
  }

  if (input.teeBoxInfo) {
    prompt += `\n\nSpecific tee box context: ${input.teeBoxInfo}`;
  }

  return prompt;
}
