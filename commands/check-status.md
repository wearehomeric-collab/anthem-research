---
description: Check the status of anthem requests and the pipeline
argument-hint: [request-id]
---

# /check-status Command

Check the status of one or all anthem requests.

## Without request-id: Show Dashboard

Query ANTHEM_REQUESTS and display:

### Work Queue
- All requests NOT in Published/Rejected/On Hold status
- Sorted by priority DESC, request_date ASC
- Show: request_id, course_name, strategy, status, priority

### Format:
```
WORK QUEUE (3 active requests)
--------------------------------------------------------------
| ID                                    | Course       | Strategy | Status           | Priority |
| REQ-20260205-COURSE-Pebble-1919-Smart | Pebble Beach | Smart    | Research Complete | High     |
| REQ-20260206-COURSE-Augusta-1933-Aggr | Augusta      | Aggressive| Pending Review   | Normal   |
| REQ-20260206-COURSE-StAndrews-Risk    | St Andrews   | Risk-Reward| Script Creation | Normal   |

RECENTLY PUBLISHED (last 5)
--------------------------------------------------------------
| Track Title                        | Course       | Rating | Published  |
| Pebble Beach - Smart Strategy      | Pebble Beach | 5 star | 2026-02-05 |
```

## With request-id: Show Full Detail

Query the specific request and ALL linked records:

```
REQUEST: REQ-20260205-COURSE-Pebble-1919-Smart
Status: Research Complete
Course: Pebble Beach Golf Links (Jack Neville, 1919)
Strategy: Smart
Tee Box: White Tees - Member (6656 yds)
User: Nick (Handicap 6)

PIPELINE:
  [x] Request Created (2026-02-05)
  [x] Initial Research (confidence: 4/5)
  [x] Deep Research (confidence: 5/5)
  [ ] Script Generation (not started)
  [ ] Script Approval (waiting)
  [ ] Suno Parameters (not started)
  [ ] Music Generation (not started)
  [ ] QC & Publish (not started)

NEXT STEP: Generate script. Run: /research-course {id} --deep OR proceed to script generation.
```

## Environment Requirements

- `AIRTABLE_PAT` and `AIRTABLE_BASE_ID` must be set in `.env`
