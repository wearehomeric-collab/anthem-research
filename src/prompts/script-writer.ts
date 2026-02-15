/**
 * Course Anthem Script/Lyric Writer Prompt (ChatGPT)
 * Generates full anthem script from deep research data.
 * Output follows the 24/8 tempo framework with production cues,
 * structured sections, and bracket instructions.
 * This is the code default — can be overridden by AI_LAB record
 * with prompt_type "Script/Lyric" and is_current_default checked.
 */

export const PROMPT_ID = "AILAB-SCRIPT";

export interface ScriptWriterVars {
  courseName: string;
  researchData: string;
  strategyName: string;
  playerName: string;
  musicStyle: string;
}

export function buildPrompt(vars: ScriptWriterVars): string {
  return `Create the ${vars.courseName} anthem in the signature 24/8 tempo by Gulick. Include all science, tones, BPM, sidechain instructions to get the tracks in the zone. Use the correct structure, timing, pace, and bracket instructions.

MUSIC STYLE: ${vars.musicStyle}
STRATEGY APPROACH: ${vars.strategyName}
PLAYER: ${vars.playerName}

RESEARCH DATA:
${vars.researchData}

ANTHEM STRUCTURE RULES:

1. SYSTEM / AUDIO SCIENCE SETUP (read by producer, not sung):
   - Tempo: locked BPM (typically 108-116 range)
   - Swing Ratio: 24 frames back / 8 frames through (3:1)
   - Groove: 4/4, heavy emphasis on beats 2 and 4
   - Sidechain: Kick -> bass + pads (medium attack, fast release) for forward motion without rush
   - Low End: Clean, tight, no bloom — mirrors the course character
   - High End: Match the course vibe (airy, aggressive, restrained, etc.)
   - Neuro Intent: Dopamine stability > adrenaline spikes
   - Mental Cue: a short phrase capturing the course feel
   - Use Case: warm-up, range session, first three holes, reset moments
   - "Do NOT speed sections up. This track breathes."

2. INTRO — CINEMATIC SPOKEN (no drums, low pad pulse):
   - 6-12 lines of spoken word establishing the course identity
   - Reference founding history, architects, and what makes it unique
   - Set the emotional tone (intimidation, elegance, wildness, etc.)
   - End with the 24/8 tempo callout:
     "Twenty-four back. Eight through. Three to one."
     Plus a course-specific closer line

3. DROP — drums in, sub pulse locked (bracket instruction only)

4. FRONT NINE — themed section title in brackets:
   - Verse 1 (Holes 1-3): 6 lines covering strategy, personality, key decisions
   - Post-verse breath: 2 lines, half bar drop
   - Verse 2 (Holes 4-6): 6 lines
   - Verse 3 (Holes 7-9): 6 lines

5. CHORUS — full energy, no rush:
   - 8-10 lines
   - Must include "twenty-four back" and "three-to-one" references
   - Course-specific imagery woven into the tempo message
   - Catchy, repeatable, anthemic

6. BACK NINE — themed section title in brackets:
   - Verse 4 (Holes 10-11): 4 lines
   - Verse 5 (Holes 12-13 or signature stretch): 6 lines with intensity drop, add low strings
   - Micro-chorus: 3 lines, stripped, vocal only
   - Verse 6 (Holes 14-16): 6 lines
   - Verse 7 (Holes 17-18): 6 lines, full build

7. FINAL CHORUS — wide, anthemic, controlled:
   - Variation of main chorus with closing imagery
   - Reference the course's defining feature one last time
   - End with conviction

8. OUTRO — spoken, drums fade, pad holds:
   - 4-6 lines of reflection
   - Repeat the 24/8 tempo callout
   - Final line carries off the course

WRITING RULES:
- Every hole gets covered — each hole should have 1-3 lines capturing its strategy and personality
- Reference specific course features, landmarks, hazards, and emotions from the research
- Include player-specific strategy references (club choices, distances, layup decisions)
- Keep it singable — rhythm, meter, natural phrasing for the verses
- Spoken sections should feel cinematic, not rushed
- The emotional arc should mirror playing 18 holes: opening nerves, settling in, signature moments, grind, dramatic finish
- Use bracket instructions throughout: [VERSE 1], [POST-VERSE BREATH], [CHORUS], [DROP], etc.
- Include production cues in brackets where intensity changes
- Total script should be 4000-6000 characters
- Do NOT rush. The track breathes. Three-to-one ratio in everything.`;
}
