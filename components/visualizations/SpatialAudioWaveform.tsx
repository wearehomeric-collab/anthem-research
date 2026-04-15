"use client"

// Rich spatial-audio call-and-response waveform ported from
// claude/anthem-orange-sBtvP branch. Shows the 8-second anthem cycle
// as two stereo waveforms (L = Call, R = Response) with 10 annotated
// moments that light up as the playhead crosses them.
//
// Theme-aware via the `theme` prop:
//  - dark (default): charcoal card, cream text, orange eyebrow, dark inner scope
//  - light: white card + border, black text, orange eyebrow, DARK inner
//    scope kept on both themes (bright colored waveform bars read best on
//    a dark background — this is the DAW display convention, and the dark
//    "scope" inside a light frame is a premium-product pattern).

import React from "react"
import { useEffect, useState, useRef, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Play, Pause, RotateCcw } from "lucide-react"

interface Annotation {
  id: string
  start: number
  end: number
  label: string
  channel: "left" | "right" | "both"
  type: "call" | "response" | "anchor" | "cue"
}

const annotations: Annotation[] = [
  { id: "1", start: 0, end: 12, label: "Setup Cue", channel: "left", type: "cue" },
  { id: "2", start: 8, end: 20, label: "Position Lock", channel: "right", type: "anchor" },
  { id: "3", start: 18, end: 30, label: "CALL: Backswing", channel: "left", type: "call" },
  { id: "4", start: 28, end: 40, label: "RESPONSE: Load", channel: "right", type: "response" },
  { id: "5", start: 38, end: 50, label: "Tempo Anchor", channel: "both", type: "anchor" },
  { id: "6", start: 48, end: 60, label: "CALL: Transition", channel: "left", type: "call" },
  { id: "7", start: 58, end: 70, label: "RESPONSE: Release", channel: "right", type: "response" },
  { id: "8", start: 68, end: 80, label: "Impact Cue", channel: "left", type: "cue" },
  { id: "9", start: 78, end: 90, label: "Follow Through", channel: "right", type: "anchor" },
  { id: "10", start: 88, end: 100, label: "Reset Signal", channel: "both", type: "cue" },
]

type Theme = "dark" | "light"

function generateWaveform(samples: number, seed: number = 0): number[] {
  const data: number[] = []
  for (let i = 0; i < samples; i++) {
    const t = i / samples
    const base = Math.sin(t * Math.PI * 12 + seed) * 0.3
    const mid = Math.sin(t * Math.PI * 24 + seed * 1.5) * 0.4
    const high = Math.sin(t * Math.PI * 48 + seed * 2) * 0.2
    const noise = (Math.random() - 0.5) * 0.1
    const envelope = 0.5 + 0.5 * Math.sin(t * Math.PI * 4 + seed * 0.5)
    const value = (base + mid + high + noise) * envelope
    data.push(Math.max(-1, Math.min(1, value)))
  }
  return data
}

interface SpatialAudioWaveformProps {
  className?: string
  autoPlay?: boolean
  theme?: Theme
}

export function SpatialAudioWaveform({
  className,
  autoPlay = false,
  theme = "dark",
}: SpatialAudioWaveformProps) {
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [playheadPosition, setPlayheadPosition] = useState(0)
  const [activeAnnotations, setActiveAnnotations] = useState<Annotation[]>([])
  const [hoveredAnnotation, setHoveredAnnotation] = useState<Annotation | null>(null)
  const [leftWaveform] = useState(() => generateWaveform(200, 1))
  const [rightWaveform] = useState(() => generateWaveform(200, 2))
  const animationRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const isLight = theme === "light"

  // Channel colors. Light theme uses darker, more saturated blues/oranges
  // that pop against white, and still look vibrant inside the dark inner
  // scope. Dark theme uses the V2 dark palette accents.
  const CH_LEFT = isLight ? "#1D4ED8" : "#3B82F6"
  const CH_RIGHT = isLight ? "#EA580C" : "#F59E0B"
  const ANCHOR_COLOR = isLight ? "#6B7280" : "#94A3B8"
  const CUE_COLOR = isLight ? "#B45309" : "#B45309"

  // Theme class helpers.
  const cardClass = isLight
    ? "border border-[#E5E7EB] bg-white shadow-sm"
    : "border border-terra-cotta/30 bg-charcoal"
  const eyebrowClass = isLight ? "text-[#EA580C]" : "text-terra-cotta"
  const headingClass = isLight ? "text-[#0B0B0F]" : "text-cream-light"
  const legendLabelClass = isLight ? "text-[#6B7280]" : "text-cream-dark"
  // Inner "scope" stays dark on both themes — bright waveform bars only
  // read well on a dark background.
  const scopeBgClass = "bg-black/60"
  const dividerClass = isLight ? "bg-[#1E3A5F]/30" : "bg-charcoal-light"
  const dividerLabelClass = isLight ? "text-[#94A3B8]" : "text-cream-dark/50"
  const timeMarkerClass = isLight ? "text-[#6B7280]" : "text-cream-dark/40"
  const controlBtnOuterClass = isLight
    ? "border border-[#0B0B0F]/30 bg-white text-[#0B0B0F] hover:bg-[#F1F5F9]"
    : "border border-charcoal-light bg-charcoal-light/50 text-cream-dark hover:bg-charcoal-lighter hover:text-cream-light"
  const positionLabelClass = isLight ? "text-[#0B0B0F]" : "text-cream-light"
  const positionSubClass = isLight ? "text-[#6B7280]" : "text-cream-dark/60"
  const separatorClass = isLight ? "bg-[#E5E7EB]" : "bg-charcoal-light"
  const activeCueBoxClass = isLight
    ? "border border-[#E5E7EB] bg-[#F8FAFC]"
    : "border border-charcoal-light bg-black/30"
  const activeCueEyebrowClass = isLight ? "text-[#6B7280]" : "text-cream-dark/50"
  const cornerAccentClass = isLight ? "border-[#EA580C]/40" : "border-terra-cotta/50"

  const cycleDuration = 8000

  const animate = useCallback(
    (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const delta = timestamp - lastTimeRef.current

      if (isPlaying) {
        setPlayheadPosition((prev) => {
          const newPos = prev + (delta / cycleDuration) * 100
          return newPos >= 100 ? 0 : newPos
        })
      }

      lastTimeRef.current = timestamp
      animationRef.current = requestAnimationFrame(animate)
    },
    [isPlaying, cycleDuration],
  )

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  useEffect(() => {
    const active = annotations.filter(
      (a) => playheadPosition >= a.start && playheadPosition <= a.end,
    )
    setActiveAnnotations(active)
  }, [playheadPosition])

  const handleReset = () => {
    setPlayheadPosition(0)
    setIsPlaying(false)
    lastTimeRef.current = 0
  }

  const handleWaveformClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setPlayheadPosition(Math.max(0, Math.min(100, percentage)))
  }

  const getAnnotationColor = (type: Annotation["type"]) => {
    // Pill chip class pair: bg + text. Kept consistent across themes since
    // these pills sit on the dark inner scope regardless of outer theme.
    switch (type) {
      case "call":
        return "bg-[#3B82F6] text-white"
      case "response":
        return "bg-[#F59E0B] text-black"
      case "anchor":
        return "bg-white/80 text-black"
      case "cue":
        return "bg-[#B45309] text-white"
      default:
        return "bg-charcoal-light text-cream-light"
    }
  }

  const renderWaveform = (
    data: number[],
    color: string,
    channel: "left" | "right",
  ) => {
    const barWidth = 100 / data.length
    const channelAnnotations = annotations.filter(
      (a) => a.channel === channel || a.channel === "both",
    )

    return (
      <div className="relative h-20 w-full">
        <div className="absolute -left-2 top-1/2 -translate-y-1/2 -translate-x-full">
          <span className="font-mono text-xs font-bold" style={{ color }}>
            {channel === "left" ? "L" : "R"}
          </span>
        </div>

        <div className="flex h-full w-full items-center gap-px">
          {data.map((value, i) => {
            const height = Math.abs(value) * 100
            const isActive = (i / data.length) * 100 <= playheadPosition
            return (
              <div
                key={i}
                className="transition-all duration-75"
                style={{
                  width: `${barWidth}%`,
                  height: `${Math.max(4, height)}%`,
                  backgroundColor: isActive ? color : `${color}33`,
                  borderRadius: "2px",
                }}
              />
            )
          })}
        </div>

        {channelAnnotations.map((annotation) => {
          const isActive = activeAnnotations.some((a) => a.id === annotation.id)
          const isHovered = hoveredAnnotation?.id === annotation.id

          return (
            <div
              key={annotation.id}
              className="absolute top-0 h-full cursor-pointer"
              style={{
                left: `${annotation.start}%`,
                width: `${annotation.end - annotation.start}%`,
              }}
              onMouseEnter={() => setHoveredAnnotation(annotation)}
              onMouseLeave={() => setHoveredAnnotation(null)}
            >
              <div
                className={cn(
                  "absolute inset-0 transition-all duration-300",
                  isActive || isHovered ? "opacity-25" : "opacity-0",
                )}
                style={{
                  backgroundColor:
                    annotation.type === "call"
                      ? CH_LEFT
                      : annotation.type === "response"
                        ? CH_RIGHT
                        : annotation.type === "anchor"
                          ? ANCHOR_COLOR
                          : CUE_COLOR,
                  borderRadius: "4px",
                }}
              />

              {(isActive || isHovered) && (
                <div
                  className={cn(
                    "absolute z-10 whitespace-nowrap rounded-lg px-3 py-1.5 font-mono text-xs font-bold shadow-lg transition-all duration-200",
                    getAnnotationColor(annotation.type),
                    channel === "left" ? "-top-8" : "-bottom-8",
                  )}
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  {annotation.label}
                  <div
                    className={cn(
                      "absolute left-1/2 h-2 w-2 -translate-x-1/2 rotate-45",
                      getAnnotationColor(annotation.type).split(" ")[0],
                      channel === "left" ? "-bottom-1" : "-top-1",
                    )}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-2xl p-6 sm:p-8", cardClass, className)}
    >
      <div
        className={cn("mb-2 font-mono text-xs uppercase tracking-[0.15em]", eyebrowClass)}
      >
        Interactive Visualization
      </div>
      <div className={cn("mb-6 font-sans text-lg font-semibold sm:text-xl", headingClass)}>
        Spatial Audio Waveform
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CH_LEFT }} />
          <span className={cn("font-mono text-xs", legendLabelClass)}>Call (L Channel)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CH_RIGHT }} />
          <span className={cn("font-mono text-xs", legendLabelClass)}>
            Response (R Channel)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: ANCHOR_COLOR }} />
          <span className={cn("font-mono text-xs", legendLabelClass)}>Anchor</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: CUE_COLOR }} />
          <span className={cn("font-mono text-xs", legendLabelClass)}>Cue</span>
        </div>
      </div>

      {/* Inner scope — dark background on both themes so bright waveform bars pop. */}
      <div
        ref={containerRef}
        className={cn("relative cursor-pointer select-none rounded-xl px-8 py-6", scopeBgClass)}
        onClick={handleWaveformClick}
      >
        <div className="mb-4">{renderWaveform(leftWaveform, CH_LEFT, "left")}</div>

        <div className="my-4 flex items-center gap-4">
          <div className={cn("h-px flex-1", dividerClass)} />
          <span
            className={cn(
              "font-mono text-[10px] uppercase tracking-widest",
              dividerLabelClass,
            )}
          >
            Stereo Field
          </span>
          <div className={cn("h-px flex-1", dividerClass)} />
        </div>

        <div className="mt-4">{renderWaveform(rightWaveform, CH_RIGHT, "right")}</div>

        <div
          className="absolute top-0 bottom-0 z-20 w-0.5 transition-none"
          style={{
            left: `calc(${playheadPosition}% + 32px - ${playheadPosition * 0.64}px)`,
            background: `linear-gradient(180deg, ${CH_LEFT} 0%, ${CH_RIGHT} 100%)`,
            boxShadow: `0 0 8px ${CH_LEFT}99`,
          }}
        >
          <div
            className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
            style={{ backgroundColor: CH_LEFT }}
          />
          <div
            className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45"
            style={{ backgroundColor: CH_RIGHT }}
          />
        </div>

        <div className="mt-4 flex justify-between px-0">
          {[0, 25, 50, 75, 100].map((tick) => (
            <span key={tick} className={cn("font-mono text-[10px]", "text-white/50")}>
              {((tick / 100) * 8).toFixed(1)}s
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange text-black transition-all hover:bg-orange/80 hover:scale-105 active:scale-95"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-all",
              controlBtnOuterClass,
            )}
            aria-label="Reset"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={cn("font-mono text-2xl font-bold", positionLabelClass)}>
              {playheadPosition.toFixed(0)}%
            </div>
            <div
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider",
                positionSubClass,
              )}
            >
              Position
            </div>
          </div>
          <div className={cn("h-8 w-px", separatorClass)} />
          <div className="text-right">
            <div className="font-mono text-2xl font-bold" style={{ color: CH_RIGHT }}>
              112
            </div>
            <div
              className={cn(
                "font-mono text-[10px] uppercase tracking-wider",
                positionSubClass,
              )}
            >
              BPM
            </div>
          </div>
        </div>
      </div>

      {activeAnnotations.length > 0 && (
        <div className={cn("mt-6 rounded-xl p-4", activeCueBoxClass)}>
          <div
            className={cn(
              "mb-2 font-mono text-[10px] uppercase tracking-widest",
              activeCueEyebrowClass,
            )}
          >
            Active Audio Cues
          </div>
          <div className="flex flex-wrap gap-2">
            {activeAnnotations.map((annotation) => (
              <span
                key={annotation.id}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-xs font-bold",
                  getAnnotationColor(annotation.type),
                )}
              >
                {annotation.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div
        className={cn(
          "pointer-events-none absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2",
          cornerAccentClass,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2",
          cornerAccentClass,
        )}
      />
    </div>
  )
}
