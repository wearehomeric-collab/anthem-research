# 24/8 Anthem Project - Comprehensive Setup & Integration Plan

**Generated:** February 6, 2026
**Purpose:** Complete analysis of current state + step-by-step setup plan for all integrations

---

## 1. DISCOVERY: CURRENT REPOSITORY STATE

### Repository Contents

```
248/
├── 24_8_Anthem_PRD.md                    # Product Requirements Document (v1.0)
├── 24_8_Anthem_Handoff_Guide.md          # Implementation & handoff checklist
├── 24_8_anthem_final_build_schema.md     # Complete Airtable schema (11 tables)
├── 🔬🎧 REPORT SUPER AGENT PROMPT...md  # Neuroscience/brand report from Perplexity
├── scripts/
│   └── ralph/
│       ├── CLAUDE.md                     # Autonomous agent instructions (Ralph)
│       └── ralph.sh                      # Agent loop script (bash)
└── .git/                                 # Git repository (3 commits)
```

### What Already Exists

| Item | Status | Notes |
|------|--------|-------|
| Airtable schema design | Documented | 11 tables fully specified in `24_8_anthem_final_build_schema.md` |
| Workflow definition | Documented | 8-step manual process in PRD and Handoff Guide |
| Strategy types | Documented | 4 strategies (Smart, Aggressive, Conservative, Risk-Reward) with full prompts |
| Sample data | Documented | Pebble Beach course, tee boxes, holes 7/8/18 |
| Ralph agent script | Code exists | Autonomous iteration loop for `amp` or `claude` CLI tools |
| Neuroscience report | Complete | Brand/science positioning document |
| n8n reference | URL only | `https://homericng.app.n8n.cloud/mcp-server/http` mentioned in project context |
| package.json | **Missing** | No Node.js project configured |
| .env file | **Missing** | No environment variables configured |
| CI/CD | **Missing** | No GitHub Actions or deployment pipeline |
| MCP server config | **Missing** | No `.claude/` or MCP configuration files |
| Airtable integration code | **Missing** | No API client or scripts to interact with Airtable |
| n8n workflows | **Missing** | No exported workflow definitions |
| API keys/credentials | **Missing** | No credential storage configured |

### What's NOT in This Repository

- No executable code that connects to Airtable, n8n, Perplexity, ChatGPT, or Suno
- No `package.json`, `requirements.txt`, or any dependency manifests
- No `.env`, `.env.example`, or credential configuration
- No MCP server configuration files
- No GitHub Actions workflows
- No tests
- The repository is **documentation-only** at this point

---

## 2. WHAT API KEYS & CREDENTIALS ARE NEEDED

### Required Credentials

| Service | Credential Type | Purpose | Where to Get |
|---------|----------------|---------|--------------|
| **Airtable** | Personal Access Token | Read/write database tables | airtable.com/create/tokens |
| **Airtable** | Base ID | Identify the 24/8 Anthem base | URL bar when viewing base |
| **n8n** | Webhook URLs | Trigger automated workflows | homericng.app.n8n.cloud |
| **Perplexity** | API Key | Course research (Step 2) | perplexity.ai/settings/api |
| **OpenAI** | API Key | Script generation via ChatGPT (Step 3) | platform.openai.com/api-keys |
| **Suno** | API Key | Music generation (Steps 5-6) | suno.com account settings |

### Optional Credentials

| Service | Credential Type | Purpose |
|---------|----------------|---------|
| **GitHub** | Personal Access Token | CI/CD, automated PRs |
| **n8n MCP Server** | Auth token | MCP server integration for Claude Code |

---

## 3. SETUP PLAN: STEP-BY-STEP

### Phase A: Repository Foundation (Do First)

#### Step A1: Initialize the project

```bash
# In the 248/ directory
npm init -y
```

This creates `package.json`. Then install core dependencies:

```bash
npm install airtable dotenv
npm install --save-dev typescript @types/node tsx
```

- `airtable` - Official Airtable SDK for reading/writing records
- `dotenv` - Load environment variables from `.env`
- `typescript` / `tsx` - Type safety and running TS scripts

#### Step A2: Create environment configuration

Create `.env.example` (committed to repo - no secrets):

```env
# Airtable
AIRTABLE_PAT=your_personal_access_token_here
AIRTABLE_BASE_ID=your_base_id_here

# Perplexity
PERPLEXITY_API_KEY=your_key_here

# OpenAI (ChatGPT)
OPENAI_API_KEY=your_key_here

# Suno
SUNO_API_KEY=your_key_here

# n8n
N8N_WEBHOOK_BASE_URL=https://homericng.app.n8n.cloud
N8N_MCP_SERVER_URL=https://homericng.app.n8n.cloud/mcp-server/http
```

Create `.env` (NOT committed - add to `.gitignore`):

```bash
cp .env.example .env
# Then fill in actual values
```

#### Step A3: Create `.gitignore`

```gitignore
node_modules/
.env
dist/
*.log
```

#### Step A4: Create `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true,
    "resolveJsonModule": true
  },
  "include": ["src"]
}
```

### Phase B: Airtable Connection

#### Step B1: Get Airtable credentials

1. Go to https://airtable.com/create/tokens
2. Click "Create new token"
3. Name: `248-anthem-project`
4. Scopes needed:
   - `data.records:read`
   - `data.records:write`
   - `schema.bases:read`
5. Access: Select your "24/8 Anthem" base
6. Copy the token into `.env` as `AIRTABLE_PAT`
7. Open your Airtable base in a browser. The URL looks like:
   `https://airtable.com/appXXXXXXXXXX/...`
   Copy the `appXXXXXXXXXX` part into `.env` as `AIRTABLE_BASE_ID`

#### Step B2: Create Airtable client module

Create `src/airtable-client.ts`:

```typescript
import Airtable from 'airtable';
import 'dotenv/config';

const base = new Airtable({
  apiKey: process.env.AIRTABLE_PAT,
}).base(process.env.AIRTABLE_BASE_ID!);

// Table references matching the 11-table schema
export const tables = {
  strategyTypes: base('STRATEGY_TYPES'),
  courses: base('COURSES'),
  teeBoxes: base('TEE_BOXES'),
  holes: base('HOLES'),
  userProfiles: base('USER_PROFILES'),
  anthemRequests: base('ANTHEM_REQUESTS'),
  researchOutput: base('RESEARCH_OUTPUT'),
  scripts: base('SCRIPTS'),
  sunoParameters: base('SUNO_PARAMETERS'),
  sunoGenerations: base('SUNO_GENERATIONS'),
  tracks: base('TRACKS'),
};

export default base;
```

#### Step B3: Test the connection

Create `src/test-connection.ts`:

```typescript
import { tables } from './airtable-client';

async function testConnection() {
  console.log('Testing Airtable connection...');

  const records = await tables.strategyTypes
    .select({ maxRecords: 4 })
    .firstPage();

  console.log(`Found ${records.length} strategy types:`);
  records.forEach(r => {
    console.log(`  - ${r.get('strategy_name')} (${r.get('id')})`);
  });
}

testConnection().catch(console.error);
```

Run with: `npx tsx src/test-connection.ts`

### Phase C: n8n Integration

#### Step C1: Understand the n8n MCP server

The URL `https://homericng.app.n8n.cloud/mcp-server/http` is an **MCP (Model Context Protocol) server** endpoint hosted by n8n. This allows Claude Code (or other MCP-compatible tools) to interact with n8n workflows directly.

#### Step C2: Configure MCP for Claude Code

Create `.claude/mcp.json` in the project root:

```json
{
  "mcpServers": {
    "n8n": {
      "type": "http",
      "url": "https://homericng.app.n8n.cloud/mcp-server/http"
    }
  }
}
```

This tells Claude Code to connect to the n8n MCP server, giving it access to trigger and manage n8n workflows.

#### Step C3: Set up n8n workflows

In n8n (https://homericng.app.n8n.cloud), create these workflows matching the PRD automation roadmap:

| Workflow | Trigger | Actions |
|----------|---------|---------|
| **Research Automation** | Airtable: ANTHEM_REQUEST status = "Pending Review" | Fetch course + strategy data → Call Perplexity → Create RESEARCH_OUTPUT record → Update status |
| **Script Generation** | Airtable: ANTHEM_REQUEST status = "Research Complete" | Fetch research → Build ChatGPT prompt → Call OpenAI → Create SCRIPTS record → Notify for approval |
| **Suno Integration** | Airtable: ANTHEM_REQUEST status = "Script Approved" | Fetch script + params → Call Suno API → Create SUNO_GENERATIONS record → Poll for completion → Create TRACKS record |

Each workflow needs these n8n nodes:
- Airtable node (read/write records)
- HTTP Request node (for API calls)
- Code node (for data transformation)
- Webhook node (for Suno callbacks)

### Phase D: Additional API Integrations

#### Step D1: Perplexity integration

Create `src/research.ts` to automate Step 2 of the workflow:

```typescript
// Uses Perplexity API to research a golf course
// Input: course data + strategy type from Airtable
// Output: structured research ready for RESEARCH_OUTPUT table
```

API endpoint: `https://api.perplexity.ai/chat/completions`
Model: `sonar` or `sonar-pro`

#### Step D2: OpenAI/ChatGPT integration

Create `src/script-generator.ts` to automate Step 3:

```typescript
// Uses OpenAI API to generate lyrics
// Input: research data + strategy prompt template from Airtable
// Output: script ready for SCRIPTS table
```

API endpoint: `https://api.openai.com/v1/chat/completions`
Model: `gpt-4o` or `gpt-4-turbo`

#### Step D3: Suno integration

Create `src/suno.ts` to automate Steps 5-6:

```typescript
// Calls Suno API to generate music
// Input: lyrics + style parameters from Airtable
// Output: audio URL + cover image for TRACKS table
```

Note: Suno API details depend on your account type (check Suno documentation for current endpoints).

---

## 4. RECOMMENDED PROJECT STRUCTURE

### Keep as ONE Repository

This project should stay as a single repository. The components are tightly coupled:
- All code reads from the same Airtable base
- The workflow is a linear pipeline (research → script → music)
- n8n workflows reference the same data model

### Recommended Directory Structure

```
248/
├── .claude/
│   └── mcp.json                          # MCP server config (n8n)
├── .github/
│   └── workflows/
│       └── lint.yml                      # Basic CI (optional)
├── docs/
│   ├── 24_8_Anthem_PRD.md               # Move existing docs here
│   ├── 24_8_Anthem_Handoff_Guide.md
│   ├── 24_8_anthem_final_build_schema.md
│   └── REPORT_SUPER_AGENT_PROMPT.md
├── n8n/
│   └── workflows/                        # Exported n8n workflow JSON files
│       ├── research-automation.json
│       ├── script-generation.json
│       └── suno-integration.json
├── scripts/
│   └── ralph/                            # Existing Ralph agent
│       ├── CLAUDE.md
│       └── ralph.sh
├── src/
│   ├── airtable-client.ts               # Airtable SDK setup
│   ├── research.ts                       # Perplexity integration
│   ├── script-generator.ts              # OpenAI integration
│   ├── suno.ts                          # Suno integration
│   └── test-connection.ts               # Connection test
├── .env.example                          # Template for credentials
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md                             # Project overview (create when ready)
```

### What Config Files Need to Be Created

| File | Purpose | Priority |
|------|---------|----------|
| `.env.example` | Template for API keys (no secrets) | High |
| `.env` | Actual API keys (gitignored) | High |
| `.gitignore` | Prevent committing secrets/node_modules | High |
| `package.json` | Node.js dependencies | High |
| `tsconfig.json` | TypeScript configuration | High |
| `.claude/mcp.json` | MCP server config for n8n | High |
| `n8n/workflows/*.json` | Exported n8n workflow definitions | Medium |

### Environment Variables Summary

```env
# Required - Airtable (core database)
AIRTABLE_PAT=
AIRTABLE_BASE_ID=

# Required - Research (Step 2)
PERPLEXITY_API_KEY=

# Required - Script Generation (Step 3)
OPENAI_API_KEY=

# Required - Music Generation (Steps 5-6)
SUNO_API_KEY=

# Required - Workflow Automation
N8N_WEBHOOK_BASE_URL=https://homericng.app.n8n.cloud
N8N_MCP_SERVER_URL=https://homericng.app.n8n.cloud/mcp-server/http
```

---

## 5. INTEGRATION CHECKLIST

### Airtable Setup
- [ ] Create Airtable account (if not done)
- [ ] Create "24/8 Anthem" base
- [ ] Create all 11 tables (in order from schema doc)
- [ ] Add 4 STRATEGY_TYPES records
- [ ] Add Pebble Beach test course + tee boxes + holes
- [ ] Generate Personal Access Token
- [ ] Note down Base ID from URL
- [ ] Test API connection with `test-connection.ts`

### n8n Setup
- [ ] Verify access to https://homericng.app.n8n.cloud
- [ ] Create MCP server config (`.claude/mcp.json`)
- [ ] Test MCP connection from Claude Code
- [ ] Create Research Automation workflow in n8n
- [ ] Create Script Generation workflow in n8n
- [ ] Create Suno Integration workflow in n8n
- [ ] Connect Airtable node to your base in each workflow
- [ ] Test each workflow end-to-end

### API Keys
- [ ] Get Perplexity API key
- [ ] Get OpenAI API key
- [ ] Get Suno API key
- [ ] Store all keys in `.env`
- [ ] Verify `.env` is in `.gitignore`

### Repository Setup
- [ ] Run `npm init -y`
- [ ] Install dependencies (`airtable`, `dotenv`, `typescript`, etc.)
- [ ] Create `.gitignore`
- [ ] Create `.env.example`
- [ ] Create `tsconfig.json`
- [ ] Create `src/airtable-client.ts`
- [ ] Test connection to Airtable

### First Track Test
- [ ] Create an ANTHEM_REQUEST in Airtable
- [ ] Run research (manually or via n8n)
- [ ] Generate script (manually or via n8n)
- [ ] Set Suno parameters
- [ ] Generate music
- [ ] Create TRACKS record
- [ ] QC and publish

---

## 6. MCP SERVERS REFERENCED

### n8n MCP Server
- **URL:** `https://homericng.app.n8n.cloud/mcp-server/http`
- **Type:** HTTP-based MCP server
- **Purpose:** Allows Claude Code to interact with n8n workflows
- **What it can do:** Trigger workflows, read/write data through n8n
- **Config location:** `.claude/mcp.json`

### What Claude Code Needs Access To
| Capability | How | Via |
|-----------|-----|-----|
| Read Airtable data | Airtable SDK or n8n MCP | Direct API or n8n workflows |
| Write Airtable records | Airtable SDK or n8n MCP | Direct API or n8n workflows |
| Trigger n8n workflows | n8n MCP server | `.claude/mcp.json` config |
| Call Perplexity API | HTTP requests or n8n | Direct API or n8n workflows |
| Call OpenAI API | HTTP requests or n8n | Direct API or n8n workflows |
| Call Suno API | HTTP requests or n8n | Direct API or n8n workflows |

---

## 7. PRIORITY ORDER OF WORK

### Immediate (Do Today)
1. Initialize `package.json` and install dependencies
2. Create `.env.example`, `.env`, `.gitignore`
3. Set up Airtable connection and test it

### This Week
4. Create the 11 Airtable tables (follow schema doc exactly)
5. Configure n8n MCP server in `.claude/mcp.json`
6. Create the first n8n workflow (Research Automation)

### Next Week
7. Build remaining n8n workflows (Script Generation, Suno)
8. Create first complete track end-to-end
9. Document any schema changes or issues found

### Ongoing
10. Iterate on workflow quality (prompt templates, music params)
11. Add more courses
12. Train team members on the 8-step workflow

---

## 8. KEY DECISIONS TO MAKE

| Decision | Options | Recommendation |
|----------|---------|----------------|
| **Primary automation tool** | n8n workflows vs. TypeScript scripts | Use n8n for the pipeline (visual, easy to modify), TypeScript for utilities |
| **Airtable access method** | Direct SDK vs. through n8n | Both - SDK for scripts, n8n for automated workflows |
| **Where to run research** | Perplexity vs. ChatGPT | Perplexity for research (better citations), ChatGPT for scripts |
| **How to call Suno** | Direct API vs. n8n | n8n (handles polling/webhooks natively) |
| **Human approval mechanism** | Email notifications vs. Slack vs. Airtable views | Start with Airtable views (simplest), add notifications later |

---

*This plan was generated by analyzing all files in the repository. The project is currently documentation-only. The next step is to create the technical infrastructure (package.json, env config, Airtable client) and configure the n8n MCP server.*
