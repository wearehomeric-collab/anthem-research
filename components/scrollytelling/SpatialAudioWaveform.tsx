'use client'

import React, { useEffect, useRef } from 'react'

export function SpatialAudioWaveform() {
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

      const centerX = w / 2
      const centerY = h / 2

      // Draw stereo field rings
      for (let r = 0; r < 5; r++) {
        const radius = 30 + r * 30
        const pulsePhase = (t * 0.03 + r * 0.5) % (Math.PI * 2)
        const pulseRadius = radius + Math.sin(pulsePhase) * 5
        const alpha = 0.1 + Math.sin(pulsePhase) * 0.05

        ctx.beginPath()
        ctx.arc(centerX, centerY, pulseRadius, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${alpha})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      // Left channel waveform
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.7)'
      ctx.lineWidth = 2
      for (let i = 0; i <= 180; i += 2) {
        const angle = (i / 180) * Math.PI + Math.PI / 2
        const wave = Math.sin(i * 0.1 + t * 0.04) * 15 + Math.sin(i * 0.05 + t * 0.02) * 8
        const r = 80 + wave
        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Right channel waveform
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.7)'
      ctx.lineWidth = 2
      for (let i = 0; i <= 180; i += 2) {
        const angle = (i / 180) * Math.PI - Math.PI / 2
        const wave = Math.sin(i * 0.1 + t * 0.04 + 1) * 15 + Math.sin(i * 0.05 + t * 0.03) * 8
        const r = 80 + wave
        const x = centerX + Math.cos(angle) * r
        const y = centerY + Math.sin(angle) * r
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Center point
      const pulseSize = 4 + Math.sin(t * 0.06) * 2
      ctx.beginPath()
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2)
      ctx.fillStyle = '#3B82F6'
      ctx.fill()

      // Labels
      ctx.font = '10px monospace'
      ctx.fillStyle = '#00F0FF'
      ctx.textAlign = 'right'
      ctx.fillText('L', centerX - 100, centerY + 4)
      ctx.fillStyle = '#F59E0B'
      ctx.textAlign = 'left'
      ctx.fillText('R', centerX + 95, centerY + 4)
      ctx.textAlign = 'start'

      // Beat pulse indicator
      const beatPhase = (t * 0.05) % 1
      if (beatPhase < 0.1) {
        ctx.beginPath()
        ctx.arc(centerX, centerY, 80 + beatPhase * 300, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.3 * (1 - beatPhase * 10)})`
        ctx.lineWidth = 2
        ctx.stroke()
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
    <div className="bg-[#0C1220] border border-[#1E3A5F] p-6">
      <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-4">
        Spatial Audio Field
      </div>
      <canvas
        ref={canvasRef}
        className="w-full h-64 md:h-80 rounded"
        style={{ display: 'block' }}
      />
      <div className="flex justify-between mt-3">
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#00F0FF]" />
          <span className="text-[10px] text-[#94A3B8] font-mono">LEFT CHANNEL</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-0.5 bg-[#F59E0B]" />
          <span className="text-[10px] text-[#94A3B8] font-mono">RIGHT CHANNEL</span>
        </div>
      </div>
    </div>
  )
}
