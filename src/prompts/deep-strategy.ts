/**
 * Deep Strategy Research Prompt (Perplexity)
 * Rich, narrative course research for feeding the lyrics engine.
 * Player-specific strategy based on tee box, club distances, and strategy approach.
 * This is the code default — can be overridden by AI_LAB record
 * with prompt_type "Strategy" and is_current_default checked.
 */

export const PROMPT_ID = "AILAB-RESEARCH-DEEP";

export interface DeepStrategyVars {
  courseName: string;
  eventName: string;
  location: string;
  teeName: string;
  teeYardage: number;
  holeData: string;
  playerName: string;
  driverCarry: number;
  driverTotal: number;
  threeWoodCarry: number;
  hybridCarry: number;
  fiveIronCarry: number;
  sevenIronCarry: number;
  pwCarry: number;
  shotShape: string;
  missBias: string;
  preferredApproachDistances: string;
  layupStrategy: string;
  strategyName: string;
  strategyApproach: string;
}

export function buildPrompt(vars: DeepStrategyVars): string {
  return `You are an expert golf course historian and strategy architect. This is the RESEARCH PHASE ONLY for a creative project. The content will later be fed into a lyrics engine to create a song/track about the course and each hole. Do a deep, exhaustive research dive on the following golf course and event:

Course name: ${vars.courseName}
${vars.eventName ? `Event: ${vars.eventName}` : ""}
Location: ${vars.location}
Tees to focus on: ${vars.teeName} (Playing ${vars.teeYardage} yards)

Do NOT limit word count or level of detail. The goal is rich, vivid, insightful information that fully captures the course's story, personality, and strategy.

STRUCTURE THE OUTPUT INTO CLEAR SECTIONS AS FOLLOWS:

Course overview
Provide a short but vivid overview (3-6 sentences) of:
The course's overall vibe and identity (e.g., desert, parkland, links, coastal, resort, private, daily-fee, etc.)
Design style and major characteristics (terrain, scenery, overall difficulty, signature elements)
The kind of emotional/visual experience a player can expect (drama, intimidation, beauty, fun, etc.)

History, prestige, and key facts
Provide a detailed, well-organized section (bullets or short paragraphs) covering:
Opening year, original architects, and any later redesigns or renovations (with dates and who did the work).
Ownership and context (e.g., part of a multi-course facility, resort, club history).
Notable tournaments and events hosted (professional, college, amateur, team events, famous matches), including approximate years and any famous winners or moments.
Rankings and accolades (e.g., "Top 100 You Can Play," state rankings, magazine features, awards).
Signature features that make the course prestigious or unique:
Landscape (mountains, ocean, desert, forests, box canyons, rivers, etc.)
Architectural quirks (template holes, risk-reward par 5s, island greens, heroic carries, unusual greens, etc.)
Any famous or infamous holes and why they are talked about.
Any notable pros, architects, or personalities associated with the course.
Any cultural/clubhouse elements that contribute to prestige (music, events, traditions, legendary 19th hole, etc.).

Full course strategy and playing insights (from ${vars.teeName})
Before going into individual holes, give an overall strategic and experiential breakdown of the course from the chosen tees, including:
Overall difficulty from those tees (e.g., suitable for scratch, low-mid handicaps, strong test for average golfers, etc.).
Repeated strategic themes:
Types of hazards that dominate (water, desert, deep rough, trees, tight corridors, cavernous bunkers, ravines, canyons, OB, etc.).
Typical approach-shot demands (e.g., elevated greens, run-offs, false fronts, multi-tiered greens, heavy contouring).
Typical tee-shot demands (forced carries, narrow landing areas, layup vs. bomb, doglegs that favor fade/draw).
General wind patterns if relevant and how they affect play.
How front nine and back nine differ in character and difficulty.
What kind of player the course suits (e.g., accurate vs. long, great wedge player vs. great putter).
Key "turning point" stretches (e.g., "brutal middle stretch," "iconic closing three," "birdie chances before the tough finish").
Any notable risk-reward decisions that define the course identity.

Full hole strategy overview (front nine and back nine)
Create a section that goes hole by hole in a concise overview format, summarizing strategy but still rich enough to be useful for lyrics. For each hole from the ${vars.teeName}, include:
Hole number, par, and approximate yardage from the chosen tees.
One or two sentences capturing:
The visual impression and personality of the hole.
The main strategic idea (layup vs. attack, safe vs. heroic line, ideal miss).
The most important hazards or trouble areas and how they influence decision-making.

Format this section like:

Front Nine - High-Level Strategy
Hole 1 - Par X (~YYY yards): [1-2 sentences of high-level strategy, personality, and key hazards.]
Hole 2 - Par X (~YYY yards): [1-2 sentences...]
...
Hole 9 - Par X (~YYY yards): [1-2 sentences...]

Back Nine - High-Level Strategy
Hole 10 - Par X (~YYY yards): [1-2 sentences...]
...
Hole 18 - Par X (~YYY yards): [1-2 sentences...]

This section should read like a fast "tour" of the course, emphasizing personality + strategy.

Detailed hole-by-hole strategy (lyrics-ready template format)
Now create a more detailed section that breaks down EACH HOLE individually in the exact templated format below, from the [${vars.teeName}] tees. For each hole, include:
Hole number
Par
Yardage from the specified tees (exact if available; otherwise, best available approximate)
Tee Shot: specific club suggestions by typical player (e.g., Driver/3-wood/Hybrid), ideal line, target, and what to avoid.
Ideal Play: how the hole "should" be played strategically (conservative vs. aggressive lines, when to lay up, where to leave the ball around the green, ideal approach lines, preferred side of fairway, how to attack different pin positions).
Hazards: all key hazards and trouble areas (bunkers, water, desert, ravines, OB, trees, bad angles, shelves on the green, severe slopes, run-off areas, etc.), and why they matter.

Use this exact structure and labeling for each hole:

Hole 1 - Par X [YYY yards]
Tee Shot: ...
Ideal Play: ...
Hazards: ...

Hole 2 - Par X [YYY yards]
Tee Shot: ...
Ideal Play: ...
Hazards: ...

...continue this exact pattern through Hole 18...

Player Strategy:
Player: ${vars.playerName}
Driver: ${vars.driverCarry} carry / ${vars.driverTotal} total
3-Wood: ${vars.threeWoodCarry} yards carry
5-Iron: ${vars.fiveIronCarry} carry
7-Iron: ${vars.sevenIronCarry} carry
PW: ${vars.pwCarry} carry
Shot shape: ${vars.shotShape}
Miss bias: ${vars.missBias}
Preferred approach/layup distances: ${vars.preferredApproachDistances}
${vars.layupStrategy}

Strategy Approach: ${vars.strategyName}
${vars.strategyApproach}

Make sure club suggestions and strategies feel realistic for THIS player's distances from [${vars.teeName}], and that the descriptions are vivid enough to help an artist write lyrics that bring each hole to life.

Extra color and storytelling details (optional but encouraged)
Add any additional details that could inspire lyrics, such as:
Nicknames of holes or stretches of holes.
Famous shots, collapses, or comebacks on specific holes.
Unique visuals (mountain backdrop, skyline, wildlife, ocean cliffs, canyons, trees, sunsets).
Any local sayings, legends, or lore about particular holes.
Emotional themes: intimidation, redemption, temptation, serenity, chaos, etc. at different parts of the course.

Throughout the entire response, prioritize:
Accuracy and depth over brevity.
Vivid, descriptive language that paints clear pictures of each hole and the overall experience.
Strategic clarity so a golfer could truly "game plan" a round AND a songwriter could translate that into powerful lyrics.`;
}
