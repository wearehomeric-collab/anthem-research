# 24/8 Anthem Project

## What This Project Is

A user-facing platform for AI-generated golf course anthems. Custom songs are created for specific courses, personalized to a player's club distances, tee box, and strategy approach. The system uses a multi-stage pipeline: Course Setup → Course Overview Research → Deep Strategy Research → Script/Lyrics → Music Generation → QC → Publish.

## Architecture

- **Database:** Airtable (12 tables — see below)
- **Automation:** n8n workflows at `https://homericng.app.n8n.cloud`
- **Research:** Perplexity API (`sonar` model) for course research
- **Scripts:** OpenAI/ChatGPT API (`gpt-4o`) for lyric generation
- **Music:** Suno API via KIE.ai for audio generation
- **Prompts:** Hybrid system — code defaults in `src/prompts/` with AI_LAB table override
- **Orchestration:** This repo + n8n + Claude Code agents

## The 12 Airtable Tables

| # | Table | ID | Purpose |
|---|-------|----|---------|
| 1 | STRATEGY_TYPES | tblWMQ46ow4hnEQBf | 4 golf strategy definitions (Smart, Aggressive, Conservative, Risk-Reward) |
| 2 | COURSES | tblUmMx0zgCP35j7N | Master course data + facility info + signature holes |
| 3 | TEE_BOXES | tblYekq8SiNHnBMbk | Per-tee yardages, ratings, hole-by-hole data |
| 4 | USER_PROFILES | tbl4D4uPdzGdenax7 | Golfer profiles with club yardages |
| 5 | ANTHEM_REQUESTS | tblCS344T2dnzpusU | Hub table — everything links here |
| 6 | RESEARCH_OUTPUT | tblvAxDrSQMSTSdyL | Perplexity results (Course Overview + Deep Research) |
| 7 | SCRIPTS | tblX7FhAhbmDHOhOD | ChatGPT lyrics, versioned |
| 8 | ANTHEM_PARAMETERS | tblN5ffNIaSJE7yws | Music generation settings (was SUNO_PARAMETERS) |
| 9 | ANTHEM_GENERATIONS | tbluijCk5bySJoyZE | Suno API tracking + polling (was SUNO_GENERATIONS) |
| 10 | TRACKS | tblWyEOHAaGMp5Sh3 | Final deliverable with full audit trail |
| 11 | AI_LAB | tblyPCnOer7C7TZeC | Prompt versioning, music style templates, persona refs |

**Deprecated:** HOLES table (tblQ9RSbvRTYHRiTJ) — hidden, not deleted. Course-level hole info merged into COURSES and TEE_BOXES.

## Airtable Client

`src/airtable-client.ts` uses **table IDs** (not names) for stability across renames:

```typescript
export const tables = {
  strategyTypes, courses, teeBoxes, userProfiles,
  anthemRequests, researchOutput, scripts,
  anthemParameters, anthemGenerations, tracks, aiLab
};
```

## The 4 Strategy Types

| Strategy | Golf Approach | Emoji |
|----------|---------------|-------|
| Smart | Calculated play, course knowledge, think 2-3 shots ahead | 🧠 |
| Aggressive | Attack every hole, maximize birdie opportunities | 🔥 |
| Conservative | Avoid hazards, steady par play, eliminate big numbers | 🛡️ |
| Risk-Reward | Tactical risk-taking based on hole conditions | ⚖️ |

Strategy types are purely about golf play. Music/lyrical themes are managed separately in AI_LAB.

## Pipeline Flow

```
1. Course Setup
   → COURSES record created (or found)
   → TEE_BOXES populated with hole data
   → ANTHEM_REQUESTS record created with strategy_type_id

2. Course Overview Research (Perplexity)
   → Prompt from AI_LAB (type: Research) or code default
   → Creates RESEARCH_OUTPUT (research_type: "Course Overview")
   → REUSABLE across all player customizations

3. Deep Strategy Research (Perplexity)
   → Takes: Course Overview + Tee Box + Player Profile (club yardages) + Strategy Type
   → Prompt from AI_LAB (type: Strategy) or code default
   → Creates RESEARCH_OUTPUT (research_type: "Deep Research")
   → Player-specific: club distances determine which hazards matter per hole

4. Script/Lyric Generation (ChatGPT)
   → Takes: Deep Research + Course Data + Music Style
   → Prompt from AI_LAB (type: Script/Lyric) or code default
   → Creates SCRIPTS record

5. [HUMAN REVIEW] → Script approved? (generate_now checkbox)

6. Music Generation (Suno via KIE.ai)
   → Takes: Approved Script + Music Style from AI_LAB (type: Music Style)
   → Creates ANTHEM_PARAMETERS + ANTHEM_GENERATIONS records
   → Polls until complete (~2-5 min)

7. Track Creation + QC
   → Creates TRACKS record with full audit trail
   → qa_status: Pending → Pass/Fail/Needs Revision
```

## Prompt System

**Hybrid approach:** Code provides defaults, AI_LAB can override.

| Prompt Type | Code Default | AI_LAB Override | Always AI_LAB? |
|-------------|-------------|-----------------|----------------|
| Research | `src/prompts/course-overview.ts` | ✓ | No |
| Strategy | `src/prompts/deep-strategy.ts` | ✓ | No |
| Script/Lyric | `src/prompts/script-writer.ts` | ✓ | No |
| Music Style | — | ✓ | **Yes** |

Loader: `src/prompts/loader.ts` — `getPrompt(type)` checks AI_LAB first, falls back to code.
Music styles: `getMusicStyles()` returns all active styles from AI_LAB.

## Key Data Formats

**Tee Box Hole Data** (`hole_data` field on TEE_BOXES):
```
1: 378 (4), 2: 509 (5), 3: 397 (4), 4: 333 (4), ...
```
Format: `hole#: yardage (par)` — par can differ between tees.

**USER_PROFILES.profile_type:**
- `User` — real player's actual distances
- `Platform Default` — average player template
- `Preset` — pre-built profiles for known players (pros)

**RESEARCH_OUTPUT.research_type:**
- `Course Overview` — reusable base research for a course
- `Deep Research` — player-specific strategy based on club distances + tee + strategy

## Key Files

| File | Purpose |
|------|---------|
| `src/airtable-client.ts` | Shared Airtable client (table IDs) |
| `src/research.ts` | Perplexity API wrapper |
| `src/script-generator.ts` | OpenAI/ChatGPT wrapper |
| `src/suno.ts` | KIE.ai Suno API wrapper |
| `src/prompts/loader.ts` | Prompt loader (AI_LAB + code fallback) |
| `src/prompts/course-overview.ts` | Research prompt default |
| `src/prompts/deep-strategy.ts` | Strategy prompt default |
| `src/prompts/script-writer.ts` | Script/lyric prompt default |
| `src/pipeline-test.ts` | End-to-end pipeline test (Pebble Beach) |
| `src/migrate-schema.ts` | Schema migration (61 fields + AI_LAB table) |
| `src/migrate-gap-fields.ts` | Gap migration (15 additional fields) |
| `src/seed-data.ts` | Seed data for fresh base setup |
| `src/update-existing-records.ts` | Update existing records to platform vision |

## Agent Skills (in `skills/`)

Each agent has a SKILL.md (instructions) and memory.md (learnings that persist):

| Agent | Purpose | Skill Path |
|-------|---------|------------|
| Research Initial | Broad course overview + facts | `skills/research-initial/` |
| Research Deep | Strategy-specific deep research | `skills/research-deep/` |
| Script Agent | Lyric generation from research | `skills/script-agent/` |
| Anthem Agent | Suno params + music generation | `skills/anthem-agent/` |
| Anthem Workflow | Full pipeline orchestration | `skills/anthem-workflow/` |

## Environment Variables

Required in `.env` (see `.env.example`):
- `AIRTABLE_PAT` — Airtable Personal Access Token
- `AIRTABLE_BASE_ID` — Airtable base identifier
- `PERPLEXITY_API_KEY` — For course research (Perplexity `sonar` model)
- `OPENAI_API_KEY` — For script/lyric generation (GPT-4o)
- `SUNO_API_KEY` — For music generation (KIE.ai)
- `N8N_WEBHOOK_BASE_URL` — n8n cloud instance
- `N8N_MCP_SERVER_URL` — n8n MCP endpoint

## Coding Conventions

- TypeScript for all scripts (`src/`)
- Use `dotenv/config` for env loading
- Airtable SDK via `src/airtable-client.ts` — always use table IDs, not names
- All agent memory files are append-only (never delete learnings, only add)
- Commit messages: `feat:`, `fix:`, `docs:`, `chore:` prefixes

## ANTHEM_REQUESTS Status Flow

```
Pending Review → Research Started → Research Complete → Script Creation
→ Script Review → Script Approved → Suno Generating → Track QC → Published
```

## Important Patterns

- Every table record links back to ANTHEM_REQUESTS (audit trail)
- Tee boxes have `standard_color` + `course_local_name` + `skill_level_for` (courses name tees differently)
- Scripts are versioned (v1, v2, v3) — never overwrite, create new SCRIPTS record with incremented version_number
- `reference_script_id` chains script versions together (v1 ← v2 ← v3)
- Agent memory files should be updated after EVERY run with learnings
- The improvement loop: each agent reads its memory.md before starting, writes to it after finishing
- Prompts: check AI_LAB for override first, fall back to code defaults. Music styles always from AI_LAB.
