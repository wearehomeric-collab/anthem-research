"use client"

import { useState } from "react"

type Status = "idle" | "submitting" | "success" | "error"
type Theme = "dark" | "light"

interface WaitlistFormProps {
  buttonLabel?: string
  successLine?: string
  className?: string
  theme?: Theme
}

// Normalize a phone string down to digits so we can validate length.
// Accepts "(415) 555-1234" / "+1 415-555-1234" / "4155551234" etc.
function normalizePhone(raw: string): string {
  return raw.replace(/[^\d]/g, "")
}

export function WaitlistForm({
  buttonLabel = "JOIN THE WAITLIST",
  successLine = "You're on the list. We'll reach out when your anthem slot opens.",
  className,
  theme = "dark",
}: WaitlistFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const isLight = theme === "light"

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting" || status === "success") return

    // Client-side sanity checks before we hit the network. The server
    // re-validates everything, this just saves a round-trip.
    if (name.trim().length < 2) {
      setStatus("error")
      setErrorMsg("Name is required.")
      return
    }
    if (normalizePhone(phone).length < 7) {
      setStatus("error")
      setErrorMsg("That phone number doesn't look right.")
      return
    }

    setStatus("submitting")
    setErrorMsg(null)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      })

      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
      }

      if (!res.ok || !data.ok) {
        setStatus("error")
        setErrorMsg(
          data.error === "email_invalid"
            ? "That email doesn't look right."
            : data.error === "phone_invalid"
              ? "That phone number doesn't look right."
              : data.error === "name_required"
                ? "Name is required."
                : "Couldn't sign you up. Try again in a sec.",
        )
        return
      }

      setStatus("success")
    } catch {
      setStatus("error")
      setErrorMsg("Network hiccup. Try again.")
    }
  }

  if (status === "success") {
    const successClass = isLight
      ? "border-[#1D4ED8] bg-[#1D4ED8]/5"
      : "border-[#10B981] bg-[#10B981]/5"
    const successEyebrowClass = isLight ? "text-[#1D4ED8]" : "text-[#10B981]"
    const successBodyClass = isLight ? "text-[#0B0B0F]" : "text-white"

    return (
      <div className={`border-l-4 p-6 ${successClass} ${className ?? ""}`}>
        <div
          className={`font-mono text-xs uppercase tracking-wider mb-2 ${successEyebrowClass}`}
        >
          You&apos;re In
        </div>
        <p className={`text-lg font-semibold ${successBodyClass}`}>{successLine}</p>
      </div>
    )
  }

  const inputClass = isLight
    ? "w-full bg-white border border-[#0B0B0F] focus:border-[#1D4ED8] focus:outline-none text-[#0B0B0F] placeholder:text-[#94A3B8] px-5 py-4 font-mono text-sm tracking-wide transition-colors disabled:opacity-60"
    : "w-full bg-[#0C1220] border border-[#1E3A5F] focus:border-[#3B82F6] focus:outline-none text-white placeholder:text-[#64748B] px-5 py-4 font-mono text-sm tracking-wide transition-colors disabled:opacity-60"

  const buttonClass = isLight
    ? "w-full bg-[#1D4ED8] hover:bg-[#1E3A8A] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white font-bold uppercase tracking-[0.15em] px-8 py-4 transition-colors duration-200"
    : "w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#1E3A5F] disabled:cursor-not-allowed text-white font-bold uppercase tracking-[0.15em] px-8 py-4 transition-colors duration-200"

  const errorClass = isLight ? "text-[#EA580C]" : "text-[#F59E0B]"

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-3 ${className ?? ""}`}
      noValidate
    >
      <input
        type="text"
        required
        autoComplete="name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={status === "submitting"}
        maxLength={120}
        className={inputClass}
      />
      <input
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "submitting"}
        className={inputClass}
      />
      <input
        type="tel"
        required
        autoComplete="tel"
        inputMode="tel"
        placeholder="Phone (for text when your anthem is ready)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        disabled={status === "submitting"}
        className={inputClass}
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClass}
      >
        {status === "submitting" ? "..." : buttonLabel}
      </button>
      {status === "error" && errorMsg && (
        <p className={`text-sm font-mono ${errorClass}`}>{errorMsg}</p>
      )}
    </form>
  )
}
