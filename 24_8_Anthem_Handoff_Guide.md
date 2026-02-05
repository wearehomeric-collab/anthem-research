# 24/8 ANTHEM AIRTABLE SYSTEM
## Implementation & Handoff Guide
**Status:** Ready to Hand Off to Implementation Agent  
**Last Updated:** February 5, 2026  
**Prepared By:** Nick (Product Lead)  
**Handoff To:** [Implementation Agent/Developer]

---

## QUICK START FOR NEXT PERSON

### What You're Building
A complete Airtable database + workflow for a golf course music generation system. The system creates custom songs for golf courses based on course data, player profiles, and strategic approaches.

### Why This Matters
Instead of manually jumping between Perplexity, ChatGPT, and Suno for each track, you'll have a unified Airtable system that:
- Tracks every step of track creation
- Creates complete audit trails (shows which data created which track)
- Provides clear checklists so nothing gets missed
- Supports future automation with n8n

### Your Goal
**Get the first complete anthem from initial request → published track within 48 hours of starting**

This validates the schema works end-to-end and teaches you the workflow.

---

## WHAT YOU'RE INHERITING

### Documentation Provided
1. **24_8_Anthem_PRD.md** - Complete product requirements (this document is the shortened version)
2. **24_8_Anthem_Final_Build_Schema.md** - Complete detailed schema with:
   - All 11 table definitions
   - Every field with descriptions
   - Example records
   - Manual workflow (8 steps with timing)
   - Quality standards
3. **This Handoff Guide** - Implementation checklist + questions

### What's Already Done
✅ Requirements gathering (strategy types defined, workflow mapped)  
✅ Schema designed (11 tables, all relationships mapped)  
✅ Workflow validated (8-step process, timing estimated)  
✅ Sample data created (example Pebble Beach records)  
✅ Quality checkpoints defined  
✅ Automation roadmap sketched (for future n8n integration)

### What You Need to Do
- [ ] Create Airtable base and tables
- [ ] Add field definitions
- [ ] Create relationships/links
- [ ] Add 4 STRATEGY_TYPES records
- [ ] Create test course (Pebble Beach)
- [ ] Create test tee boxes
- [ ] Create first anthem request
- [ ] Follow 8-step workflow
- [ ] Publish first track
- [ ] Validate and document any changes

---

## BEFORE YOU START: KEY CONCEPTS

### The 4 Strategy Types (MEMORIZE THESE)

| Strategy | Focus | Lyrical Tone | Music Tone |
|----------|-------|--------------|-----------|
| **Smart** 🧠 | Calculated play, course knowledge, strategy | Intelligent, precise, understanding | Cerebral, methodical, building |
| **Aggressive** 🔥 | Attack every hole, maximize birdies | Bold, powerful, victory | Bold, powerful, intense |
| **Conservative** 🛡️ | Avoid hazards, steady play | Stability, discipline, reliability | Steady, grounded, supportive |
| **Risk-Reward** ⚖️ | Tactical decisions hole by hole | Courage, tactical, triumph | Dramatic, building tension |

### The 8-Step Workflow

```
1. Create ANTHEM_REQUEST (5 min)
   ↓
2. Run RESEARCH with Perplexity (15-30 min)
   ↓ [HUMAN REVIEW]
3. Generate SCRIPT with ChatGPT (30-45 min)
   ↓ [HUMAN REVIEW]  
4. Prepare SUNO_PARAMETERS (10 min)
   ↓
5. Call SUNO API (5 min)
   ↓
6. Wait & POLL Suno (2-30 min)
   ↓
7. Create TRACKS record (10 min)
   ↓
8. QC & PUBLISH (15 min)

TOTAL: ~2-3 hours per track (your first will be slower ~4 hours)
```

### The Hub Table Concept
Everything links back to **ANTHEM_REQUESTS**. This is your request ID that connects:
- Course data
- User profile
- Strategy type
- Tee box
- Research output
- Script versions
- Suno generation
- Final track

If you can see the ANTHEM_REQUEST, you can trace exactly what created the track.

---

## PHASE 1: TABLE CREATION (2-3 hours)

### Step 1.1: Create New Airtable Base

```
Base Name: "24/8 Anthem"
Timezone: America/Chicago (or your timezone)
Access: Shared with team
```

### Step 1.2: Create Tables (In This Order)

Create these 11 tables. For each, first create the table, THEN add fields.

**Table 1: STRATEGY_TYPES** (4 records only)
```
Fields to add:
├─ id (Single Line Text) - Primary Key
├─ strategy_name (Single Line Text)
├─ emoji (Single Line Text)
├─ short_description (Single Line Text)
├─ full_strategy_approach (Long Text)
├─ research_focus_keywords (Single Line Text)
├─ lyrical_themes (Single Line Text)
├─ music_tone (Single Line Text)
├─ chatgpt_prompt_template (Long Text)
└─ is_active (Checkbox) - Default: TRUE

Records to Create:
1. Smart (ID: STRAT-001)
2. Aggressive (ID: STRAT-002)
3. Conservative (ID: STRAT-003)
4. Risk-Reward (ID: STRAT-004)

[Use "Final Build Schema" doc for full field values]
```

**Table 2: COURSES**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ course_name (Single Line Text) - Required
├─ architect (Single Line Text)
├─ year_built (Number)
├─ location_city (Single Line Text)
├─ location_state (Single Line Text)
├─ location_country (Single Line Text)
├─ latitude (Number)
├─ longitude (Number)
├─ par_total (Number)
├─ total_yardage (Number)
├─ holes_total (Number)
├─ course_description (Long Text)
├─ designer_intent (Long Text)
├─ strategic_elements (Long Text)
├─ signature_hole (Single Line Text)
├─ is_active (Checkbox)
└─ created_at (Date)

First Record: Pebble Beach (test data)
[See Final Build Schema for example data]
```

**Table 3: TEE_BOXES**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ course_id (Link to COURSES) - Required
├─ standard_color (Single Select) - Options: Red, White, Blue, Black, Gold, Other
├─ course_local_name (Single Line Text) - Required
├─ display_name (Formula) = CONCATENATE({standard_color}, " Tees - ", {course_local_name})
├─ yardage (Number)
├─ course_rating (Number)
├─ slope_rating (Number)
├─ par (Number)
├─ difficulty_rank (Single Select) - Options: Easiest, Medium-Easy, Medium, Medium-Hard, Hardest
├─ skill_level_for (Single Select) - Options: Beginner, Beginner-Int, Intermediate, Advanced, Expert
├─ is_primary (Checkbox)
├─ research_notes (Long Text)
└─ created_at (Date)

First Records: 4-5 tee boxes for Pebble Beach
[See Final Build Schema for example data]
```

**Table 4: HOLES**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ course_id (Link to COURSES)
├─ hole_number (Number)
├─ par (Number)
├─ handicap_index (Number)
├─ hole_name (Single Line Text)
├─ hole_description (Long Text)
├─ strategic_elements (Long Text)
├─ difficulty_descriptor (Single Line Text)
├─ signature_feature (Single Line Text)
├─ lyrical_inspiration (Long Text)
└─ created_at (Date)

First Records: 18 holes for Pebble Beach
[See Final Build Schema for sample Holes 7, 8, 18]
```

**Table 5: USER_PROFILES**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ user_email (Email)
├─ user_name (Single Line Text)
├─ handicap (Number)
├─ preferred_tee_level (Single Select) - Beginner through Expert
├─ play_style (Single Select) - Smart, Aggressive, Conservative, Risk-Reward
├─ experience_level (Single Select)
├─ strengths (Long Text)
├─ development_areas (Long Text)
├─ personality_traits (Long Text)
├─ golf_goals (Long Text)
├─ notes (Long Text)
└─ created_at (Date)

First Record: Test profile (use Nick or example)
[See Final Build Schema for example data]
```

**Table 6: ANTHEM_REQUESTS** ⭐ HUB TABLE
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ course_id (Link to COURSES) - Required
├─ user_profile_id (Link to USER_PROFILES)
├─ strategy_type_id (Link to STRATEGY_TYPES) - Required
├─ tee_box_id (Link to TEE_BOXES) - Required
├─ request_date (Date) - Default: TODAY()
├─ target_completion_date (Date)
├─ status (Single Select) - Options:
│  • Pending Review
│  • Research Started
│  • Research Complete
│  • Script Creation
│  • Script Review
│  • Script Approved
│  • Suno Generating
│  • Track QC
│  • Published
│  • On Hold
│  • Rejected
├─ priority (Single Select) - Low, Normal, High
├─ request_notes (Long Text)
├─ internal_qa_notes (Long Text)
└─ created_at (Date) - Auto: TODAY()

Don't create records yet - will do in Phase 3
```

**Table 7: RESEARCH_OUTPUT**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ request_id (Link to ANTHEM_REQUESTS)
├─ course_id (Link to COURSES)
├─ research_prompt_used (Long Text)
├─ research_tool (Single Select) - Perplexity, ChatGPT, Manual, Other
├─ research_date (Date)
├─ raw_output (Long Text)
├─ course_history (Long Text)
├─ design_philosophy (Long Text)
├─ hole_strategy_notes (Long Text)
├─ strategic_elements (Long Text)
├─ notable_characteristics (Long Text)
├─ key_takeaways (Long Text)
├─ confidence_score (Number) - 1-5 scale
├─ research_status (Single Select) - Complete, Partial, Needs More, Rejected
├─ internal_qa_notes (Long Text)
└─ created_at (Date)

Don't create records yet
```

**Table 8: SCRIPTS**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ request_id (Link to ANTHEM_REQUESTS)
├─ research_id (Link to RESEARCH_OUTPUT)
├─ version_number (Number)
├─ chatgpt_prompt_sent (Long Text)
├─ chatgpt_response_raw (Long Text)
├─ your_edits_summary (Long Text)
├─ final_approved_script (Long Text)
├─ quality_assessment (Single Select) - Perfect, Minor Edits, Major Edits, Rejected
├─ approval_date (Date)
├─ approved_by (Single Line Text)
├─ internal_notes (Long Text)
└─ created_at (Date)

Don't create records yet
```

**Table 9: SUNO_PARAMETERS**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ request_id (Link to ANTHEM_REQUESTS)
├─ genre (Single Line Text)
├─ instrumentation (Single Line Text)
├─ tempo_bpm (Single Line Text)
├─ mood_descriptors (Single Line Text)
├─ vocal_type (Single Select) - Male, Female, Mixed, Instrumental, Duet
├─ duration_seconds (Number)
├─ production_level (Single Select) - Simple, Polished, Studio Quality, Epic
├─ similar_artist_refs (Single Line Text)
├─ style_prompt (Long Text)
├─ variables (Long Text)
├─ guidelines_24_8 (Long Text)
└─ created_at (Date)

Don't create records yet
```

**Table 10: SUNO_GENERATIONS**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ request_id (Link to ANTHEM_REQUESTS)
├─ parameters_id (Link to SUNO_PARAMETERS)
├─ suno_task_id (Single Line Text)
├─ status (Single Select) - Queued, Generating, Polling, Complete, Failed
├─ polling_attempts (Number) - Default: 0
├─ last_polled_at (Date/Time)
├─ suno_response_data (Long Text)
├─ audio_url (URL)
├─ cover_image_url (URL)
├─ error_message (Long Text)
├─ completion_date (Date/Time)
├─ api_notes (Long Text)
├─ api_call_timestamp (Date/Time)
└─ created_at (Date) - Auto: TODAY()

Don't create records yet
```

**Table 11: TRACKS**
```
Fields:
├─ id (Single Line Text) - Primary Key
├─ request_id (Link to ANTHEM_REQUESTS)
├─ course_id (Link to COURSES)
├─ user_profile_id (Link to USER_PROFILES)
├─ strategy_type_id (Link to STRATEGY_TYPES)
├─ tee_box_id (Link to TEE_BOXES)
├─ research_id (Link to RESEARCH_OUTPUT)
├─ script_id (Link to SCRIPTS)
├─ suno_generation_id (Link to SUNO_GENERATIONS)
├─ track_title (Single Line Text)
├─ track_description (Long Text)
├─ audio_url (URL)
├─ audio_file_local (Single Line Text)
├─ cover_image_url (URL)
├─ duration_seconds (Number)
├─ style_generated (Single Line Text)
├─ model_used (Single Select) - v5, v4.5_plus, v4, Other
├─ lyrics_used (Long Text)
├─ status (Single Select) - Draft, Approved, Published, Archived, Rejected
├─ quality_rating (Single Select) - ★, ★★, ★★★, ★★★★, ★★★★★
├─ qa_notes (Long Text)
├─ approved_date (Date)
├─ approved_by (Single Line Text)
├─ release_date (Date)
└─ created_at (Date)

Don't create records yet
```

### Step 1.3: Verify All Links Work

After creating all tables, verify that Link fields work:
- [ ] COURSES table is created and has records
- [ ] TEE_BOXES → COURSES link works (can see list of courses)
- [ ] HOLES → COURSES link works
- [ ] ANTHEM_REQUESTS → COURSES link works
- [ ] ANTHEM_REQUESTS → STRATEGY_TYPES link works
- [ ] (Continue for all links)

**If links don't work:**
- Delete the link field
- Re-create in correct order (referenced table must exist first)
- Test again

### Step 1.4: Create Recommended Views

After all tables created, add these views:

**ANTHEM_REQUESTS table → View: "My Work Queue"**
```
Filter: status NOT IN (Published, Rejected, On Hold)
Sort: priority DESC, request_date ASC
Shows: What needs work
```

**ANTHEM_REQUESTS table → View: "Ready for Script"**
```
Filter: status = "Research Complete"
Shows: Next step is script generation
```

**SUNO_GENERATIONS table → View: "Awaiting Suno"**
```
Filter: status IN (Generating, Polling)
Shows: Which tracks are being created
```

**TRACKS table → View: "Published Tracks"**
```
Filter: status = "Published"
Sort: release_date DESC
Shows: Final output library
```

**TRACKS table → View: "Tracks by Course"**
```
Group by: course_id
Shows: Completeness per course
```

---

## PHASE 2: DATA VALIDATION (30 min)

### Step 2.1: Verify STRATEGY_TYPES Records

Open STRATEGY_TYPES table:
- [ ] 4 records created (Smart, Aggressive, Conservative, Risk-Reward)
- [ ] Each has full_strategy_approach filled in
- [ ] Each has chatgpt_prompt_template filled in
- [ ] All is_active = TRUE

**Quick Test:**
- Read Smart strategy details
- Read Aggressive strategy details
- Verify they're different and make sense

### Step 2.2: Verify COURSES/TEE_BOXES/HOLES

Open COURSES table:
- [ ] Pebble Beach created with all fields filled
- [ ] course_description is vivid and clear
- [ ] designer_intent explains Jack Neville's philosophy

Open TEE_BOXES:
- [ ] 4-5 records for Pebble Beach
- [ ] display_name formula works (shows "Blue Tees - Member" style)
- [ ] One is marked is_primary = TRUE

Open HOLES:
- [ ] 18 records created
- [ ] hole_number goes 1-18
- [ ] At least Holes 7 and 18 have lyrical_inspiration filled in (make them poetic!)

### Step 2.3: Check All Links

- [ ] Click a TEE_BOX and see course_id links to COURSES ✓
- [ ] Click course and see related TEE_BOXES load ✓
- [ ] All lookups/relationships working ✓

---

## PHASE 3: FIRST TRACK END-TO-END (3-4 hours)

This is the critical part. You're going to follow the 8-step workflow to validate everything works.

### Setup: Gather API Keys
Before starting, get these:
- [ ] Perplexity API key (or ChatGPT for research)
- [ ] ChatGPT API key (or OpenAI key)
- [ ] Suno API key (or credits for manual generation)

### Step 3.1: Create ANTHEM_REQUEST

Open ANTHEM_REQUESTS table:
```
Create new record:
├─ course_id: Pebble Beach
├─ user_profile_id: [Your test profile]
├─ strategy_type_id: Smart (STRAT-001)
├─ tee_box_id: Pebble Beach - White Tees (Member)
├─ status: Pending Review
├─ priority: High
├─ request_notes: "Test anthem for Smart strategy at Pebble White Tees"
└─ target_completion_date: Tomorrow

Save and note the request ID
```

**Status after Step 1:** Request created, waiting for research

### Step 3.2: Run RESEARCH

Get Smart strategy's research prompt template from STRATEGY_TYPES:
```
Template example:
"Research Pebble Beach Golf Links for an intelligent, strategic player...
Focus on: 1) Jack Neville's design philosophy...
2) Strategic elements...
3) Course management approach for White Tees...
..."
```

Fill in placeholders:
- {COURSE_NAME} = "Pebble Beach Golf Links"
- {ARCHITECT} = "Jack Neville"
- {YEAR} = "1919"
- {STRATEGY_DETAILS} = [From STRATEGY_TYPES Smart record]

Open Perplexity (or ChatGPT):
- [ ] Copy the prompt and run it
- [ ] Copy the full response

Create RESEARCH_OUTPUT record:
```
├─ request_id: [Link to your ANTHEM_REQUEST]
├─ course_id: Pebble Beach
├─ research_prompt_used: [Paste your prompt]
├─ raw_output: [Paste full Perplexity response]
├─ course_history: [Extract from raw output]
├─ design_philosophy: [Extract from raw output]
├─ hole_strategy_notes: [Extract from raw output]
├─ key_takeaways: [YOUR summary - 3-5 key insights]
├─ confidence_score: 5 (should be good for Pebble)
├─ research_status: Complete
└─ internal_qa_notes: "Good research on design intent"
```

Update ANTHEM_REQUESTS:
- [ ] status = "Research Complete"

**Status after Step 2:** Research complete, ready for script

### Step 3.3: Generate SCRIPT

Get ChatGPT prompt template from STRATEGY_TYPES Smart record:
```
Template example:
"Create lyrics for a SMART/STRATEGIC anthem for Pebble Beach...
This anthem is for the intelligent golfer who:
- Understands course design and architect's intent
- Manages risk carefully
- Thinks 2-3 shots ahead

COURSE CONTEXT:
[Key takeaways from research]

Create lyrics that:
1. Reference the course's strategic elements
2. Celebrate intelligent play
3. Emphasize precision
4. Include Hole 7 and Hole 18 references
..."
```

Fill in placeholders:
- {COURSE_NAME}
- {ARCHITECT}
- {RESEARCH_DATA} = key_takeaways from RESEARCH_OUTPUT
- {STRATEGY_DETAILS}

Open ChatGPT:
- [ ] Paste prompt and generate
- [ ] Copy full response

Create SCRIPTS record (v1):
```
├─ request_id: [Link to ANTHEM_REQUEST]
├─ research_id: [Link to RESEARCH_OUTPUT]
├─ version_number: 1
├─ chatgpt_prompt_sent: [Paste your prompt]
├─ chatgpt_response_raw: [Paste ChatGPT output]
└─ [Leave other fields empty for now]
```

**READ & EVALUATE ChatGPT OUTPUT:**
- [ ] Does it feel strategic/intelligent?
- [ ] Does it reference course/holes?
- [ ] Does it flow like song lyrics?
- [ ] Any bad sections?

**Edit if needed (Sub-step 3.3B):**
If perfect: Skip to next step

If minor issues:
- [ ] Make small edits (fix phrasing, improve rhyme)
- [ ] Set quality_assessment = "Minor Edits"

If major issues:
- [ ] Rewrite sections or full verses
- [ ] Set quality_assessment = "Major Edits"

In SCRIPTS record:
```
├─ your_edits_summary: "Reworded Verse 1 to emphasize reading the course. 
   Added Hole 7 reference for emotional impact."
├─ final_approved_script: [Paste final version WITH LINE BREAKS]
   [VERSE 1]
   Line 1
   Line 2
   ...
├─ approval_date: [Today's date]
├─ approved_by: [Your name]
└─ quality_assessment: [Perfect | Minor Edits | Major Edits]
```

Update ANTHEM_REQUESTS:
- [ ] status = "Script Approved"

**Status after Step 3:** Script ready for Suno

### Step 3.4: Prepare SUNO_PARAMETERS

Create SUNO_PARAMETERS record:
```
├─ request_id: [Link to ANTHEM_REQUEST]
├─ genre: "Cinematic Pop"
├─ instrumentation: "Orchestra with electronic elements"
├─ tempo_bpm: "120-140 BPM"
├─ mood_descriptors: "Bold, dramatic, building energy"
├─ vocal_type: "Mixed"
├─ duration_seconds: 150
├─ production_level: "Studio Quality"
├─ similar_artist_refs: "Coldplay, Hans Zimmer"
├─ style_prompt: [Build from above fields into full description]
   "Genre: Cinematic Pop
    Instrumentation: Full orchestra with synth backing
    Tempo: 120-140 BPM, building energy
    Mood: Bold, dramatic, building to triumphant
    Vocal: Mixed (male/female harmony)
    Duration: 150 seconds
    Style: In the style of Coldplay meets Hans Zimmer
    Overall: Anthemic, strategic, intelligent..."
├─ variables: "- Include strings prominently
              - Build to climax
              - Broadcast quality"
└─ guidelines_24_8: "Must be professional, memorable, suitable for marketing"
```

**Status after Step 4:** Parameters set, ready for Suno

### Step 3.5: Call SUNO API

Create SUNO_GENERATIONS record:
```
├─ request_id: [Link to ANTHEM_REQUEST]
├─ parameters_id: [Link to SUNO_PARAMETERS]
├─ status: "Queued"
└─ api_call_timestamp: [Now]
```

Call Suno API:
- [ ] Send lyrics from SCRIPTS.final_approved_script
- [ ] Send style from SUNO_PARAMETERS.style_prompt
- [ ] Send duration, vocal type, all other variables
- [ ] Suno returns: task_id

Update SUNO_GENERATIONS:
```
├─ suno_task_id: [Paste the task_id from Suno]
├─ status: "Generating"
└─ api_notes: "Initial call made, waiting in queue"
```

Update ANTHEM_REQUESTS:
- [ ] status = "Suno Generating"

**Status after Step 5:** Suno generating music

### Step 3.6: Wait & POLL

Wait 30-60 seconds, then check Suno status:
- [ ] Query Suno API: GET /api/music/{suno_task_id}

If still generating:
- [ ] Update polling_attempts = 1
- [ ] Update last_polled_at = now
- [ ] Wait 30 seconds
- [ ] Check again

Repeat until complete (usually 2-15 minutes)

When Suno returns complete:
```
Update SUNO_GENERATIONS:
├─ status: "Complete"
├─ suno_response_data: [Paste full Suno JSON response]
├─ audio_url: [From response]
├─ cover_image_url: [From response]
├─ completion_date: [Timestamp]
└─ api_notes: "Generation completed successfully"
```

**Status after Step 6:** Audio generated, ready for track creation

### Step 3.7: Create TRACKS Record

Create TRACKS record:
```
├─ request_id: [Link to ANTHEM_REQUEST] ← everything traces back
├─ course_id: [Link to COURSES - Pebble Beach]
├─ user_profile_id: [Your test profile]
├─ strategy_type_id: [Link to STRATEGY_TYPES - Smart]
├─ tee_box_id: [Link to TEE_BOXES - White Tees]
├─ research_id: [Link to RESEARCH_OUTPUT]
├─ script_id: [Link to SCRIPTS]
├─ suno_generation_id: [Link to SUNO_GENERATIONS]
├─ track_title: "Pebble Beach - Smart Strategy"
├─ track_description: "Strategic anthem celebrating intelligent play at Pebble Beach"
├─ audio_url: [From SUNO_GENERATIONS]
├─ cover_image_url: [From SUNO_GENERATIONS]
├─ duration_seconds: [From Suno response]
├─ style_generated: "Cinematic Pop with Orchestral Elements"
├─ model_used: "v5"
├─ lyrics_used: [Link to SCRIPTS or paste full lyrics]
├─ status: "Draft"
└─ created_at: [Today]
```

Update ANTHEM_REQUESTS:
- [ ] status = "Track QC"

**Status after Step 7:** Track created, ready for quality check

### Step 3.8: QC & PUBLISH

**LISTEN TO THE TRACK!**
- [ ] Download or stream audio_url
- [ ] Listen from start to finish
- [ ] Take notes on what you hear

**Assess Quality:**
```
Questions to ask yourself:
□ Is the music production professional (no artifacts/glitches)?
□ Are the vocals clear and on-key?
□ Does the music match the "strategic" theme?
□ Do the lyrics match the music well?
□ Is the emotional arc compelling?
□ Would you be proud to publish this?
□ Does it celebrate Pebble Beach appropriately?
□ Is the production quality broadcast-ready?
```

**Rate it:**
- ★★★★★ = Excellent, publish immediately
- ★★★★ = Very good, minor tweaks acceptable
- ★★★ = Good, acceptable
- ★★ = Has issues, regenerate with feedback
- ★ = Poor, do not publish

**Update TRACKS:**
```
├─ quality_rating: [Your rating]
├─ qa_notes: [Detailed notes]
   "★★★★★ - Suno nailed this. The orchestral arrangement perfectly 
   captures the strategic, intelligent feel. Vocals blend beautifully.
   References to course and holes work emotionally. This is ready for 
   release."
├─ status: "Approved"
├─ approved_date: [Today]
└─ approved_by: [Your name]
```

**If approved:**
```
Update status: "Published"
Set release_date: [Today]
```

Update ANTHEM_REQUESTS:
- [ ] status = "Published"

**🎉 TRACK IS LIVE!**

---

## WHAT TO DOCUMENT AFTER FIRST TRACK

### Document What You Learn

After completing your first track, write down:

1. **Timing Reality Check**
   - How long did each step actually take?
   - Where did you get stuck?
   - What was slower/faster than estimated?

2. **Process Issues Found**
   - Did any links not work as expected?
   - Did any field definitions need clarification?
   - Was the workflow clear or confusing?

3. **Data Quality Issues**
   - Was Pebble Beach sample data good?
   - Did ChatGPT script generation work well?
   - Any Suno quality issues?

4. **Improvements for Next Time**
   - How would you speed this up?
   - What field should we add?
   - What views would help?

5. **Questions/Blockers**
   - What wasn't clear in the schema?
   - What do you need to know for track #2?
   - Any integration issues?

**Save all notes** - Will help with future improvements

---

## AFTER PHASE 3: NEXT STEPS

### If First Track Succeeded ✅
1. Create 2-3 more tracks to validate workflow
2. Document any process improvements
3. Train another team member
4. Start planning n8n automation

### If Issues Found ❌
1. Document exactly what failed
2. Fix the schema issue
3. Test the fix with another track
4. Update documentation

### Quick Wins to Implement Next
- [ ] Add workflow checklist template
- [ ] Create "Quick Start" card in first ANTHEM_REQUEST
- [ ] Add formula to auto-calculate request ID
- [ ] Create dashboard view with status overview
- [ ] Document ChatGPT prompt templates

---

## TROUBLESHOOTING GUIDE

### Problem: Links Between Tables Don't Work

**Symptom:** When you click a link field, the referenced table doesn't show

**Solution:**
1. Check that referenced table exists (COURSES must exist before TEE_BOXES)
2. Delete the link field
3. Recreate the link field
4. Ensure names match exactly

### Problem: ChatGPT Script is Bad

**Symptom:** The lyrics don't capture the strategy or don't read well

**Solution:**
1. Go back and check RESEARCH_OUTPUT - is research good?
   - If research is weak: Redo research with better prompt
   - If research is good: Continue
2. Edit the ChatGPT prompt template:
   - Add more specific examples
   - Emphasize what worked well before
   - Reference specific holes/course elements
3. Regenerate script with improved prompt
4. Create new SCRIPTS v2 record

### Problem: Suno Generation Takes Too Long

**Symptom:** Been waiting >30 minutes and still generating

**Solution:**
1. Check Suno API status directly (not just in Airtable)
2. If >1 hour: Something might be stuck
3. Try canceling and regenerating with simpler parameters
4. If persistent: Check Suno service status
5. Contact Suno support if their service is down

### Problem: Quality Rating is Low Stars

**Symptom:** You don't like the output (★ or ★★)

**Solution:**
1. Identify the specific issue:
   - Research problem → Redo research step
   - Script problem → Redo script step + regenerate
   - Music problem → Regenerate with different Suno parameters
2. Create new version records
3. Don't publish low-rated tracks
4. Learn from what didn't work

### Problem: Can't Find Your Data

**Symptom:** Can't see the ANTHEM_REQUEST or TRACKS you created

**Solution:**
1. Check which view you're in (might be filtered)
2. Switch to "All" or unfiltered view
3. Search by request ID or course name
4. Check if status filter is hiding it (maybe status = Draft)

---

## KEY CONTACTS & RESOURCES

### Who to Ask If Stuck

**Schema Questions:**
- Refer to: 24_8_Anthem_Final_Build_Schema.md

**Workflow Questions:**
- Refer to: 24_8_Anthem_PRD.md (Workflow section)

**API Integration Questions:**
- Perplexity docs: https://docs.perplexity.ai
- ChatGPT/OpenAI: https://platform.openai.com/docs
- Suno API: [Check Suno documentation for your account]

### Tools You'll Need
- [ ] Airtable account (free tier okay for now)
- [ ] Perplexity API key OR ChatGPT API key
- [ ] Suno API key (or credits for generation)
- [ ] Text editor (for prompt writing)
- [ ] Browser (Chrome/Firefox recommended)

---

## SUCCESS CHECKLIST

### Deliverables Checklist

- [ ] All 11 Airtable tables created
- [ ] STRATEGY_TYPES records created (4 records)
- [ ] COURSES, TEE_BOXES, HOLES created for Pebble Beach
- [ ] All links between tables working
- [ ] Views created (Work Queue, Ready for Script, etc.)
- [ ] First ANTHEM_REQUEST created and status tracked
- [ ] Research completed and stored in RESEARCH_OUTPUT
- [ ] Script generated, edited, and stored in SCRIPTS
- [ ] Suno parameters created
- [ ] Suno API called successfully
- [ ] Audio generated and stored
- [ ] TRACKS record created with full audit trail
- [ ] Track QC'd and published (status = Published)
- [ ] First track is LIVE ✅

### Performance Metrics
- Airtable schema build time: 4-6 hours
- First track creation time: 2-4 hours (yours will be slower - normal!)
- Total time to first publication: ~8 hours (with breaks)
- Track quality target: ★★★★ or better

---

## FINAL HANDOFF NOTES

### What Success Looks Like
✅ You can explain the 8-step workflow from memory  
✅ You know what each of the 11 tables does  
✅ You've created a full track from request → published  
✅ You understand the audit trail (request → research → script → suno → track)  
✅ You can answer "what data created this track?" for any published track  

### What to Do Next
1. Create 2-3 more tracks to practice
2. Identify any schema changes needed
3. Document lessons learned
4. Plan n8n automation (Phase 2)
5. Train another team member

### Red Flags to Watch For
🚩 First track takes >8 hours - you're stuck somewhere  
🚩 Can't trace where track data came from - audit trail broken  
🚩 ChatGPT scripts consistently bad - need prompt template improvement  
🚩 Suno generations often fail - API integration issue  
🚩 Team member needs >3 attempts to create track - workflow too complex  

---

## CONCLUSION

**You've been given everything you need.** The schema is complete, the workflow is documented, the sample data is ready.

**Your job:** Build it and validate it works.

**Timeline:**
- Day 1: Tables (4-6 hours)
- Day 1-2: First track (2-4 hours)
- Day 2: Second & third tracks (practice)
- Day 3: Training & next phase planning

**Remember:**
- The schema is good, but you might find improvements
- Document what you learn
- The 8-step workflow is the critical part - understand it deeply
- Quality control matters - don't publish ★ or ★★ tracks
- This is the foundation for automation - build it right

**Questions?** Refer back to:
1. **PRD** - For "why" and product vision
2. **Final Build Schema** - For field details and sample data
3. **This Handoff Guide** - For implementation steps

Good luck! You've got this. 🚀

---

**Document Version:** 1.0  
**Last Updated:** February 5, 2026  
**Ready for Implementation:** ✅ YES  
**Status:** HANDED OFF

