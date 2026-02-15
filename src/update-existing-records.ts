/**
 * Update existing records to match the platform vision:
 * 1. Rewrite STRATEGY_TYPES to golf-play focused
 * 2. Add club yardage data to USER_PROFILES
 * 3. Add course-level hole info to COURSES (Pebble Beach)
 * 4. Seed AI_LAB with initial prompts
 */
import Airtable from "airtable";
import { tables } from "./airtable-client.js";
import "dotenv/config";

async function main() {
  console.log("=== Updating Existing Records ===\n");

  // ── 1. Update STRATEGY_TYPES to golf-play focused ──
  console.log("Updating STRATEGY_TYPES...");

  // Find existing records
  const strategies = await tables.strategyTypes.select().all();
  for (const rec of strategies) {
    const name = rec.get("strategy_name") as string;
    let update: Record<string, any> = {};

    switch (name) {
      case "Smart":
        update = {
          full_strategy_approach: `The Smart golfer studies the course before playing, understands the architect's design intent, and makes calculated decisions on every shot. They think 2-3 shots ahead: choosing club off the tee based on ideal approach distance, playing to the fat side of greens, and respecting hazard placement. On par 5s, they pick specific layup yardages rather than blindly hitting as far as possible. On par 3s, they play to the center of the green unless the pin is clearly accessible. They factor in wind, elevation, and slope before every shot. The Smart player's round is defined by consistent decision-making, not individual heroic shots.`,
          research_focus_keywords: "course-management, calculated-approach, strategic-thinking, course-knowledge, hazard-placement, elevation-changes, wind-patterns, architect-intent, layup-distances, green-contours",
          // Clear anthem-specific fields (content moves to AI_LAB)
          lyrical_themes: "",
          music_tone: "",
          chatgpt_prompt_template: "",
        };
        break;
      case "Aggressive":
        update = {
          full_strategy_approach: `The Aggressive golfer attacks the course with maximum scoring intent. They hit driver on every par 4 and par 5, go for par 5s in two when there's any reasonable chance, and fire at pins rather than playing safe to the middle of greens. On risk-reward holes, they always take the aggressive line. They accept that this style produces more bogeys alongside more birdies — the goal is to maximize total birdies, not minimize mistakes. The Aggressive player needs high confidence in their ball-striking and short game to recover from the misses this strategy inevitably creates.`,
          research_focus_keywords: "birdie-opportunities, aggressive-lines, go-for-it-holes, reachable-par-5s, attackable-pins, short-game-recovery, scoring-zones, driver-holes",
          lyrical_themes: "",
          music_tone: "",
          chatgpt_prompt_template: "",
        };
        break;
      case "Conservative":
        update = {
          full_strategy_approach: `The Conservative golfer plays within their skill level and prioritizes avoiding big numbers. They hit fairway woods or hybrids off the tee on tight holes, lay up to comfortable wedge distances on par 5s, and aim for the center of every green regardless of pin position. They never bring water or out-of-bounds into play if there's a safer alternative. On elevated or exposed greens, they take extra club and play for the back-center. The Conservative player's goal is bogey-free golf — they know that eliminating doubles and triples is the fastest path to lower scores.`,
          research_focus_keywords: "hazard-avoidance, safe-lines, wide-fairway-targets, center-green-approaches, layup-zones, bogey-avoidance, miss-zones, bailout-areas",
          lyrical_themes: "",
          music_tone: "",
          chatgpt_prompt_template: "",
        };
        break;
      case "Risk-Reward":
        update = {
          full_strategy_approach: `The Risk-Reward golfer evaluates each hole and each shot independently, choosing aggressive or conservative lines based on the specific situation. On holes where the reward justifies the risk (reachable par 5s with manageable hazards, drivable par 4s, accessible pins), they attack. On holes where the penalty for a miss is severe (water carries with little margin, OB-tight doglegs, false-front greens), they play safe. This player adapts mid-round based on their current score, match situation, and how they're hitting the ball that day. The key skill is honest self-assessment: knowing when you're "on" enough to take the aggressive line, and when to back off.`,
          research_focus_keywords: "risk-assessment, hole-by-hole-decisions, penalty-severity, reward-probability, situation-awareness, adaptive-play, go-no-go-decisions, course-conditions",
          lyrical_themes: "",
          music_tone: "",
          chatgpt_prompt_template: "",
        };
        break;
    }

    if (Object.keys(update).length > 0) {
      await tables.strategyTypes.update(rec.id, update);
      console.log(`  Updated: ${name}`);
    }
  }

  // ── 2. Update USER_PROFILES with club yardages ──
  console.log("\nUpdating USER_PROFILES with club yardages...");

  const profiles = await tables.userProfiles.select().all();
  for (const rec of profiles) {
    const name = rec.get("user_name") as string;
    if (name === "Nick") {
      await tables.userProfiles.update(rec.id, {
        archetype_name: "Gulick",
        is_platform_default: false,
        driver_carry: 275,
        driver_total: 290,
        three_wood_carry: 255,
        hybrid_carry: 225,
        seven_iron_carry: 175,
        pw_carry: 135,
        preferred_layup_range: "50-110",
        shot_shape: "Straight",
        miss_tendency: "",
      });
      console.log(`  Updated: ${name} (driver 275, 7i 175, PW 135)`);
    }
  }

  // ── 3. Update COURSES (Pebble Beach) with hole info ──
  console.log("\nUpdating Pebble Beach course with hole info...");

  const courses = await tables.courses.select({
    filterByFormula: 'SEARCH("Pebble Beach", {course_name})'
  }).firstPage();

  if (courses.length > 0) {
    await tables.courses.update(courses[0].id, {
      facility_name: "Pebble Beach Resorts",
      common_name_aliases: "Pebble Beach, Pebble",
      course_type: "Resort",
      course_address: "1700 17-Mile Drive, Pebble Beach, CA 93953",
      website: "https://www.pebblebeach.com/golf/pebble-beach-golf-links/",
      course_par: 72,
      initial_research_status: "Complete",
      signature_holes: `Hole 7 (par 3, ~100 yds) - "Lighthouse Hole" - Tiny green perched on peninsula 100ft above Pacific. Shortest par 3 on any major championship course. All-or-nothing shot over ocean inlet.
Hole 8 (par 4) - "Pebble Point" - Long par 4 running along cliff edge with ocean right for entire hole.
Hole 18 (par 5) - "Home" - Dramatic finishing hole curving along ocean. Green sits with Pacific directly behind. Most photographed hole in golf.`,
      hole_descriptions: JSON.stringify([
        { hole: 1, par: 4, name: "Tin Cup", feature: "Uphill opener through trees" },
        { hole: 2, par: 5, feature: "Downhill, first ocean view" },
        { hole: 3, par: 4, feature: "Short precision par 4" },
        { hole: 4, par: 4, feature: "Beach runs entire left side" },
        { hole: 5, par: 3, feature: "Elevated tee, ocean panorama" },
        { hole: 6, par: 5, feature: "Uphill dogleg along cliffs" },
        { hole: 7, par: 3, name: "Lighthouse Hole", feature: "Peninsula green 100ft above ocean" },
        { hole: 8, par: 4, name: "Pebble Point", feature: "Coastal par 4, ocean right" },
        { hole: 9, par: 4, feature: "Hardest par 4, uphill into wind" },
        { hole: 10, par: 4, feature: "Dramatic downhill to ocean" },
        { hole: 11, par: 4, feature: "Tree-lined inland transition" },
        { hole: 12, par: 3, feature: "Downhill scoring opportunity" },
        { hole: 13, par: 4, feature: "Return to coastal wind" },
        { hole: 14, par: 5, feature: "Long par 5, ocean throughout" },
        { hole: 15, par: 4, feature: "Cypress tree-framed fairway" },
        { hole: 16, par: 4, feature: "Transition before dramatic finish" },
        { hole: 17, par: 4, feature: "Hourglass green, Nicklaus 1-iron" },
        { hole: 18, par: 5, name: "Home", feature: "Ocean-front finishing amphitheater" },
      ]),
    });
    console.log(`  Updated: Pebble Beach (${courses[0].id})`);
  }

  // ── 4. Seed AI_LAB prompts ──
  console.log("\nSeeding AI_LAB prompts...");

  const aiLabRecords = [
    {
      id: "AILAB-RESEARCH-OVERVIEW-V1",
      prompt_name: "Course Overview Research",
      version: 1,
      prompt_type: "Research",
      agent_type: "Perplexity",
      status: "Active",
      is_current_default: true,
      system_prompt: `You are an expert golf course historian and strategy architect. Do a deep, exhaustive research dive on the specified golf course. STRUCTURE THE OUTPUT: 1) Course overview (3-6 sentences), 2) History, prestige, and key facts, 3) Full course strategy from specified tees, 4) Hole-by-hole strategy overview, 5) Detailed hole-by-hole strategy with Tee Shot / Ideal Play / Hazards for each hole, 6) Extra color and storytelling details. Prioritize accuracy, depth, vivid descriptive language, and strategic clarity. Do NOT limit word count.`,
      variables_used: "{COURSE_NAME}, {LOCATION}, {TEES}, {PLAYER_DISTANCES}",
      hard_rules: "Do not limit word count. Structure output into clear sections. Include hole-by-hole detail.",
    },
    {
      id: "AILAB-RESEARCH-DEEP-V1",
      prompt_name: "Deep Strategy Research",
      version: 1,
      prompt_type: "Strategy",
      agent_type: "Perplexity",
      status: "Active",
      is_current_default: true,
      system_prompt: `You are an expert golf course strategist. Given course overview research, a specific tee box, player profile (club distances), and strategy approach, create a detailed player-specific strategy. For EACH HOLE: recommend specific clubs based on player's distances, identify which hazards matter for THIS player's range, and provide tactical advice tailored to their strengths and tendencies. The strategy should differ meaningfully from a generic strategy — a 275-yard driver player faces different decisions than a 240-yard driver player.`,
      variables_used: "{COURSE_RESEARCH}, {TEE_BOX}, {PLAYER_PROFILE}, {STRATEGY_TYPE}, {STRATEGY_APPROACH}",
      hard_rules: "Must reference player's specific club distances. Must differ from generic strategy. Hole-by-hole format required.",
    },
    {
      id: "AILAB-SCRIPT-V1",
      prompt_name: "Course Anthem Script Writer",
      version: 1,
      prompt_type: "Script/Lyric",
      agent_type: "ChatGPT",
      status: "Active",
      is_current_default: true,
      system_prompt: `You are a professional songwriter and lyricist specializing in anthemic sports music. Write a full anthem/track script using the 24/8 golf swing tempo framework. Structure: [INTRO], [CHORUS], [FRONT NINE], [INTERLUDE], [BACK NINE], [OUTRO]. Each hole gets 3-5 lines covering strategy, hazards, and emotion. Include 24/8 tempo references. Include production cues in brackets (BPM, dynamics, instrumentation). Keep it singable with rhythm, meter, and natural phrasing. Total script: 4000-6000 characters.`,
      variables_used: "{COURSE_NAME}, {RESEARCH_DATA}, {STRATEGY_TYPE}, {PLAYER_PROFILE}, {MUSIC_STYLE}",
      hard_rules: "Must include all 18 holes. Must include 24/8 tempo references. Must include production cues. 4000-6000 character target.",
    },
    {
      id: "AILAB-MUSIC-FOLKROCK-V1",
      prompt_name: "Folk-Rock Anthem",
      version: 1,
      prompt_type: "Music Style",
      agent_type: "Suno",
      status: "Active",
      is_current_default: true,
      system_prompt: `Folk-rock anthem with raw acoustic power, dynamic build, and emotional storytelling in the spirit of "Hopeless Wanderer." Start intimate with warm acoustic guitar and piano under a steady stomp-clap rhythm, then swell into layered harmonies, banjo strums, upright bass, and kick drum drive. Emphasize momentum and grit — every verse should feel like a rising march toward redemption. Vocal: strong, heartfelt male lead with echoing gang harmonies and group chants. Integrate the 24/8 golf swing tempo: a 3-beat motion cycle. Target ~110-114 BPM, with a build from soft folk storytelling to stadium-sized acoustic thunder. Mood: bold, spiritual, witty, triumphant endurance.`,
      variables_used: "",
      hard_rules: "110-114 BPM target. Must build from intimate to anthem. Male lead vocal.",
    },
  ];

  for (const rec of aiLabRecords) {
    try {
      await tables.aiLab.create([{ fields: rec }]);
      console.log(`  Created: ${rec.prompt_name}`);
    } catch (err: any) {
      console.error(`  Failed: ${rec.prompt_name} — ${err.message}`);
    }
  }

  console.log("\n=== All Updates Complete ===");
}

main().catch((err) => {
  console.error("\nFATAL:", err.message);
  process.exit(1);
});
