# Anthem Workflow Orchestrator - Memory & Learnings

This file is updated after each full pipeline run. Read this FIRST before orchestrating a new anthem.

---

## Pipeline-Level Patterns

(What patterns emerge across the full pipeline?)

### Research -> Script Quality Correlation
- Does higher research confidence always produce better scripts?
- What research gaps cause the most script problems?

### Script -> Music Quality Correlation
- Do certain lyric structures produce better Suno output?
- What script elements help or hurt music quality?

### Bottleneck Observations
- Which step takes longest?
- Where do failures most often occur?
- Which human gates slow things down most?

## Gate Check Learnings

### Research Gate (confidence >= 4)
- How often does initial research need re-running?
- Common reasons for low confidence:

### Script Approval Gate
- How often do scripts get approved on v1?
- Most common human feedback themes:

### Track QC Gate
- Average quality rating on first generation:
- Most common reasons for rejection:

## Strategy-Specific Pipeline Notes

### Smart Strategy Runs
- Typical end-to-end time:
- Common issues:

### Aggressive Strategy Runs
- Typical end-to-end time:
- Common issues:

### Conservative Strategy Runs
- Typical end-to-end time:
- Common issues:

### Risk-Reward Strategy Runs
- Typical end-to-end time:
- Common issues:

## Course-Type Pipeline Notes

(Do certain course types flow through the pipeline differently?)

## Improvement Ideas

(How to make the overall pipeline faster or higher quality?)

---

## Run Log

Format for each entry:
```
### [Date] - [Course Name] - [Strategy Type]
- Total pipeline time: Xh Xm
- Research confidence: initial X/5, deep X/5
- Script version approved: vX
- Script quality: Perfect / Minor / Major
- Suno attempts: X
- Track quality rating: X/5 stars
- Published: yes/no
- Key learning: ...
```
