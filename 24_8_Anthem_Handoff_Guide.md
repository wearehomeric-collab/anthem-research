# 24/8 ANTHEM SYSTEM
## Implementation & Handoff Guide
**Version:** 2.0
**Last Updated:** February 12, 2026
**Prepared By:** Nick (Product Lead)

---

## QUICK START

### What This Is
A user-facing platform for AI-generated golf course music. Users request courses, customize tracks to their player profile (club yardages, tee box, strategy approach), and the system generates personalized anthems using a multi-stage AI pipeline.

### What's Already Built
- Airtable base with 12 tables (all created, fields populated, seed data loaded)
- TypeScript codebase with API clients (Airtable, Perplexity, OpenAI, Suno)
- Hybrid prompt system (code defaults + AI_LAB overrides)
- Pipeline tested end-to-end: Pebble Beach Smart Strategy anthem generated successfully
- Prompt loader that checks AI_LAB first, falls back to code defaults

### What's Left
- Pipeline orchestrator module (clean replacement for `pipeline-test.ts`)
- Deep Research stage (player-specific strategy based on club distances)
- n8n workflow automation
- Platform frontend (future)

---

## THE 12 AIRTABLE TABLES

| # | Table | ID | Purpose |
|---|-------|----|---------|
| 1 | STRATEGY_TYPES | tblWMQ46ow4hnEQBf | 4 golf strategy approaches |
| 2 | COURSES | tblUmMx0zgCP35j7N | Master course data + facility info |
| 3 | TEE_BOXES | tblYekq8SiNHnBMbk | Tee sets with hole-by-hole data |
| 4 | USER_PROFILES | tbl4D4uPdzGdenax7 | Player profiles with club yardages |
| 5 | ANTHEM_REQUESTS | tblCS344T2dnzpusU | Hub table — everything links here |
| 6 | RESEARCH_OUTPUT | tblvAxDrSQMSTSdyL | Perplexity results (Course Overview + Deep Research) |
| 7 | SCRIPTS | tblX7FhAhbmDHOhOD | ChatGPT lyrics, versioned |
| 8 | ANTHEM_PARAMETERS | tblN5ffNIaSJE7yws | Music style settings for generation |
| 9 | ANTHEM_GENERATIONS | tbluijCk5bySJoyZE | Generation API tracking + polling |
| 10 | TRACKS | tblWyEOHAaGMp5Sh3 | Final deliverable with audit trail |
| 11 | AI_LAB | tblyPCnOer7C7TZeC | Prompt versioning, music styles, personas |
| 12 | HOLES | tblQ9RSbvRTYHRiTJ | **Hidden/Deprecated** — hole data merged into TEE_BOXES |

### Hub Table Concept
Everything links back to **ANTHEM_REQUESTS**. From any request you can trace: Course -> Tee Box -> Player Profile -> Strategy Type -> Research -> Script -> Music Parameters -> Generation -> Final Track.

---

## THE 4 STRATEGY TYPES

These are purely about golf playing approach. Music/lyrical theming is handled separately through AI_LAB prompts.

| Strategy | Emoji | Golf Approach |
|----------|-------|---------------|
| **Smart** | brain | Calculated play, course management, think 2-3 shots ahead |
| **Aggressive** | fire | Attack pins, maximize birdies, driver on every par 4 |
| **Conservative** | shield | Center of greens, avoid hazards, bogey-free golf |
| **Risk-Reward** | scales | Tactical hole-by-hole decisions, calculated gambles |

---

## THE PIPELINE

### 7-Stage Flow

```
1. Course Request
   -> ANTHEM_REQUESTS record created with course, tee box, player, strategy
   -> COURSES record created or found

2. Course Overview Research (Perplexity)
   -> Prompt from AI_LAB (type: Research) or code default
   -> Populates COURSES fields + creates RESEARCH_OUTPUT (type: "Course Overview")
   -> REUSABLE across all player customizations for this course

3. Deep Research (Perplexity) — player-specific
   -> Takes: Course Overview + Tee Box + Player Profile (club yardages) + Strategy Type
   -> Prompt from AI_LAB (type: Strategy) or code default
   -> Creates RESEARCH_OUTPUT (type: "Deep Research")
   -> This is what makes each track unique per player

4. Script/Lyric Generation (ChatGPT)
   -> Takes: Deep Research + Course Data + Player Profile + Strategy
   -> Prompt from AI_LAB (type: Script/Lyric) or code default
   -> Creates SCRIPTS record

5. [HUMAN REVIEW] -> Script approved?

6. Music Generation (Suno)
   -> Takes: Approved Script + Music Style from AI_LAB (type: Music Style)
   -> Creates ANTHEM_PARAMETERS + ANTHEM_GENERATIONS records
   -> Polls until complete

7. Track Creation & QC
   -> Creates TRACKS record with full audit trail
   -> [HUMAN REVIEW] -> QC & Publish
```

### ANTHEM_REQUESTS Status Flow

```
Pending Review -> Research Started -> Research Complete -> Script Creation
-> Script Review -> Script Approved -> Suno Generating -> Track QC -> Published
```

---

## PROMPT SYSTEM

### Hybrid Architecture

The system uses a **split approach** for prompts:

**Engineering Prompts** (Research, Strategy, Script/Lyric):
- Code defaults in `src/prompts/*.ts` — always available, version-controlled
- AI_LAB table can override any prompt by setting `is_current_default = TRUE`
- Loader checks AI_LAB first, falls back to code if no active override found

**Music Style Prompts:**
- Always from AI_LAB (no code fallback)
- Different styles per track — users choose which music style
- Stored with `prompt_type = "Music Style"` in AI_LAB

### Prompt Files

| File | Type | API Target |
|------|------|------------|
| `src/prompts/course-overview.ts` | Course Overview Research | Perplexity |
| `src/prompts/deep-strategy.ts` | Player-Specific Strategy | Perplexity |
| `src/prompts/script-writer.ts` | Anthem Script/Lyrics | ChatGPT |
| `src/prompts/loader.ts` | Hybrid loader (AI_LAB + code fallback) | — |

### Using the Loader

```typescript
import { getPrompt, getMusicStyles } from "./prompts/loader.js";

// Gets from AI_LAB if override exists, else code default
const research = await getPrompt("Research");
const strategy = await getPrompt("Strategy");
const script = await getPrompt("Script/Lyric");

// Always from AI_LAB (no code fallback)
const styles = await getMusicStyles();
```

---

## KEY DATA FORMATS

### Hole Data (on TEE_BOXES)

Stored in `hole_data` field as comma-separated string:
```
1: 378 (4), 2: 509 (5), 3: 397 (4), 4: 331 (4), 5: 188 (3), ...
```
Format: `hole#: yardage (par)`

### Player Profile Club Distances

Fields on USER_PROFILES:
- `driver_carry` / `driver_total` (yards)
- `three_wood_carry`, `hybrid_carry`, `seven_iron_carry`, `pw_carry`
- `shot_shape` (Draw, Fade, Straight, Variable)
- `preferred_layup_range` (e.g., "80-100 yards")
- `miss_tendency` (e.g., "push right under pressure")

### Profile Types

- **User** — real player with actual club distances
- **Platform Default** — average player template
- **Preset** — pro golfer profiles (Tiger, Rory, etc.)

### Research Types (RESEARCH_OUTPUT)

- **Course Overview** — general course data, reusable across all players
- **Deep Research** — player-specific strategy based on club distances + tee box + strategy type

---

## EXISTING SEED DATA

### Pebble Beach Golf Links
- Course record with full facility data, signature holes, hole descriptions
- 4 tee boxes with real scorecard data:
  - Blue (Championship): 6,802 yds, Rating 73.8, Slope 144
  - Gold (Resort): 6,472 yds, Rating 72.1, Slope 140
  - White (Member): 6,083 yds, Rating 70.2, Slope 135
  - Red (Forward): 5,125 yds, Rating 71.1, Slope 130, Par 71
- All tee boxes include `hole_data` with per-hole yardages and pars

### Strategy Types (4 records)
Golf-play focused descriptions. `lyrical_themes` and `music_tone` fields cleared — that theming now lives in AI_LAB prompts.

### AI_LAB (4 records)
- Course Overview Research prompt (Active, default)
- Deep Strategy Research prompt (Active, default)
- Script/Lyric Writer prompt (Active, default)
- 24/8 Anthem Style music style template (Active)

### User Profile
- Nick Gulick profile with real club distances (profile_type: User)

---

## KEY FILES

### Source Code (`src/`)

| File | Purpose |
|------|---------|
| `airtable-client.ts` | Airtable SDK client, table references by ID |
| `perplexity-client.ts` | Perplexity API client for research |
| `openai-client.ts` | OpenAI/ChatGPT client for scripts |
| `suno-client.ts` | Suno API client for music generation |
| `pipeline-test.ts` | End-to-end pipeline test (hardcoded, to be replaced) |
| `prompts/loader.ts` | Hybrid prompt loader (AI_LAB + code defaults) |
| `prompts/course-overview.ts` | Code default: Course Overview Research prompt |
| `prompts/deep-strategy.ts` | Code default: Deep Strategy Research prompt |
| `prompts/script-writer.ts` | Code default: Script/Lyric Writer prompt |
| `test-prompts.ts` | Tests prompt loader |
| `migrate-schema.ts` | Schema migration script (already run) |
| `migrate-gap-fields.ts` | Gap field migration (already run) |
| `seed-data.ts` | Seeds strategy types, course, tee boxes, user profile |

### Documentation

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Agent instructions, table IDs, conventions |
| `24_8_Anthem_PRD.md` | Product requirements v2.0 |
| `24_8_Anthem_Handoff_Guide.md` | This file |
| `24_8_anthem_final_build_schema.md` | Original schema reference (outdated — use PRD v2.0) |

### Agent Skills (`skills/`)

| Skill | Purpose |
|-------|---------|
| `skills/research-initial/` | Broad course overview research |
| `skills/research-deep/` | Strategy-specific deep research |
| `skills/script-agent/` | Lyric generation from research |
| `skills/anthem-agent/` | Suno params + music generation |
| `skills/anthem-workflow/` | Full pipeline orchestration |

---

## ENVIRONMENT VARIABLES

Required in `.env`:
```
AIRTABLE_PAT=           # Airtable Personal Access Token
AIRTABLE_BASE_ID=       # Airtable base identifier
PERPLEXITY_API_KEY=     # For course research
OPENAI_API_KEY=         # For script/lyric generation
SUNO_API_KEY=           # For music generation
N8N_WEBHOOK_BASE_URL=   # n8n cloud instance (optional)
N8N_MCP_SERVER_URL=     # n8n MCP endpoint (optional)
```

---

## RUNNING THE PIPELINE

### Test Connection
```bash
npm run test-connection
```

### Test Prompt Loader
```bash
npx tsx src/test-prompts.ts
```

### Run Full Pipeline (current test version)
```bash
npx tsx src/pipeline-test.ts
```

This runs the complete flow: research -> script -> suno params -> music generation -> track creation. Currently uses hardcoded Pebble Beach + Smart Strategy.

---

## CREATING A NEW TRACK (Manual Workflow)

### Step 1: Create ANTHEM_REQUEST
In Airtable, create a record in ANTHEM_REQUESTS linking:
- Course (from COURSES)
- Tee Box (from TEE_BOXES)
- User Profile (from USER_PROFILES)
- Strategy Type (from STRATEGY_TYPES)
- Set status: "Pending Review"
- Set priority: High/Medium/Low

### Step 2: Course Overview Research
If no Course Overview exists for this course:
1. Load research prompt: `getPrompt("Research")`
2. Fill variables with course data
3. Send to Perplexity
4. Save raw output to RESEARCH_OUTPUT (research_type: "Course Overview")
5. Parse into COURSES fields (signature_holes, hole_descriptions, etc.)

### Step 3: Deep Research (Player-Specific)
1. Load strategy prompt: `getPrompt("Strategy")`
2. Fill variables with: course overview + tee box hole_data + player club distances + strategy approach
3. Send to Perplexity
4. Save to RESEARCH_OUTPUT (research_type: "Deep Research")
5. This creates the hole-by-hole strategy specific to THIS player's distances

### Step 4: Script Generation
1. Load script prompt: `getPrompt("Script/Lyric")`
2. Fill variables with: deep research data + course name + player profile + music style
3. Send to ChatGPT
4. Save to SCRIPTS with version_number: 1

### Step 5: Human Review
Review the script. If edits needed:
- Create new SCRIPTS record with version_number: 2 and reference_script_id linking to v1
- Continue until approved
- Use `generate_now` checkbox to trigger regeneration if automating

### Step 6: Music Generation
1. Get music style from AI_LAB: `getMusicStyles()`
2. Create ANTHEM_PARAMETERS record with style, model, instrumental flag, etc.
3. Call Suno API with approved script + style parameters
4. Create ANTHEM_GENERATIONS record, poll until complete

### Step 7: Track QC & Publish
1. Create TRACKS record linking all pipeline outputs
2. Listen to the track
3. Set qa_status (Pending, Approved, Rejected, Needs Revision)
4. If approved: set published_to_platform, published_url, etc.
5. Update ANTHEM_REQUESTS status: "Published"

---

## WHAT MAKES EACH TRACK UNIQUE

The same course can produce completely different tracks based on:

1. **Player Profile** — A 275-yard driver faces different decisions than a 220-yard driver. The deep research creates entirely different hole-by-hole strategies.
2. **Tee Box** — Playing from Championship tees vs Forward tees changes everything about course strategy.
3. **Strategy Type** — Smart play (position off the tee) vs Aggressive (driver everywhere) creates different narratives.
4. **Music Style** — Same lyrics can become cinematic orchestral, hip-hop, country, or electronic.

This means Pebble Beach alone could have dozens of unique tracks: 4 tees x 4 strategies x multiple player profiles x multiple music styles.

---

## TROUBLESHOOTING

### Prompt Loader Returns Code Default Instead of AI_LAB
- Check AI_LAB table: does a record exist with matching `prompt_type`, `status = "Active"`, and `is_current_default = TRUE`?
- Check `.env` has valid `AIRTABLE_PAT` and `AIRTABLE_BASE_ID`

### Suno Generation Takes Too Long
- Normal: 2-15 minutes
- If >30 minutes: check Suno API status, try regenerating
- Check ANTHEM_GENERATIONS record for error_message field

### Script Quality Issues
- Check RESEARCH_OUTPUT — bad research = bad scripts
- Try different strategy type for variety
- Create new script version (don't overwrite — new record with incremented version_number)

### Tee Box Data Wrong
- Verify against course scorecard
- hole_data format must be: `1: 378 (4), 2: 509 (5), ...`
- Rating and slope should come from official scorecard

---

## NEXT STEPS (Priority Order)

1. **Build clean pipeline orchestrator** — replace hardcoded `pipeline-test.ts` with modular pipeline using prompt loader
2. **Implement Deep Research stage** — player-specific strategy research with club distance analysis
3. **Test with second course** — validate pipeline works beyond Pebble Beach
4. **n8n workflow automation** — connect Airtable triggers to pipeline stages
5. **Platform frontend** — user-facing web app for requesting/browsing tracks

---

**Document Version:** 2.0
**Last Updated:** February 12, 2026
**Status:** Schema complete, pipeline tested, building automation
