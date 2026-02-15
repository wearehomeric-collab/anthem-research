/**
 * Course Overview / Initial Research Prompt (Perplexity)
 * Structured output for populating the database: course info, all tee sets,
 * hole-by-hole yardages, and scorecard source.
 * This is the code default — can be overridden by AI_LAB record
 * with prompt_type "Research" and is_current_default checked.
 */

export const PROMPT_ID = "AILAB-RESEARCH-OVERVIEW";

export interface CourseOverviewVars {
  courseName: string;
  location: string;
  teeName: string;
}

export function buildPrompt(vars: CourseOverviewVars): string {
  return `Research the following golf course and provide ALL factual data needed to populate a course database. Be precise and structured. Include ALL available tee sets with complete hole-by-hole yardages.

Course Name: ${vars.courseName}
Location (if known): ${vars.location}
Target Tee (if specified): ${vars.teeName}

Note: Even if a target tee is specified above, you MUST still return data for ALL available tee sets at this course. The target tee is just for reference.

Provide your response in the following EXACT format:

=== COURSE INFO ===
Official Name: [full official course name]
City: [city name]
State/Region: [state or region]
Country: [country]
Website: [official website URL if available, otherwise "Unknown"]
Architect(s): [architect name(s), separated by commas]
Opened Year: [year opened as a number]
General Vibe: [2-3 sentence description of course character, style, and what makes it unique]
Recent Renovations: [brief note on any major renovations with years, or "None known"]
Course Type: [parkland, links, desert, coastal, mountain, resort, or combination]

=== TEE SETS OVERVIEW ===
List ALL available tee sets at this course. For each tee set, provide:

Tee 1:
- Tee Name: [exact name used by course, e.g., "Championship", "Blue", "Men's"]
- Tee Color: [color if applicable]
- Total Yardage: [total 18-hole yardage]
- Par: [total par]
- Rating: [course rating if available, otherwise "Unknown"]
- Slope: [slope rating if available, otherwise "Unknown"]
- Front 9 Yardage: [yardage for holes 1-9]
- Back 9 Yardage: [yardage for holes 10-18]

Tee 2:
[repeat format]

[Continue for ALL available tees - typically 4-6 tee sets]

=== HOLE-BY-HOLE YARDAGES ===
For EACH tee set listed above, provide complete hole-by-hole data:

--- [TEE NAME] ---
Hole 1: Par [X], [XXX] yards
Hole 2: Par [X], [XXX] yards
Hole 3: Par [X], [XXX] yards
Hole 4: Par [X], [XXX] yards
Hole 5: Par [X], [XXX] yards
Hole 6: Par [X], [XXX] yards
Hole 7: Par [X], [XXX] yards
Hole 8: Par [X], [XXX] yards
Hole 9: Par [X], [XXX] yards
Hole 10: Par [X], [XXX] yards
Hole 11: Par [X], [XXX] yards
Hole 12: Par [X], [XXX] yards
Hole 13: Par [X], [XXX] yards
Hole 14: Par [X], [XXX] yards
Hole 15: Par [X], [XXX] yards
Hole 16: Par [X], [XXX] yards
Hole 17: Par [X], [XXX] yards
Hole 18: Par [X], [XXX] yards

--- [NEXT TEE NAME] ---
[repeat for each tee set]

=== SCORECARD SOURCE ===
Source URL: [URL where scorecard data was found, if available]
Data Confidence: [High/Medium/Low - based on source reliability]
Notes: [any caveats about the data, e.g., "2024 scorecard", "some tees estimated"]

IMPORTANT RULES:
- Be precise with numbers - no approximations like "~" or "approximately"
- If specific data is unavailable, mark it as "Unknown" rather than guessing
- Use exact tee names as the course refers to them
- Include ALL tee sets available at the course (men's, women's, senior, championship, etc.)
- Par values should be consistent across all tees for each hole (par doesn't change by tee)
- Maintain the exact format above for easy parsing
- If you cannot find reliable scorecard data, say so clearly in the Notes section`;
}
