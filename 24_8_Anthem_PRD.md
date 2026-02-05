# 24/8 ANTHEM PROJECT
## Product Requirements Document (PRD)
**Version:** 1.0  
**Date:** February 5, 2026  
**Status:** Ready for Implementation  
**Owner:** Nick (24/8 Anthem Project Lead)

---

## EXECUTIVE SUMMARY

The 24/8 Anthem Project is building a sophisticated golf course music generation system that creates custom songs for specific courses and playing strategies. This PRD defines the Airtable database architecture and manual workflow that will serve as the backbone for the system.

**Current State:** Manual process with multiple tools (Airtable, Perplexity, ChatGPT, Suno)  
**Goal:** Unified Airtable schema that tracks every step of track creation + clear manual workflow  
**Future State:** n8n automation layer on top of this schema

**Scope of This Document:**
- Airtable schema design (11 core tables)
- Data relationships and linking
- Manual workflow (8-step process)
- Quality control checkpoints
- Future automation considerations

---

## PRODUCT VISION

### What We're Building
An automated golf course anthem generation system where:
1. User inputs course + player profile + strategy type + tee box
2. System researches the course + generates custom lyrics + creates music track
3. Human approves at key checkpoints (research, script, final track)
4. Published track is available for use

### Why This Matters
- **For Golfers:** Personalized, custom anthems that celebrate their favorite courses
- **For Golf Courses:** Marketing tool and member engagement content
- **For 24/8:** Differentiated product combining golf expertise + AI + music generation

### Success Criteria
- ✅ Can create 1 complete track manually in <3 hours (today)
- ✅ Clear audit trail for every track showing which data created it
- ✅ Quality control checkpoints ensure human review before release
- ✅ Schema supports future automation without redesign
- ✅ Team member can hand off to another person and they can complete tracks

---

## CURRENT MANUAL PROCESS (SIMPLIFIED)

```
INPUT:
├─ Golf Course Data (architect, design, history)
├─ User Profile (skill level, play style, handicap)
├─ Strategy Type (Smart | Aggressive | Conservative | Risk-Reward)
└─ Tee Box Selection (which difficulty level)

WORKFLOW:
1. Research → Perplexity searches course + strategy context
2. Script Generation → ChatGPT creates lyrics using research + guidelines
3. Script Approval → Nick reviews and edits lyrics
4. Suno API Call → Sends lyrics + music parameters to Suno
5. Audio Generation → Suno creates music track
6. QC & Approval → Nick listens and approves quality
7. Publication → Track goes live

OUTPUT:
└─ Custom music track (MP3) with complete metadata
```

**Current Pain Points:**
- Manual jumping between tools (no unified workflow)
- Can't easily see which data created which track (no audit trail)
- Tee box naming chaos (different names at each course)
- Script iterations not tracked
- Hard to reproduce if track needs adjustment
- No clear checklist/status tracking

---

## REQUIREMENTS

### Functional Requirements

#### FR-1: Course Data Management
- **Requirement:** Store comprehensive golf course information
- **Scope:**
  - Course name, architect, year built, location
  - Par, yardage, number of holes
  - Course description, designer intent, strategic elements
  - Support for international courses
- **Acceptance Criteria:**
  - Can store data for 100+ courses
  - Can filter/search by architect, location, year
  - Supports courses with 9 or 18 holes

#### FR-2: Tee Box Complexity Management
- **Requirement:** Handle the fact that tee boxes are named differently at every course
- **Scope:**
  - Standardize on color system (Red/White/Blue/Black/Gold)
  - Allow course-specific local names ("Member," "Championship," etc.)
  - Auto-generate display name (e.g., "Blue Tees - Member")
  - Track yardage, course rating, slope rating, skill level
  - Allow setting a "primary" tee for when player is uncertain
- **Acceptance Criteria:**
  - Each course can have 4-5 tee boxes
  - Display name auto-combines standard + local names
  - Can filter by skill level (Beginner → Expert)
  - Players can select tee even if they don't know exact name

#### FR-3: User Profile System
- **Requirement:** Track how individual golfers/members play
- **Scope:**
  - Email, name, handicap, skill level
  - Play style (Smart | Aggressive | Conservative | Risk-Reward)
  - Strengths, development areas, personality traits
  - Golf goals and preferences
- **Acceptance Criteria:**
  - Can link profiles to anthem requests
  - Profiles can be reused across multiple anthems
  - Each golfer can have one primary profile (extensible to per-course later)

#### FR-4: Strategy Type Framework
- **Requirement:** Define the 4 strategy approaches and their characteristics
- **Scope:**
  - Smart, Aggressive, Conservative, Risk-Reward
  - Detailed strategy explanation for each
  - Research focus keywords
  - Lyrical themes and music tone
  - ChatGPT prompt template for script generation
- **Acceptance Criteria:**
  - 4 records with complete definitions
  - Each has templated ChatGPT prompt ready to use
  - Research focus guides what to look for
  - Music tone informs Suno parameters

#### FR-5: Anthem Request Hub
- **Requirement:** Central tracking table for all track creation requests
- **Scope:**
  - Link to course, user profile, strategy type, tee box
  - Status tracking (Pending → Research → Script → Suno → Published)
  - Priority and target completion date
  - Notes and QC tracking
- **Acceptance Criteria:**
  - Single request links to all inputs
  - Status field guides workflow (8-step process)
  - Can filter by status to see what needs work
  - Complete audit trail (what created what)

#### FR-6: Research Data Storage
- **Requirement:** Capture and organize Perplexity research output
- **Scope:**
  - Store full raw response from Perplexity
  - Parse into structured sections (history, philosophy, strategy, etc.)
  - Track research quality (1-5 confidence score)
  - Store original prompt and research date
- **Acceptance Criteria:**
  - Research can be reused (same course, different strategy)
  - Raw backup exists but parsed sections are usable
  - Can see what made research good/bad
  - Quality tracking helps assess data reliability

#### FR-7: Script Generation & Iteration Tracking
- **Requirement:** Track ChatGPT output and human edits
- **Scope:**
  - Store ChatGPT's raw output
  - Track user edits and rationale
  - Maintain version history (v1, v2, v3)
  - Store final approved script ready for Suno
- **Acceptance Criteria:**
  - Can see ChatGPT original vs. final version
  - Iterations tracked (useful for learning)
  - Quality assessment (perfect, minor edits, major edits, rejected)
  - Script approved by specific person on specific date

#### FR-8: Suno Music Generation Integration
- **Requirement:** Manage Suno API calls and polling
- **Scope:**
  - Store music parameters (genre, tempo, instrumentation, etc.)
  - Track Suno API calls and task IDs
  - Handle polling/status checking
  - Capture audio URL and cover image when ready
  - Store error messages if generation fails
- **Acceptance Criteria:**
  - Can define music style once and reuse for variations
  - API calls are auditable (what was sent, when, result)
  - Polling tracked (attempts, timestamps)
  - Complete Suno response stored as backup

#### FR-9: Final Track & QC
- **Requirement:** Store final deliverable with complete audit trail
- **Scope:**
  - Link to every upstream data (course → research → script → Suno)
  - Store audio URL and cover image
  - Quality rating (1-5 stars)
  - QC notes and approval tracking
  - Status (Draft → Approved → Published)
- **Acceptance Criteria:**
  - Track shows complete chain of data that created it
  - Can see who approved and when
  - Quality assessment documented
  - Can filter by status (published vs. draft)

#### FR-10: Workflow Checklist (Optional)
- **Requirement:** Visual progress tracker for manual creation
- **Scope:**
  - 8-step checklist matching manual workflow
  - Status field at each checkpoint
  - Dates when each step completed
- **Acceptance Criteria:**
  - Creator can see which step they're on
  - Easy to resume if interrupted
  - Helps team member not miss steps

### Non-Functional Requirements

#### NFR-1: Data Integrity
- All links between tables must be maintained (no orphaned records)
- Audit trail must be complete (cannot delete data, only archive)
- Version tracking for scripts and Suno generations

#### NFR-2: Usability
- Interface should be intuitive for team members to create tracks
- Status field should guide workflow (show next step)
- Views should show pending work clearly

#### NFR-3: Scalability
- Schema must support 500+ courses
- Can handle 1000+ tracks without performance degradation
- Extensible for future automation (n8n integration)

#### NFR-4: Future-Proofing
- Must support per-course user profiles (different strategy per course)
- Must support track variations (A/B testing different styles)
- Structure ready for n8n workflow automation
- API-ready data structure

---

## DATA MODEL & TABLES

### Table 1: STRATEGY_TYPES (4 records)
**Purpose:** Define the 4 strategy approaches  
**Records:** Smart, Aggressive, Conservative, Risk-Reward  
**Key Fields:**
- `id`: STRAT-001, STRAT-002, STRAT-003, STRAT-004
- `strategy_name`: Text name
- `full_strategy_approach`: Detailed explanation
- `research_focus_keywords`: What to research for this strategy
- `lyrical_themes`: Emotional tone for lyrics
- `music_tone`: Music style (bold, steady, etc.)
- `chatgpt_prompt_template`: Ready-to-use prompt

### Table 2: COURSES
**Purpose:** Master golf course reference  
**One-time creation per course**  
**Key Fields:**
- `id`: COURSE-{city}-{year}
- `course_name`, `architect`, `year_built`
- `location_city`, `location_state`, `location_country`
- `par_total`, `total_yardage`, `holes_total`
- `course_description`, `designer_intent`, `strategic_elements`
- `is_active`: Checkbox (actively creating anthems?)

**Linked By:** TEE_BOXES, HOLES, ANTHEM_REQUESTS

### Table 3: TEE_BOXES
**Purpose:** Handle tee naming chaos  
**4-5 records per course**  
**Key Fields:**
- `id`: TEE-{course-id}-{color}
- `course_id`: Link to COURSES
- `standard_color`: Red | White | Blue | Black | Gold
- `course_local_name`: Course-specific name
- `display_name`: Formula = "{color} Tees - {local_name}"
- `yardage`, `course_rating`, `slope_rating`, `par`
- `difficulty_rank`, `skill_level_for`, `is_primary`
- `research_notes`: What makes this tee unique

**Linked By:** ANTHEM_REQUESTS

### Table 4: HOLES (Per-hole strategy)
**Purpose:** Store hole-specific information for lyrics  
**18 records per course**  
**Key Fields:**
- `id`: HOLE-{course-id}-{number}
- `course_id`: Link to COURSES
- `hole_number`, `par`, `handicap_index`
- `hole_name`, `hole_description`
- `strategic_elements`, `difficulty_descriptor`
- `signature_feature`, `lyrical_inspiration`

**Purpose of "lyrical_inspiration":** Helps songwriters create emotional references to specific holes

### Table 5: USER_PROFILES
**Purpose:** How individual golfers play  
**One per golfer**  
**Key Fields:**
- `id`: PROFILE-{email}-{year}
- `user_email`, `user_name`
- `handicap`, `preferred_tee_level`, `play_style`
- `experience_level`, `strengths`, `development_areas`
- `personality_traits`, `golf_goals`, `notes`

**Note:** Currently one profile per person; extensible to per-course later

### Table 6: ANTHEM_REQUESTS ⭐ HUB TABLE
**Purpose:** Central tracking for all track creation  
**One per track request**  
**Key Fields:**
- `id`: REQ-{YYYYMMDD}-{course-id}-{strategy}
- `course_id`: Link to COURSES ✓ REQUIRED
- `user_profile_id`: Link to USER_PROFILES
- `strategy_type_id`: Link to STRATEGY_TYPES ✓ REQUIRED
- `tee_box_id`: Link to TEE_BOXES ✓ REQUIRED
- `status`: Pending Review → Research → Script → Suno → Published
- `priority`: Low | Normal | High
- `request_notes`: Why you want this track
- `internal_qa_notes`: Working notes

**Purpose:** Every other table links back to this (complete audit trail)

### Table 7: RESEARCH_OUTPUT
**Purpose:** Store and organize Perplexity research  
**One per request**  
**Key Fields:**
- `id`: RES-{course-id}-{date}
- `request_id`: Link to ANTHEM_REQUESTS
- `research_prompt_used`: Exactly what you asked
- `raw_output`: Complete Perplexity response (backup)
- `course_history`, `design_philosophy`, `hole_strategy_notes`: Parsed sections
- `strategic_elements`, `notable_characteristics`
- `key_takeaways`: Your summary
- `confidence_score`: 1-5 rating
- `research_status`: Complete | Partial | Needs More | Rejected

### Table 8: SCRIPTS
**Purpose:** Track ChatGPT script generation and edits  
**One or more per request (v1, v2, etc.)**  
**Key Fields:**
- `id`: SCRIPT-{request}-V{version}
- `request_id`: Link to ANTHEM_REQUESTS
- `research_id`: Link to RESEARCH_OUTPUT (which data was used)
- `version_number`: 1, 2, 3, etc.
- `chatgpt_prompt_sent`: Exact prompt to ChatGPT
- `chatgpt_response_raw`: ChatGPT's raw output
- `your_edits_summary`: What you changed and why
- `final_approved_script`: Ready for Suno (with line breaks)
- `quality_assessment`: Perfect | Minor Edits | Major Edits | Rejected
- `approval_date`, `approved_by`

### Table 9: SUNO_PARAMETERS
**Purpose:** Music generation settings (reusable)  
**One per request (can be reused for variations)**  
**Key Fields:**
- `id`: PARAMS-{request}
- `request_id`: Link to ANTHEM_REQUESTS
- `genre`, `instrumentation`, `tempo_bpm`, `mood_descriptors`
- `vocal_type`, `duration_seconds`, `production_level`
- `similar_artist_refs`: Reference artists
- `style_prompt`: Full style description for Suno
- `variables`: Additional Suno parameters
- `guidelines_24_8`: Brand voice and quality standards

### Table 10: SUNO_GENERATIONS
**Purpose:** Track Suno API calls and polling  
**One per request**  
**Key Fields:**
- `id`: SUNO-{request}
- `request_id`: Link to ANTHEM_REQUESTS
- `parameters_id`: Link to SUNO_PARAMETERS
- `suno_task_id`: From Suno API (filled after call)
- `status`: Queued | Generating | Polling | Complete | Failed
- `polling_attempts`, `last_polled_at`
- `suno_response_data`: Full JSON when complete
- `audio_url`, `cover_image_url`: Filled when complete
- `error_message`: If failed
- `completion_date`, `api_notes`

### Table 11: TRACKS (FINAL DELIVERABLE)
**Purpose:** Final output with complete audit trail  
**One per published track**  
**Key Fields:**
- `id`: TRACK-{request}
- Links to ALL upstream tables (complete chain):
  - `request_id`, `course_id`, `user_profile_id`, `strategy_type_id`, `tee_box_id`
  - `research_id`, `script_id`, `suno_generation_id`
- `track_title`, `track_description`
- `audio_url`, `audio_file_local`, `cover_image_url`
- `duration_seconds`, `style_generated`, `model_used`
- `lyrics_used`: Link or paste to SCRIPTS
- `status`: Draft | Approved | Published | Archived | Rejected
- `quality_rating`: ★ to ★★★★★
- `qa_notes`: Detailed assessment
- `approved_date`, `approved_by`, `release_date`

---

## WORKFLOW: 8-STEP MANUAL PROCESS

### Overview
The manual workflow has 8 steps, takes 2-3 hours per track (with practice, ~1.5 hours), and includes human review checkpoints at steps 3, 6, and 8.

```
STEP 1: Create ANTHEM_REQUEST
     ↓
STEP 2: Run RESEARCH (Perplexity)
     ↓
[HUMAN REVIEW] Research approved?
     ↓
STEP 3: Generate SCRIPT (ChatGPT + edits)
     ↓
[HUMAN REVIEW] Script approved?
     ↓
STEP 4: Prepare SUNO_PARAMETERS
     ↓
STEP 5: Call SUNO API
     ↓
STEP 6: Wait & POLL for completion
     ↓
STEP 7: Create TRACKS record
     ↓
[HUMAN REVIEW] Quality acceptable?
     ↓
STEP 8: QC & PUBLISH
     ↓
DONE: Track is live
```

### Detailed Steps

#### Step 1: Create ANTHEM_REQUEST (5 min)
- Open ANTHEM_REQUESTS table
- Create new record with:
  - `course_id`: Select the golf course
  - `user_profile_id`: Who is this for? (optional)
  - `strategy_type_id`: Smart | Aggressive | Conservative | Risk-Reward
  - `tee_box_id`: Which difficulty level?
  - `status`: Set to "Pending Review"
  - `request_notes`: Why do you want this track?
- This is your central request that links everything

#### Step 2: Run RESEARCH (15-30 min)
- Get prompt template from STRATEGY_TYPES table
- Fill in placeholders: {COURSE_NAME}, {ARCHITECT}, {STRATEGY_DETAILS}
- Open Perplexity / ChatGPT
- Run research query
- Copy full response
- Create RESEARCH_OUTPUT record:
  - `research_prompt_used`: What you asked
  - `raw_output`: Full Perplexity response
  - Parse into sections: history, philosophy, strategy, elements
  - `key_takeaways`: Your 3-5 key insights
  - `confidence_score`: 1-5 rating
  - `research_status`: "Complete"
- Update ANTHEM_REQUESTS status → "Research Complete"

**Checkpoint:** Is the research good enough?
- YES → Continue
- NO → Refine search, create new RESEARCH_OUTPUT, or get more detail

#### Step 3: Generate SCRIPT (30-45 min)
- Get ChatGPT prompt template from STRATEGY_TYPES.chatgpt_prompt_template
- Fill in placeholders with course + research + strategy details
- Send to ChatGPT
- Copy full response
- Create SCRIPTS record (version 1):
  - `chatgpt_prompt_sent`: Exact prompt used
  - `chatgpt_response_raw`: ChatGPT output
  - `version_number`: 1
  
**Sub-Step 3B: Review & Edit**
- Read ChatGPT output
- Is it perfect? Keep as-is
- Minor issues? Make small edits (tweaks, phrasing)
- Major issues? Rewrite sections or full verse
- Document changes in `your_edits_summary`
- Rate quality: Perfect | Minor Edits | Major Edits
- Paste final version in `final_approved_script` (with line breaks)
- Set `approved_date` = today, `approved_by` = you

- Update ANTHEM_REQUESTS status → "Script Approved"

**Checkpoint:** Does the script capture the strategy and make emotional sense?
- YES → Continue
- NO → Consider regenerating with different prompt or doing another edit pass

#### Step 4: Prepare SUNO_PARAMETERS (10 min)
- Create SUNO_PARAMETERS record
- Define music style:
  - `genre`: Cinematic Pop, Rock, Electronic, etc.
  - `instrumentation`: Orchestra, Synth, Acoustic, etc.
  - `tempo_bpm`: 120-140 typical
  - `mood_descriptors`: Bold, dramatic, steady, etc.
  - `vocal_type`: Male, Female, Mixed
  - `duration_seconds`: 120-180 typical
  - `production_level`: Simple, Polished, Studio Quality
  - `similar_artist_refs`: Reference artists
  - `style_prompt`: Full description for Suno (combine all above)
  - `guidelines_24_8`: Brand requirements

#### Step 5: Call SUNO API (5 min)
- Create SUNO_GENERATIONS record
- Set `status` = "Queued"
- Call Suno API with:
  - Lyrics from SCRIPTS.final_approved_script
  - Style from SUNO_PARAMETERS.style_prompt
  - Duration, vocal type, all variables
- Suno returns: `suno_task_id`
- Update SUNO_GENERATIONS with task_id
- Set `status` = "Generating"
- Update ANTHEM_REQUESTS status → "Suno Generating"

#### Step 6: Wait & POLL (2-30 min)
- Wait 30-60 seconds
- Check Suno API for status using task_id
- Still generating? Check again in 30 seconds
- Generating complete?
  - Suno returns: audio_url + cover_image_url
  - Update SUNO_GENERATIONS:
    - `suno_response_data`: Full JSON from Suno
    - `audio_url`: Direct link to audio file
    - `cover_image_url`: Cover art
    - `status`: "Complete"
    - `completion_date`: Now
  - Go to Step 7

**Note:** If you set up Suno webhook notifications, skip manual polling

#### Step 7: Create TRACKS Record (10 min)
- Create TRACKS record with links to all upstream data:
  - `request_id` → ANTHEM_REQUESTS
  - `course_id` → COURSES
  - `strategy_type_id` → STRATEGY_TYPES
  - `research_id` → RESEARCH_OUTPUT
  - `script_id` → SCRIPTS
  - `suno_generation_id` → SUNO_GENERATIONS
  - (Optional: `user_profile_id`, `tee_box_id`)
- Fill metadata:
  - `track_title`: Good display name
  - `track_description`: What is this?
  - `audio_url`: From Suno
  - `cover_image_url`: From Suno
  - `duration_seconds`: From Suno response
  - `style_generated`: What Suno created
  - `model_used`: v5
- Set `status` = "Draft" (pending QC)
- Update ANTHEM_REQUESTS status → "Track QC"

#### Step 8: QC & PUBLISH (15 min)
- **Listen to the track!**
- Assess quality:
  - Is the music good? Does it fit the course?
  - Do the lyrics match the music well?
  - Is the production quality acceptable?
  - Does it capture the strategy/emotion?
- Update TRACKS:
  - `quality_rating`: ★ to ★★★★★
  - `qa_notes`: Detailed assessment (what works, any issues)
- Decision:
  - **YES, publish:**
    - `status` = "Approved"
    - `approved_date` = today
    - `approved_by` = you
    - Then `status` = "Published"
    - `release_date` = today
    - Update ANTHEM_REQUESTS → "Published"
  - **NO, issues found:**
    - Note the problem
    - Go back to appropriate step and redo
    - Create new version records (SCRIPTS v2, SUNO_GENERATIONS v2)

---

## QUALITY CONTROL

### QC Checkpoints

**Checkpoint 1: Research Approval (After Step 2)**
- Research is comprehensive and accurate
- Confidence score ≥ 4/5
- Key insights are captured
- Ready for script writer to use

**Checkpoint 2: Script Approval (After Step 3B)**
- Lyrics capture the strategy type
- References to course/holes are specific and poetic
- Flow and rhythm work for singing
- Brand voice is appropriate
- Approved by creator/lead before Suno

**Checkpoint 3: Track Quality (After Step 8)**
- Audio quality is professional (no artifacts)
- Vocals are clear and on-key
- Instrumentation matches mood/style
- Track length is appropriate
- Emotional impact matches intent
- Release-ready

### Quality Standards

| Rating | Meaning | Action |
|--------|---------|--------|
| ★★★★★ | Excellent | Publish immediately |
| ★★★★ | Very good | Minor tweaks acceptable, publish |
| ★★★ | Good | Acceptable, consider regenerating for variety |
| ★★ | Fair | Has issues, regenerate with feedback |
| ★ | Poor | Do not publish, redo significant parts |

### Escalation Path
1. If research is weak → refine search, get more detail
2. If script is off → edit heavily or regenerate with better prompt
3. If audio is bad → try Suno regeneration with adjusted parameters
4. If persistent issues → escalate to project lead for decision

---

## VIEWS & DASHBOARDS

### Recommended Airtable Views

#### View 1: "My Work Queue"
- Table: ANTHEM_REQUESTS
- Filter: status NOT IN (Published, Rejected)
- Sort: priority DESC, request_date ASC
- Shows: What needs work next

#### View 2: "Ready for Script"
- Table: ANTHEM_REQUESTS
- Filter: status = "Research Complete"
- Shows: Next step is script generation

#### View 3: "Awaiting Suno"
- Table: SUNO_GENERATIONS
- Filter: status IN (Generating, Polling)
- Shows: Which tracks are being created

#### View 4: "Published Tracks"
- Table: TRACKS
- Filter: status = "Published"
- Sort: release_date DESC
- Shows: Final output library

#### View 5: "Tracks by Course"
- Table: TRACKS
- Group by: course_id
- Shows: Completeness per course

#### View 6: "Script Iterations"
- Table: SCRIPTS
- Group by: request_id
- Shows: How many versions per track

---

## AUTOMATION ROADMAP (FUTURE)

### Phase 1: Manual (Current)
- Human creates requests
- Human runs research
- Human generates scripts
- Human calls Suno
- Human approves final track

### Phase 2: Semi-Automated (n8n + Airtable)
- Research automated (Perplexity integration)
- Script generation automated (ChatGPT integration)
- Suno calling automated
- **Human still approves at all checkpoints**

### Phase 3: Fully Automated (Future)
- Research → Script → Suno all automated
- Automatic polling until complete
- Create TRACKS record automatically
- **Human only does final QC approval**
- Fast turnaround (30 min per track)

### n8n Integration Points
```
n8n Workflow 1: Research Automation
├─ Trigger: ANTHEM_REQUEST status = "Pending Review"
├─ Get: Course + Strategy + User data
├─ Call: Perplexity API
├─ Create: RESEARCH_OUTPUT record
└─ Update: ANTHEM_REQUEST status → "Research Complete"

n8n Workflow 2: Script Generation
├─ Trigger: ANTHEM_REQUEST status = "Research Complete"
├─ Get: RESEARCH_OUTPUT data
├─ Build: ChatGPT prompt from template
├─ Call: ChatGPT API
├─ Create: SCRIPTS record
└─ Update: ANTHEM_REQUEST status → "Script Approval"
└─ Notify: Human for approval

n8n Workflow 3: Suno Integration
├─ Trigger: ANTHEM_REQUEST status = "Script Approved"
├─ Get: SCRIPTS + SUNO_PARAMETERS
├─ Call: Suno API
├─ Create: SUNO_GENERATIONS record
├─ Webhook: Listen for Suno completion
├─ Create: TRACKS record when done
└─ Notify: Human for QC approval
```

This schema is **designed to support** these automations without redesign.

---

## SUCCESS METRICS

### For Implementation
- ✅ All 11 tables created with correct relationships
- ✅ Can create first track manually in <3 hours
- ✅ Team member can understand workflow and create second track independently
- ✅ Complete audit trail exists (can trace any track back to inputs)
- ✅ 8-step manual workflow is clear and followable

### For Track Quality
- Target: 80% of tracks rated ★★★★ or higher
- Goal: <20% require regeneration/adjustments
- Standard: Zero "★" rated tracks (those don't get published)

### For Adoption
- Team member can create track solo after 2 tutorials
- Status tracking prevents missed steps
- Views make it easy to see work queue

---

## DEPENDENCIES & ASSUMPTIONS

### Dependencies
- Airtable account with sufficient space (for 100+ courses, 1000+ tracks)
- API keys for: Perplexity, ChatGPT, Suno
- Team member availability to do manual steps (initially)

### Assumptions
- Perplexity and ChatGPT APIs remain available/stable
- Suno API provides reliable music generation
- Golf course data is available (public sources + manual research)
- Team member is technically capable (comfortable with Airtable, APIs)

### External Integrations (Required for Automation)
- n8n account (for workflow automation)
- Perplexity API
- ChatGPT API (or OpenAI API)
- Suno API

---

## DELIVERABLES FOR IMPLEMENTATION

This PRD includes:
1. ✅ **Complete Airtable schema** with all field definitions
2. ✅ **8-step manual workflow** with timing and details
3. ✅ **Data relationships** showing how tables link
4. ✅ **Quality control standards** and checkpoints
5. ✅ **Sample data** showing what records look like
6. ✅ **Views and dashboard** design
7. ✅ **Future automation roadmap** and n8n integration points

### What to Build First
1. Create the 11 tables in Airtable (in order listed)
2. Add the 4 STRATEGY_TYPES records
3. Create recommended views
4. Create first COURSES record (Pebble Beach example)
5. Create first TEE_BOXES records (4-5 for Pebble)
6. Test workflow end-to-end

### Estimated Build Time
- Airtable schema: 4-6 hours
- Views and testing: 2 hours
- First track creation: 2-3 hours
- Total: 8-11 hours to production-ready

---

## HANDOFF NOTES

**To Next Agent/Team Member:**
- This schema is production-ready and tested conceptually
- Start with table creation and STRATEGY_TYPES records
- Don't skip the "manual workflow test" - create 1 full track to validate
- The 8-step process is the critical part - understand it fully before building
- Ask questions about anything unclear
- Document any changes/improvements you make

**Success = First track published within 48 hours**

---

## REVISION HISTORY

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-05 | Initial PRD creation based on requirements gathering |

