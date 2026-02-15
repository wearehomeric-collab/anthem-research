/**
 * Pipeline Types
 *
 * Shared types for the anthem generation pipeline.
 * PipelineConfig is the input contract, PipelineResult is the output,
 * and StageResult wraps individual stage outcomes for partial-success tracking.
 */

export interface PipelineConfig {
  /** Airtable record ID for the course */
  courseId: string;
  /** Airtable record ID for the strategy type (Smart, Aggressive, etc.) */
  strategyTypeId: string;
  /** Airtable record ID for the tee box */
  teeBoxId: string;
  /** Airtable record ID for the user profile. Falls back to Platform Default. */
  userProfileId?: string;
  /** AI_LAB record ID for music style. Falls back to first active style. */
  musicStyleId?: string;
  /** Request priority */
  priority?: "High" | "Medium" | "Low";
  /** Free-text notes attached to the request */
  requestNotes?: string;
  /** Force fresh course overview research even if one exists */
  skipCourseOverview?: boolean;
}

export interface PipelineResult {
  success: boolean;
  requestRecordId: string;
  courseOverviewRecordId?: string;
  deepResearchRecordId?: string;
  scriptRecordId?: string;
  parametersRecordId?: string;
  generationRecordId?: string;
  trackRecordId?: string;
  finalStatus: string;
  stagesCompleted: string[];
  errors: StageError[];
}

export interface StageError {
  stage: string;
  message: string;
}

export interface StageResult<T = unknown> {
  success: boolean;
  recordId?: string;
  data?: T;
  error?: StageError;
}
