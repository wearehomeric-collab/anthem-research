import "dotenv/config";

// KIE.ai Suno API - https://docs.kie.ai/suno-api/quickstart
const KIE_API_BASE = "https://api.kie.ai/api/v1";

// Available Suno models via KIE.ai
export type SunoModel = "V5" | "V4_5PLUS" | "V4_5" | "V4_5ALL" | "V4" | "V3_5";

export interface GenerateMusicParams {
  /** Lyrics text (used as exact lyrics when customMode=true, instrumental=false) */
  prompt: string;
  /** Style/genre description (e.g., "Cinematic Pop, orchestral, building energy") */
  style: string;
  /** Track title (max 80 chars) */
  title: string;
  /** Suno model version */
  model: SunoModel;
  /** URL to receive completion callback */
  callBackUrl: string;
  /** If true, generate without vocals */
  instrumental?: boolean;
  /** Styles to exclude (e.g., "Heavy Metal, Rap") */
  negativeTags?: string;
  /** 'm' for male, 'f' for female (suggestion only, not guaranteed) */
  vocalGender?: "m" | "f";
}

export interface GenerateMusicResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
  };
}

export interface SunoTrack {
  id: string;
  audioUrl: string;
  streamAudioUrl: string;
  imageUrl: string;
  prompt: string;
  modelName: string;
  title: string;
  tags: string;
  createTime: string;
  duration: number;
}

export interface TaskStatusResponse {
  code: number;
  msg: string;
  data: {
    taskId: string;
    parentMusicId: string;
    param: string;
    status: "SUCCESS" | "PENDING" | "PROCESSING" | "FAILED";
    type: string;
    errorCode: string | null;
    errorMessage: string | null;
    response: {
      sunoData: SunoTrack[];
    } | null;
  };
}

function getApiKey(): string {
  const apiKey = process.env.SUNO_API_KEY;
  if (!apiKey) {
    throw new Error("Missing SUNO_API_KEY environment variable. Get your key from https://kie.ai");
  }
  return apiKey;
}

/**
 * Generate music via KIE.ai Suno API.
 * POST https://api.kie.ai/api/v1/generate
 *
 * Uses customMode=true so prompt is used as exact lyrics.
 * Returns a taskId for polling.
 */
export async function generateMusic(
  params: GenerateMusicParams
): Promise<string> {
  const apiKey = getApiKey();

  const body = {
    prompt: params.prompt,
    customMode: true,
    instrumental: params.instrumental ?? false,
    model: params.model,
    callBackUrl: params.callBackUrl,
    style: params.style,
    title: params.title,
    negativeTags: params.negativeTags,
    vocalGender: params.vocalGender,
  };

  const response = await fetch(`${KIE_API_BASE}/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Suno API error (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as GenerateMusicResponse;

  if (data.code !== 200) {
    throw new Error(`Suno API error: ${data.msg} (code: ${data.code})`);
  }

  return data.data.taskId;
}

/**
 * Check the status of a music generation task.
 * GET https://api.kie.ai/api/v1/generate/record-info?taskId=XXX
 */
export async function getTaskStatus(
  taskId: string
): Promise<TaskStatusResponse["data"]> {
  const apiKey = getApiKey();

  const response = await fetch(
    `${KIE_API_BASE}/generate/record-info?taskId=${encodeURIComponent(taskId)}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Suno API poll error (${response.status}): ${errorBody}`);
  }

  const data = (await response.json()) as TaskStatusResponse;
  return data.data;
}

/**
 * Poll for task completion with exponential backoff.
 * Returns the completed task data with audio URLs.
 *
 * @param taskId - The task ID from generateMusic()
 * @param maxAttempts - Maximum polling attempts (default 30)
 * @param initialDelayMs - First poll delay in ms (default 30000 = 30s)
 */
export async function pollUntilComplete(
  taskId: string,
  maxAttempts = 30,
  initialDelayMs = 30000
): Promise<{ tracks: SunoTrack[]; attempts: number }> {
  let attempts = 0;
  let delayMs = initialDelayMs;

  while (attempts < maxAttempts) {
    await sleep(delayMs);
    attempts++;

    const status = await getTaskStatus(taskId);

    console.log(
      `  Poll #${attempts}: status=${status.status}`
    );

    if (status.status === "SUCCESS" && status.response?.sunoData) {
      return {
        tracks: status.response.sunoData,
        attempts,
      };
    }

    if (status.status === "FAILED") {
      throw new Error(
        `Suno generation failed: ${status.errorMessage ?? "Unknown error"} (code: ${status.errorCode})`
      );
    }

    // Cap delay at 60 seconds
    delayMs = Math.min(delayMs * 1.5, 60000);
  }

  throw new Error(
    `Suno generation timed out after ${maxAttempts} polling attempts for task ${taskId}`
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
