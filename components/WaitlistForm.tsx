"use client"

import { useState } from "react"

// Two-stage waitlist flow:
//
//   Stage 1 ("course")   — just pick a course. Single field, low friction,
//                          captures highest-intent signal (which course).
//                          Client-only — nothing hits the server until stage 2.
//                          If the user abandons here, we lose the lead (flag
//                          for future upgrade to a partial-record save).
//   Stage 2 ("onboarding") — name / email / phone / strategy / handicap.
//                          This is where the profile gets built out so we can
//                          personalize the anthem. One server POST at the
//                          end, submits everything in one shot.
//   Stage 3 ("success")  — confirmation card referencing the course the user
//                          picked so it feels personalized.

type Stage = "course" | "onboarding"
type Status = "idle" | "submitting" | "success" | "error"
type Theme = "dark" | "light"

interface WaitlistFormProps {
  className?: string
  theme?: Theme
}

const COURSE_OPTIONS = [
  "Augusta National",
  "Pebble Beach",
  "St Andrews",
  "Bethpage Black",
  "Whistling Straits",
  "TPC Sawgrass",
  "Oakmont",
  "Bandon Dunes",
  "Torrey Pines",
  "Medinah",
]
const OTHER_OPTION = "__other__"

// The four strategy types from the brand system (CLAUDE.md).
const STRATEGY_OPTIONS = [
  { id: "Smart", emoji: "🧠", label: "Smart", desc: "Calculated play, think ahead" },
  { id: "Aggressive", emoji: "🔥", label: "Aggressive", desc: "Attack every hole" },
  { id: "Conservative", emoji: "🛡️", label: "Conservative", desc: "Steady par play" },
  { id: "Risk-Reward", emoji: "⚖️", label: "Risk-Reward", desc: "Tactical risk-taking" },
] as const

function normalizePhone(raw: string): string {
  return raw.replace(/[^\d]/g, "")
}

export function WaitlistForm({ className, theme = "dark" }: WaitlistFormProps) {
  // Stage 1 state
  const [courseSelect, setCourseSelect] = useState("")
  const [courseOther, setCourseOther] = useState("")

  // Stage 2 state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [strategy, setStrategy] = useState<string>("")
  const [handicap, setHandicap] = useState("")

  // Flow state
  const [stage, setStage] = useState<Stage>("course")
  const [status, setStatus] = useState<Status>("idle")
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const isLight = theme === "light"
  const isOther = courseSelect === OTHER_OPTION
  const resolvedCourse = isOther ? courseOther.trim() : courseSelect

  // ---------- Stage 1: course pick ----------
  function handleCourseSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrorMsg(null)
    if (!resolvedCourse || resolvedCourse.length < 2) {
      setStatus("error")
      setErrorMsg("Pick a course — or type your own.")
      return
    }
    setStatus("idle")
    setStage("onboarding")
  }

  // ---------- Stage 2: onboarding + final submit ----------
  async function handleOnboardingSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting" || status === "success") return

    if (name.trim().length < 2) {
      setStatus("error")
      setErrorMsg("Name is required.")
      return
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error")
      setErrorMsg("That email doesn't look right.")
      return
    }
    if (normalizePhone(phone).length < 7) {
      setStatus("error")
      setErrorMsg("That phone number doesn't look right.")
      return
    }
    if (!strategy) {
      setStatus("error")
      setErrorMsg("Pick a strategy style.")
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
          course: resolvedCourse,
          strategy,
          handicap: handicap.trim() || undefined,
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
                : data.error === "course_required"
                  ? "We lost your course pick — refresh and try again."
                  : data.error === "strategy_required"
                    ? "Pick a strategy style."
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

  // ---------- Theme class helpers ----------
  const inputClass = isLight
    ? "w-full bg-white border border-[#0B0B0F] focus:border-[#1D4ED8] focus:outline-none text-[#0B0B0F] placeholder:text-[#94A3B8] px-5 py-4 font-mono text-sm tracking-wide transition-colors disabled:opacity-60"
    : "w-full bg-[#0C1220] border border-[#1E3A5F] focus:border-[#3B82F6] focus:outline-none text-white placeholder:text-[#64748B] px-5 py-4 font-mono text-sm tracking-wide transition-colors disabled:opacity-60"
  const selectClass = `${inputClass} appearance-none`
  const buttonClass = isLight
    ? "w-full bg-[#1D4ED8] hover:bg-[#1E3A8A] disabled:bg-[#94A3B8] disabled:cursor-not-allowed text-white font-bold uppercase tracking-[0.15em] px-8 py-4 transition-colors duration-200"
    : "w-full bg-[#3B82F6] hover:bg-[#2563EB] disabled:bg-[#1E3A5F] disabled:cursor-not-allowed text-white font-bold uppercase tracking-[0.15em] px-8 py-4 transition-colors duration-200"
  const ghostButtonClass = isLight
    ? "text-[#6B7280] hover:text-[#0B0B0F] font-mono text-xs uppercase tracking-[0.2em]"
    : "text-[#64748B] hover:text-white font-mono text-xs uppercase tracking-[0.2em]"
  const eyebrowClass = isLight
    ? "text-[#1D4ED8]"
    : "text-[#3B82F6]"
  const errorClass = isLight ? "text-[#EA580C]" : "text-[#F59E0B]"
  const chevronClass = isLight ? "text-[#6B7280]" : "text-[#64748B]"
  const strategyCardBase = isLight
    ? "border border-[#E5E7EB] bg-white hover:border-[#0B0B0F]"
    : "border border-[#1E3A5F] bg-[#0C1220] hover:border-[#3B82F6]"
  const strategyCardActive = isLight
    ? "border-2 border-[#1D4ED8] bg-[#1D4ED8]/5"
    : "border-2 border-[#3B82F6] bg-[#3B82F6]/10"
  const strategyLabelClass = isLight ? "text-[#0B0B0F]" : "text-white"
  const strategyDescClass = isLight ? "text-[#6B7280]" : "text-[#94A3B8]"

  // ---------- SUCCESS CARD ----------
  if (status === "success") {
    const successClass = isLight
      ? "border-[#1D4ED8] bg-[#1D4ED8]/5"
      : "border-[#10B981] bg-[#10B981]/5"
    const successEyebrowClass = isLight ? "text-[#1D4ED8]" : "text-[#10B981]"
    const successBodyClass = isLight ? "text-[#0B0B0F]" : "text-white"
    const successSubClass = isLight ? "text-[#6B7280]" : "text-[#94A3B8]"

    return (
      <div className={`border-l-4 p-6 ${successClass} ${className ?? ""}`}>
        <div
          className={`font-mono text-xs uppercase tracking-wider mb-2 ${successEyebrowClass}`}
        >
          You&apos;re In
        </div>
        <p className={`text-lg font-semibold mb-2 ${successBodyClass}`}>
          Your {resolvedCourse} anthem is in the queue.
        </p>
        <p className={`text-sm ${successSubClass}`}>
          We&apos;ll text you when it&apos;s ready. No spam. Just your anthem.
        </p>
      </div>
    )
  }

  // ---------- STAGE 1: COURSE PICK ----------
  if (stage === "course") {
    return (
      <form
        onSubmit={handleCourseSubmit}
        className={`flex flex-col gap-4 ${className ?? ""}`}
        noValidate
      >
        <div
          className={`font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] ${eyebrowClass}`}
        >
          Step 1 of 2 · Pick your course
        </div>

        <div className="relative">
          <select
            required
            value={courseSelect}
            onChange={(e) => setCourseSelect(e.target.value)}
            className={selectClass}
            aria-label="Which course do you want an anthem for?"
          >
            <option value="" disabled>
              Which course do you want?
            </option>
            {COURSE_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value={OTHER_OPTION}>Other (type in)</option>
          </select>
          <span
            aria-hidden="true"
            className={`pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 font-mono text-xs ${chevronClass}`}
          >
            ▾
          </span>
        </div>

        {isOther && (
          <input
            type="text"
            required
            placeholder="Type your course name"
            value={courseOther}
            onChange={(e) => setCourseOther(e.target.value)}
            maxLength={120}
            className={inputClass}
            autoFocus
          />
        )}

        <button type="submit" className={buttonClass}>
          Claim My Slot
        </button>

        {status === "error" && errorMsg && (
          <p className={`text-sm font-mono ${errorClass}`}>{errorMsg}</p>
        )}
      </form>
    )
  }

  // ---------- STAGE 2: ONBOARDING ----------
  return (
    <form
      onSubmit={handleOnboardingSubmit}
      className={`flex flex-col gap-4 ${className ?? ""}`}
      noValidate
    >
      <div className="flex items-center justify-between">
        <div
          className={`font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] ${eyebrowClass}`}
        >
          Step 2 of 2 · Build your profile
        </div>
        <button
          type="button"
          onClick={() => {
            setStage("course")
            setStatus("idle")
            setErrorMsg(null)
          }}
          className={ghostButtonClass}
          disabled={status === "submitting"}
        >
          ← Change course
        </button>
      </div>

      {/* Locked-in course reminder */}
      <div
        className={`border-l-2 ${isLight ? "border-[#1D4ED8] bg-[#F8FAFC]" : "border-[#3B82F6] bg-[#0C1220]/60"} px-4 py-3`}
      >
        <div
          className={`font-mono text-[0.65rem] uppercase tracking-[0.25em] mb-1 ${isLight ? "text-[#6B7280]" : "text-[#94A3B8]"}`}
        >
          Your Course
        </div>
        <div
          className={`font-bold text-base ${isLight ? "text-[#0B0B0F]" : "text-white"}`}
        >
          {resolvedCourse}
        </div>
      </div>

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

      <div>
        <div
          className={`font-mono text-[0.65rem] uppercase tracking-[0.2em] mb-2 ${isLight ? "text-[#6B7280]" : "text-[#94A3B8]"}`}
        >
          Strategy Style
        </div>
        <div className="grid grid-cols-2 gap-2">
          {STRATEGY_OPTIONS.map((opt) => {
            const selected = strategy === opt.id
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setStrategy(opt.id)}
                disabled={status === "submitting"}
                className={`text-left p-3 transition-colors ${
                  selected ? strategyCardActive : strategyCardBase
                }`}
                aria-pressed={selected}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base" aria-hidden="true">
                    {opt.emoji}
                  </span>
                  <span
                    className={`font-bold text-sm uppercase tracking-wide ${strategyLabelClass}`}
                  >
                    {opt.label}
                  </span>
                </div>
                <div className={`text-xs leading-tight ${strategyDescClass}`}>
                  {opt.desc}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <input
        type="text"
        placeholder="Handicap (optional — e.g. 12, 0.5, +2)"
        value={handicap}
        onChange={(e) => setHandicap(e.target.value)}
        disabled={status === "submitting"}
        maxLength={10}
        className={inputClass}
      />

      <button type="submit" disabled={status === "submitting"} className={buttonClass}>
        {status === "submitting" ? "..." : "Request My Anthem"}
      </button>

      {status === "error" && errorMsg && (
        <p className={`text-sm font-mono ${errorClass}`}>{errorMsg}</p>
      )}
    </form>
  )
}
