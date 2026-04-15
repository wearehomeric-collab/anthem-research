import { NextResponse } from "next/server"

/**
 * Waitlist signup endpoint.
 *
 * Posts to Airtable when AIRTABLE_PAT + AIRTABLE_BASE_ID are configured on the
 * server. Falls back to console logging only (dev mode) when they aren't.
 *
 * The form is a 2-stage flow client-side (course → onboarding) but the server
 * receives everything in one POST at the end of stage 2. All fields are
 * required except Handicap.
 *
 * Required Airtable table schema (create this once in the base, see
 * .env.example):
 *
 *   Table name: "Waitlist"  (override via AIRTABLE_WAITLIST_TABLE env var)
 *   Fields:
 *     - "Name"      Single line text   (required)
 *     - "Email"     Single line text   (required)
 *     - "Phone"     Single line text   (required)
 *     - "Course"    Single line text   (required)
 *     - "Strategy"  Single line text   (required — one of: Smart, Aggressive,
 *                                       Conservative, Risk-Reward)
 *     - "Handicap"  Single line text   (optional)
 *     - "Source"    Single line text   (optional — we send "248-anthems-v2")
 *     - "Created"   Created time       (optional — auto-populated by Airtable)
 *
 * Extra fields on the table are fine; we only write the ones listed above.
 * Missing/renamed required fields will cause the Airtable write to 422, which
 * we propagate as a 500 to the caller so signups aren't silently dropped.
 */

const ALLOWED_STRATEGIES = new Set([
  "Smart",
  "Aggressive",
  "Conservative",
  "Risk-Reward",
])

export async function POST(request: Request) {
  let name: string | undefined
  let email: string | undefined
  let phone: string | undefined
  let course: string | undefined
  let strategy: string | undefined
  let handicap: string | undefined

  try {
    const body = (await request.json()) as {
      name?: unknown
      email?: unknown
      phone?: unknown
      course?: unknown
      strategy?: unknown
      handicap?: unknown
    }
    if (typeof body.name === "string") name = body.name.trim()
    if (typeof body.email === "string") email = body.email.trim()
    if (typeof body.phone === "string") phone = body.phone.trim()
    if (typeof body.course === "string") course = body.course.trim()
    if (typeof body.strategy === "string") strategy = body.strategy.trim()
    if (typeof body.handicap === "string") handicap = body.handicap.trim()
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
      { status: 400 },
    )
  }

  if (!name || name.length < 2) {
    return NextResponse.json(
      { ok: false, error: "name_required" },
      { status: 400 },
    )
  }

  if (!email) {
    return NextResponse.json(
      { ok: false, error: "email_required" },
      { status: 400 },
    )
  }

  // Minimal email shape check. Not RFC-compliant on purpose — just catches obvious garbage.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "email_invalid" },
      { status: 400 },
    )
  }

  // Loose phone validation: strip non-digits and require at least 7 digits
  // (international minimum). Friendly to "(415) 555-1234", "+1 415 555 1234",
  // "4155551234", etc.
  const phoneDigits = (phone ?? "").replace(/[^\d]/g, "")
  if (phoneDigits.length < 7) {
    return NextResponse.json(
      { ok: false, error: "phone_invalid" },
      { status: 400 },
    )
  }

  if (!course || course.length < 2) {
    return NextResponse.json(
      { ok: false, error: "course_required" },
      { status: 400 },
    )
  }

  if (!strategy || !ALLOWED_STRATEGIES.has(strategy)) {
    return NextResponse.json(
      { ok: false, error: "strategy_required" },
      { status: 400 },
    )
  }

  const pat = process.env.AIRTABLE_PAT
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_WAITLIST_TABLE ?? "Waitlist"

  // Dev mode: no Airtable configured — just log and accept the signup so the
  // form still works locally without secrets.
  if (!pat || !baseId) {
    console.log("[waitlist] new signup (no Airtable configured):", {
      name,
      email,
      phone,
      course,
      strategy,
      handicap,
    })
    return NextResponse.json({ ok: true, destination: "log" })
  }

  // 5s upper bound on the Airtable round-trip so a hung connection can't pin
  // the serverless function.
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

  // Build the fields payload. Handicap is only included if it was provided.
  const fields: Record<string, string> = {
    Name: name,
    Email: email,
    Phone: phone,
    Course: course,
    Strategy: strategy,
    Source: "248-anthems-v2",
  }
  if (handicap && handicap.length > 0) {
    fields.Handicap = handicap
  }

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${pat}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [{ fields }],
          // Let Airtable create any select options we haven't pre-defined.
          typecast: true,
        }),
        signal: controller.signal,
      },
    )

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "")
      console.error(
        "[waitlist] airtable write failed:",
        res.status,
        errorBody.slice(0, 500),
      )
      return NextResponse.json(
        { ok: false, error: "upstream_error" },
        { status: 500 },
      )
    }

    return NextResponse.json({ ok: true, destination: "airtable" })
  } catch (err) {
    const reason =
      err instanceof Error && err.name === "AbortError"
        ? "upstream_timeout"
        : "upstream_unreachable"
    console.error("[waitlist] airtable request failed:", reason, err)
    return NextResponse.json({ ok: false, error: reason }, { status: 500 })
  } finally {
    clearTimeout(timeout)
  }
}
