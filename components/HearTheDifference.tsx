"use client"

import { useCallback, useEffect, useRef, useState } from "react"

// "Hear The Difference" — an A/B metronome widget that plays two synthesized
// click patterns via the Web Audio API. No audio files needed; the browser
// generates crisp tone bursts on demand.
//
// Pattern A (Amateur Rushed): evenly-spaced clicks at 180ms apart, 8 clicks
//                              per loop. Feels like no structure — just
//                              panic tempo. No separation of back vs through.
// Pattern B (3:1 Locked):     a slower "back" sequence (4 quick clicks at
//                              140ms apart = 560ms backswing) followed by
//                              a louder "through" click 180ms later.
//                              Gives the user the actual 3:1 feel.
//
// Events are scheduled against AudioContext.currentTime so timing is
// sample-accurate and not subject to setTimeout drift. A loop runs the
// pattern repeatedly until the user hits "stop" or switches to the other
// pattern.

type Theme = "dark" | "light"
type ActivePattern = null | "amateur" | "three_one"

interface HearTheDifferenceProps {
  theme?: Theme
}

// Schedule a single click (short 880Hz pure-tone burst) at the given time.
function scheduleClick(
  ctx: AudioContext,
  destination: AudioNode,
  time: number,
  options: { freq?: number; gain?: number; durationMs?: number } = {},
) {
  const { freq = 880, gain = 0.3, durationMs = 40 } = options
  const osc = ctx.createOscillator()
  const envelope = ctx.createGain()

  osc.type = "square"
  osc.frequency.value = freq

  envelope.gain.setValueAtTime(0, time)
  envelope.gain.linearRampToValueAtTime(gain, time + 0.002)
  envelope.gain.exponentialRampToValueAtTime(0.0001, time + durationMs / 1000)

  osc.connect(envelope)
  envelope.connect(destination)

  osc.start(time)
  osc.stop(time + durationMs / 1000 + 0.01)
}

// Pattern schedulers: return the total duration of one loop (seconds) so the
// caller can repeat the pattern on a tight tail.

function scheduleAmateurLoop(ctx: AudioContext, dest: AudioNode, startAt: number): number {
  // 8 clicks, 180ms apart, no dynamic contrast. Rushed, brittle feel.
  const spacing = 0.18
  for (let i = 0; i < 8; i++) {
    scheduleClick(ctx, dest, startAt + i * spacing, { freq: 880, gain: 0.25 })
  }
  return 8 * spacing + 0.15 // small trailing pause before re-loop
}

function scheduleThreeOneLoop(ctx: AudioContext, dest: AudioNode, startAt: number): number {
  // "Back" = 4 soft clicks at 140ms (560ms total).
  // "Through" = 1 louder click 180ms after the last back click.
  // Then a ~480ms rest before the next backswing.
  const backSpacing = 0.14
  let t = startAt
  for (let i = 0; i < 4; i++) {
    scheduleClick(ctx, dest, t, { freq: 660, gain: 0.22 })
    t += backSpacing
  }
  // Through beat — lower freq, louder, slightly longer.
  t += 0.04
  scheduleClick(ctx, dest, t, { freq: 440, gain: 0.42, durationMs: 60 })
  t += 0.48 // rest
  return t - startAt
}

export function HearTheDifference({ theme = "dark" }: HearTheDifferenceProps) {
  const [active, setActive] = useState<ActivePattern>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const masterRef = useRef<GainNode | null>(null)
  const loopTimerRef = useRef<number | null>(null)
  const oscListRef = useRef<Set<OscillatorNode>>(new Set())

  // Cleanup on unmount.
  useEffect(() => {
    return () => {
      if (loopTimerRef.current !== null) window.clearTimeout(loopTimerRef.current)
      const ctx = ctxRef.current
      if (ctx && ctx.state !== "closed") {
        ctx.close().catch(() => {})
      }
    }
  }, [])

  // Stop anything currently scheduled and clear the loop timer.
  const stopAll = useCallback(() => {
    if (loopTimerRef.current !== null) {
      window.clearTimeout(loopTimerRef.current)
      loopTimerRef.current = null
    }
    const master = masterRef.current
    const ctx = ctxRef.current
    if (master && ctx) {
      // Ramp master gain to 0 quickly so queued oscillators fade, not pop.
      const now = ctx.currentTime
      master.gain.cancelScheduledValues(now)
      master.gain.setValueAtTime(master.gain.value, now)
      master.gain.linearRampToValueAtTime(0, now + 0.03)
      // Restore gain for the next play after the fade completes.
      window.setTimeout(() => {
        if (masterRef.current && ctxRef.current) {
          masterRef.current.gain.setValueAtTime(1, ctxRef.current.currentTime)
        }
      }, 60)
    }
    setActive(null)
  }, [])

  const play = useCallback(
    async (pattern: Exclude<ActivePattern, null>) => {
      // If this pattern is already playing, stop.
      if (active === pattern) {
        stopAll()
        return
      }
      // Switching patterns — cancel current schedule first.
      if (active !== null) stopAll()

      // Lazily create the AudioContext on first play (required by browsers
      // to gate audio behind a user gesture).
      if (!ctxRef.current) {
        const Ctor =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext
        if (!Ctor) {
          console.error("[HearTheDifference] Web Audio API not available")
          return
        }
        const ctx = new Ctor()
        const master = ctx.createGain()
        master.gain.value = 1
        master.connect(ctx.destination)
        ctxRef.current = ctx
        masterRef.current = master
      }

      const ctx = ctxRef.current
      const master = masterRef.current
      if (!ctx || !master) return

      // iOS suspends the context until a gesture resumes it.
      if (ctx.state === "suspended") await ctx.resume()

      // Schedule the first loop starting just after currentTime.
      let nextStart = ctx.currentTime + 0.05
      const scheduleOne = () => {
        if (!ctxRef.current || !masterRef.current) return
        const duration =
          pattern === "amateur"
            ? scheduleAmateurLoop(ctxRef.current, masterRef.current, nextStart)
            : scheduleThreeOneLoop(ctxRef.current, masterRef.current, nextStart)
        nextStart += duration
        // Queue the next loop just before the current one finishes.
        const msUntilNext = Math.max(0, (duration - 0.05) * 1000)
        loopTimerRef.current = window.setTimeout(scheduleOne, msUntilNext)
      }
      scheduleOne()
      setActive(pattern)
    },
    [active, stopAll],
  )

  const isLight = theme === "light"

  const amateurActiveClass = isLight
    ? "bg-[#0B0B0F] text-white border-[#0B0B0F]"
    : "bg-white text-[#0B0B0F] border-white"
  const amateurIdleClass = isLight
    ? "bg-white text-[#0B0B0F] border-[#0B0B0F] hover:bg-[#F1F5F9]"
    : "bg-transparent text-white border-[#1E3A5F] hover:border-[#F59E0B]"

  const threeOneActiveClass = isLight
    ? "bg-[#1D4ED8] text-white border-[#1D4ED8]"
    : "bg-[#3B82F6] text-white border-[#3B82F6]"
  const threeOneIdleClass = isLight
    ? "bg-white text-[#1D4ED8] border-[#1D4ED8] hover:bg-[#1D4ED8]/5"
    : "bg-transparent text-[#3B82F6] border-[#3B82F6] hover:bg-[#3B82F6]/10"

  const eyebrowClass = isLight ? "text-[#EA580C]" : "text-[#F59E0B]"
  const bodyClass = isLight ? "text-[#6B7280]" : "text-[#94A3B8]"
  const headlineClass = isLight ? "text-[#0B0B0F]" : "text-white"
  const wrapperClass = isLight
    ? "border border-[#E5E7EB] bg-white"
    : "border border-[#1E3A5F] bg-[#0C1220]"

  return (
    <div className={`${wrapperClass} p-6 md:p-8 mt-10`}>
      <div className={`font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] mb-3 ${eyebrowClass}`}>
        Hear The Difference · 4 seconds
      </div>
      <h3 className={`text-xl md:text-2xl font-bold mb-2 leading-snug ${headlineClass}`}>
        Play each button. Your ears will decide.
      </h3>
      <p className={`text-sm md:text-base leading-relaxed mb-6 ${bodyClass}`}>
        Synthesized click tracks at two different timings — one amateur-rushed,
        one locked to 3:1. Same tempo region. Completely different feel.
      </p>

      <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
        <button
          type="button"
          onClick={() => play("amateur")}
          className={`group relative font-mono uppercase tracking-[0.12em] text-xs md:text-sm font-bold px-5 py-5 border transition-colors ${
            active === "amateur" ? amateurActiveClass : amateurIdleClass
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <span className="font-mono text-base shrink-0">
                {active === "amateur" ? "■" : "▶"}
              </span>
              <span>Amateur Rushed</span>
            </span>
            {active === "amateur" && (
              <span
                className="w-2 h-2 rounded-full bg-current"
                style={{ animation: "htd-pulse 0.18s ease-in-out infinite" }}
              />
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => play("three_one")}
          className={`group relative font-mono uppercase tracking-[0.12em] text-xs md:text-sm font-bold px-5 py-5 border transition-colors ${
            active === "three_one" ? threeOneActiveClass : threeOneIdleClass
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-3">
              <span className="font-mono text-base shrink-0">
                {active === "three_one" ? "■" : "▶"}
              </span>
              <span>3:1 Locked</span>
            </span>
            {active === "three_one" && (
              <span
                className="w-2 h-2 rounded-full bg-current"
                style={{ animation: "htd-pulse 0.55s ease-in-out infinite" }}
              />
            )}
          </div>
        </button>
      </div>

      <p className={`mt-4 font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.2em] ${bodyClass}`}>
        {active ? "Playing · click to stop" : "Tap a button. Headphones recommended."}
      </p>

      <style>{`
        @keyframes htd-pulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.4); }
        }
      `}</style>
    </div>
  )
}
