import { NextResponse } from "next/server"

/**
 * Waitlist signup endpoint.
 *
 * Posts to Airtable when AIRTABLE_PAT + AIRTABLE_BASE_ID are configured on the
 * server. Falls back to console logging only (dev mode) when they aren't.
 *
 * Required Airtable table schema (create this once in the base, see README or
 * .env.example):
 *
 *   Table name: "Waitlist"  (override via AIRTABLE_WAITLIST_TABLE env var)
 *   Fields:
 *     - "Email"     Single line text  (required)
 *     - "Source"    Single line text  (optional — we send "248-anthems-v2")
 *     - "Created"   Created time      (optional — auto-populated by Airtable)
 *
 * Extra fields on the table are fine; we only write the ones listed above.
 * Missing/renamed required fields will cause the Airtable write to 422, which
 * we propagate as a 500 to the caller so signups aren't silently dropped.
 */
export async function POST(request: Request) {
  let email: string | undefined

  try {
    const body = (await request.json()) as { email?: unknown }
    if (typeof body.email === "string") {
      email = body.email.trim()
    }
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid_json" },
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

  const pat = process.env.AIRTABLE_PAT
  const baseId = process.env.AIRTABLE_BASE_ID
  const tableName = process.env.AIRTABLE_WAITLIST_TABLE ?? "Waitlist"

  // Dev mode: no Airtable configured — just log and accept the signup so the
  // form still works locally without secrets.
  if (!pat || !baseId) {
    console.log("[waitlist] new signup (no Airtable configured):", email)
    return NextResponse.json({ ok: true, destination: "log" })
  }

  // 5s upper bound on the Airtable round-trip so a hung connection can't pin
  // the serverless function.
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 5000)

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
          records: [
            {
              fields: {
                Email: email,
                Source: "248-anthems-v2",
              },
            },
          ],
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
