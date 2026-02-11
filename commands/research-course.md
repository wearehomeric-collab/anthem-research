---
description: Run course research for an anthem request (initial or deep)
argument-hint: <request-id> [--deep]
---

# /research-course Command

Run research for an existing ANTHEM_REQUEST. By default runs initial broad research. Use `--deep` for strategy-specific deep research.

## Steps

1. **Validate the request:**
   - Look up the request ID in ANTHEM_REQUESTS
   - Verify status is appropriate (Pending Review or Research Started)
   - Load linked course, strategy type, and tee box data

2. **Determine research type:**
   - No `--deep` flag: Run the **Research Initial** agent (broad course overview)
   - With `--deep` flag: Run the **Research Deep** agent (strategy-specific deep dive)
   - If initial research already exists and `--deep` is specified, the deep agent builds on existing research

3. **Execute the research agent:**
   - Initial: Triggers `skills/research-initial/SKILL.md`
   - Deep: Triggers `skills/research-deep/SKILL.md`
   - Both agents read their `memory.md` for learnings from previous runs

4. **Store results:**
   - Create RESEARCH_OUTPUT record in Airtable
   - Parse raw output into structured sections (course_history, design_philosophy, etc.)
   - Set confidence_score based on quality
   - Set research_status

5. **Update ANTHEM_REQUEST:**
   - If initial: status -> "Research Started"
   - If deep and quality >= 4: status -> "Research Complete"
   - If deep and quality < 4: keep status, note that more research may be needed

6. **Report to user:**
   - Show key_takeaways
   - Show confidence_score
   - Suggest next step based on quality

## Example Usage

```
/research-course REQ-20260205-COURSE-Pebble-1919-Smart
/research-course REQ-20260205-COURSE-Pebble-1919-Smart --deep
```
