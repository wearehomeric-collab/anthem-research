'use client'

import { useEffect, useRef, useState } from 'react'

export function TempoRatioVisualizer() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const animationRef = useRef<number>()
  const progressRef = useRef(0)
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with device pixel ratio for crisp rendering
    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      
      ctx.scale(dpr, dpr)
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
    }

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Animation constants
    const centerX = canvas.clientWidth / 2
    const centerY = canvas.clientHeight / 2
    const radius = Math.min(centerX, centerY) - 40
    const strokeWidth = 24
    
    // 112 BPM = 535ms per beat, 4 beats = 2140ms full cycle
    const cycleDuration = 2140 // milliseconds for full 3:1 cycle
    
    const draw = (timestamp: number) => {
      if (!isAnimating) return

      // Initialize lastTime on first frame
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = timestamp
      }

      // Calculate delta time and update progress
      const deltaTime = timestamp - lastTimeRef.current
      lastTimeRef.current = timestamp
      
      progressRef.current = (progressRef.current + deltaTime) % cycleDuration
      const progress = progressRef.current / cycleDuration // 0 to 1

      // Clear canvas
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

      // Draw background arc (full circle, subtle)
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.strokeStyle = '#2d2d2d'
      ctx.lineWidth = strokeWidth
      ctx.lineCap = 'round'
      ctx.stroke()

      // Calculate angles (start from top, -90 degrees)
      const startAngle = -Math.PI / 2
      const backswingEndAngle = startAngle + (Math.PI * 2 * 0.75) // 270 degrees (3/4)
      const downswingEndAngle = startAngle + Math.PI * 2 // Full 360 degrees

      // Current progress angle
      const currentAngle = startAngle + (Math.PI * 2 * progress)

      // Draw backswing arc (cream color, first 75% / 270 degrees)
      if (progress > 0) {
        ctx.beginPath()
        ctx.arc(
          centerX,
          centerY,
          radius,
          startAngle,
          Math.min(currentAngle, backswingEndAngle)
        )
        ctx.strokeStyle = '#e8dcc4'
        ctx.lineWidth = strokeWidth
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // Draw downswing arc (orange, last 25% / 90 degrees)
      if (progress > 0.75) {
        ctx.beginPath()
        ctx.arc(
          centerX,
          centerY,
          radius,
          backswingEndAngle,
          currentAngle
        )
        ctx.strokeStyle = '#ff6b35'
        ctx.lineWidth = strokeWidth
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // Pulse effect on downswing completion
      const pulseIntensity = progress > 0.75 ? Math.min((progress - 0.75) / 0.25, 1) : 0
      if (pulseIntensity > 0) {
        const glowRadius = radius + 8
        const gradient = ctx.createRadialGradient(
          centerX,
          centerY,
          radius - strokeWidth / 2,
          centerX,
          centerY,
          glowRadius
        )
        gradient.addColorStop(0, `rgba(255, 107, 53, ${pulseIntensity * 0.3})`)
        gradient.addColorStop(1, 'rgba(255, 107, 53, 0)')
        
        ctx.beginPath()
        ctx.arc(centerX, centerY, glowRadius, backswingEndAngle, downswingEndAngle)
        ctx.strokeStyle = gradient
        ctx.lineWidth = strokeWidth + 16
        ctx.lineCap = 'round'
        ctx.stroke()
      }

      // Draw moving indicator (current position marker)
      const indicatorX = centerX + Math.cos(currentAngle) * radius
      const indicatorY = centerY + Math.sin(currentAngle) * radius
      
      // Outer glow
      const indicatorGradient = ctx.createRadialGradient(
        indicatorX,
        indicatorY,
        0,
        indicatorX,
        indicatorY,
        16
      )
      const indicatorColor = progress > 0.75 ? '#ff6b35' : '#faf8f3'
      indicatorGradient.addColorStop(0, indicatorColor)
      indicatorGradient.addColorStop(0.5, indicatorColor + '80')
      indicatorGradient.addColorStop(1, indicatorColor + '00')
      
      ctx.beginPath()
      ctx.arc(indicatorX, indicatorY, 16, 0, Math.PI * 2)
      ctx.fillStyle = indicatorGradient
      ctx.fill()
      
      // Inner dot
      ctx.beginPath()
      ctx.arc(indicatorX, indicatorY, 6, 0, Math.PI * 2)
      ctx.fillStyle = indicatorColor
      ctx.fill()

      // Center text - 3:1 Ratio
      ctx.font = "bold 48px 'Space Grotesk', sans-serif"
      ctx.fillStyle = '#faf8f3'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('3:1', centerX, centerY - 10)
      
      // Subtitle
      ctx.font = "500 14px 'JetBrains Mono', monospace"
      ctx.fillStyle = '#e8dcc4'
      ctx.fillText('PRO TEMPO', centerX, centerY + 20)

      // Phase labels
      ctx.font = "600 12px 'JetBrains Mono', monospace"
      ctx.textAlign = 'center'
      
      // Backswing label (top)
      ctx.fillStyle = progress < 0.75 ? '#e8dcc4' : '#e8dcc480'
      ctx.fillText('BACKSWING', centerX, centerY - radius - 24)
      ctx.fillStyle = progress < 0.75 ? '#e8dcc4aa' : '#e8dcc460'
      ctx.font = "400 11px 'JetBrains Mono', monospace"
      ctx.fillText('(3 beats)', centerX, centerY - radius - 10)
      
      // Downswing label (bottom)
      ctx.font = "600 12px 'JetBrains Mono', monospace"
      ctx.fillStyle = progress > 0.75 ? '#ff6b35' : '#ff6b3580'
      ctx.fillText('DOWNSWING', centerX, centerY + radius + 18)
      ctx.fillStyle = progress > 0.75 ? '#ff6b35aa' : '#ff6b3560'
      ctx.font = "400 11px 'JetBrains Mono', monospace"
      ctx.fillText('(1 beat)', centerX, centerY + radius + 32)

      // Beat markers
      const beatMarkers = [0, 0.25, 0.5, 0.75] // 4 beats
      beatMarkers.forEach((beatProgress, index) => {
        const beatAngle = startAngle + (Math.PI * 2 * beatProgress)
        const markerRadius = radius + strokeWidth / 2 + 8
        const markerX = centerX + Math.cos(beatAngle) * markerRadius
        const markerY = centerY + Math.sin(beatAngle) * markerRadius
        
        const isActive = progress >= beatProgress && (index === 3 ? true : progress < beatMarkers[index + 1])
        const markerColor = index === 3 ? '#ff6b35' : '#e8dcc4'
        
        ctx.beginPath()
        ctx.arc(markerX, markerY, isActive ? 5 : 3, 0, Math.PI * 2)
        ctx.fillStyle = isActive ? markerColor : markerColor + '60'
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(draw)
    }

    if (isAnimating) {
      animationRef.current = requestAnimationFrame(draw)
    }

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isAnimating])

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating)
    if (!isAnimating) {
      lastTimeRef.current = 0 // Reset time tracking when resuming
    }
  }

  return (
    <div className="rounded-xl border border-charcoal-light bg-charcoal p-6 sm:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-orange">
            Interactive Visualization
          </p>
          <p className="mt-1 font-sans text-sm font-semibold text-cream-dark">
            3:1 Tempo Ratio Visualizer
          </p>
        </div>
        <button
          onClick={toggleAnimation}
          className="rounded-lg bg-charcoal-light px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-cream-light transition-colors hover:bg-charcoal-lighter hover:text-orange focus:outline-none focus:ring-2 focus:ring-orange focus:ring-offset-2 focus:ring-offset-black"
          aria-label={isAnimating ? 'Pause animation' : 'Play animation'}
        >
          {isAnimating ? 'Pause' : 'Play'}
        </button>
      </div>
      
      <canvas
        ref={canvasRef}
        className="mx-auto block w-full"
        style={{ maxWidth: '500px', height: '400px' }}
        aria-label="Circular tempo ratio visualization showing 3:1 backswing to downswing timing"
      />
      
      <div className="mt-4 grid grid-cols-2 gap-4 text-center">
        <div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-3 w-3 rounded-full bg-cream-dark" />
            <span className="font-mono text-xs text-cream-dark">Backswing Phase</span>
          </div>
          <p className="mt-1 font-mono text-xs text-cream-dark/60">270° • 3 beats</p>
        </div>
        <div>
          <div className="flex items-center justify-center gap-2">
            <div className="h-3 w-3 rounded-full bg-orange" />
            <span className="font-mono text-xs text-cream-dark">Downswing Phase</span>
          </div>
          <p className="mt-1 font-mono text-xs text-cream-dark/60">90° • 1 beat</p>
        </div>
      </div>
      
      <p className="mt-4 text-center font-mono text-xs text-cream-dark/80">
        112 BPM • 4 beats per cycle
      </p>
    </div>
  )
}
