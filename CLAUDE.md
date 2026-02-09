# 24/8 Anthem Project

## What This Project Is

An AI-powered golf course anthem generation system. Custom songs are created for specific courses and playing strategies using a 7-stage pipeline: Course Setup -> Research -> Script -> Suno Parameters -> Music Generation -> QC -> Publish.

## Architecture

- **Database:** Airtable (11 tables — see `24_8_anthem_final_build_schema.md`)
- **Automation:** n8n workflows at `https://homericng.app.n8n.cloud`
- **Research:** Perplexity API (course research)
- **Scripts:** OpenAI/ChatGPT API (lyric generation)
- **Music:** Suno API (audio generation)
- **Orchestration:** This repo + n8n + Claude Code agents

## The 11 Airtable Tables

1. STRATEGY_TYPES (4 records: Smart, Aggressive, Conservative, Risk-Reward)
2. COURSES (master golf course data)
3. TEE_BOXES (4-5 per course, handles naming chaos)
4. HOLES (18 per course, includes lyrical_inspiration)
5. USER_PROFILES (golfer profiles)
6. ANTHEM_REQUESTS (hub table — everything links here)
7. RESEARCH_OUTPUT (Perplexity results, parsed into sections)
8. SCRIPTS (ChatGPT lyrics + human edits, versioned)
9. SUNO_PARAMETERS (music style settings)
10. SUNO_GENERATIONS (Suno API tracking + polling)
11. TRACKS (final deliverable with full audit trail)

## The 4 Strategy Types

| Strategy | Theme | Music Tone |
|----------|-------|------------|
| Smart | Calculated, precise, course knowledge | Cerebral, methodical, building |
| Aggressive | Bold, attack, maximize birdies | Powerful, energetic, driving |
| Conservative | Steady, avoid hazards, discipline | Grounded, flowing, patient |
| Risk-Reward | Tactical, hole-by-hole decisions | Dramatic, tension, triumphant |

## Key Files

- `ANTHEM_PROJECT_PLAN.md` — Full setup plan and integration guide
- `24_8_Anthem_PRD.md` — Product requirements
- `24_8_Anthem_Handoff_Guide.md` — Implementation checklist
- `24_8_anthem_final_build_schema.md` — Complete Airtable schema
- `skills/` — Agent skills (research, script, anthem generation)
- `commands/` — Slash commands for Claude Code
- `scripts/ralph/` — Ralph autonomous agent loop

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
- `PERPLEXITY_API_KEY` — For course research
- `OPENAI_API_KEY` — For script/lyric generation
- `SUNO_API_KEY` — For music generation
- `N8N_WEBHOOK_BASE_URL` — n8n cloud instance
- `N8N_MCP_SERVER_URL` — n8n MCP endpoint

## Coding Conventions

- TypeScript for all scripts (`src/`)
- Use `dotenv/config` for env loading
- Airtable SDK via `src/airtable-client.ts`
- All agent memory files are append-only (never delete learnings, only add)
- Commit messages: `feat:`, `fix:`, `docs:`, `chore:` prefixes

## ANTHEM_REQUESTS Status Flow

```
Pending Review -> Research Started -> Research Complete -> Script Creation
-> Script Review -> Script Approved -> Suno Generating -> Track QC -> Published
```

## Important Patterns

- Every table record links back to ANTHEM_REQUESTS (audit trail)
- Tee boxes have both `standard_color` and `course_local_name` (courses name them differently)
- Scripts are versioned (v1, v2, v3) — never overwrite, create new version
- Agent memory files should be updated after EVERY run with learnings
- The improvement loop: each agent reads its memory.md before starting, writes to it after finishing
