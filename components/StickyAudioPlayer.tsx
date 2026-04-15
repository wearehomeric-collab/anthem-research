"use client"

import Script from "next/script"
import { useEffect, useRef, useState } from "react"

// Sticky bottom-sheet audio player for the V2 marketing pages.
//
// How it works:
//  - Renders a collapsed bar pinned to the bottom of the viewport on mount.
//  - Any element on the page with `data-v2-play` opens the sheet on click.
//    No context, no provider — we attach a single document-level click
//    listener and check e.target.closest('[data-v2-play]').
//  - When open, the sheet slides up and reveals the Elfsight widget
//    (the same one that was previously embedded in the Listen section).
//  - The Elfsight widget is mounted once, inside this component, so there
//    is no duplicate-widget issue. platform.js loads on first interaction.
//
// Theme: the player respects an optional `theme` prop ("dark" | "light")
// so both /248-anthems-v2 and /248-anthems-v2-light can use the same
// component with their respective palettes.

type Theme = "dark" | "light"

interface StickyAudioPlayerProps {
  theme?: Theme
  label?: string
}

export function StickyAudioPlayer({
  theme = "dark",
  label = "Press Play · Augusta Anthem",
}: StickyAudioPlayerProps) {
  const [open, setOpen] = useState(false)
  const [elfsightLoaded, setElfsightLoaded] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)
  const isLight = theme === "light"

  // Wire up data-v2-play triggers anywhere on the page.
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null
      if (!target) return
      const trigger = target.closest("[data-v2-play]")
      if (!trigger) return
      // Only hijack anchor-link triggers; leave form buttons etc. alone.
      e.preventDefault()
      setOpen(true)
      setElfsightLoaded(true)
    }
    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  // Close on Escape.
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false)
    }
    if (open) document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [open])

  const collapsedBarClass = isLight
    ? "bg-white border-t border-[#0B0B0F] text-[#0B0B0F]"
    : "bg-[#0C1220] border-t border-[#1E3A5F] text-white"

  const sheetClass = isLight
    ? "bg-white border-t border-[#0B0B0F] text-[#0B0B0F]"
    : "bg-[#05080F] border-t border-[#1E3A5F] text-white"

  const accentClass = isLight ? "text-[#1D4ED8]" : "text-[#3B82F6]"

  const buttonClass = isLight
    ? "bg-[#1D4ED8] hover:bg-[#1E3A8A] text-white"
    : "bg-[#3B82F6] hover:bg-[#2563EB] text-white"

  return (
    <>
      {/* Collapsed bar — always visible, sits above the sheet when closed. */}
      <button
        type="button"
        onClick={() => {
          setOpen(true)
          setElfsightLoaded(true)
        }}
        aria-label={label}
        className={`fixed bottom-0 inset-x-0 z-40 ${collapsedBarClass} transition-transform duration-300 ${open ? "translate-y-full" : "translate-y-0"} cursor-pointer text-left`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span className={`font-mono text-xl md:text-2xl shrink-0 ${accentClass}`}>▶</span>
            <div className="min-w-0">
              <div className="font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] opacity-70 mb-0.5">
                Now queued
              </div>
              <div className="text-sm md:text-base font-bold uppercase tracking-wide truncate">
                {label}
              </div>
            </div>
          </div>
          <div className={`hidden sm:block font-mono text-[0.65rem] uppercase tracking-[0.25em] ${accentClass} shrink-0`}>
            Tap to Listen
          </div>
        </div>
      </button>

      {/* Expanded sheet — slides up from the bottom when opened. */}
      <div
        ref={sheetRef}
        aria-hidden={!open}
        className={`fixed bottom-0 inset-x-0 z-50 ${sheetClass} transition-transform duration-300 ease-out ${open ? "translate-y-0" : "translate-y-full"}`}
        style={{ maxHeight: "85vh" }}
      >
        <div className="max-w-3xl mx-auto px-6 md:px-12 py-6 md:py-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <div>
              <div className={`font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] mb-2 ${accentClass}`}>
                The Augusta Anthem
              </div>
              <h3 className="text-xl md:text-2xl font-black leading-tight">
                One course. One anthem. Locked at 112 BPM.
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close player"
              className={`shrink-0 w-10 h-10 flex items-center justify-center border ${isLight ? "border-[#0B0B0F] hover:bg-[#0B0B0F] hover:text-white" : "border-[#1E3A5F] hover:border-[#3B82F6]"} transition-colors`}
            >
              <span className="font-mono text-lg leading-none">×</span>
            </button>
          </div>

          <div className={`${isLight ? "bg-[#F8FAFC] border border-[#E5E7EB]" : "bg-[#0C1220] border border-[#1E3A5F]"} p-3 md:p-4 overflow-x-auto`}>
            {elfsightLoaded && (
              <Script src="https://elfsightcdn.com/platform.js" strategy="afterInteractive" />
            )}
            <div
              className="elfsight-app-6a38b85d-2e93-4765-8a0c-80415ee7b970"
              data-elfsight-app-lazy
            />
          </div>

          <div className="mt-5 flex items-center justify-between gap-4">
            <p className={`font-mono text-[0.65rem] sm:text-xs uppercase tracking-[0.25em] ${isLight ? "text-[#6B7280]" : "text-[#64748B]"}`}>
              Esc to close
            </p>
            <a
              href="#waitlist"
              onClick={() => setOpen(false)}
              className={`${buttonClass} font-bold uppercase tracking-[0.12em] px-5 py-2.5 text-xs md:text-sm transition-colors`}
            >
              Request Your Course
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
