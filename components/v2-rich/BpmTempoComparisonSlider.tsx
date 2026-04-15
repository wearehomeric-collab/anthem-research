"use client"

// PARKED TEMPLATE — not currently mounted on any page.
//
// Interactive BPM pendulum slider ported from
// wearehomeric-collab/anthem-research @ claude/anthem-orange-sBtvP
// at components/interactive/bpm-tempo-comparison-slider.tsx.
//
// A live canvas pendulum that swings at 3 preset tempos: Amateur
// (~35 BPM, hesitant), Tour Pro (~67.5 BPM, controlled), and 24/8
// Anthem (112 BPM, precise). User can drag the shadcn Slider to
// compare or tap any preset button. Pendulum bob grows/glows with
// the chosen tempo. Shows a color-coded info card for the current
// tempo, and a "Key Insight" callout at the bottom.
//
// HOW TO MOUNT:
//   import { BpmTempoComparisonSlider } from "@/components/v2-rich/BpmTempoComparisonSlider"
//   <BpmTempoComparisonSlider />
//
// Depends on @/components/ui/slider (shadcn). Uses the V2 dark
// palette orange (#F59E0B) via the charcoal/cream/orange tokens
// in app/globals.css.

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"

const TEMPO_STOPS = [
  {
    bpm: 35,
    label: "<40 BPM",
    category: "Amateur",
    color: "#EA580C",
    description: "Slow, hesitant swing",
  },
  {
    bpm: 67.5,
    label: "60-75 BPM",
    category: "Tour Pro",
    color: "#E2E8F0",
    description: "Smooth, controlled tempo",
  },
  {
    bpm: 112,
    label: "112 BPM",
    category: "24/8 Anthem",
    color: "#F59E0B",
    description: "Precision engineering",
  },
]

export function BpmTempoComparisonSlider() {
  const [currentBpm, setCurrentBpm] = useState(67.5)
  const [isPlaying, setIsPlaying] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const timeRef = useRef(0)

  const getCurrentStop = () => {
    if (currentBpm <= 40) return TEMPO_STOPS[0]
    if (currentBpm <= 90) return TEMPO_STOPS[1]
    return TEMPO_STOPS[2]
  }

  const currentStop = getCurrentStop()

  const sliderToBpm = (value: number) => {
    if (value <= 33) {
      return 35
    } else if (value <= 66) {
      return 67.5
    } else {
      return 112
    }
  }

  const bpmToSlider = (bpm: number) => {
    if (bpm <= 40) return 16.5
    if (bpm <= 90) return 50
    return 83.5
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = rect.height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }

    updateCanvasSize()
    window.addEventListener("resize", updateCanvasSize)

    const animate = () => {
      if (!canvas || !ctx) return

      const width = canvas.width / window.devicePixelRatio
      const height = canvas.height / window.devicePixelRatio

      ctx.clearRect(0, 0, width, height)

      const centerX = width / 2
      const pivotY = 30
      const ropeLength = height * 0.55

      const maxAngle =
        currentBpm <= 40 ? Math.PI / 5 : currentBpm <= 90 ? Math.PI / 4.5 : Math.PI / 5.5

      const beatsPerSecond = currentBpm / 60
      const angularFrequency = beatsPerSecond * Math.PI * 2 * 0.5

      if (isPlaying) {
        timeRef.current += 0.016
      }

      const angle = maxAngle * Math.sin(angularFrequency * timeRef.current)

      const bobX = centerX + ropeLength * Math.sin(angle)
      const bobY = pivotY + ropeLength * Math.cos(angle)

      ctx.fillStyle = "#E2E8F0"
      ctx.beginPath()
      ctx.arc(centerX, pivotY, 6, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "#E2E8F0"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, pivotY)
      ctx.lineTo(bobX, bobY)
      ctx.stroke()

      ctx.strokeStyle = currentStop.color + "30"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(centerX, pivotY, ropeLength, Math.PI / 2 - maxAngle, Math.PI / 2 + maxAngle)
      ctx.stroke()

      const bobRadius = currentBpm >= 112 ? 18 : currentBpm >= 60 ? 15 : 12

      const gradient = ctx.createRadialGradient(bobX, bobY, 0, bobX, bobY, bobRadius * 2)
      gradient.addColorStop(0, currentStop.color + "80")
      gradient.addColorStop(0.5, currentStop.color + "20")
      gradient.addColorStop(1, currentStop.color + "00")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(bobX, bobY, bobRadius * 2, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = currentStop.color
      ctx.beginPath()
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = "#ffffff40"
      ctx.beginPath()
      ctx.arc(bobX - bobRadius * 0.3, bobY - bobRadius * 0.3, bobRadius * 0.4, 0, Math.PI * 2)
      ctx.fill()

      ctx.font = "bold 14px 'JetBrains Mono', monospace"
      ctx.fillStyle = currentStop.color
      ctx.textAlign = "center"
      ctx.fillText(`${Math.round(currentBpm)} BPM`, width / 2, height - 15)

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [currentBpm, isPlaying, currentStop.color])

  const handleSliderChange = (value: number[]) => {
    const newBpm = sliderToBpm(value[0])
    setCurrentBpm(newBpm)
  }

  const handleStopClick = (bpm: number) => {
    setCurrentBpm(bpm)
    timeRef.current = 0
  }

  return (
    <div className="w-full rounded-xl border border-charcoal-light bg-charcoal p-6">
      <div className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-orange">
          Interactive Pendulum
        </p>
        <h3 className="font-sans text-xl font-bold text-cream-light">BPM Tempo Comparison</h3>
        <p className="mt-2 text-sm text-cream-dark">
          Adjust the tempo to see how swing speed changes across different skill levels.
        </p>
      </div>

      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="h-64 w-full rounded-lg bg-black/50"
          style={{ touchAction: "none" }}
        />

        <button
          type="button"
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute right-3 top-3 rounded-lg bg-charcoal-light/90 px-3 py-1.5 font-mono text-xs text-cream-light backdrop-blur-sm transition-all hover:bg-charcoal-lighter"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      <div
        className="mb-6 rounded-lg border-l-4 bg-charcoal-light p-4 transition-colors"
        style={{ borderLeftColor: currentStop.color }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-sm font-bold" style={{ color: currentStop.color }}>
              {currentStop.category}
            </p>
            <p className="mt-0.5 text-xs text-cream-dark">{currentStop.description}</p>
          </div>
          <div className="text-right">
            <p className="font-sans text-3xl font-bold text-cream-light">
              {Math.round(currentBpm)}
            </p>
            <p className="font-mono text-xs text-cream-dark">BPM</p>
          </div>
        </div>
      </div>

      <div className="mb-4 grid grid-cols-3 gap-2">
        {TEMPO_STOPS.map((stop) => {
          const isActive = Math.abs(currentBpm - stop.bpm) < 5
          return (
            <button
              key={stop.bpm}
              type="button"
              onClick={() => handleStopClick(stop.bpm)}
              className={`rounded-lg border px-3 py-2.5 text-center transition-all hover:scale-105 ${
                isActive ? "border-2 shadow-lg" : "border-charcoal-light hover:border-charcoal-lighter"
              }`}
              style={{
                borderColor: isActive ? stop.color : undefined,
                backgroundColor: isActive ? stop.color + "15" : "#0C1220",
              }}
            >
              <p
                className="font-mono text-xs font-bold"
                style={{ color: isActive ? stop.color : "#E2E8F0" }}
              >
                {stop.label}
              </p>
              <p className="mt-1 text-[10px] text-cream-dark">{stop.category}</p>
            </button>
          )
        })}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs text-cream-dark">Adjust Tempo</label>
          <span className="font-mono text-xs font-bold text-orange">{currentStop.label}</span>
        </div>
        <Slider
          value={[bpmToSlider(currentBpm)]}
          onValueChange={handleSliderChange}
          min={0}
          max={100}
          step={1}
          className="cursor-pointer"
        />
        <div className="flex justify-between font-mono text-[10px] text-cream-dark/60">
          <span>Slower</span>
          <span>Faster</span>
        </div>
      </div>

      <div className="mt-6 rounded-lg bg-orange/10 p-4">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-orange">
          Key Insight
        </p>
        <p className="mt-2 text-sm leading-relaxed text-cream-dark">
          The <strong className="text-orange">112 BPM</strong> setting represents the
          precision-engineered tempo of the 24/8 Anthem — significantly faster and more
          controlled than typical amateur swings.
        </p>
      </div>
    </div>
  )
}
