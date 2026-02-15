/**
 * Seed data for fresh Airtable base setup.
 * Creates: 4 STRATEGY_TYPES, 1 COURSE (Pebble Beach), 4 TEE_BOXES,
 *          1 USER_PROFILE (Nick), 4 AI_LAB prompts
 *
 * NOTE: Run this on an EMPTY base. For updating existing records,
 * use update-existing-records.ts instead.
 */
import "dotenv/config";
import { tables } from "./airtable-client.js";

const recordIds: Record<string, string> = {};

async function createRecord(table: any, tableName: string, key: string, fields: Record<string, any>) {
  console.log(`  Creating ${key}...`);
  try {
    const records = await table.create([{ fields }]);
    const id = records[0].id;
    recordIds[key] = id;
    console.log(`    ok ${id}`);
    return id;
  } catch (err: any) {
    console.error(`    FAIL: ${err.message}`);
    throw err;
  }
}

async function main() {
  console.log("=== 24/8 Anthem - Seed Data ===\n");

  // ─── STRATEGY_TYPES (4 records) — Golf-play focused ───
  console.log("STRATEGY_TYPES:");

  await createRecord(tables.strategyTypes, "STRATEGY_TYPES", "STRAT-001", {
    id: "STRAT-001",
    strategy_name: "Smart",
    emoji: "🧠",
    short_description: "Calculated play with course knowledge",
    full_strategy_approach: `The Smart golfer studies the course before playing, understands the architect's design intent, and makes calculated decisions on every shot. They think 2-3 shots ahead: choosing club off the tee based on ideal approach distance, playing to the fat side of greens, and respecting hazard placement. On par 5s, they pick specific layup yardages rather than blindly hitting as far as possible. On par 3s, they play to the center of the green unless the pin is clearly accessible. They factor in wind, elevation, and slope before every shot. The Smart player's round is defined by consistent decision-making, not individual heroic shots.`,
    research_focus_keywords: "course-management, calculated-approach, strategic-thinking, course-knowledge, hazard-placement, elevation-changes, wind-patterns, architect-intent, layup-distances, green-contours",
    is_active: true,
  });

  await createRecord(tables.strategyTypes, "STRATEGY_TYPES", "STRAT-002", {
    id: "STRAT-002",
    strategy_name: "Aggressive",
    emoji: "🔥",
    short_description: "Attack every hole, maximize birdie opportunities",
    full_strategy_approach: `The Aggressive golfer attacks the course with maximum scoring intent. They hit driver on every par 4 and par 5, go for par 5s in two when there's any reasonable chance, and fire at pins rather than playing safe to the middle of greens. On risk-reward holes, they always take the aggressive line. They accept that this style produces more bogeys alongside more birdies — the goal is to maximize total birdies, not minimize mistakes. The Aggressive player needs high confidence in their ball-striking and short game to recover from the misses this strategy inevitably creates.`,
    research_focus_keywords: "birdie-opportunities, aggressive-lines, go-for-it-holes, reachable-par-5s, attackable-pins, short-game-recovery, scoring-zones, driver-holes",
    is_active: true,
  });

  await createRecord(tables.strategyTypes, "STRATEGY_TYPES", "STRAT-003", {
    id: "STRAT-003",
    strategy_name: "Conservative",
    emoji: "🛡️",
    short_description: "Avoid hazards, steady par play",
    full_strategy_approach: `The Conservative golfer plays within their skill level and prioritizes avoiding big numbers. They hit fairway woods or hybrids off the tee on tight holes, lay up to comfortable wedge distances on par 5s, and aim for the center of every green regardless of pin position. They never bring water or out-of-bounds into play if there's a safer alternative. On elevated or exposed greens, they take extra club and play for the back-center. The Conservative player's goal is bogey-free golf — they know that eliminating doubles and triples is the fastest path to lower scores.`,
    research_focus_keywords: "hazard-avoidance, safe-lines, wide-fairway-targets, center-green-approaches, layup-zones, bogey-avoidance, miss-zones, bailout-areas",
    is_active: true,
  });

  await createRecord(tables.strategyTypes, "STRATEGY_TYPES", "STRAT-004", {
    id: "STRAT-004",
    strategy_name: "Risk-Reward",
    emoji: "⚖️",
    short_description: "Tactical risk-taking based on hole conditions",
    full_strategy_approach: `The Risk-Reward golfer evaluates each hole and each shot independently, choosing aggressive or conservative lines based on the specific situation. On holes where the reward justifies the risk (reachable par 5s with manageable hazards, drivable par 4s, accessible pins), they attack. On holes where the penalty for a miss is severe (water carries with little margin, OB-tight doglegs, false-front greens), they play safe. This player adapts mid-round based on their current score, match situation, and how they're hitting the ball that day. The key skill is honest self-assessment: knowing when you're "on" enough to take the aggressive line, and when to back off.`,
    research_focus_keywords: "risk-assessment, hole-by-hole-decisions, penalty-severity, reward-probability, situation-awareness, adaptive-play, go-no-go-decisions, course-conditions",
    is_active: true,
  });

  console.log("");

  // ─── COURSES (Pebble Beach) ───
  console.log("COURSES:");

  await createRecord(tables.courses, "COURSES", "COURSE-Pebble", {
    id: "COURSE-Pebble-1919",
    course_name: "Pebble Beach Golf Links",
    architect: "Jack Neville, Douglas Grant",
    year_built: 1919,
    location_city: "Pebble Beach",
    location_state: "CA",
    location_country: "USA",
    par_total: 72,
    total_yardage: 6829,
    holes_total: 18,
    course_description: "Iconic coastal course along California's Monterey Peninsula with dramatic ocean cliffs, gnarled cypress trees, and crashing waves.",
    designer_intent: "Jack Neville designed Pebble Beach to showcase the natural landscape while creating championship-level challenge.",
    strategic_elements: "Water hazards on multiple holes (7, 8, 10, 18), dramatic elevation changes, coastal winds, tight fairways.",
    signature_hole: "Hole 7 - Lighthouse Hole (par 3, 100-110 yards, cliff-edge green)",
    is_active: true,
    // New platform fields
    facility_name: "Pebble Beach Resorts",
    common_name_aliases: "Pebble Beach, Pebble",
    course_type: "Resort",
    course_address: "1700 17-Mile Drive, Pebble Beach, CA 93953",
    website: "https://www.pebblebeach.com/golf/pebble-beach-golf-links/",
    course_par: 72,
    initial_research_status: "Complete",
    signature_holes: `Hole 7 (par 3, ~100 yds) - "Lighthouse Hole" - Peninsula green 100ft above Pacific.
Hole 8 (par 4) - "Pebble Point" - Long par 4 along cliff edge.
Hole 18 (par 5) - "Home" - Dramatic finishing hole curving along ocean.`,
  });

  console.log("");

  // ─── TEE_BOXES (4 for Pebble Beach) ───
  console.log("TEE_BOXES:");

  const teeData = [
    { key: "TEE-RED", color: "Red", local: "Guest Tees", yardage: 5862, rating: 71.4, slope: 128, rank: "Easiest", skill: "Beginner", primary: false },
    { key: "TEE-WHITE", color: "White", local: "Member Tees", yardage: 6656, rating: 74.3, slope: 135, rank: "Medium", skill: "Intermediate", primary: true },
    { key: "TEE-BLUE", color: "Blue", local: "Championship Tees", yardage: 6829, rating: 75.3, slope: 140, rank: "Medium-Hard", skill: "Advanced", primary: false },
    { key: "TEE-BLACK", color: "Black", local: "Scratch Golfer Tees", yardage: 7136, rating: 77.2, slope: 155, rank: "Hardest", skill: "Expert", primary: false },
  ];

  for (const t of teeData) {
    await createRecord(tables.teeBoxes, "TEE_BOXES", t.key, {
      id: `TEE-COURSE-Pebble-1919-${t.color.toUpperCase()}`,
      course_id: [recordIds["COURSE-Pebble"]],
      standard_color: t.color,
      course_local_name: t.local,
      yardage: t.yardage,
      course_rating: t.rating,
      slope_rating: t.slope,
      par: 72,
      difficulty_rank: t.rank,
      skill_level_for: t.skill,
      is_primary: t.primary,
    });
  }

  console.log("");

  // ─── USER_PROFILES (Nick) ───
  console.log("USER_PROFILES:");

  await createRecord(tables.userProfiles, "USER_PROFILES", "PROFILE-Nick", {
    id: "PROFILE-nick-2026",
    user_email: "nick@24anthem.com",
    user_name: "Nick",
    handicap: 6,
    preferred_tee_level: "Advanced",
    play_style: "Smart",
    experience_level: "Advanced",
    strengths: "Long drives, course management, competitive mentality",
    golf_goals: "Competitive level play, tournament wins, 2-3 handicap",
    // Club yardage data
    archetype_name: "Gulick",
    driver_carry: 275,
    driver_total: 290,
    three_wood_carry: 255,
    hybrid_carry: 225,
    seven_iron_carry: 175,
    pw_carry: 135,
    preferred_layup_range: "50-110",
    shot_shape: "Straight",
  });

  console.log("");

  // ─── AI_LAB (4 initial prompts) ───
  console.log("AI_LAB:");

  const aiLabRecords = [
    {
      id: "AILAB-RESEARCH-OVERVIEW-V1",
      prompt_name: "Course Overview Research",
      version: 1,
      prompt_type: "Research",
      agent_type: "Perplexity",
      status: "Active",
      is_current_default: true,
      system_prompt: `You are an expert golf course historian and strategy architect. Do a deep, exhaustive research dive on the specified golf course. STRUCTURE: 1) Course overview, 2) History and key facts, 3) Full course strategy from specified tees, 4) Hole-by-hole overview, 5) Detailed hole-by-hole (Tee Shot / Ideal Play / Hazards), 6) Extra color and storytelling. Do NOT limit word count.`,
      variables_used: "{COURSE_NAME}, {LOCATION}, {TEES}, {PLAYER_DISTANCES}",
    },
    {
      id: "AILAB-RESEARCH-DEEP-V1",
      prompt_name: "Deep Strategy Research",
      version: 1,
      prompt_type: "Strategy",
      agent_type: "Perplexity",
      status: "Active",
      is_current_default: true,
      system_prompt: `You are an expert golf course strategist. Given course research, tee box, player profile (club distances), and strategy approach, create player-specific hole-by-hole strategy. Recommend specific clubs based on player's distances. Identify which hazards matter for THIS player's range.`,
      variables_used: "{COURSE_RESEARCH}, {TEE_BOX}, {PLAYER_PROFILE}, {STRATEGY_TYPE}",
    },
    {
      id: "AILAB-SCRIPT-V1",
      prompt_name: "Course Anthem Script Writer",
      version: 1,
      prompt_type: "Script/Lyric",
      agent_type: "ChatGPT",
      status: "Active",
      is_current_default: true,
      system_prompt: `Write a full anthem/track script using the 24/8 golf swing tempo framework. Structure: [INTRO], [CHORUS], [FRONT NINE], [INTERLUDE], [BACK NINE], [OUTRO]. Each hole: 3-5 lines. Include 24/8 tempo references and production cues. 4000-6000 characters.`,
      variables_used: "{COURSE_NAME}, {RESEARCH_DATA}, {STRATEGY_TYPE}, {PLAYER_PROFILE}, {MUSIC_STYLE}",
    },
    {
      id: "AILAB-MUSIC-FOLKROCK-V1",
      prompt_name: "Folk-Rock Anthem",
      version: 1,
      prompt_type: "Music Style",
      agent_type: "Suno",
      status: "Active",
      is_current_default: true,
      system_prompt: `Folk-rock anthem with raw acoustic power, dynamic build, emotional storytelling. Start intimate with acoustic guitar and piano, swell into layered harmonies, banjo, upright bass, kick drum. Vocal: strong male lead with gang harmonies. 110-114 BPM, build from soft folk to stadium thunder. Mood: bold, spiritual, witty, triumphant endurance.`,
      variables_used: "",
    },
  ];

  for (const rec of aiLabRecords) {
    await createRecord(tables.aiLab, "AI_LAB", rec.id, rec);
  }

  // ─── SUMMARY ───
  console.log("\n=== SEED DATA COMPLETE ===");
  console.log("  4 STRATEGY_TYPES (golf-play focused)");
  console.log("  1 COURSE (Pebble Beach with facility + hole info)");
  console.log("  4 TEE_BOXES (Red, White, Blue, Black)");
  console.log("  1 USER_PROFILE (Nick with club yardages)");
  console.log("  4 AI_LAB prompts (Research, Strategy, Script, Music Style)");
  console.log(`  Total: ${Object.keys(recordIds).length} records`);
}

main().catch((err) => {
  console.error("\nFATAL:", err.message);
  process.exit(1);
});
