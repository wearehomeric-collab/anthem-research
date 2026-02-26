'use client'

import React, { useEffect, useRef, useState } from 'react'

export function NeuralEntrainmentAnimator() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const [entrainmentLevel, setEntrainmentLevel] = useState(0)
  const [isRunning, setIsRunning] = useState(false)

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
    let sync = 0

    const draw = () => {
      const w = canvas.getBoundingClientRect().width
      const h = canvas.getBoundingClientRect().height
      ctx.clearRect(0, 0, w, h)

      if (isRunning && sync < 1) {
        sync += 0.002
        setEntrainmentLevel(Math.min(Math.round(sync * 100), 100))
      }

      const externalFreq = 0.05 // The "stimulus" frequency
      const yMid1 = h * 0.3 // External stimulus wave
      const yMid2 = h * 0.7 // Neural response wave

      // Labels
      ctx.font = '10px monospace'
      ctx.fillStyle = '#94A3B8'
      ctx.fillText('EXTERNAL STIMULUS (112 BPM)', 10, yMid1 - 35)
      ctx.fillText('NEURAL RESPONSE', 10, yMid2 - 35)

      // External stimulus wave (always consistent)
      ctx.beginPath()
      ctx.strokeStyle = '#3B82F6'
      ctx.lineWidth = 2
      for (let x = 0; x < w; x += 2) {
        const y = yMid1 + Math.sin(x * externalFreq + t * 0.05) * 25
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Neural response wave (gradually syncing)
      const drift = (1 - sync) * 0.03
      const phaseNoise = (1 - sync) * 15
      ctx.beginPath()
      ctx.strokeStyle = sync > 0.7 ? '#10B981' : sync > 0.3 ? '#F59E0B' : '#EF4444'
      ctx.lineWidth = 2
      for (let x = 0; x < w; x += 2) {
        const noise = Math.sin(x * 0.13 + t * 0.07) * phaseNoise
        const y = yMid2 + Math.sin(x * (externalFreq + drift) + t * 0.05 + noise * 0.05) * 25 + noise * Math.sin(t * 0.02)
        if (x === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.stroke()

      // Sync indicator lines
      if (sync > 0.5) {
        const alpha = (sync - 0.5) * 0.3
        ctx.strokeStyle = `rgba(16, 185, 129, ${alpha})`
        ctx.lineWidth = 1
        ctx.setLineDash([3, 6])
        for (let x = 50; x < w; x += 60) {
          ctx.beginPath()
          ctx.moveTo(x, yMid1 + 30)
          ctx.lineTo(x, yMid2 - 30)
          ctx.stroke()
        }
        ctx.setLineDash([])
      }

      t++
      animRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isRunning])

  return (
    <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider">
          Neural Entrainment Simulator
        </div>
        <button
          onClick={() => {
            setIsRunning(!isRunning)
            if (!isRunning) setEntrainmentLevel(0)
          }}
          className="px-4 py-1.5 bg-[#1E3A8A] hover:bg-[#2550B0] text-white text-xs font-mono uppercase tracking-wider transition-colors"
        >
          {isRunning ? 'RESET' : 'ENTRAIN'}
        </button>
      </div>

      <canvas
        ref={canvasRef}
        className="w-full h-48 rounded"
        style={{ display: 'block' }}
      />

      {/* Entrainment meter */}
      <div>
        <div className="flex justify-between mb-1">
          <span className="text-[10px] text-[#94A3B8] font-mono">SYNCHRONIZATION</span>
          <span className="text-[10px] font-mono font-bold" style={{
            color: entrainmentLevel > 70 ? '#10B981' : entrainmentLevel > 30 ? '#F59E0B' : '#EF4444',
          }}>
            {entrainmentLevel}%
          </span>
        </div>
        <div className="h-2 bg-[#05080F] border border-[#1E3A5F]">
          <div
            className="h-full transition-all duration-300"
            style={{
              width: `${entrainmentLevel}%`,
              backgroundColor: entrainmentLevel > 70 ? '#10B981' : entrainmentLevel > 30 ? '#F59E0B' : '#EF4444',
            }}
          />
        </div>
      </div>
    </div>
  )
}
