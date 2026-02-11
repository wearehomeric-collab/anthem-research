---
description: Create a new anthem request in Airtable and kick off the pipeline
argument-hint: <course-name> <strategy-type>
---

# /new-anthem Command

Create a new ANTHEM_REQUEST record in Airtable for the specified course and strategy.

## Steps

1. **Validate inputs:**
   - Look up the course name in the COURSES table. If not found, list available courses and ask user to pick one.
   - Validate strategy type is one of: Smart, Aggressive, Conservative, Risk-Reward. If not provided, ask user to pick.

2. **Gather optional info:**
   - Ask if there's a specific user profile to link (or skip for generic course anthem)
   - Ask which tee box (show available options from TEE_BOXES for this course). If unsure, use the `is_primary = TRUE` tee box.
   - Ask for any special notes or direction for the anthem

3. **Create the ANTHEM_REQUEST record:**
   - Generate ID: `REQ-{YYYYMMDD}-{course-id}-{strategy}`
   - Set `status` = "Pending Review"
   - Set `priority` = "Normal" (unless user specifies High)
   - Set `request_date` = today
   - Link course_id, strategy_type_id, tee_box_id, user_profile_id

4. **Confirm to user:**
   - Display the request ID
   - Show what was linked (course, strategy, tee box)
   - Show the current status
   - Suggest next step: "Run `/research-course` to start research for this request"

## Environment Requirements

- `AIRTABLE_PAT` and `AIRTABLE_BASE_ID` must be set in `.env`

## Example Usage

```
/new-anthem Pebble Beach Smart
/new-anthem "Augusta National" Aggressive
/new-anthem  (interactive — will ask for course and strategy)
```
