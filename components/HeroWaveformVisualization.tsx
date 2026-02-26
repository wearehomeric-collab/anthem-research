'use client'

import React, { useEffect, useRef } from 'react'

export function HeroWaveformVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let t = 0
    const draw = () => {
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      ctx.clearRect(0, 0, w, h)

      // Draw multiple waveform layers
      const layers = [
        { color: 'rgba(59, 130, 246, 0.6)', freq: 0.02, amp: 20, speed: 0.03 },
        { color: 'rgba(0, 240, 255, 0.4)', freq: 0.015, amp: 15, speed: 0.02 },
        { color: 'rgba(245, 158, 11, 0.3)', freq: 0.025, amp: 10, speed: 0.04 },
      ]

      layers.forEach(({ color, freq, amp, speed }) => {
        ctx.beginPath()
        ctx.strokeStyle = color
        ctx.lineWidth = 2
        for (let x = 0; x <= w; x += 2) {
          const y = h / 2 + Math.sin(x * freq + t * speed) * amp + Math.sin(x * freq * 2.5 + t * speed * 1.5) * (amp * 0.4)
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })

      // Draw beat markers at 112 BPM intervals
      const beatsPerSecond = 112 / 60
      const pixelsPerBeat = w / 8
      for (let i = 0; i < 9; i++) {
        const x = i * pixelsPerBeat
        const phase = (t * beatsPerSecond * 0.1 + i * 0.5) % (Math.PI * 2)
        const alpha = 0.15 + Math.sin(phase) * 0.1
        ctx.beginPath()
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
        ctx.lineWidth = 1
        ctx.setLineDash([4, 4])
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
        ctx.setLineDash([])

        // 3:1 ratio markers (24 frames : 8 frames)
        if (i === 3 || i === 6) {
          ctx.fillStyle = `rgba(245, 158, 11, ${alpha + 0.2})`
          ctx.fillRect(x - 1, 0, 2, h)
        }
      }

      t++
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-20 md:h-24 rounded"
        style={{ display: 'block' }}
      />
      <div className="absolute inset-0 flex items-center justify-between px-4 pointer-events-none">
        <span className="text-[10px] font-mono text-[#3B82F6]/60">0</span>
        <span className="text-[10px] font-mono text-[#F59E0B]/60">24 FRAMES</span>
        <span className="text-[10px] font-mono text-[#F59E0B]/60">8 FRAMES</span>
        <span className="text-[10px] font-mono text-[#3B82F6]/60">112 BPM</span>
      </div>
    </div>
  )
}
