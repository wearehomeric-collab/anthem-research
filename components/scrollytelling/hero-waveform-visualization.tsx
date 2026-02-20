"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"
import { Play, Pause } from "lucide-react"

const COLORS = {
  backswing: "#e8dcc4",
  downswing: "#ff6b35",
  background: "#1a1a1a",
  beatMarker: "#2d2d2d",
  beatMarkerActive: "#ff6b35",
  playhead: "#ff6b35",
  grid: "rgba(232, 220, 196, 0.1)",
  waveform: "rgba(232, 220, 196, 0.3)",
}

const BPM = 112
const BEATS_PER_MEASURE = 4
const MS_PER_BEAT = (60 / BPM) * 1000 // ~535ms per beat
const CYCLE_DURATION = MS_PER_BEAT * BEATS_PER_MEASURE // ~2142ms for full measure

interface WaveformPoint {
  x: number
  y: number
  phase: "backswing" | "downswing"
}

export function HeroWaveformVisualization({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const startTimeRef = useRef<number>(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [progress, setProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 800, height: 200 })

  // Generate waveform points
  const generateWaveformPoints = useCallback((width: number, height: number): WaveformPoint[] => {
    const points: WaveformPoint[] = []
    const numPoints = Math.floor(width / 2)
    const centerY = height / 2
    const amplitude = height * 0.35

    for (let i = 0; i <= numPoints; i++) {
      const x = (i / numPoints) * width
      const normalizedX = i / numPoints

      // Determine phase (75% backswing, 25% downswing)
      const phase: "backswing" | "downswing" = normalizedX < 0.75 ? "backswing" : "downswing"

      // Create different wave characteristics for each phase
      let y: number
      if (phase === "backswing") {
        // Slower, more controlled oscillation for backswing
        const localProgress = normalizedX / 0.75
        const frequency = 3
        const envelopeRise = Math.sin(localProgress * Math.PI * 0.5)
        y = centerY + Math.sin(localProgress * Math.PI * frequency) * amplitude * envelopeRise * 0.8
      } else {
        // Faster, more intense oscillation for downswing
        const localProgress = (normalizedX - 0.75) / 0.25
        const frequency = 2
        const envelopeFall = Math.cos(localProgress * Math.PI * 0.5)
        y = centerY + Math.sin(localProgress * Math.PI * frequency + Math.PI) * amplitude * envelopeFall * 1.2
      }

      points.push({ x, y, phase })
    }

    return points
  }, [])

  // Draw the visualization
  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")
    if (!canvas || !ctx) return

    const { width, height } = dimensions
    const elapsed = timestamp - startTimeRef.current
    const cycleProgress = (elapsed % CYCLE_DURATION) / CYCLE_DURATION
    const beatInCycle = Math.floor(cycleProgress * BEATS_PER_MEASURE)

    setProgress(cycleProgress)
    setCurrentBeat(beatInCycle)

    // Clear canvas
    ctx.clearRect(0, 0, width, height)

    // Draw background grid lines
    ctx.strokeStyle = COLORS.grid
    ctx.lineWidth = 1
    ctx.setLineDash([4, 8])
    
    // Horizontal center line
    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.stroke()

    // Vertical beat markers
    for (let i = 1; i < BEATS_PER_MEASURE; i++) {
      const x = (i / BEATS_PER_MEASURE) * width
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, height)
      ctx.stroke()
    }
    ctx.setLineDash([])

    // Generate and draw waveform
    const points = generateWaveformPoints(width, height)
    const playheadX = cycleProgress * width

    // Draw waveform gradient fill
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, `${COLORS.backswing}20`)
    gradient.addColorStop(0.75, `${COLORS.backswing}20`)
    gradient.addColorStop(0.75, `${COLORS.downswing}30`)
    gradient.addColorStop(1, `${COLORS.downswing}30`)

    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    points.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.lineTo(width, height / 2)
    ctx.closePath()
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw waveform line with phase colors
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    // Backswing portion (first 75%)
    ctx.beginPath()
    ctx.strokeStyle = COLORS.backswing
    const backswingPoints = points.filter((p) => p.phase === "backswing")
    backswingPoints.forEach((point, i) => {
      if (i === 0) ctx.moveTo(point.x, point.y)
      else ctx.lineTo(point.x, point.y)
    })
    ctx.stroke()

    // Downswing portion (last 25%)
    ctx.beginPath()
    ctx.strokeStyle = COLORS.downswing
    const downswingPoints = points.filter((p) => p.phase === "downswing")
    // Connect from last backswing point
    if (backswingPoints.length > 0 && downswingPoints.length > 0) {
      const lastBackswing = backswingPoints[backswingPoints.length - 1]
      ctx.moveTo(lastBackswing.x, lastBackswing.y)
    }
    downswingPoints.forEach((point) => {
      ctx.lineTo(point.x, point.y)
    })
    ctx.stroke()

    // Draw phase separator line
    const separatorX = width * 0.75
    ctx.strokeStyle = `${COLORS.downswing}60`
    ctx.lineWidth = 2
    ctx.setLineDash([8, 4])
    ctx.beginPath()
    ctx.moveTo(separatorX, 10)
    ctx.lineTo(separatorX, height - 10)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw playhead with glow effect
    ctx.save()
    ctx.shadowColor = COLORS.playhead
    ctx.shadowBlur = 20
    ctx.strokeStyle = COLORS.playhead
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(playheadX, 10)
    ctx.lineTo(playheadX, height - 10)
    ctx.stroke()
    ctx.restore()

    // Draw playhead circle at waveform intersection
    const playheadIndex = Math.min(
      Math.floor((cycleProgress * points.length)),
      points.length - 1
    )
    const playheadPoint = points[playheadIndex]
    if (playheadPoint) {
      ctx.save()
      ctx.shadowColor = COLORS.playhead
      ctx.shadowBlur = 15
      ctx.fillStyle = COLORS.playhead
      ctx.beginPath()
      ctx.arc(playheadX, playheadPoint.y, 8, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Inner white dot
      ctx.fillStyle = "#ffffff"
      ctx.beginPath()
      ctx.arc(playheadX, playheadPoint.y, 3, 0, Math.PI * 2)
      ctx.fill()
    }

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(draw)
    }
  }, [dimensions, generateWaveformPoints, isPlaying])

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({
          width: rect.width,
          height: Math.min(rect.height, 200)
        })
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animation loop
  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = performance.now() - progress * CYCLE_DURATION
      animationRef.current = requestAnimationFrame(draw)
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, draw, progress])

  // Initial draw when dimensions change
  useEffect(() => {
    if (!isPlaying) {
      const canvas = canvasRef.current
      const ctx = canvas?.getContext("2d")
      if (canvas && ctx) {
        draw(startTimeRef.current + progress * CYCLE_DURATION)
      }
    }
  }, [dimensions, isPlaying, draw, progress])

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev)
  }

  const beatLabels = ["1", "2", "3", "4"]
  const beatPhases: ("backswing" | "downswing")[] = ["backswing", "backswing", "backswing", "downswing"]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-charcoal-light bg-charcoal",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-charcoal-light px-6 py-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.15em] text-orange">
            Interactive Visualization
          </div>
          <div className="mt-1 font-sans text-lg font-semibold text-cream-light">
            3:1 Timing Waveform
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm text-cream-dark">
              <span className="text-orange font-bold">{BPM}</span> BPM
            </span>
            <span className="text-charcoal-lighter">|</span>
            <span className="font-mono text-sm text-cream-dark">
              <span className="text-terra-cotta font-bold">3:1</span> Ratio
            </span>
          </div>
          <button
            onClick={togglePlayPause}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-orange text-black transition-all hover:bg-orange/90 hover:scale-105 cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
          </button>
        </div>
      </div>

      {/* Phase Labels */}
      <div className="flex border-b border-charcoal-light">
        <div className="flex-[3] border-r border-charcoal-light px-4 py-2">
          <span className="font-mono text-xs uppercase tracking-wider text-cream-dark">
            Backswing
          </span>
          <span className="ml-2 font-mono text-xs text-cream-dark/60">(3 beats)</span>
        </div>
        <div className="flex-1 px-4 py-2">
          <span className="font-mono text-xs uppercase tracking-wider text-orange">
            Downswing
          </span>
          <span className="ml-2 font-mono text-xs text-orange/60">(1 beat)</span>
        </div>
      </div>

      {/* Canvas Container */}
      <div ref={containerRef} className="relative h-[200px] w-full px-4">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="absolute inset-0"
          style={{ width: "100%", height: "100%" }}
        />
      </div>

      {/* Beat Markers */}
      <div className="flex border-t border-charcoal-light">
        {beatLabels.map((label, index) => {
          const isActive = currentBeat === index
          const isDownswing = beatPhases[index] === "downswing"
          return (
            <div
              key={index}
              className={cn(
                "flex flex-1 flex-col items-center py-3 transition-all duration-150",
                index < 3 ? "border-r border-charcoal-light" : "",
                isActive && "bg-charcoal-light"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full font-mono text-sm font-bold transition-all",
                  isActive
                    ? isDownswing
                      ? "bg-orange text-black scale-110"
                      : "bg-cream-dark text-charcoal scale-110"
                    : isDownswing
                      ? "bg-orange/20 text-orange"
                      : "bg-cream-dark/20 text-cream-dark"
                )}
              >
                {label}
              </div>
              <span
                className={cn(
                  "mt-1 font-mono text-[10px] uppercase tracking-wider",
                  isActive
                    ? isDownswing
                      ? "text-orange"
                      : "text-cream-light"
                    : "text-cream-dark/50"
                )}
              >
                {isDownswing ? "Down" : "Back"}
              </span>
            </div>
          )
        })}
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-charcoal-light">
        <div
          className="h-full transition-all duration-75"
          style={{
            width: `${progress * 100}%`,
            background: progress < 0.75 
              ? COLORS.backswing 
              : `linear-gradient(90deg, ${COLORS.backswing} 0%, ${COLORS.backswing} ${(0.75 / progress) * 100}%, ${COLORS.downswing} ${(0.75 / progress) * 100}%, ${COLORS.downswing} 100%)`
          }}
        />
      </div>

      {/* Decorative corner accents */}
      <div className="pointer-events-none absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-orange/50" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-orange/50" />
    </div>
  )
}
