"use client"

// Rich brainwave frequency spectrum visualization ported from
// claude/anthem-orange-sBtvP branch. Uses recharts for the area chart.
//
// Supports both dark and light themes via the `theme` prop:
//  - dark (default): charcoal card, cream text, amber Gamma glow
//  - light: white card, black text, blue Gamma glow, with axis/grid
//    colors tuned for white backgrounds

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

type Theme = "dark" | "light"

// Brainwave frequency bands with their characteristics. Delta/Theta/Alpha/Beta
// colors are the same across themes (their saturation works on both bg's).
// Only Gamma swaps: amber on dark, blue on light, so the hero-treated band
// matches its page's accent system.
const BRAINWAVE_BANDS_BASE = [
  { name: "Delta", range: "0.5–4 Hz", color: "#4a5568", description: "Deep sleep, healing, regeneration" },
  { name: "Theta", range: "4–8 Hz", color: "#667eea", description: "Creativity, intuition, meditation" },
  { name: "Alpha", range: "8–12 Hz", color: "#48bb78", description: "Relaxation, calm focus, flow entry" },
  { name: "Beta", range: "12–30 Hz", color: "#ed8936", description: "Active thinking, alertness, concentration" },
]

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
  theme?: Theme
}

export function BrainwaveFrequencyChart({
  className,
  theme = "dark",
}: BrainwaveFrequencyChartProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [animationOffset, setAnimationOffset] = useState(0)
  const [hoveredBand, setHoveredBand] = useState<string | null>(null)
  const [selectedBand, setSelectedBand] = useState<string | null>("Gamma")
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)

  const isLight = theme === "light"
  // Gamma gets the "hero" color — amber on dark, blue on light.
  const GAMMA_COLOR = isLight ? "#1D4ED8" : "#F59E0B"
  // All 5 bands — Gamma color swapped per theme.
  const BRAINWAVE_BANDS = useMemo(
    () => [
      ...BRAINWAVE_BANDS_BASE,
      {
        name: "Gamma",
        range: "30–100 Hz",
        color: GAMMA_COLOR,
        description: "Peak focus, cognitive binding, flow state",
      },
    ],
    [GAMMA_COLOR],
  )

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

  // Theme class helpers.
  const cardClass = isLight
    ? "border border-[#E5E7EB] bg-white shadow-sm"
    : "border border-orange/30 bg-charcoal"
  const eyebrowClass = isLight ? "text-[#EA580C]" : "text-orange"
  const headingClass = isLight ? "text-[#0B0B0F]" : "text-cream-light"
  const bodyTextClass = isLight ? "text-[#6B7280]" : "text-cream-dark"
  const accentTextClass = isLight ? "text-[#1D4ED8]" : "text-orange"
  const badgeClass = isLight
    ? "border border-[#1D4ED8]/50 bg-white/90"
    : "border border-orange/50 bg-charcoal-light/80"
  const badgeDotClass = isLight ? "bg-[#1D4ED8]" : "bg-orange"
  const tooltipBgClass = isLight
    ? "border border-[#E5E7EB] bg-white/95"
    : "border border-charcoal-lighter bg-charcoal-light/95"
  const tooltipHeadClass = isLight ? "text-[#6B7280]" : "text-cream-dark"
  const tooltipBodyClass = isLight ? "text-[#0B0B0F]" : "text-cream-light"
  const legendActiveClass = isLight ? "bg-[#F1F5F9]" : "bg-charcoal-lighter"
  const legendHoverClass = isLight ? "hover:bg-[#F8FAFC]" : "hover:bg-charcoal-light"
  const legendLabelClass = isLight ? "text-[#0B0B0F]" : "text-cream-light"
  const legendGammaActiveClass = isLight ? "text-[#1D4ED8]" : "text-orange"
  const legendRangeClass = isLight ? "text-[#6B7280]" : "text-cream-dark"
  const legendTooltipClass = isLight
    ? "border border-[#E5E7EB] bg-white text-[#6B7280]"
    : "border border-charcoal-lighter bg-charcoal-light text-cream-dark"
  const insightClass = isLight
    ? "border border-[#1D4ED8]/20 bg-[#F8FAFC]"
    : "border border-orange/20 bg-charcoal-light/50"
  const insightIconBgClass = isLight ? "bg-[#1D4ED8]/15" : "bg-orange/20"
  const insightTextClass = isLight ? "text-[#0B0B0F]" : "text-cream-light"
  const cornerAccentClass = isLight ? "border-[#1D4ED8]/40" : "border-orange/50"

  // Axis / grid colors for the recharts AreaChart (inline props only).
  const gridStroke = isLight ? "#0B0B0F" : "#e8dcc4"
  const axisTick = isLight ? "#6B7280" : "#94A3B8"
  const gridOpacity = isLight ? 0.08 : 0.15
  const axisOpacity = isLight ? 0.4 : 0.4

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
      <div className={cn("rounded-xl p-4 shadow-xl backdrop-blur-sm", tooltipBgClass)}>
        <p className={cn("mb-2 font-mono text-xs", tooltipHeadClass)}>Time: {label}ms</p>
        <div className="space-y-1.5">
          {payload.map((entry) => (
            <div key={entry.name} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{
                    backgroundColor: entry.color,
                    boxShadow:
                      entry.name === "Gamma" && isVisible ? `0 0 8px ${entry.color}` : "none",
                  }}
                />
                <span className={cn("text-sm", tooltipBodyClass)}>{entry.name}</span>
              </div>
              <span className={cn("font-mono text-sm", tooltipHeadClass)}>
                {entry.value.toFixed(1)} μV
              </span>
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
              isSelected ? legendActiveClass : legendHoverClass,
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
                  isGamma && isVisible ? legendGammaActiveClass : legendLabelClass,
                )}
              >
                {band.name}
              </span>
              <span className={cn("block font-mono text-[10px]", legendRangeClass)}>
                {band.range}
              </span>
            </div>

            <div
              className={cn(
                "pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-48 -translate-x-1/2 rounded-lg p-3 opacity-0 shadow-xl transition-opacity duration-200",
                legendTooltipClass,
                isHovered && "opacity-100",
              )}
            >
              <p className="text-xs">{band.description}</p>
              {isGamma && (
                <p className={cn("mt-1 font-mono text-[10px]", accentTextClass)}>
                  Target frequency for peak performance
                </p>
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
      className={cn("relative overflow-hidden rounded-2xl p-6 sm:p-8", cardClass, className)}
    >
      <div className="mb-6">
        <div
          className={cn(
            "mb-2 font-mono text-xs uppercase tracking-[0.15em]",
            eyebrowClass,
          )}
        >
          Interactive Visualization
        </div>
        <h3 className={cn("font-sans text-xl font-semibold sm:text-2xl", headingClass)}>
          Brainwave Frequency Spectrum
        </h3>
        <p className={cn("mt-2 max-w-2xl text-sm", bodyTextClass)}>
          Your brain oscillates across five primary frequency bands. The{" "}
          <span className={cn("font-medium", accentTextClass)}>40Hz Gamma range</span> is
          associated with peak cognitive performance and flow states — the exact state the
          24/8 Anthem targets.
        </p>
      </div>

      <div
        className={cn(
          "absolute right-6 top-6 flex items-center gap-2 rounded-lg px-3 py-1.5 backdrop-blur-sm transition-all duration-700 sm:right-8 sm:top-8",
          badgeClass,
          isVisible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        )}
      >
        <div
          className={cn("h-2 w-2 rounded-full", badgeDotClass, isVisible && "animate-pulse")}
          style={{
            boxShadow: isVisible ? `0 0 8px ${GAMMA_COLOR}, 0 0 16px ${GAMMA_COLOR}60` : "none",
          }}
        />
        <span className={cn("font-mono text-xs font-bold", accentTextClass)}>40Hz GAMMA</span>
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
                <linearGradient
                  key={band.name}
                  id={`gradient-${band.name}-${theme}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={band.color}
                    stopOpacity={band.name === "Gamma" && isVisible ? 0.6 : 0.3}
                  />
                  <stop offset="95%" stopColor={band.color} stopOpacity={0.05} />
                </linearGradient>
              ))}
              <filter id={`gamma-glow-${theme}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke={gridStroke}
              strokeOpacity={gridOpacity}
              vertical={false}
            />

            <XAxis
              dataKey="time"
              stroke={gridStroke}
              strokeOpacity={axisOpacity}
              tick={{ fill: axisTick, fontSize: 10, fontFamily: "var(--font-mono)" }}
              tickLine={{ stroke: axisTick, strokeOpacity: 0.2 }}
              axisLine={{ stroke: axisTick, strokeOpacity: 0.2 }}
              label={{
                value: "Time (ms)",
                position: "insideBottom",
                offset: -5,
                fill: axisTick,
                fontSize: 10,
                fontFamily: "var(--font-mono)",
              }}
            />

            <YAxis
              stroke={gridStroke}
              strokeOpacity={axisOpacity}
              tick={{ fill: axisTick, fontSize: 10, fontFamily: "var(--font-mono)" }}
              tickLine={{ stroke: axisTick, strokeOpacity: 0.2 }}
              axisLine={{ stroke: axisTick, strokeOpacity: 0.2 }}
              label={{
                value: "Amplitude (μV)",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                fill: axisTick,
                fontSize: 10,
                fontFamily: "var(--font-mono)",
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: `${axisTick}40`, strokeWidth: 1 }}
            />

            {isVisible && (
              <ReferenceLine
                y={70}
                stroke={GAMMA_COLOR}
                strokeDasharray="5 5"
                strokeOpacity={0.5}
                label={{
                  value: "40Hz Target Zone",
                  position: "right",
                  fill: GAMMA_COLOR,
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
                  fill={`url(#gradient-${band.name}-${theme})`}
                  fillOpacity={baseOpacity}
                  strokeOpacity={selectedBand ? (isHighlighted ? 1 : 0.4) : 0.8}
                  filter={isGamma && isVisible ? `url(#gamma-glow-${theme})` : undefined}
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
          "mt-6 rounded-xl p-4 transition-all duration-700",
          insightClass,
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
        )}
      >
        <div className="flex items-start gap-3">
          <div
            className={cn(
              "mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full",
              insightIconBgClass,
            )}
          >
            <div
              className={cn("h-2 w-2 rounded-full", badgeDotClass)}
              style={{ boxShadow: `0 0 6px ${GAMMA_COLOR}` }}
            />
          </div>
          <div>
            <p className={cn("text-sm", insightTextClass)}>
              <span className={cn("font-medium", accentTextClass)}>The Focus Frequency:</span>{" "}
              Research shows that 40Hz gamma oscillations are associated with heightened
              attention, working memory, and perceptual binding — the neural signature of
              flow states.
            </p>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2",
          cornerAccentClass,
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2",
          cornerAccentClass,
        )}
      />

      {isVisible && (
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 animate-ping"
          style={{
            background: `radial-gradient(circle at 70% 30%, ${GAMMA_COLOR}10 0%, transparent 50%)`,
            animationDuration: "3s",
            animationIterationCount: "infinite",
          }}
        />
      )}

      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes subtle-pulse {
              0%, 100% { box-shadow: 0 0 0 0 transparent; }
              50% { box-shadow: 0 0 0 4px ${isLight ? "rgba(29, 78, 216, 0.12)" : "rgba(245, 158, 11, 0.12)"}; }
            }
            .animate-subtle-pulse {
              animation: subtle-pulse 2s ease-in-out infinite;
            }
          `,
        }}
      />
    </div>
  )
}
