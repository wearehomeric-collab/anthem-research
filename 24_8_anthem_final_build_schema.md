# 24/8 Anthem Airtable - FINAL BUILD SCHEMA
## Ready to implement (February 2026)

---

## QUICK START: TABLE CREATION ORDER

```
1. STRATEGY_TYPES (create first - only 4 records)
2. COURSES
3. TEE_BOXES
4. HOLES
5. USER_PROFILES
6. ANTHEM_REQUESTS (hub table - everything links to this)
7. RESEARCH_OUTPUT
8. SCRIPTS
9. SUNO_PARAMETERS
10. SUNO_GENERATIONS
11. TRACKS
```

**Recommended:** Create in this order so all links work properly.

---

# TABLE 1: STRATEGY_TYPES
## Define the 4 strategy approaches

```
BASE FIELDS:
├─ id (Single Line Text) 
│  Values: STRAT-001, STRAT-002, STRAT-003, STRAT-004
│
├─ strategy_name (Single Line Text - REQUIRED)
│  • STRAT-001: "Smart"
│  • STRAT-002: "Aggressive"
│  • STRAT-003: "Conservative"
│  • STRAT-004: "Risk-Reward"
│
├─ emoji (Single Line Text) - optional but helps visibility
│  • Smart: 🧠
│  • Aggressive: 🔥
│  • Conservative: 🛡️
│  • Risk-Reward: ⚖️
│
├─ short_description (Single Line Text)
│  Smart: "Calculated play with course knowledge"
│  Aggressive: "Attack every hole, maximize birdie opportunities"
│  Conservative: "Avoid hazards, steady par play"
│  Risk-Reward: "Tactical risk-taking based on hole conditions"
│
├─ full_strategy_approach (Long Text) - THIS IS THE KEY FIELD
│  [Detailed explanation of what this strategy means]
│  [How it changes research focus]
│  [How it changes lyrical tone]
│  [How it changes music style]
│  [What the player is thinking]
│
├─ research_focus_keywords (Single Line Text)
│  Smart: "course-management, calculated-approach, strategic-thinking"
│  Aggressive: "aggressive-play, risk-taking, birdie-opportunities"
│  Conservative: "hazard-avoidance, steady-play, solid-par"
│  Risk-Reward: "tactical-decisions, risk-assessment, high-reward-plays"
│
├─ lyrical_themes (Single Line Text)
│  Smart: "intelligence, precision, strategy, knowledge"
│  Aggressive: "boldness, power, victory, dominance"
│  Conservative: "stability, safety, consistency, reliability"
│  Risk-Reward: "courage, tactical, calculated-risk, triumph"
│
├─ music_tone (Single Line Text)
│  Smart: "cerebral, methodical, building intensity"
│  Aggressive: "bold, powerful, energetic, driving"
│  Conservative: "steady, grounded, supportive, flowing"
│  Risk-Reward: "dramatic, building tension, triumphant"
│
├─ chatgpt_prompt_template (Long Text) - COPY-PASTE FOR SCRIPT GENERATION
│  [The exact prompt instructions to send to ChatGPT for this strategy]
│  [Will include: "{COURSE_NAME}", "{ARCHITECT}", "{RESEARCH_DATA}"]
│  [Example below for each]
│
└─ is_active (Checkbox)
   Default: TRUE for all 4

RECORDS TO CREATE:
─────────────────────────────────────────────────────────────

RECORD 1: Smart Strategy
────────────────────────
strategy_name: Smart
emoji: 🧠
short_description: Calculated play with course knowledge

full_strategy_approach: 
"SMART STRATEGY: The intelligent golfer studies the course, understands the 
architect's intent, identifies strategic elements, and plays with precision. 
This approach emphasizes knowledge of the course layout, understanding hazards, 
reading wind and elevation, and making calculated decisions based on skill level 
and course conditions. The Smart player thinks 2-3 shots ahead, manages risk 
carefully, and plays to their strengths while minimizing weaknesses."

research_focus_keywords: 
course-management, calculated-approach, strategic-thinking, course-knowledge, 
hazard-placement, elevation-changes, wind-patterns, architect-intent

lyrical_themes: 
intelligence, precision, strategy, knowledge, calculated-risk, 
understanding, awareness, focus

music_tone: 
cerebral, methodical, building intensity, thoughtful, strategic buildup

chatgpt_prompt_template:
"Create lyrics for a SMART/STRATEGIC anthem for {COURSE_NAME} designed by 
{ARCHITECT} in {YEAR}. This anthem is for the intelligent golfer who:
- Understands course design and architect's intent
- Manages risk carefully based on skill level
- Studies the course layout and hazard placement
- Makes calculated decisions about club selection and shot placement
- Thinks 2-3 shots ahead
- Plays to their strengths

COURSE CONTEXT:
{RESEARCH_DATA}

Create lyrics that:
1. Reference the course's strategic elements and layout
2. Celebrate intelligent play and course management
3. Emphasize precision and calculated decision-making
4. Include metaphors about understanding the game
5. Build energy around mastery and knowledge
6. Are anthemic and memorable
7. Fit this style: {MUSIC_STYLE}

The lyrics should make the golfer feel smart, prepared, and strategically superior."

────────────────────────

RECORD 2: Aggressive Strategy
──────────────────────────────
strategy_name: Aggressive
emoji: 🔥
short_description: Attack every hole, maximize birdie opportunities

full_strategy_approach:
"AGGRESSIVE STRATEGY: The aggressive golfer goes for every birdie, attacks 
pins, takes calculated risks on shorter shots, and plays with confidence and 
power. This approach maximizes scoring opportunities while accepting the risk 
of occasional mistakes. The Aggressive player has the skills to execute difficult 
shots and chooses challenge over safety. The mindset is one of confidence, 
boldness, and the belief that every hole is an opportunity to score."

research_focus_keywords:
aggressive-play, risk-taking, birdie-opportunities, bold-play, short-game-strength, 
confidence, power-play, attacking-mindset

lyrical_themes:
boldness, power, victory, dominance, courage, attack, confidence, energy, 
ambition, conquest

music_tone:
bold, powerful, energetic, driving, intense, crescendoing, triumphant

chatgpt_prompt_template:
"Create lyrics for an AGGRESSIVE/BOLD anthem for {COURSE_NAME} designed by 
{ARCHITECT}. This anthem is for the confident golfer who:
- Goes for birdies on every hole
- Attacks the pin aggressively
- Takes calculated risks for scoring opportunities
- Plays with boldness and confidence
- Believes every hole is a chance to score
- Executes difficult shots with power

COURSE CONTEXT:
{RESEARCH_DATA}

Create lyrics that:
1. Celebrate aggressive play and risk-taking
2. Emphasize confidence and boldness
3. Reference the course's scoring opportunities
4. Include powerful imagery of attack and dominance
5. Build high energy and excitement
6. Emphasize victory and conquest
7. Fit this style: {MUSIC_STYLE}

The lyrics should make the golfer feel powerful, confident, and ready to attack 
the course with full force."

────────────────────────

RECORD 3: Conservative Strategy
────────────────────────────────
strategy_name: Conservative
emoji: 🛡️
short_description: Avoid hazards, steady par play

full_strategy_approach:
"CONSERVATIVE STRATEGY: The conservative golfer plays within their skill level, 
avoids unnecessary risk, manages the course to stay clear of hazards, and aims 
for steady par play. This approach prioritizes consistency, accuracy, and risk 
management over aggressive scoring. The Conservative player respects the course's 
difficulty, plays away from hazards, uses club selection strategically, and 
values solid play over spectacular shots. The mindset is one of respect for 
difficulty, discipline, and patient execution."

research_focus_keywords:
hazard-avoidance, steady-play, solid-par, safety-first, accuracy-focus, 
patience, discipline, steady-improvement, reliable-play

lyrical_themes:
stability, safety, consistency, reliability, focus, discipline, respect, 
patience, steady-flow, dependability

music_tone:
steady, grounded, supportive, flowing, calm-determination, reliable-drive, 
patient-buildup

chatgpt_prompt_template:
"Create lyrics for a CONSERVATIVE/STEADY anthem for {COURSE_NAME} designed by 
{ARCHITECT}. This anthem is for the disciplined golfer who:
- Plays within their skill level
- Avoids unnecessary risk and hazards
- Prioritizes steady par play
- Manages the course strategically
- Uses accurate club selection
- Values consistency over aggression
- Respects the course difficulty

COURSE CONTEXT:
{RESEARCH_DATA}

Create lyrics that:
1. Celebrate steady, reliable play
2. Emphasize discipline and patience
3. Honor respect for the course
4. Include imagery of safe, calculated play
5. Build steady, dependable energy
6. Emphasize consistency and focus
7. Fit this style: {MUSIC_STYLE}

The lyrics should make the golfer feel grounded, focused, and proud of 
disciplined, steady play."

────────────────────────

RECORD 4: Risk-Reward Strategy
───────────────────────────────
strategy_name: Risk-Reward
emoji: ⚖️
short_description: Tactical risk-taking based on hole conditions

full_strategy_approach:
"RISK-REWARD STRATEGY: The Risk-Reward golfer makes tactical decisions on each 
hole, weighing the potential reward against the risk involved. On some holes, 
they play aggressively to score; on others, they play safe. This approach 
requires strong course management and decision-making skills. The Risk-Reward 
player adapts their approach based on hole difficulty, conditions, current 
score, and specific hazards. The mindset is one of flexibility, tactical 
thinking, and maximizing overall score through smart risk assessment."

research_focus_keywords:
tactical-decisions, risk-assessment, high-reward-plays, flexibility, 
situation-awareness, adaptive-play, score-management, hole-by-hole-strategy

lyrical_themes:
courage, tactical, calculated-risk, triumph, decision-making, adaptability, 
strategy, balance, courage-tempered-with-wisdom

music_tone:
dramatic, building tension, tactical shifts, triumphant, dynamic, 
strategically-paced, intensity-variation

chatgpt_prompt_template:
"Create lyrics for a RISK-REWARD/TACTICAL anthem for {COURSE_NAME} designed by 
{ARCHITECT}. This anthem is for the strategic golfer who:
- Makes tactical decisions hole-by-hole
- Weighs risk vs. reward on every shot
- Adapts their approach based on conditions
- Plays aggressively when it makes sense
- Plays safe when the risk isn't worth it
- Manages score through smart decisions
- Balances courage with tactical thinking

COURSE CONTEXT:
{RESEARCH_DATA}

Create lyrics that:
1. Celebrate tactical decision-making
2. Emphasize balancing risk and reward
3. Reference strategic play adaptations
4. Include imagery of measured courage
5. Build dramatic, dynamic energy
6. Emphasize triumph through smart choices
7. Fit this style: {MUSIC_STYLE}

The lyrics should make the golfer feel tactically sharp, adaptable, and 
confident in their ability to make the right call on every hole."

────────────────────────

is_active: TRUE (all records)
```

---

# TABLE 2: COURSES
## Master golf course records

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "COURSE-{city}-{year}" 
│  Examples: "COURSE-Pebble-1919", "COURSE-Augusta-1933"
├─ Auto-populate formula if possible, or manual
└─ UNIQUE

course_name (Single Line Text - REQUIRED)
├─ Examples: "Pebble Beach Golf Links", "Augusta National"
└─ Full official course name

architect (Single Line Text)
├─ Example: "Jack Neville"
└─ Course designer

year_built (Number)
├─ Range: 1900-2024
└─ Important for historical context

location_city (Single Line Text)
├─ Example: "Pacific Grove"
└─ City only

location_state (Single Line Text)
├─ Format: "CA", "GA", "NY"
└─ 2-letter abbreviation

location_country (Single Line Text)
├─ Default: "USA"
└─ For international courses

latitude (Number)
├─ Example: 36.5626
└─ For mapping (optional)

longitude (Number)
├─ Example: -121.9496
└─ For mapping (optional)

par_total (Number)
├─ Default: 72
├─ Typical: 71-73
└─ Total par for course

total_yardage (Number)
├─ Example: 6829
└─ Standard tees yardage

holes_total (Number)
├─ Options: 9, 18
└─ REQUIRED

course_description (Long Text)
├─ 2-3 sentences describing the course
├─ What makes it special
└─ Notable features or reputation

designer_intent (Long Text)
├─ Why did the architect design it this way?
├─ Design philosophy
├─ What experience was intended?
└─ Historical context of design

strategic_elements (Long Text)
├─ Key strategic features
├─ Water hazards, elevation changes
├─ Doglegs, bunker placements
├─ Wind patterns, sightlines
└─ What makes it play difficult?

signature_hole (Single Line Text)
├─ Example: "Hole 7 - Lighthouse Hole"
└─ Most famous/iconic hole

is_active (Checkbox)
├─ TRUE = actively creating anthems
└─ FALSE = retired from rotation

created_at (Date)
└─ When you added this course

notes (Long Text)
├─ Any other important info
├─ Historical anecdotes
└─ Personal notes about the course


EXAMPLE RECORD: Pebble Beach Golf Links
──────────────────────────────────────
id: COURSE-Pebble-1919
course_name: Pebble Beach Golf Links
architect: Jack Neville
year_built: 1919
location_city: Pacific Grove
location_state: CA
location_country: USA
latitude: 36.5626
longitude: -121.9496
par_total: 72
total_yardage: 6829
holes_total: 18
course_description: Pebble Beach Golf Links is one of the world's most iconic 
golf courses, situated on the California coast with dramatic cliffs overlooking 
the Pacific Ocean. The course is known for its spectacular scenery, challenging 
layout, and historic prestige.
designer_intent: Jack Neville designed Pebble Beach to showcase the natural 
landscape while creating championship-level challenge. The course plays to the 
topography and Pacific winds, demanding both technical skill and strategic 
thinking.
strategic_elements: Water hazards on multiple holes (7, 8, 10, 18), dramatic 
elevation changes, coastal winds, tight fairways requiring accuracy, elevated 
greens, ocean views that can distract from concentration.
signature_hole: Hole 7 - Lighthouse Hole (par 3, 100-110 yards, cliff-edge green)
is_active: TRUE
created_at: 2026-02-05
notes: Most prestigious American course, hosts USGA championships regularly.
```

---

# TABLE 3: TEE_BOXES
## Handle tee naming chaos

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "TEE-{course-id}-{color}"
│  Examples: "TEE-COURSE-Pebble-1919-BLUE"
└─ UNIQUE

course_id (Link to COURSES - REQUIRED)
└─ Which course this tee belongs to

standard_color (Single Select - REQUIRED)
├─ Options: 
│  • Red
│  • White
│  • Blue
│  • Black
│  • Gold
│  • Other (if needed)
└─ Standardizes across all courses

course_local_name (Single Line Text - REQUIRED)
├─ What THIS course calls it
├─ Examples: "Member Tees", "Championship Tees", "Guest Tees"
├─ Can be anything - course-specific
└─ Some courses use colors, some use descriptors

display_name (Formula Field - AUTO)
├─ Concatenates: "{standard_color} Tees - {course_local_name}"
│  Examples: 
│  • "Red Tees - Guest"
│  • "Blue Tees - Member" 
│  • "Black Tees - Championship"
└─ Use this for dropdowns and displays

yardage (Number)
├─ Example: 6829
└─ Total yardage from these tees

course_rating (Number)
├─ Example: 75.3
└─ USGA course rating

slope_rating (Number)
├─ Example: 140
├─ USGA slope rating
└─ Higher = harder course

par (Number)
├─ Usually 72, but can vary by tee
└─ Total par from these tees

difficulty_rank (Single Select)
├─ Options: Easiest | Medium-Easy | Medium | Medium-Hard | Hardest
└─ How hard are these tees relative to course?

skill_level_for (Single Select)
├─ Options: Beginner | Beginner-Int | Intermediate | Advanced | Expert
└─ What skill level should play these tees?

is_primary (Checkbox)
├─ TRUE for the most commonly played tee
├─ If player doesn't know which tee, default to this one
└─ Each course should have ONE primary

research_notes (Long Text)
├─ What makes this tee unique?
├─ How does difficulty affect strategy?
├─ Any special considerations?
└─ "These tees get ocean wind heavily"

created_at (Date)
└─ When you added this tee box


EXAMPLE RECORDS: Pebble Beach Tee Boxes
────────────────────────────────────────

Record 1 - Red Tees:
id: TEE-COURSE-Pebble-1919-RED
course_id: COURSE-Pebble-1919
standard_color: Red
course_local_name: Guest Tees
display_name: [FORMULA] "Red Tees - Guest"
yardage: 5862
course_rating: 71.4
slope_rating: 128
par: 72
difficulty_rank: Easiest
skill_level_for: Beginner
is_primary: FALSE
research_notes: Entry-level tees for guests and beginners. Shorter carries over 
water, more forggiving angles. Still challenging with ocean wind on holes 7-10.

Record 2 - White Tees:
id: TEE-COURSE-Pebble-1919-WHITE
course_id: COURSE-Pebble-1919
standard_color: White
course_local_name: Member Tees
display_name: [FORMULA] "White Tees - Member"
yardage: 6656
course_rating: 74.3
slope_rating: 135
par: 72
difficulty_rank: Medium
skill_level_for: Intermediate
is_primary: TRUE
research_notes: Standard member play. Balanced challenge and playability. Most 
players should expect to play these. Wind significantly impacts score.

Record 3 - Blue Tees:
id: TEE-COURSE-Pebble-1919-BLUE
course_id: COURSE-Pebble-1919
standard_color: Blue
course_local_name: Championship Tees
display_name: [FORMULA] "Blue Tees - Championship"
yardage: 6829
course_rating: 75.3
slope_rating: 140
par: 72
difficulty_rank: Medium-Hard
skill_level_for: Advanced
is_primary: FALSE
research_notes: Championship length. Demands accuracy and power. Water carries 
become mandatory, fairway approaches tighten, ocean wind is a major factor.

Record 4 - Black Tees:
id: TEE-COURSE-Pebble-1919-BLACK
course_id: COURSE-Pebble-1919
standard_color: Black
course_local_name: Scratch Golfer Tees
display_name: [FORMULA] "Black Tees - Scratch"
yardage: 7136
course_rating: 77.2
slope_rating: 155
par: 72
difficulty_rank: Hardest
skill_level_for: Expert
is_primary: FALSE
research_notes: Tournament setup. Extremely demanding. Long carries, narrow 
fairways, severe greens. Ocean wind becomes a dominant factor. Only for 
accomplished golfers.
```

---

# TABLE 4: HOLES
## Per-hole strategic data

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "HOLE-{course-id}-{number}"
│  Examples: "HOLE-COURSE-Pebble-1919-001", "HOLE-COURSE-Pebble-1919-007"
└─ UNIQUE

course_id (Link to COURSES - REQUIRED)
└─ Which course

hole_number (Number - REQUIRED)
├─ Range: 1-18 (or 1-9 for 9-hole course)
└─ Hole number on scorecard

par (Number - REQUIRED)
├─ Options: 3, 4, 5
└─ This hole's par

handicap_index (Number - REQUIRED)
├─ Range: 1-18 (1 = hardest hole)
└─ USGA difficulty ranking for the course

hole_name (Single Line Text)
├─ Optional fancy name
│  Examples: "Lighthouse Hole", "China Cove", "Pebble Green"
├─ Some courses have famous hole names
└─ Leave blank if course doesn't name them

hole_description (Long Text - IMPORTANT FOR LYRICS)
├─ 1-2 sentences describing what makes this hole memorable
├─ What's unique about it?
│  Examples:
│  "Dramatic par 3 with green on peninsula surrounded by ocean"
│  "Long par 4 dogleg right with water on right side, elevated tee"
│  "Iconic par 5 finishing hole with ocean backdrop"
├─ This gets referenced in anthems!
└─ Be poetic and vivid

strategic_elements (Long Text)
├─ How do golfers play this hole?
├─ Key considerations
│  • Water hazards and where
│  • Bunker positions
│  • Fairway shape (straight, dogleg left/right)
│  • Elevation changes
│  • Typical club selections
│  • Risk areas vs. safe areas
└─ Example: "Water guards left side of fairway for 150-200 yards. 
   Bunker right of green. Best approach is down right side, avoiding 
   water carry. Green slopes away from ocean."

difficulty_descriptor (Single Line Text)
├─ Quick phrase about what makes it hard
│  Examples: "Island green, tight fairway, tricky wind"
└─ Helps with prompt writing

signature_feature (Single Line Text)
├─ The ONE thing this hole is famous for
│  Examples: "Ocean panorama", "Peninsula green", "Dramatic elevation"
├─ What would be in a highlight reel?
└─ Used in anthem lyrics

lyrical_inspiration (Long Text) - THIS HELPS SONGWRITING
├─ What's poetic/inspirational about this hole?
├─ What emotion does it evoke?
├─ Examples:
│  "Hole 7: Standing on cliff 100 feet above ocean, 
│   isolated on tiny green, makes golfers feel brave and small simultaneously"
│  "Hole 18: Ocean backdrop as finishing hole creates 
│   sense of accomplishment and majesty"
│  "Hole 8: 'Island in the Storm' - feeling of being alone against challenge"
└─ Anthem writers use this

created_at (Date)
└─ When you added this hole


EXAMPLE RECORDS: Pebble Beach Holes (Sample 3 of 18)
──────────────────────────────────────────────────

Record: Hole 7
──────────────
id: HOLE-COURSE-Pebble-1919-007
course_id: COURSE-Pebble-1919
hole_number: 7
par: 3
handicap_index: 18 (easiest hole on course)
hole_name: Lighthouse Hole
hole_description: The iconic par 3 with green sitting on a peninsula 100+ feet 
above the Pacific Ocean. A short hole (100-110 yards) but with immense 
psychological pressure due to the ocean backdrop and isolation.
strategic_elements: Tee shot must clear ocean inlet to small green. No bailout. 
Water on all three sides except back. Club selection crucial - typically 6-9 iron 
depending on wind. Wind off ocean is critical factor. Green is heavily sloped 
back to front. Miss left or right = in ocean. Conservative play means laying up 
on nearby rocks (acceptable).
difficulty_descriptor: Ocean-side peninsula, all-or-nothing shot, severe wind
signature_feature: Dramatic 100-foot ocean cliff with green on peninsula
lyrical_inspiration: Standing on cliff 100 feet above the Pacific, isolated on 
a tiny green, every golfer feels both brave and vulnerable. The ocean breeze, 
the sound of waves, the isolation - this is the most iconic moment on the course. 
Golfers remember this hole forever because it makes them feel like they're 
playing at the edge of the world.

Record: Hole 8
──────────────
id: HOLE-COURSE-Pebble-1919-008
course_id: COURSE-Pebble-1919
hole_number: 8
par: 4
handicap_index: 16
hole_name: Pebble Point
hole_description: Long par 4 along the coast with ocean on right side for entire 
hole. Dramatic ocean vistas with severe wind. Requires power and accuracy with 
inevitable ocean breeze affecting every shot.
strategic_elements: Drive down left side to avoid ocean. Water hazard right side 
from tee to green. Second shot over ocean to green. Best angle is layup left, 
then short approach over water. Aggressive players try to drive close and hit 
direct ocean approach. Water and wind make this consistently challenging.
difficulty_descriptor: Ocean hazard right, severe coastal wind, dramatic views
signature_feature: Extended ocean play with constant Pacific breeze
lyrical_inspiration: Playing along the cliff with ocean constantly present - 
golfers feel like they're playing on the edge. Each shot is dramatic with 
high-risk water hazard. The relentless ocean wind tests every ounce of skill 
and focus. Players leave this hole exhilarated or frustrated.

Record: Hole 18
─────────────
id: HOLE-COURSE-Pebble-1919-018
course_id: COURSE-Pebble-1919
hole_number: 18
par: 5
handicap_index: 5 (very difficult)
hole_name: Home
hole_description: Dramatic downhill par 5 finishing hole with ocean backdrop. 
The ultimate amphitheater hole - ocean directly behind green with rocky shoreline. 
A player's last test on Pebble Beach, concluding the round on the most visual, 
most memorable shot sequence possible.
strategic_elements: Downhill tee shot over ocean inlet (water left). Two options: 
lay up short for safe third shot, or aggressive play to reach green in two over 
water. Green is protected front-left by bunker. Back of green drops to ocean. 
Finish must carry water. Wind is critical. Par here is excellent, birdie is 
memory-making.
difficulty_descriptor: Ocean in play, downhill, dramatic backdrop, finishing pressure
signature_feature: Ocean-front finishing hole with dramatic amphitheater feel
lyrical_inspiration: Standing on final tee with ocean behind the green creates 
the ultimate moment. Golfers feel like they're completing a journey, playing 
the most visually stunning hole on any golf course. This final shot toward the 
ocean horizon is the moment golfers remember forever. The sound of the ocean, 
the visual drama, the sense of accomplishment or regret - this hole contains 
the emotional arc of the entire round.
```

---

# TABLE 5: USER_PROFILES
## How individual golfers/members play

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "PROFILE-{email}-{created-date}"
│  Examples: "PROFILE-nick@24anthem.com-2026", "PROFILE-john@golf.com-2026"
└─ UNIQUE

user_email (Email - REQUIRED)
├─ Unique identifier for person
└─ Can link to Zapier for automation later

user_name (Single Line Text - REQUIRED)
├─ First name or full name
└─ Display name for anthems

handicap (Number)
├─ Range: -5 to 28
├─ Official USGA handicap (or estimated)
└─ Used to understand skill level

preferred_tee_level (Single Select)
├─ Options: Beginner | Beginner-Int | Intermediate | Advanced | Expert
└─ What tees do they typically play?

play_style (Single Select - REQUIRED)
├─ Options: Smart | Aggressive | Conservative | Risk-Reward
├─ Their general strategy type
├─ Can have different profiles for different courses (future)
└─ This determines which strategy_type to use for anthems

experience_level (Single Select)
├─ Options: Beginner | Intermediate | Advanced | Expert
└─ How long they've been golfing

strengths (Long Text)
├─ What's this player good at?
│  Examples: "Long drives, short game, reading greens"
├─ Helps personalize lyrics
└─ Example: "Nick is a power player with strong driving game"

development_areas (Long Text)
├─ What are they working on?
├─ Examples: "Consistency off tee, pressure situations"
└─ Can be referenced in motivational anthems

personality_traits (Long Text)
├─ How they approach golf mentally
├─ Examples: "Competitive, analytical, loves challenge"
├─ Helps tone of anthem
└─ Example: "Loves data, wants to understand strategy"

golf_goals (Long Text)
├─ What are they trying to achieve?
├─ Examples: "Lower handicap, play in tournament, break 80"
└─ Helps anthem motivation factor

notes (Long Text)
├─ Any other relevant info
├─ Personal preferences
└─ Context for anthem creation

created_at (Date)
└─ When profile was created


EXAMPLE RECORD: Typical Member
────────────────────────────
id: PROFILE-nick@24anthem.com-2026
user_email: nick@24anthem.com
user_name: Nick
handicap: 6
preferred_tee_level: Advanced
play_style: Smart
experience_level: Advanced
strengths: Long drives, course management, competitive mentality, analytical approach
development_areas: Pressure situations, consistency on par 3s
personality_traits: Strategic thinker, loves data, competitive, works smart not just hard
golf_goals: Competitive level play, tournament wins, 2-3 handicap
notes: Prefers techno/electronic music, analytical about course, wants to 
understand strategy behind anthems.
```

---

# TABLE 6: ANTHEM_REQUESTS
## The Hub Table - Everything Connects Here

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "REQ-{YYYYMMDD}-{course-id}-{strategy}"
│  Examples: "REQ-20260205-COURSE-Pebble-1919-Smart"
└─ UNIQUE - This is your request identifier

course_id (Link to COURSES - REQUIRED)
└─ Which course is this anthem for?

user_profile_id (Link to USER_PROFILES)
├─ Who is this anthem for? (can be blank for generic course anthem)
└─ Links to how this person plays

strategy_type_id (Link to STRATEGY_TYPES - REQUIRED)
├─ Which strategy? (Smart | Aggressive | Conservative | Risk-Reward)
└─ Determines tone and approach

tee_box_id (Link to TEE_BOXES - REQUIRED)
├─ Which tee boxes?
└─ Critical for research and strategy

request_date (Date - AUTO)
└─ When request was created

target_completion_date (Date)
├─ When you want this done (internal deadline)
└─ Optional, for planning

status (Single Select - REQUIRED)
├─ Options (in order):
│  1. Pending Review ← starts here
│  2. Research Started
│  3. Research Complete
│  4. Script Creation
│  5. Script Review
│  6. Script Approved
│  7. Suno Generating
│  8. Track QC
│  9. Published
│  10. On Hold / Rejected
└─ Current stage of request

priority (Single Select)
├─ Options: Low | Normal | High
├─ Helps prioritize your workflow
└─ High = do first

request_notes (Long Text)
├─ Why you want this track
├─ Special requirements
├─ Specific direction for anthem
│  Examples: 
│  "For new membership campaign"
│  "Need bold, aggressive energy"
│  "Make them feel like they can conquer this course"
└─ Context for script writers

internal_qa_notes (Long Text)
├─ Your working notes
├─ Changes you're considering
├─ Issues encountered
└─ Track decisions and thinking

created_at (Date - AUTO)
└─ When created


EXAMPLE RECORD: Pebble Beach Smart Anthem Request
─────────────────────────────────────────────────
id: REQ-20260205-COURSE-Pebble-1919-Smart
course_id: COURSE-Pebble-1919
user_profile_id: PROFILE-nick@24anthem.com-2026
strategy_type_id: STRAT-001 (Smart)
tee_box_id: TEE-COURSE-Pebble-1919-WHITE
request_date: 2026-02-05
target_completion_date: 2026-02-28
status: Pending Review
priority: High
request_notes: Create "Smart Strategy" anthem for Pebble Beach White Tees. 
This is for our member who loves data and strategy. Should emphasize course 
knowledge, architect's intent, and intelligent play. Make them feel like 
a strategist studying and conquering the course. Reference the ocean, 
the cliffs, the precision required.
internal_qa_notes: Nick is analytical - make sure anthem has intelligent theme. 
Research Neville's design intent. Emphasize Holes 7, 18 for lyrical impact.
created_at: 2026-02-05
```

---

# TABLE 7: RESEARCH_OUTPUT
## Raw data from Perplexity research

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "RES-{course-id}-{date}"
│  Examples: "RES-COURSE-Pebble-1919-20260205"
└─ UNIQUE

request_id (Link to ANTHEM_REQUESTS - REQUIRED)
└─ Which request prompted this research?

course_id (Link to COURSES - REQUIRED)
└─ For filtering/reference

research_prompt_used (Long Text - REQUIRED)
├─ Exactly what you asked Perplexity
├─ Save this for audit trail
│  Example: "Research Pebble Beach for a Smart/Strategic player using 
│            White Tees. Focus on architect Jack Neville's design intent,
│            strategic elements, hole-by-hole approach, ocean conditions."
└─ Important for reproducibility

research_tool (Single Select)
├─ Options: Perplexity | ChatGPT | Manual Web Search | Other
└─ Which tool did you use?

research_date (Date - AUTO)
└─ When you ran the research

raw_output (Long Text - REQUIRED)
├─ Complete Perplexity response
├─ Paste entire output here
├─ This is your backup
└─ Store full research for audit trail

[THESE FIELDS = PARSED SECTIONS FROM RAW OUTPUT]

course_history (Long Text)
├─ Formatted section about course history
│  Example: "Pebble Beach Golf Links was founded in 1919 by Samuel Morse
│            and designed by Jack Neville. It's the flagship course of the
│            Pebble Beach Company..."
└─ Pull this section from raw_output and paste here for easier access

design_philosophy (Long Text)
├─ Architect's intent and design approach
│  Example: "Jack Neville designed Pebble Beach to showcase the natural
│            California coast while creating a championship-level test..."
└─ Key for understanding the course

hole_strategy_notes (Long Text)
├─ Hole-by-hole strategic information
├─ Which holes are hardest
├─ Scoring opportunities
├─ Key challenges per hole
└─ Used in script creation

strategic_elements (Long Text)
├─ Major strategic features
├─ Water hazards and where
├─ Elevation changes
├─ Wind patterns
├─ Bunker placement
└─ Critical for Smart/Conservative strategies

notable_characteristics (Long Text)
├─ What makes this course unique
├─ Reputation and prestige
├─ Famous moments
├─ Signature holes
└─ Lyrical/emotional content

key_takeaways (Long Text) - YOU WRITE THIS
├─ Your summary of important bits
├─ 3-5 key points for script writers
├─ What jumped out at you?
│  Example: "1) Ocean is constant factor, 2) Neville's design is genius
│            at using topography, 3) Holes 7, 18 are most iconic and
│            emotional, 4) Strategic play rewards course knowledge"
└─ This helps ChatGPT write better lyrics

confidence_score (Number)
├─ 1-5 scale (5 = excellent research)
├─ Rate quality of Perplexity output
└─ Helps track data quality

research_status (Single Select)
├─ Options: Complete | Partial | Needs More | Rejected
├─ Complete = ready for script generation
└─ Needs More = need more research

internal_qa_notes (Long Text)
├─ Your notes on this research
├─ What was good/bad
├─ What you want to emphasize
├─ Any gaps you noticed
└─ "Research is solid on architecture but thin on hole-by-hole strategy"

created_at (Date - AUTO)
└─ When research was completed


EXAMPLE RECORD: Pebble Beach Research
──────────────────────────────────────
id: RES-COURSE-Pebble-1919-20260205
request_id: REQ-20260205-COURSE-Pebble-1919-Smart
course_id: COURSE-Pebble-1919
research_prompt_used: "Research Pebble Beach Golf Links for an intelligent, 
strategic player. Focus on: 1) Jack Neville's design philosophy and architect 
intent, 2) Strategic elements and how smart players approach each hole, 
3) Course management approach for White Tees (6656 yards, CR 74.3), 
4) Ocean wind conditions and their impact on play, 5) Why this course rewards 
course knowledge and strategic thinking. Include hole-by-hole strategic 
considerations. This is for creating a song anthem for strategic golf play."

research_tool: Perplexity
research_date: 2026-02-05

raw_output: [FULL PERPLEXITY RESPONSE PASTED HERE - 2000+ words]

course_history: "Pebble Beach Golf Links was established in 1919 by Samuel Morse, 
founder of Pacific Grove. Jack Neville, a young local golfer with no formal 
training, was tasked with designing the course. Working with Douglas Grant, 
Neville created one of the world's most iconic golf courses. The course opened 
in 1919 and has since hosted multiple U.S. Opens, PGA Championships, and the 
Ryder Cup..."

design_philosophy: "Jack Neville's genius was in working WITH the natural 
topography rather than against it. His design philosophy emphasized: 1) Using 
the ocean as a natural hazard, 2) Creating dramatic elevation changes that 
test different skills, 3) Building holes that reward accurate shot-making 
over pure power, 4) Creating visual drama that makes the course memorable. 
Neville believed that a great golf course should tell a story and challenge 
players both mentally and physically."

hole_strategy_notes: "Hole-by-hole approach for smart play: Hole 1 (Par 4) - 
Uphill, straight hole, rewards accuracy over distance. Smart play = favor right 
side to avoid left bunker. Hole 7 (Par 3) - All-or-nothing island green requires 
confidence and precise club selection. Smart play = trust your shot, account 
for wind. Hole 18 (Par 5) - Downhill finish with ocean backdrop, requires 
strategic decision on second shot (lay up or go for two). Smart players assess 
conditions and make calculated risk..."

strategic_elements: "Pebble Beach strategic elements: 1) Ocean water in play on 
11 holes, 2) Elevation changes up to 120 feet, 3) Coastal wind that varies 
dramatically hole to hole, 4) Bunkers placed to penalize poor shot selection 
not just poor execution, 5) Greens designed to reward approach shots from 
correct angles. Smart players study wind patterns, understand angles, and 
execute to course conditions."

notable_characteristics: "Pebble Beach is universally recognized as one of the 
world's greatest golf courses. It's hosted major championships, holds the record 
for most impressive scenery of any golf course, and is visited by pilgrimage 
by golfers worldwide. The course epitomizes California coastal golf. Holes 7 
and 18 are iconic, photographed worldwide. Playing Pebble Beach is a bucket 
list experience for serious golfers."

key_takeaways: "1) Neville's design rewards course knowledge and strategic 
thinking - smart players who understand the architect's intent can play better 
2) Ocean is a constant factor - wind management is critical to smart play 
3) Holes 7 and 18 are iconic and emotional - should be emphasized in anthem 
4) Strategic approach emphasizes precision and angles over power 
5) Playing Pebble smartly means understanding topography and wind patterns"

confidence_score: 5
research_status: Complete
internal_qa_notes: "Excellent research. Perplexity gave us great insight into 
Neville's design philosophy. Got good hole-by-hole strategy guidance. The 
ocean wind aspect is important for all strategies. For Smart strategy, emphasize 
the intelligence and course knowledge aspects. This research is solid to move 
to script generation."

created_at: 2026-02-05
```

---

# TABLE 8: SCRIPTS
## ChatGPT output + your edits

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "SCRIPT-{request}-V{version}"
│  Examples: "SCRIPT-REQ-20260205-Pebble-V1", "SCRIPT-REQ-20260205-Pebble-V2"
└─ UNIQUE

request_id (Link to ANTHEM_REQUESTS - REQUIRED)
└─ Which request is this for?

research_id (Link to RESEARCH_OUTPUT - REQUIRED)
├─ Which research was used for this script?
└─ Audit trail - what data created this?

version_number (Number - REQUIRED)
├─ 1, 2, 3, etc.
├─ Track iterations
└─ First attempt vs. refined version

chatgpt_prompt_sent (Long Text - REQUIRED)
├─ Exact prompt you sent to ChatGPT
├─ Use template from STRATEGY_TYPES table
├─ Include: {COURSE_NAME}, {ARCHITECT}, {RESEARCH_DATA}, {STRATEGY_DETAILS}
│
│  TEMPLATE EXAMPLE:
│  "Create lyrics for a SMART/STRATEGIC anthem for {COURSE_NAME} designed by 
│   {ARCHITECT}. This anthem is for the intelligent golfer who:
│   [From STRATEGY_TYPES full_strategy_approach]
│
│   COURSE CONTEXT:
│   {KEY_TAKEAWAYS from RESEARCH_OUTPUT}
│
│   Create lyrics that:
│   1. Reference the course's strategic elements and layout
│   2. Celebrate intelligent play and course management
│   3. Emphasize precision and calculated decision-making
│   4. Include metaphors about understanding the game
│   5. Build energy around mastery and knowledge
│   6. Are anthemic and memorable
│   7. Fit this style: CINEMATIC POP, BUILDING ENERGY
│
│   The lyrics should make the golfer feel smart, prepared, and 
│   strategically superior."
│
└─ Save for reproducibility

chatgpt_response_raw (Long Text - REQUIRED)
├─ Exact ChatGPT output (before edits)
├─ Keep this for audit trail
├─ Shows what AI generated originally
└─ Paste full response here

your_edits_summary (Long Text)
├─ What did you change and why?
│  Examples:
│  • "Verse 1 was too generic - added specific Pebble references"
│  • "Chorus repeated too much - created variation"
│  • "Added Hole 7 and Hole 18 references for emotional impact"
│  • "Changed 'playing smart' to 'reading the game' for better flow"
│  • "Completely rewrote second verse - original didn't capture strategy"
└─ Document your thinking

final_approved_script (Long Text - REQUIRED)
├─ FINAL VERSION ready for Suno
├─ This is what goes into music generation
├─ Include line breaks / verse structure
│
│  FORMAT EXAMPLE:
│  [VERSE 1]
│  Line 1
│  Line 2
│  Line 3
│  Line 4
│
│  [CHORUS]
│  Line 1
│  Line 2
│  Line 3
│
│  [VERSE 2]
│  ...etc
│
└─ Clear formatting helps Suno

quality_assessment (Single Select)
├─ Options: Perfect | Minor Edits | Major Edits | Rejected
├─ Perfect = ChatGPT nailed it, barely edited
├─ Minor Edits = 10% adjustments
├─ Major Edits = 30-50% rewrites
├─ Rejected = start over
└─ Helps learn what ChatGPT does well

approval_date (Date)
├─ When you approved this version
└─ Ready to move to Suno

approved_by (Single Line Text)
├─ You? Team member?
└─ For accountability

internal_notes (Long Text)
├─ Why this version works
├─ What makes it good
├─ Anything to note for future attempts
│  Examples:
│  • "ChatGPT nailed the strategy metaphors on this one"
│  • "Adding specific hole references really helped"
│  • "This version captures the intelligence theme perfectly"
└─ Learn from wins

created_at (Date - AUTO)
└─ When script created


EXAMPLE RECORD: Pebble Beach Smart Strategy Script V1
──────────────────────────────────────────────────────
id: SCRIPT-REQ-20260205-Pebble-V1
request_id: REQ-20260205-COURSE-Pebble-1919-Smart
research_id: RES-COURSE-Pebble-1919-20260205
version_number: 1

chatgpt_prompt_sent: 
"Create lyrics for a SMART/STRATEGIC anthem for Pebble Beach Golf Links 
designed by Jack Neville in 1919. This anthem is for the intelligent golfer 
who understands course design, manages risk carefully, studies the course 
layout, and makes calculated decisions about club selection and shot placement.

COURSE CONTEXT:
Jack Neville's genius was in working WITH the natural topography. His design 
emphasizes: 1) Using the ocean as natural hazard, 2) Creating dramatic 
elevation changes, 3) Rewarding accurate shot-making over power, 4) Building 
visual drama. Pebble Beach rewards course knowledge and strategic thinking. 
Ocean is constant factor. Holes 7 and 18 are iconic and emotional.

Create lyrics that:
1. Reference Pebble's strategic elements (ocean, cliffs, precision required)
2. Celebrate intelligent play and course management
3. Emphasize Neville's design genius
4. Include metaphors about reading/understanding the course
5. Reference Hole 7 (iconic) and Hole 18 (finishing drama)
6. Build energy around mastery and knowledge
7. Make golfer feel like a strategist conquering a puzzle
8. Fit style: CINEMATIC POP with building orchestral energy

The lyrics should make the golfer feel smart, prepared, ready to read and 
conquer this legendary course through intelligence and precision."

chatgpt_response_raw:
"[VERSE 1]
Walking this path where giants have played
Where ocean meets cliffs in the light and shade
Every angle matters, every choice is real
Reading the game, that's the champion's appeal

[CHORUS]
This is Pebble, where the smart prevail
Study the course, understand the tale
Seven awaits with a cliff-edge dream
Eighteen brings glory, the ultimate theme

[VERSE 2]
Neville designed this with genius intent
Ocean and topography perfectly blent
The fairways speak if you learn to listen
Each shot's a puzzle, a chance to glisten

[BRIDGE]
You can't just swing here, you gotta think
Read every wind, read every link
Knowledge is power on this hallowed ground
Play it smart, and victory's found

[CHORUS]
This is Pebble, where the smart prevail..."

your_edits_summary:
"ChatGPT got the core concept right but I made several edits:
1. Verse 1: Added 'champion's appeal' was cliché - changed to emphasize precision
2. Chorus: Added specific reference to 'reading the game' - that's the key
3. Verse 2: 'perfectly blent' is awkward - changed to 'every element designed'
4. Bridge: Rewrote almost entirely to emphasize STUDYING and READING the course
5. Added specific references to Hole 7 and Hole 18 for emotional punch
6. Changed 'victory' to 'mastery' - better for intelligent player mindset
Overall: Kept ChatGPT's structure but made it more specific and powerful."

final_approved_script:
"[VERSE 1]
Walking this path where legends have played
Where ocean meets cliffs in golden light
Every angle matters, every choice is real
Read the course and you'll get it right

[CHORUS]
This is Pebble where the smart prevail
Study the design, understand the tale
Hole Seven awaits on a clifftop dream
Eighteen brings the glory, the ultimate scene

[VERSE 2]
Neville designed this with pure intent
Ocean and topography perfectly blended
Each fairway speaks if you learn to listen
Every shot's a puzzle, a chance to glisten

[BRIDGE]
You cannot just swing here, you gotta think
Read every wind, read every link
Knowledge is power on this hallowed ground
Play it smart and mastery's found

[VERSE 3]
From the tee to the green with precision
This course rewards intelligent vision
Strategic thinking beats raw power here
This is how champions make their mark clear

[CHORUS]
This is Pebble where the smart prevail
Study the design, understand the tale
Hole Seven awaits on a clifftop dream
Eighteen brings the glory, the ultimate scene"

quality_assessment: Minor Edits
approval_date: 2026-02-05
approved_by: Nick
internal_notes: "ChatGPT did great job with structure and theme. My edits 
focused on making it more specific (referencing actual holes, emphasizing 
'reading' vs 'playing', using 'mastery' for intelligent player mindset). 
This script captures exactly what we want - intelligent strategy emphasis. 
Ready for Suno generation."

created_at: 2026-02-05
```

---

# TABLE 9: SUNO_PARAMETERS
## Music generation settings

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "PARAMS-{request}"
│  Example: "PARAMS-REQ-20260205-Pebble"
└─ UNIQUE

request_id (Link to ANTHEM_REQUESTS - REQUIRED)
└─ Which request needs these music settings?

genre (Single Line Text - REQUIRED)
├─ Primary genre
├─ Examples: "Cinematic Pop", "Indie Rock", "Orchestral", "Electronic"
└─ What style of music?

instrumentation (Single Line Text - REQUIRED)
├─ What instruments to feature
├─ Examples: "Orchestra with electric guitar", "Piano and strings", 
│  "Synth-based with drums", "Acoustic with orchestral backing"
└─ Build out the sound

tempo_bpm (Single Line Text - REQUIRED)
├─ BPM range or specific
├─ Examples: "120-140 BPM", "140 upbeat", "90-110 deliberate"
└─ Energy level

mood_descriptors (Single Line Text - REQUIRED)
├─ Emotional tone
├─ Examples: "Bold, dramatic, building energy"
│            "Calm, steady, determined"
│            "Celebratory, triumphant, epic"
└─ How should this feel?

vocal_type (Single Select - REQUIRED)
├─ Options: Male | Female | Mixed | Instrumental | Duet
└─ Voice style

duration_seconds (Number - REQUIRED)
├─ Typical: 120 seconds
├─ Range: 30-180 seconds
└─ How long should track be?

production_level (Single Select)
├─ Options: Simple | Polished | Studio Quality | Epic
├─ How produced should it sound?
└─ Simple = minimal, Polished = professional, Epic = full orchestration

similar_artist_refs (Single Line Text)
├─ Artists/composers to reference
├─ Examples: "Coldplay, Hans Zimmer, Imagine Dragons"
├─ Helps Suno understand style
└─ Optional but helpful

style_prompt (Long Text - REQUIRED)
├─ Full style description for Suno
├─ This is what you send to Suno
├─ Combine all above into coherent description
│
│  TEMPLATE:
│  "Genre: {GENRE}
│   Instrumentation: {INSTRUMENTATION}
│   Tempo: {TEMPO_BPM}
│   Mood: {MOOD_DESCRIPTORS}
│   Vocal Style: {VOCAL_TYPE}
│   Duration: {DURATION}
│   Production: {PRODUCTION_LEVEL}
│   Style Reference: In the style of {SIMILAR_ARTISTS}
│   Overall: {DESCRIPTION}"
│
└─ Clear, specific prompt gets better results

variables (Long Text)
├─ Any other Suno parameters
├─ Special requests
├─ "No rap", "include strings", etc.
└─ Additional notes for Suno

guidelines_24_8 (Long Text)
├─ 24/8 brand voice
├─ Audio signature requirements
├─ Quality standards
├─ Example: "Must be anthemic and memorable, suitable for golf 
│           marketing, professional quality, no artificial artifacts"
└─ Your brand standards

created_at (Date - AUTO)
└─ When parameters created


EXAMPLE RECORD: Pebble Beach Smart Strategy Music Parameters
────────────────────────────────────────────────────────────
id: PARAMS-REQ-20260205-Pebble
request_id: REQ-20260205-COURSE-Pebble-1919-Smart
genre: Cinematic Pop
instrumentation: Orchestra with electronic elements, featuring strings and piano
tempo_bpm: 120-140 BPM, building energy
mood_descriptors: Bold, dramatic, building intensity, intelligent, strategic
vocal_type: Mixed (male and female harmony)
duration_seconds: 150
production_level: Studio Quality

similar_artist_refs: Coldplay, Hans Zimmer, Two Steps to Hell, Imagine Dragons

style_prompt: 
"Genre: Cinematic Pop with orchestral elements
Instrumentation: Full orchestra (strings, brass) with electronic synth backing, 
featuring prominent piano lines and building percussion
Tempo: 120-140 BPM with gradual acceleration
Mood: Bold, dramatic, building intensity that crescendos to triumphant finish
Vocal Style: Mixed vocals (male/female harmony) with strong melodic lines
Duration: 150 seconds (2:30)
Production: Professional studio quality, polished sound
Style Reference: Similar to Coldplay meets Hans Zimmer - cinematic pop with 
orchestral depth
Overall: This is an anthemic piece that makes the listener feel intelligent, 
strategic, and ready to conquer a legendary golf course. The music should 
build from a thoughtful beginning to a triumphant crescendo. Emphasize the 
emotion of standing on Pebble Beach's cliffs while playing with precision 
and intelligence."

variables: 
"- No rap sections
- Strings should be prominent throughout
- Build to climax at 2:15 mark
- Final chorus should feel triumphant
- Include subtle ocean wave sounds (optional, if possible)
- Quality should be broadcast-ready"

guidelines_24_8:
"- Must be immediately recognizable as 24/8 Anthem (high production value)
- Suitable for golf marketing and promotional videos
- Professional, no artificial artifacts
- Memorable, with anthem quality
- Should make golfer feel confident and strategic
- Quality bar: equal to commercial sports marketing music"

created_at: 2026-02-05
```

---

# TABLE 10: SUNO_GENERATIONS
## API conversation with Suno

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "SUNO-{request}"
│  Example: "SUNO-REQ-20260205-Pebble"
└─ UNIQUE

request_id (Link to ANTHEM_REQUESTS - REQUIRED)
└─ Which request prompted this Suno call?

parameters_id (Link to SUNO_PARAMETERS - REQUIRED)
├─ Which settings were used?
└─ Audit trail

suno_task_id (Single Line Text - REQUIRED AFTER API CALL)
├─ From Suno API response
├─ Example: "abc123def456xyz789"
├─ This is what Suno returns
└─ UNIQUE - never duplicate this

api_call_timestamp (Date/Time - AUTO)
├─ When you called Suno
└─ Auto-populate when record created

status (Single Select - REQUIRED)
├─ Options: Queued | Generating | Polling | Complete | Failed
├─ Queued = waiting in Suno queue
├─ Generating = actively creating audio
├─ Polling = you're checking status
├─ Complete = done, audio ready
├─ Failed = error, need to retry or redo
└─ Track progress here

polling_attempts (Number)
├─ How many times you've checked status
├─ Auto-increment each time you check
└─ If >30 = something went wrong

last_polled_at (Date/Time)
├─ Last time you checked Suno
└─ Track freshness of status

suno_response_data (Long Text) - FILLED WHEN COMPLETE
├─ Full JSON from Suno when track is done
├─ Paste entire response
├─ Includes: audio URL, cover image, metadata
└─ Backup of all Suno returned data

audio_url (URL)
├─ Direct link to MP3/WAV file from Suno
├─ Filled when generation complete
└─ This is what goes in TRACKS table

cover_image_url (URL)
├─ Cover art from Suno
├─ Auto-generated or customizable
└─ Filled when generation complete

error_message (Long Text)
├─ If failed, what went wrong?
├─ Save for debugging
└─ Helps understand failures

completion_date (Date/Time)
├─ When Suno finished generation
└─ Filled when status = Complete

api_notes (Long Text)
├─ Your notes about this API call
├─ Anything unusual?
├─ Performance observations?
└─ For learning and debugging

created_at (Date - AUTO)
└─ When record created


EXAMPLE RECORD: Pebble Beach Suno Generation
──────────────────────────────────────────────
id: SUNO-REQ-20260205-Pebble
request_id: REQ-20260205-COURSE-Pebble-1919-Smart
parameters_id: PARAMS-REQ-20260205-Pebble
suno_task_id: [FILLED AFTER API CALL]
api_call_timestamp: 2026-02-05 10:30:00 AM
status: Queued (will update as it progresses)
polling_attempts: 0 (will increment as you check)
last_polled_at: [EMPTY UNTIL FIRST POLL]
suno_response_data: [EMPTY UNTIL COMPLETE]
audio_url: [EMPTY UNTIL COMPLETE]
cover_image_url: [EMPTY UNTIL COMPLETE]
error_message: [EMPTY UNLESS ERROR]
completion_date: [EMPTY UNTIL COMPLETE]
api_notes: "Initial call made at 10:30 AM. Waiting in Suno queue."
created_at: 2026-02-05 10:30:00 AM

[LATER, WHEN COMPLETE:]
status: Complete
polling_attempts: 4 (checked 4 times before complete)
last_polled_at: 2026-02-05 02:15:00 PM
suno_response_data: [FULL JSON RESPONSE PASTED HERE]
audio_url: https://cdn.suno.ai/...audio.mp3
cover_image_url: https://cdn.suno.ai/...cover.jpg
completion_date: 2026-02-05 02:15:00 PM
api_notes: "Generation completed successfully. Audio quality excellent, 
cover image appropriate. Ready for TRACKS creation."
```

---

# TABLE 11: TRACKS
## Final deliverable with complete audit trail

```
FIELD DEFINITIONS:

id (Single Line Text - PRIMARY KEY)
├─ Format: "TRACK-{request}"
│  Example: "TRACK-REQ-20260205-Pebble"
└─ UNIQUE

request_id (Link to ANTHEM_REQUESTS)
├─ Which request created this?
└─ Chain: Request → Research → Script → Suno → Track

course_id (Link to COURSES)
├─ Which course
└─ For filtering

user_profile_id (Link to USER_PROFILES)
├─ Who this anthem is for (if applicable)
└─ For personalized anthems

strategy_type_id (Link to STRATEGY_TYPES)
├─ Which strategy
└─ Smart, Aggressive, Conservative, Risk-Reward

tee_box_id (Link to TEE_BOXES)
├─ Which tee boxes
└─ Context for strategy

research_id (Link to RESEARCH_OUTPUT)
├─ Which research was used
└─ Data traceability

script_id (Link to SCRIPTS)
├─ Which lyrics were used
└─ Version tracking

suno_generation_id (Link to SUNO_GENERATIONS)
├─ Suno generation that created this
└─ Music generation traceability

track_title (Single Line Text - REQUIRED)
├─ Display name
├─ Example: "Pebble Beach - Smart Strategy"
└─ Should be memorable

track_description (Long Text)
├─ What is this anthem for?
├─ Context about its purpose
│  Example: "Strategic anthem for intelligent golfers at Pebble Beach White 
│           Tees. Emphasizes course knowledge, architect appreciation, 
│           calculated decision-making."
└─ For users who discover it later

audio_url (URL - REQUIRED)
├─ Link to MP3/WAV file
├─ From suno_generation_id
└─ This is what users listen to

audio_file_local (Single Line Text)
├─ If downloaded locally, file path
├─ Example: "/audio/tracks/pebble-smart-v1.mp3"
└─ Optional if storing locally

cover_image_url (URL)
├─ Cover art
├─ From Suno or custom
└─ Visual identity

duration_seconds (Number)
├─ Track length
├─ From SUNO_GENERATIONS
└─ Usually 120-180 seconds

style_generated (Single Line Text)
├─ What style Suno created
├─ Example: "Cinematic Pop with Orchestral Elements"
└─ Record what was actually created

model_used (Single Select)
├─ Options: v5 | v4.5_plus | v4 | Other
└─ Suno model version

lyrics_used (Long Text)
├─ Reference to approved script
├─ Can link directly or paste
└─ Backup of lyrics

status (Single Select - REQUIRED)
├─ Options: Draft | Approved | Published | Archived | Rejected
├─ Draft = created, not approved yet
├─ Approved = QC passed, ready to release
├─ Published = live/released
├─ Archived = old version, keep for history
├─ Rejected = quality issue, won't be used
└─ Track publication state

quality_rating (Single Select)
├─ Options: ★ | ★★ | ★★★ | ★★★★ | ★★★★★
├─ Your professional assessment
└─ How good is this track?

qa_notes (Long Text)
├─ Your detailed notes
├─ What works well?
├─ Any issues?
├─ Why 5 stars or 3 stars?
│  Examples:
│  "★★★★★ - Suno absolutely nailed this. The orchestral arrangement is 
│           perfect, vocals blend beautifully, builds to perfect crescendo. 
│           This is broadcast-quality."
│  "★★★ - Good structure but vocals feel slightly robotic in second verse. 
│         Instrumentation is strong. Could regenerate with tweak."
└─ Documentation

approved_date (Date)
├─ When you approved this quality
└─ For tracking

approved_by (Single Line Text)
├─ You or team member
└─ Accountability

release_date (Date)
├─ When published/went live
└─ For tracking lifecycle

created_at (Date - AUTO)
└─ When track was created from Suno response


EXAMPLE RECORD: Pebble Beach Smart Strategy Anthem
───────────────────────────────────────────────────
id: TRACK-REQ-20260205-Pebble
request_id: REQ-20260205-COURSE-Pebble-1919-Smart
course_id: COURSE-Pebble-1919
user_profile_id: PROFILE-nick@24anthem.com-2026
strategy_type_id: STRAT-001 (Smart)
tee_box_id: TEE-COURSE-Pebble-1919-WHITE
research_id: RES-COURSE-Pebble-1919-20260205
script_id: SCRIPT-REQ-20260205-Pebble-V1
suno_generation_id: SUNO-REQ-20260205-Pebble

track_title: Pebble Beach - Smart Strategy Anthem
track_description: A strategic anthem for intelligent golfers at Pebble Beach 
Golf Links (White Tees). This track celebrates calculated decision-making, 
course knowledge, architect Jack Neville's genius design, and the precision 
required to play this legendary course. Perfect for golfers who enjoy the 
strategic, analytical side of golf.

audio_url: https://cdn.suno.ai/[unique-id]/pebble-smart-anthem.mp3
audio_file_local: [empty for now - using Suno cloud]
cover_image_url: https://cdn.suno.ai/[unique-id]/cover.jpg
duration_seconds: 150
style_generated: Cinematic Pop with Orchestral Elements
model_used: v5

lyrics_used: [Link to SCRIPT-REQ-20260205-Pebble-V1 or paste full lyrics]

status: Approved
quality_rating: ★★★★★
qa_notes: "EXCELLENT. This is exactly what we were aiming for. Suno nailed 
the orchestral cinematic feel. The mixed vocals (male/female) work beautifully 
together. The build from thoughtful intro to triumphant crescendo is perfect. 
The lyrics about 'reading the game' and 'Hole Seven awaits' create emotional 
moments. Production quality is broadcast-ready. This is one of our best outputs 
yet. Ready for publishing immediately."

approved_date: 2026-02-05
approved_by: Nick
release_date: 2026-02-05
created_at: 2026-02-05
```

---

# MANUAL WORKFLOW CHECKLIST

## How to create tracks manually (8 steps)

```
STEP 1: CREATE ANTHEM REQUEST
─────────────────────────────
□ Open ANTHEM_REQUESTS table
□ Click "+" to create new record
□ Fill in:
  ✓ course_id (required)
  ✓ user_profile_id (if specific person)
  ✓ strategy_type_id (required - Smart/Aggressive/Conservative/Risk-Reward)
  ✓ tee_box_id (required)
  ✓ status = "Pending Review"
  ✓ request_notes (why you want this track)
□ Status should now be "Pending Review"

Time: 5 minutes


STEP 2: RUN RESEARCH
────────────────────
□ Get the research prompt template from STRATEGY_TYPES
□ Fill in placeholders:
  {COURSE_NAME} = from COURSES
  {ARCHITECT} = from COURSES
  {YEAR} = from COURSES
  {STRATEGY_DETAILS} = from STRATEGY_TYPES full_strategy_approach
  {MUSIC_STYLE} = from SUNO_PARAMETERS (if already defined)
□ Copy completed prompt
□ Open Perplexity API / ChatGPT
□ Paste and run research
□ Copy full response
□ Create new RESEARCH_OUTPUT record:
  ✓ request_id = link to ANTHEM_REQUEST
  ✓ research_prompt_used = what you asked
  ✓ raw_output = Perplexity response
  ✓ Parse sections (course_history, design_philosophy, etc.)
  ✓ key_takeaways = your summary
  ✓ confidence_score = 1-5
  ✓ research_status = "Complete"
□ Update ANTHEM_REQUESTS status = "Research Complete"

Time: 15-30 minutes


STEP 3: GENERATE SCRIPT WITH CHATGPT
─────────────────────────────────────
□ Get ChatGPT prompt template from STRATEGY_TYPES.chatgpt_prompt_template
□ Fill in placeholders:
  {COURSE_NAME} = from COURSES
  {ARCHITECT} = from COURSES
  {STRATEGY_TYPE} = from STRATEGY_TYPES.strategy_name
  {RESEARCH_DATA} = from RESEARCH_OUTPUT.key_takeaways
  {MUSIC_STYLE} = from SUNO_PARAMETERS.style_prompt (if defined)
  {USER_PROFILE} = from USER_PROFILES (if applicable)
□ Copy completed prompt
□ Open ChatGPT
□ Paste prompt and generate
□ Copy full response
□ Create new SCRIPTS record:
  ✓ request_id = link to ANTHEM_REQUEST
  ✓ research_id = link to RESEARCH_OUTPUT
  ✓ version_number = 1
  ✓ chatgpt_prompt_sent = exact prompt you used
  ✓ chatgpt_response_raw = ChatGPT output
□ Review the output - is it good?
  IF YES: Continue to step 3B
  IF NO (needs edits): Go to step 3B and edit
□ [STEP 3B: EDIT IF NEEDED]
  □ Read ChatGPT output
  □ Identify weak sections
  □ Make edits to improve:
    • Add specific course/hole references
    • Strengthen strategy theme
    • Fix awkward lines
    • Improve flow and rhythm
  □ Document what changed: your_edits_summary field
  □ quality_assessment = "Minor Edits" or "Major Edits"
□ Paste final version in final_approved_script field
□ Set approval_date = today
□ Set approved_by = you
□ Update ANTHEM_REQUESTS status = "Script Approved"

Time: 30-45 minutes


STEP 4: PREPARE SUNO PARAMETERS
────────────────────────────────
□ Create new SUNO_PARAMETERS record
□ Fill in based on strategy and desired sound:
  ✓ genre = what style?
  ✓ instrumentation = which instruments?
  ✓ tempo_bpm = speed?
  ✓ mood_descriptors = emotion?
  ✓ vocal_type = male/female/mixed?
  ✓ duration_seconds = 120 typical
  ✓ production_level = polished?
  ✓ similar_artist_refs = reference artists
  ✓ style_prompt = full description for Suno
  ✓ guidelines_24_8 = brand requirements
□ Style prompt should be clear and specific
□ Save record

Time: 10 minutes


STEP 5: CALL SUNO API & CREATE GENERATION RECORD
──────────────────────────────────────────────────
□ Create new SUNO_GENERATIONS record
□ Fill in:
  ✓ request_id = link to ANTHEM_REQUEST
  ✓ parameters_id = link to SUNO_PARAMETERS
  ✓ status = "Queued" initially
□ Call Suno API with:
  ✓ Lyrics = from SCRIPTS.final_approved_script
  ✓ Style = from SUNO_PARAMETERS.style_prompt
  ✓ Duration = from SUNO_PARAMETERS.duration_seconds
  ✓ Vocal type = from SUNO_PARAMETERS.vocal_type
  ✓ All variables from SUNO_PARAMETERS
□ Suno returns: task_id
□ Update SUNO_GENERATIONS:
  ✓ suno_task_id = [paste Suno's task_id]
  ✓ status = "Generating"
  ✓ api_call_timestamp = now
□ Update ANTHEM_REQUESTS status = "Suno Generating"

Time: 5 minutes


STEP 6: WAIT & POLL FOR COMPLETION
───────────────────────────────────
□ Wait 30 seconds
□ Go back to SUNO_GENERATIONS record
□ Update:
  ✓ polling_attempts = +1 (increment each check)
  ✓ last_polled_at = now
□ Check Suno API for status:
  GET /api/music/{suno_task_id}
□ Status still "generating"?
  → Wait 30 seconds and repeat
□ Status "complete"?
  → Go to Step 7

Time: 2-30 minutes (depends on queue)

SHORTCUT: Suno sends webhook when done
If you set up webhook notifications from Suno, you'll get notified automatically
when generation finishes. Then just update the fields in Step 6.


STEP 7: CREATE TRACK RECORD
────────────────────────────
□ Suno is complete! You have audio_url + cover_image
□ Create new TRACKS record
□ Fill in links to everything that created it:
  ✓ request_id = ANTHEM_REQUEST
  ✓ course_id = COURSES
  ✓ user_profile_id = USER_PROFILES (if applicable)
  ✓ strategy_type_id = STRATEGY_TYPES
  ✓ tee_box_id = TEE_BOXES
  ✓ research_id = RESEARCH_OUTPUT
  ✓ script_id = SCRIPTS
  ✓ suno_generation_id = SUNO_GENERATIONS
□ Fill in track metadata:
  ✓ track_title = good display name
  ✓ track_description = what is this?
  ✓ audio_url = from Suno API response
  ✓ cover_image_url = from Suno API response
  ✓ duration_seconds = from Suno response
  ✓ style_generated = what Suno actually created
  ✓ model_used = v5
  ✓ lyrics_used = link or paste from SCRIPTS
□ Set status = "Draft" (pending QC)
□ Update SUNO_GENERATIONS:
  ✓ suno_response_data = paste full Suno API response JSON
  ✓ status = "Complete"
  ✓ completion_date = now
□ Update ANTHEM_REQUESTS status = "Track QC"

Time: 10 minutes


STEP 8: QC & PUBLISH
────────────────────
□ Listen to the track!
□ Update TRACKS:
  ✓ quality_rating = ★ to ★★★★★
  ✓ qa_notes = detailed assessment (what works? any issues?)
□ Is it good enough to publish?
  YES → Continue
  NO → Note issue and go back to earlier step (redo research, script, or Suno)
□ If YES:
  ✓ status = "Approved"
  ✓ approved_date = today
  ✓ approved_by = you
□ Ready to go live?
  ✓ status = "Published"
  ✓ release_date = today
□ Update ANTHEM_REQUESTS:
  ✓ status = "Published"
□ DONE! Track is now in system and can be used

Time: 15 minutes


TOTAL TIME: ~2-3 hours per track (first time)
WITH PRACTICE: ~1.5 hours per track
WITH AUTOMATION: ~30 minutes per track (future)
```

---

## KEY VIEWS TO CREATE

```
VIEW 1: "My Pending Requests"
┌─ Table: ANTHEM_REQUESTS
├─ Filter: status NOT IN (Published, On Hold)
├─ Sort: priority DESC, request_date ASC
└─ Shows: which tracks need work

VIEW 2: "Research Ready to Script"
┌─ Table: ANTHEM_REQUESTS  
├─ Filter: status = "Research Complete"
├─ Shows: next step is script creation
└─ Sort: request_date ASC (oldest first)

VIEW 3: "Awaiting Suno Completion"
┌─ Table: SUNO_GENERATIONS
├─ Filter: status IN (Generating, Polling)
├─ Shows: which tracks are being created
└─ Sort: api_call_timestamp DESC (newest first)

VIEW 4: "Published Tracks"
┌─ Table: TRACKS
├─ Filter: status = "Published"
├─ Shows: final output library
└─ Sort: release_date DESC (newest first)

VIEW 5: "All Tracks by Course"
┌─ Table: TRACKS
├─ Group by: course_id
├─ Shows: every track organized by course
└─ Useful for seeing completeness
```

---

## AUTOMATION TOUCHPOINTS (FOR FUTURE n8n)

When you're ready to automate, these are the steps that can be automated:

```
CURRENTLY MANUAL:
├─ Step 1: ANTHEM_REQUEST creation (you do this)
└─ Step 8: QC & publishing (you do this)

CAN BE AUTOMATED LATER:
├─ Step 2: Research prompt generation + Perplexity call
├─ Step 3: ChatGPT script generation + linking
├─ Step 4: SUNO_PARAMETERS creation (template-based)
├─ Step 5: Suno API call
├─ Step 6: Polling + webhook handling
└─ Step 7: TRACKS record creation

n8n WORKFLOWS WOULD:
1. Trigger on ANTHEM_REQUESTS status = "Pending Review"
2. Auto-fetch research data
3. Auto-generate script
4. Auto-call Suno
5. Auto-create TRACKS when ready
6. Notify you for QC approval (Step 8)
```

This keeps the human (you) in the loop for quality control while automating the mechanical work.

