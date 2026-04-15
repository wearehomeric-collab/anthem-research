"use client"

// Rich brainwave frequency spectrum visualization ported from
// claude/anthem-orange-sBtvP branch. Uses recharts for the area chart,
// custom charcoal/cream/orange Tailwind tokens defined in globals.css
// to match the V2 dark palette.

import { useState, useEffect, useRef, useMemo } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { cn } from "@/lib/utils"

// Brainwave frequency bands with their characteristics. Gamma is the
// highlight — the 40Hz target zone tied to 24/8 Anthems' claim.
const BRAINWAVE_BANDS = [
  { name: "Delta", range: "0.5–4 Hz", color: "#4a5568", description: "Deep sleep, healing, regeneration" },
  { name: "Theta", range: "4–8 Hz", color: "#667eea", description: "Creativity, intuition, meditation" },
  { name: "Alpha", range: "8–12 Hz", color: "#48bb78", description: "Relaxation, calm focus, flow entry" },
  { name: "Beta", range: "12–30 Hz", color: "#ed8936", description: "Active thinking, alertness, concentration" },
  { name: "Gamma", range: "30–100 Hz", color: "#F59E0B", description: "Peak focus, cognitive binding, flow state" },
]

// Hero Gamma color used for highlights, reference line, and glow filter.
// Matches the V2 dark palette orange (#F59E0B).
const GAMMA_GLOW = "#F59E0B"

function generateBrainwaveData(offset: number = 0) {
  const data = []
  for (let i = 0; i <= 100; i++) {
    const t = (i + offset) * 0.1
    data.push({
      time: i,
      Delta: Math.max(0, 15 + 10 * Math.sin(t * 0.3) + 5 * Math.sin(t * 0.7)),
      Theta: Math.max(0, 25 + 12 * Math.sin(t * 0.5) + 6 * Math.sin(t * 1.1)),
      Alpha: Math.max(0, 35 + 15 * Math.sin(t * 0.8) + 8 * Math.sin(t * 1.5)),
      Beta: Math.max(0, 50 + 18 * Math.sin(t * 1.2) + 10 * Math.sin(t * 2.1)),
      Gamma: Math.max(0, 70 + 20 * Math.sin(t * 2.5) + 12 * Math.sin(t * 4.0) + 8 * Math.sin(t * 6.0)),
    })
  }
  return data
}

interface BrainwaveFrequencyChartProps {
  className?: string
}

export function BrainwaveFrequencyChart({ className }: BrainwaveFrequencyChartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animationOffset, setAnimationOffset] = useState(0)
  const [hoveredBand, setHoveredBand] = useState<string | null>(null)
  const [selectedBand, setSelectedBand] = useState<string | null>("Gamma")
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const data = useMemo(() => generateBrainwaveData(animationOffset), [animationOffset])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          setIsVisible(true)
        }
      },
      { threshold: 0.4 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let lastTime = 0
    const animate = (currentTime: number) => {
      if (currentTime - lastTime > 50) {
        setAnimationOffset((prev) => (prev + 1) % 1000)
        lastTime = currentTime
      }
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isVisible])

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean
    payload?: Array<{ name: string; value: number; color: string }>
    label?: number
  }) => {
    if (!active || !payload || !payload.length) return null

    return (
      <div className="rounded-xl border border-charcoal-lighter bg-charcoal-light/95 p-4 shadow-xl backdrop-blur-sm">
        <p className="mb-2 font-mono text-xs text-cream-dark">Time: {label}ms</p>
        <div className="space-y-1.5">
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: entry.color,
                    boxShadow: entry.name === "Gamma" && isVisible ? `0 0 8px ${entry.color}` : "none",
                  }}
                />
                <span className="text-sm text-cream-light">{entry.name}</span>
              </div>
              <span className="font-mono text-sm text-cream-dark">{entry.value.toFixed(1)} μV</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderLegend = () => (
    <div className="mt-6 flex flex-wrap justify-center gap-3 sm:gap-4">
      {BRAINWAVE_BANDS.map((band) => {
        const isGamma = band.name === "Gamma"
        const isSelected = selectedBand === band.name
        const isHovered = hoveredBand === band.name

        return (
          <button
            key={band.name}
            type="button"
            onClick={() => setSelectedBand(isSelected ? null : band.name)}
            onMouseEnter={() => setHoveredBand(band.name)}
            onMouseLeave={() => setHoveredBand(null)}
            className={cn(
              "group relative flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 transition-all duration-300",
              isSelected ? "bg-charcoal-lighter" : "hover:bg-charcoal-light",
              isGamma && isVisible && "animate-subtle-pulse",
            )}
          >
            <div
              className={cn(
                "h-3 w-3 rounded-full transition-all duration-300",
                isHovered && "scale-125",
              )}
              style={{
                backgroundColor: band.color,
                boxShadow:
                  isGamma && isVisible
                    ? `0 0 12px ${band.color}, 0 0 24px ${band.color}40`
                    : isHovered
                      ? `0 0 8px ${band.color}80`
                      : "none",
              }}
            />
            <div className="text-left">
              <span
                className={cn(
                  "block text-sm font-medium transition-colors",
                  isGamma && isVisible ? "text-orange" : "text-cream-light",
                )}
              >
                {band.name}
              </span>
              <span className="block font-mono text-[10px] text-cream-dark">{band.range}</span>
            </div>

            <div
              className={cn(
                "pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-lg border border-charcoal-lighter bg-charcoal-light p-3 opacity-0 shadow-xl transition-opacity duration-200",
                isHovered && "opacity-100",
              )}
            >
              <p className="text-xs text-cream-dark">{band.description}</p>
              {isGamma && (
                <p className="mt-1 font-mono text-[10px] text-orange">Target frequency for peak performance</p>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-orange/30 bg-charcoal p-6 sm:p-8",
        className,
      )}
    >
      <div className="mb-6">
        <div className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-orange">
          Interactive Visualization
        </div>
        <h3 className="font-sans text-xl font-semibold text-cream-light sm:text-2xl">
          Brainwave Frequency Spectrum
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-cream-dark">
          Your brain oscillates across five primary frequency bands. The{" "}
          <span className="font-medium text-orange">40Hz Gamma range</span> is associated with
          peak cognitive performance and flow states — the exact state the 24/8 Anthem targets.
        </p>
      </div>

      <div
        className={cn(
          "absolute right-6 top-6 flex items-center gap-2 rounded-lg border border-orange/50 bg-charcoal-light/80 px-3 py-1.5 backdrop-blur-sm transition-all duration-700 sm:right-8 sm:top-8",
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        )}
      >
        <div
          className={cn("h-2 w-2 rounded-full bg-orange", isVisible && "animate-pulse")}
          style={{
            boxShadow: isVisible ? `0 0 8px ${GAMMA_GLOW}, 0 0 16px ${GAMMA_GLOW}60` : "none",
          }}
        />
        <span className="font-mono text-xs font-bold text-orange">40Hz GAMMA</span>
      </div>

      <div
        className={cn(
          "h-[320px] transition-opacity duration-1000 sm:h-[380px]",
          isVisible ? "opacity-100" : "opacity-40",
        )}
      >
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <defs>
              {BRAINWAVE_BANDS.map((band) => (
                <linearGradient key={band.name} id={`gradient-${band.name}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={band.color}
                    stopOpacity={band.name === "Gamma" && isVisible ? 0.6 : 0.3}
                  />
                  <stop offset="95%" stopColor={band.color} stopOpacity={0.05} />
                </linearGradient>
              ))}
              <filter id="gamma-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#e8dcc4" strokeOpacity={0.15} vertical={false} />

            <XAxis
              dataKey="time"
              stroke="#e8dcc4"
              strokeOpacity={0.4}
              tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "var(--font-mono)" }}
              tickLine={{ stroke: "#94A3B8", strokeOpacity: 0.2 }}
              axisLine={{ stroke: "#94A3B8", strokeOpacity: 0.2 }}
              label={{
                value: "Time (ms)",
                position: "insideBottom",
                offset: -5,
                fill: "#94A3B8",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
              }}
            />

            <YAxis
              stroke="#e8dcc4"
              strokeOpacity={0.4}
              tick={{ fill: "#94A3B8", fontSize: 10, fontFamily: "var(--font-mono)" }}
              tickLine={{ stroke: "#94A3B8", strokeOpacity: 0.2 }}
              axisLine={{ stroke: "#94A3B8", strokeOpacity: 0.2 }}
              label={{
                value: "Amplitude (μV)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: "#94A3B8",
                fontSize: 10,
                fontFamily: "var(--font-mono)",
              }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#94A3B840", strokeWidth: 1 }} />

            {isVisible && (
              <ReferenceLine
                y={70}
                stroke={GAMMA_GLOW}
                strokeDasharray="5 5"
                strokeOpacity={0.5}
                label={{
                  value: "40Hz Target Zone",
                  position: "right",
                  fill: GAMMA_GLOW,
                  fontSize: 10,
                  fontFamily: "var(--font-mono)",
                }}
              />
            )}

            {BRAINWAVE_BANDS.map((band) => {
              const isGamma = band.name === "Gamma"
              const isHighlighted = selectedBand === band.name || hoveredBand === band.name
              const baseOpacity = selectedBand ? (isHighlighted ? 1 : 0.3) : 0.7

              return (
                <Area
                  key={band.name}
                  type="monotone"
                  dataKey={band.name}
                  stroke={band.color}
                  strokeWidth={isGamma && isVisible ? 3 : isHighlighted ? 2.5 : 1.5}
                  fill={`url(#gradient-${band.name})`}
                  fillOpacity={baseOpacity}
                  strokeOpacity={selectedBand ? (isHighlighted ? 1 : 0.4) : 0.8}
                  filter={isGamma && isVisible ? "url(#gamma-glow)" : undefined}
                  style={{
                    transition: "all 0.3s ease",
                  }}
                />
              )
            })}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {renderLegend()}

      <div
        className={cn(
          "mt-6 rounded-xl border border-orange/20 bg-charcoal-light/50 p-4 transition-all duration-700",
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange/20">
            <div
              className="h-2 w-2 rounded-full bg-orange"
              style={{ boxShadow: `0 0 6px ${GAMMA_GLOW}` }}
            />
          </div>
          <div>
            <p className="text-sm text-cream-light">
              <span className="font-medium text-orange">The Focus Frequency:</span> Research shows
              that 40Hz gamma oscillations are associated with heightened attention, working memory,
              and perceptual binding — the neural signature of flow states.
            </p>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-orange/50" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-orange/50" />

      {isVisible && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 animate-ping"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${GAMMA_GLOW}10 0%, transparent 50%)`,
            animationDuration: "3s",
            animationIterationCount: "infinite",
          }}
        />
      )}

      <style jsx>{`
        @keyframes subtle-pulse {
          0%, 100% {
            box-shadow: 0 0 0 0 transparent;
          }
          50% {
            box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.12);
          }
        }
        .animate-subtle-pulse {
          animation: subtle-pulse 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
