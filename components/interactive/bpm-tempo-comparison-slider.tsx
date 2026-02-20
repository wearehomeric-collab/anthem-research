"use client"

import { useState, useEffect, useRef } from "react"
import { Slider } from "@/components/ui/slider"

const TEMPO_STOPS = [
  { bpm: 35, label: "<40 BPM", category: "Amateur", color: "#e07a5f", description: "Slow, hesitant swing" },
  { bpm: 67.5, label: "60-75 BPM", category: "Tour Pro", color: "#e8dcc4", description: "Smooth, controlled tempo" },
  { bpm: 112, label: "112 BPM", category: "24/8 Anthem", color: "#ff6b35", description: "Precision engineering" },
]

export function BpmTempoComparisonSlider() {
  const [currentBpm, setCurrentBpm] = useState(67.5)
  const [isPlaying, setIsPlaying] = useState(true)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const timeRef = useRef(0)

  // Find current stop based on BPM
  const getCurrentStop = () => {
    if (currentBpm <= 40) return TEMPO_STOPS[0]
    if (currentBpm <= 90) return TEMPO_STOPS[1]
    return TEMPO_STOPS[2]
  }

  const currentStop = getCurrentStop()

  // Convert slider value (0-100) to BPM
  const sliderToBpm = (value: number) => {
    if (value <= 33) {
      return 35 // Amateur range
    } else if (value <= 66) {
      return 67.5 // Tour Pro range
    } else {
      return 112 // Anthem range
    }
  }

  // Convert BPM to slider value
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

    // Set canvas size
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

      // Clear canvas
      ctx.clearRect(0, 0, width, height)

      // Pendulum parameters
      const centerX = width / 2
      const pivotY = 30
      const ropeLength = height * 0.55

      // Calculate swing angle based on BPM (faster = smaller arc for realism)
      const maxAngle = currentBpm <= 40 ? Math.PI / 5 : currentBpm <= 90 ? Math.PI / 4.5 : Math.PI / 5.5
      
      // Calculate angular frequency (rad/s) from BPM
      // Period = 60/BPM seconds for one beat, we use full swing cycle
      const beatsPerSecond = currentBpm / 60
      const angularFrequency = beatsPerSecond * Math.PI * 2 * 0.5 // Half speed for visual appeal

      if (isPlaying) {
        timeRef.current += 0.016 // ~60fps
      }

      // Pendulum swing angle using sine wave
      const angle = maxAngle * Math.sin(angularFrequency * timeRef.current)

      // Calculate pendulum bob position
      const bobX = centerX + ropeLength * Math.sin(angle)
      const bobY = pivotY + ropeLength * Math.cos(angle)

      // Draw pivot point
      ctx.fillStyle = "#e8dcc4"
      ctx.beginPath()
      ctx.arc(centerX, pivotY, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw rope
      ctx.strokeStyle = "#e8dcc4"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, pivotY)
      ctx.lineTo(bobX, bobY)
      ctx.stroke()

      // Draw motion arc (subtle guide)
      ctx.strokeStyle = currentStop.color + "30"
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.arc(
        centerX,
        pivotY,
        ropeLength,
        Math.PI / 2 - maxAngle,
        Math.PI / 2 + maxAngle
      )
      ctx.stroke()

      // Draw pendulum bob with glow
      const bobRadius = currentBpm >= 112 ? 18 : currentBpm >= 60 ? 15 : 12

      // Glow effect
      const gradient = ctx.createRadialGradient(bobX, bobY, 0, bobX, bobY, bobRadius * 2)
      gradient.addColorStop(0, currentStop.color + "80")
      gradient.addColorStop(0.5, currentStop.color + "20")
      gradient.addColorStop(1, currentStop.color + "00")
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(bobX, bobY, bobRadius * 2, 0, Math.PI * 2)
      ctx.fill()

      // Solid bob
      ctx.fillStyle = currentStop.color
      ctx.beginPath()
      ctx.arc(bobX, bobY, bobRadius, 0, Math.PI * 2)
      ctx.fill()

      // Inner highlight
      ctx.fillStyle = "#ffffff40"
      ctx.beginPath()
      ctx.arc(bobX - bobRadius * 0.3, bobY - bobRadius * 0.3, bobRadius * 0.4, 0, Math.PI * 2)
      ctx.fill()

      // Draw BPM indicator at bottom
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
    // Reset time for smooth transition
    timeRef.current = 0
  }

  return (
    <div className="w-full rounded-xl border border-charcoal-light bg-charcoal p-6">
      {/* Header */}
      <div className="mb-6">
        <p className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-orange">
          Interactive Pendulum
        </p>
        <h3 className="font-sans text-xl font-bold text-cream-light">
          BPM Tempo Comparison
        </h3>
        <p className="mt-2 text-sm text-cream-dark">
          Adjust the tempo to see how swing speed changes across different skill levels
        </p>
      </div>

      {/* Canvas for pendulum animation */}
      <div className="relative mb-6">
        <canvas
          ref={canvasRef}
          className="h-64 w-full rounded-lg bg-black/50"
          style={{ touchAction: "none" }}
        />
        
        {/* Play/Pause button overlay */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute right-3 top-3 rounded-lg bg-charcoal-light/90 px-3 py-1.5 font-mono text-xs text-cream-light backdrop-blur-sm transition-all hover:bg-charcoal-lighter"
          aria-label={isPlaying ? "Pause animation" : "Play animation"}
        >
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
      </div>

      {/* Current tempo info card */}
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

      {/* Tempo preset buttons */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        {TEMPO_STOPS.map((stop) => (
          <button
            key={stop.bpm}
            onClick={() => handleStopClick(stop.bpm)}
            className={`rounded-lg border px-3 py-2.5 text-center transition-all hover:scale-105 ${
              Math.abs(currentBpm - stop.bpm) < 5
                ? "border-2 shadow-lg"
                : "border-charcoal-light hover:border-charcoal-lighter"
            }`}
            style={{
              borderColor: Math.abs(currentBpm - stop.bpm) < 5 ? stop.color : undefined,
              backgroundColor: Math.abs(currentBpm - stop.bpm) < 5 ? stop.color + "15" : "#2d2d2d",
            }}
          >
            <p
              className="font-mono text-xs font-bold"
              style={{ color: Math.abs(currentBpm - stop.bpm) < 5 ? stop.color : "#e8dcc4" }}
            >
              {stop.label}
            </p>
            <p className="mt-1 text-[10px] text-cream-dark">{stop.category}</p>
          </button>
        ))}
      </div>

      {/* Slider control */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="font-mono text-xs text-cream-dark">Adjust Tempo</label>
          <span className="font-mono text-xs font-bold text-orange">
            {currentStop.label}
          </span>
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

      {/* Key insight */}
      <div className="mt-6 rounded-lg bg-orange/10 p-4">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-orange">
          Key Insight
        </p>
        <p className="mt-2 text-sm leading-relaxed text-cream-dark">
          The <strong className="text-orange">112 BPM</strong> setting represents the precision-engineered tempo
          of the 24/8 Anthem—significantly faster and more controlled than typical amateur swings.
        </p>
      </div>
    </div>
  )
}
