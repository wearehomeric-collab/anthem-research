# 24/8 ANTHEM PROJECT
## Product Requirements Document (PRD)
**Version:** 2.0
**Date:** February 12, 2026
**Status:** Schema Complete, Pipeline Operational
**Owner:** Nick (24/8 Anthem Project Lead)

---

## EXECUTIVE SUMMARY

The 24/8 Anthem Project is a user-facing platform for AI-generated golf course anthems. Custom songs are created for specific courses, personalized to a player's club distances, tee box, and strategy approach.

**Current State:** Working end-to-end pipeline (Perplexity → ChatGPT → Suno) with Airtable schema and TypeScript orchestration
**What's Built:** 12-table Airtable schema, API integrations, prompt management system, seed data
**Next Phase:** Pipeline orchestrator module, n8n automation, user-facing features (voting, customization)

**How It Works:**
1. Admin or user requests a course anthem
2. System researches the course (Perplexity) — reusable across all players
3. System creates player-specific strategy based on their club distances (Perplexity)
4. System generates lyrics (ChatGPT) tailored to player + strategy + course
5. Human reviews and approves script
6. System generates music (Suno via KIE.ai)
7. Human QC → Publish

---

## PRODUCT VISION

### What We're Building
A platform where:
- Users request courses and vote to prioritize which get official tracks
- Official/approved tracks are created with default player settings
- Users customize tracks to their Player Profile (club yardages), Tee Box, and Strategy Approach
- Customization triggers new research, lyrics, and music generation
- Player-specific research is critical — hole strategy depends on the player's actual club distances

### Why This Matters
- **For Golfers:** Personalized anthems that reflect how THEY play a course
- **For Golf Courses:** Marketing tool and member engagement content
- **For 24/8:** Differentiated product combining golf expertise + AI + music generation

### Success Criteria
- ✅ Full pipeline runs end-to-end (Perplexity → ChatGPT → Suno)
- ✅ Clear audit trail for every track showing which data created it
- ✅ Player-specific research produces meaningfully different strategies
- ✅ Prompts are versioned and manageable (AI_LAB + code defaults)
- ✅ Schema supports future automation and user-facing features

---

## ARCHITECTURE

### Tech Stack
- **Database:** Airtable (12 tables)
- **Research:** Perplexity API (`sonar` model)
- **Script/Lyrics:** OpenAI/ChatGPT API (`gpt-4o`)
- **Music:** Suno API via KIE.ai
- **Automation:** n8n workflows (future)
- **Prompts:** Hybrid system — code defaults (`src/prompts/`) with AI_LAB table override
- **Orchestration:** TypeScript (`src/`) + n8n + Claude Code agents

### Prompt System
Research, Strategy, and Script prompts live in code as defaults (`src/prompts/*.ts`). The pipeline checks AI_LAB for an override first — if an active default prompt exists there, it's used instead.

Music Style prompts ALWAYS come from AI_LAB (no code fallback). This allows adding new music styles (Hip-Hop, Cinematic, Lo-Fi) as AI_LAB records without code changes.

---

## DATA MODEL (12 TABLES)

### Table 1: STRATEGY_TYPES (tblWMQ46ow4hnEQBf)
**Purpose:** Define the 4 golf strategy approaches
**Records:** Smart, Aggressive, Conservative, Risk-Reward
**Key Fields:**
- `strategy_name`, `emoji`, `short_description`
- `full_strategy_approach` — detailed golf strategy (NOT music/lyrical content)
- `research_focus_keywords` — what to research for this strategy
- `is_active` — checkbox

**Note:** Music tone, lyrical themes, and prompt templates have moved to AI_LAB. Strategy types are purely about how to play golf.

### Table 2: COURSES (tblUmMx0zgCP35j7N)
**Purpose:** Master golf course data + facility info + hole overview
**Key Fields:**
- `course_name`, `architect`, `year_built`
- `location_city`, `location_state`, `location_country`
- `par_total`, `total_yardage`, `holes_total`
- `course_description`, `designer_intent`, `strategic_elements`
- `general_vibe` — free-text personality description
- **Facility:** `facility_name`, `course_type`, `course_address`, `website`, `scorecard_url`
- **Hole Info (merged from deprecated HOLES table):** `signature_holes`, `hole_descriptions`, `course_par`
- **Verification:** `initial_research_status`, `auto_populate_status`, `last_verified_date`
- **Media:** `course_image`, `course_logo`
- `is_on_release_schedule` — admin-scheduled for official track creation

### Table 3: TEE_BOXES (tblYekq8SiNHnBMbk)
**Purpose:** Per-tee yardages, ratings, and hole-by-hole data
**4+ records per course**
**Key Fields:**
- `course_id` — link to COURSES
- `standard_color` — Red | White | Blue | Black | Gold
- `course_local_name` — what the course calls this tee ("Championship", "Member", etc.)
- `skill_level_for` — Beginner | Intermediate | Advanced | Expert
- `yardage`, `course_rating`, `slope_rating`, `par`
- `hole_data` — per-hole yardage and par in format: `1: 378 (4), 2: 509 (5), ...`
- `front_yardage`, `back_yardage`
- **Verification:** `verification_method`, `confidence`, `scorecard_url`

**Tee Naming:** Courses name tees differently. `standard_color` + `course_local_name` + `skill_level_for` give users 3 ways to identify the right tee.

### Table 4: USER_PROFILES (tbl4D4uPdzGdenax7)
**Purpose:** Golfer profiles with club yardages for player-specific research
**Key Fields:**
- `user_email`, `user_name`, `handicap`
- `profile_type` — User | Platform Default | Preset
- `preferred_tee_level`, `play_style`, `experience_level`
- **Club Yardages:** `driver_carry`, `driver_total`, `three_wood_carry`, `hybrid_carry`, `seven_iron_carry`, `pw_carry`
- `preferred_layup_range`, `shot_shape`, `miss_tendency`
- `strengths`, `golf_goals`

**Profile Types:**
- **User** — real player's actual distances (e.g., Nick/Gulick)
- **Platform Default** — average player template for official tracks
- **Preset** — pre-built profiles for known players (pros)

### Table 5: ANTHEM_REQUESTS (tblCS344T2dnzpusU) — HUB TABLE
**Purpose:** Central tracking for all track creation requests
**Key Fields:**
- `course_id` — link to COURSES
- `user_profile_id` — link to USER_PROFILES
- `strategy_type_id` — link to STRATEGY_TYPES
- `tee_box_id` — link to TEE_BOXES
- `status` — Pending Review → Research Started → Research Complete → Script Creation → Script Review → Script Approved → Suno Generating → Track QC → Published
- `priority` — High | Medium | Low
- `is_custom_request` — user-initiated customization vs admin/default
- `parent_request_id` — link to another ANTHEM_REQUESTS (if this is a customization of an existing track)
- `automation_log`, `notes`

**Every other table links back to this for complete audit trail.**

### Table 6: RESEARCH_OUTPUT (tblvAxDrSQMSTSdyL)
**Purpose:** Store Perplexity research — both reusable course data and player-specific strategy
**Key Fields:**
- `request_id` — link to ANTHEM_REQUESTS
- `course_id` — link to COURSES
- `research_type` — **Course Overview** (reusable) | **Deep Research** (player-specific)
- `research_prompt_used`, `raw_output`, `research_tool`
- `research_status`, `confidence_score`
- **Deep Research fields:** `player_profile_id`, `tee_box_id`, `strategy_type_id`, `player_specific_strategy`, `club_distance_analysis`

**Two types of research:**
- **Course Overview** — broad course history, hole descriptions, general strategy. Created once per course, reused for all players.
- **Deep Research** — player-specific hole-by-hole strategy. "With your 275-yard driver, on hole 7 you can carry the bunker..." Created per player/tee/strategy combination.

### Table 7: SCRIPTS (tblX7FhAhbmDHOhOD)
**Purpose:** ChatGPT lyrics, versioned
**Key Fields:**
- `request_id` — link to ANTHEM_REQUESTS
- `research_id` — link to RESEARCH_OUTPUT (which data was used)
- `version_number` — 1, 2, 3...
- `reference_script_id` — link to previous SCRIPTS version (edit chain)
- `chatgpt_prompt_sent`, `chatgpt_response_raw`
- `character_count` — formula: LEN(chatgpt_response_raw)
- `generate_now` — checkbox (automation trigger)

**Versioning:** Each revision creates a new record with incremented version_number. Pipeline uses the latest version for a given request_id.

### Table 8: ANTHEM_PARAMETERS (tblN5ffNIaSJE7yws)
**Purpose:** Music generation settings
*Renamed from SUNO_PARAMETERS*
**Key Fields:**
- `request_id` — link to ANTHEM_REQUESTS
- `genre`, `instrumentation`, `tempo_bpm`, `mood_descriptors`
- `vocal_type`, `duration_seconds`, `production_level`
- `style_prompt` — full style description for Suno
- `music_style_template_id` — link to AI_LAB (which music style was used)
- `persona_reference_id` — link to AI_LAB (optional persona reference)
- **Suno API params:** `model` (V5/V4_5/etc.), `instrumental` (checkbox), `negative_tags`, `vocal_gender` (m/f)

### Table 9: ANTHEM_GENERATIONS (tbluijCk5bySJoyZE)
**Purpose:** Suno API tracking and polling
*Renamed from SUNO_GENERATIONS*
**Key Fields:**
- `request_id` — link to ANTHEM_REQUESTS
- `parameters_id` — link to ANTHEM_PARAMETERS
- `suno_task_id` — from Suno API
- `status` — Queued | Generating | Polling | Complete | Failed
- `polling_attempts`, `last_polled_at`
- `suno_response_data`, `audio_url`, `cover_image_url`
- `error_message`

### Table 10: TRACKS (tblWyEOHAaGMp5Sh3)
**Purpose:** Final deliverable with complete audit trail
**Key Fields:**
- Links to ALL upstream: `request_id`, `course_id`, `user_profile_id`, `strategy_type_id`, `tee_box_id`, `research_id`, `script_id`, `suno_generation_id`
- `track_title`, `duration_seconds`, `audio_url`, `audio_file`
- `generation_id` — Suno task ID for tracing
- `generation_status` — Queued | Generating | Complete | Failed
- `status` — Draft | Approved | Published | Archived | Rejected
- **QC:** `qa_status` (Pending/Pass/Fail/Needs Revision), `qa_notes`
- **Platform:** `is_official`, `official_version_label`, `approved_for_platform`, `published_to_platform`, `published_url`
- **Art:** `art_status`, `art_source`, `art_prompt_used`, `track_art`

### Table 11: AI_LAB (tblyPCnOer7C7TZeC)
**Purpose:** Prompt versioning, music style templates, persona references
**Key Fields:**
- `prompt_name`, `version`, `prompt_type` — Research | Strategy | Script/Lyric | Music Style | Persona | Art
- `system_prompt` — the actual prompt text
- `variables_used` — placeholders: {COURSE_NAME}, {PLAYER_DISTANCES}, etc.
- `agent_type` — Perplexity | ChatGPT | Suno | Manual
- `hard_rules`, `status` (Draft/Testing/Active/Deprecated), `is_current_default`
- **Evaluation:** `success_score` (1-5), `observed_issues`, `known_failure_modes`, `what_worked_well`, `what_needs_improvement`
- `change_notes`, `documentation_link`

**How prompts work:**
- Pipeline calls `getPrompt("Research")` → checks AI_LAB for active default → falls back to code default
- Music styles: `getMusicStyles()` → returns all active "Music Style" records from AI_LAB
- To test a new prompt: create new AI_LAB record, mark `is_current_default`, uncheck the old one

### Deprecated: HOLES (tblQ9RSbvRTYHRiTJ)
Hidden, not deleted. Course-level hole info merged into COURSES (`signature_holes`, `hole_descriptions`) and TEE_BOXES (`hole_data`).

---

## PIPELINE FLOW

```
1. Course Setup
   → COURSES record created (or found)
   → TEE_BOXES populated with hole data from scorecard
   → ANTHEM_REQUESTS record created with strategy_type_id, tee_box_id, user_profile_id

2. Course Overview Research (Perplexity) — ~30s
   → Prompt from AI_LAB (type: Research) or code default (src/prompts/course-overview.ts)
   → Creates RESEARCH_OUTPUT (research_type: "Course Overview")
   → Reusable across all player customizations

3. Deep Strategy Research (Perplexity) — ~30s
   → Takes: Course Overview + Tee Box hole_data + Player Profile club yardages + Strategy Type
   → Prompt from AI_LAB (type: Strategy) or code default (src/prompts/deep-strategy.ts)
   → Creates RESEARCH_OUTPUT (research_type: "Deep Research")
   → Player-specific: "With your 275yd driver, you can carry the bunker on hole 4..."

4. Script/Lyric Generation (ChatGPT) — ~30s
   → Takes: Deep Research + Course Data + Music Style
   → Prompt from AI_LAB (type: Script/Lyric) or code default (src/prompts/script-writer.ts)
   → Creates SCRIPTS record (version 1)
   → Target: 4000-6000 characters

5. [HUMAN REVIEW] → Script approved? (generate_now checkbox on SCRIPTS)
   → If no: edit and create SCRIPTS v2 (new record, reference_script_id → v1)

6. Music Generation (Suno via KIE.ai) — ~3-5 min
   → Music Style from AI_LAB (type: Music Style) — always from AI_LAB
   → Creates ANTHEM_PARAMETERS + ANTHEM_GENERATIONS records
   → Polls with exponential backoff (30s → 45s → 60s cap)
   → Returns 2 track variants

7. Track Creation + QC
   → Creates TRACKS record with full audit trail (links to every upstream table)
   → qa_status: Pending → Pass/Fail/Needs Revision
   → Published → available on platform
```

**Timing:** Full pipeline ~5-10 min for new course (most is Suno generation). Customization (new player/strategy on existing course) skips step 2.

---

## ANTHEM_REQUESTS STATUS FLOW

```
Pending Review → Research Started → Research Complete → Script Creation
→ Script Review → Script Approved → Suno Generating → Track QC → Published
```

---

## QUALITY CONTROL

### QC Checkpoints
1. **Research Approval** — confidence_score ≥ 4/5, comprehensive and accurate
2. **Script Approval** — captures strategy, course-specific references, singable rhythm, 4000-6000 chars
3. **Track Quality** — qa_status: Pass (audio quality, vocals, instrumentation, emotional impact)

### Quality Ratings
| Rating | Meaning | Action |
|--------|---------|--------|
| ★★★★★ | Excellent | Publish immediately |
| ★★★★ | Very good | Minor tweaks, publish |
| ★★★ | Good | Acceptable, consider regenerating |
| ★★ | Fair | Has issues, regenerate |
| ★ | Poor | Do not publish, redo |

---

## ENVIRONMENT & FILES

### Environment Variables (.env)
- `AIRTABLE_PAT` — Airtable Personal Access Token
- `AIRTABLE_BASE_ID` — Airtable base identifier
- `PERPLEXITY_API_KEY` — Perplexity `sonar` model
- `OPENAI_API_KEY` — GPT-4o
- `SUNO_API_KEY` — KIE.ai Suno API
- `N8N_WEBHOOK_BASE_URL` — n8n cloud instance
- `N8N_MCP_SERVER_URL` — n8n MCP endpoint

### Key Code Files
| File | Purpose |
|------|---------|
| `src/airtable-client.ts` | Shared Airtable client (uses table IDs) |
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

---

## AUTOMATION ROADMAP

### Phase 1: Working Pipeline (Current)
- ✅ TypeScript pipeline runs end-to-end
- ✅ All API integrations working (Perplexity, ChatGPT, Suno)
- ✅ Schema complete with all fields
- ✅ Prompt system operational (AI_LAB + code defaults)
- ⬜ Pipeline orchestrator module (clean version of pipeline-test.ts)
- ⬜ Deep Research stage implementation

### Phase 2: Semi-Automated (n8n + Airtable)
- n8n triggers pipeline stages based on ANTHEM_REQUESTS status changes
- Human still approves at checkpoints (script, final track)
- `generate_now` checkbox on SCRIPTS triggers music generation

### Phase 3: User-Facing Platform
- Users request courses and vote on priorities
- Users customize tracks to their profile (triggers re-generation)
- Official tracks published with default settings
- Voting system for course prioritization

---

## REVISION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial PRD creation based on requirements gathering |
| 2.0 | 2026-02-12 | Major update: 12-table schema, HOLES deprecated, ANTHEM_PARAMETERS/GENERATIONS rename, AI_LAB table, hybrid prompt system, player-specific research, club yardage fields, hole data format, pipeline tested end-to-end on Pebble Beach |
