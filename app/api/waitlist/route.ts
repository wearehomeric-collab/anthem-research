import { NextResponse } from "next/server"

// TODO: wire this up to a real destination (Airtable, ConvertKit, Resend audience, Notion, etc.)
// For now it just validates the email and logs it. Everything else is a no-op.
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

  console.log("[waitlist] new signup:", email)

  return NextResponse.json({ ok: true })
}
