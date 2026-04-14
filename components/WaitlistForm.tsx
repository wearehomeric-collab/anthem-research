"use client"

import { useState } from "react"

type Status = "idle" | "submitting" | "success" | "error"

interface WaitlistFormProps {
  placeholder?: string
  buttonLabel?: string
  successLine?: string
  className?: string
}

export function WaitlistForm({
  placeholder = "your@email.com",
  buttonLabel = "JOIN THE WAITLIST",
  successLine = "You're on the list. We'll reach out when your anthem slot opens.",
  className,
}: WaitlistFormProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting" || status === "success") return

    setStatus("submitting")
    setErrorMsg(null)

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
    return (
      <div
        className={`border-l-4 border-[#10B981] bg-[#10B981]/5 p-6 ${className ?? ""}`}
      >
        <div className="font-mono text-xs text-[#10B981] uppercase tracking-wider mb-2">
          You&apos;re In
        </div>
        <p className="text-white text-lg font-semibold">{successLine}</p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col sm:flex-row gap-3 ${className ?? ""}`}
    >
      <input
        type="email"
        required
        autoComplete="email"
        inputMode="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status === "submitting"}
        className="flex-1 bg-[#0C1220] border border-[#1E3A5F] focus:border-[#3B82F6] focus:outline-none text-white placeholder:text-[#64748B] px-5 py-4 font-mono text-sm tracking-wide transition-colors disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#1E3A5F] disabled:cursor-not-allowed text-white font-bold uppercase tracking-[0.15em] px-8 py-4 transition-colors duration-200 whitespace-nowrap"
      >
        {status === "submitting" ? "..." : buttonLabel}
      </button>
      {status === "error" && errorMsg && (
        <p className="sm:col-span-2 text-[#F59E0B] text-sm font-mono basis-full">
          {errorMsg}
        </p>
      )}
    </form>
  )
}
