'use client'

import React, { useState, useEffect, useRef } from 'react'

export function TempoRatioVisualizer() {
  const [phase, setPhase] = useState<'backswing' | 'downswing' | 'idle'>('idle')
  const [frame, setFrame] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (!isPlaying) return

    const totalFrames = 32 // 24 + 8
    const msPerFrame = (60 / 112) * 1000 / 4 // 112 BPM, 4 subdivisions

    intervalRef.current = setInterval(() => {
      setFrame((prev) => {
        const next = (prev + 1) % totalFrames
        if (next < 24) setPhase('backswing')
        else setPhase('downswing')
        return next
      })
    }, msPerFrame)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isPlaying])

  const backswingProgress = phase === 'backswing' ? (frame / 24) * 100 : phase === 'downswing' ? 100 : 0
  const downswingProgress = phase === 'downswing' ? ((frame - 24) / 8) * 100 : 0

  return (
    <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider">
          3:1 Tempo Ratio Visualizer
        </div>
        <button
          onClick={() => {
            setIsPlaying(!isPlaying)
            if (!isPlaying) { setFrame(0); setPhase('backswing') }
          }}
          className="px-4 py-1.5 bg-[#1E3A8A] hover:bg-[#2550B0] text-white text-xs font-mono uppercase tracking-wider transition-colors"
        >
          {isPlaying ? 'STOP' : 'PLAY'}
        </button>
      </div>

      {/* Backswing bar */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-[#94A3B8] font-mono">BACKSWING</span>
          <span className="text-xs text-[#3B82F6] font-mono">24 FRAMES</span>
        </div>
        <div className="h-8 bg-[#05080F] border border-[#1E3A5F] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#1E3A8A] to-[#3B82F6] transition-all duration-75"
            style={{ width: `${backswingProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          {Array.from({ length: 24 }, (_, i) => (
            <div
              key={i}
              className="w-0.5 h-2"
              style={{
                backgroundColor: i < frame && frame < 24 ? '#3B82F6' : '#1E3A5F',
              }}
            />
          ))}
        </div>
      </div>

      {/* Downswing bar */}
      <div>
        <div className="flex justify-between mb-2">
          <span className="text-xs text-[#94A3B8] font-mono">DOWNSWING</span>
          <span className="text-xs text-[#F59E0B] font-mono">8 FRAMES</span>
        </div>
        <div className="h-8 bg-[#05080F] border border-[#1E3A5F] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#F59E0B] to-[#F97316] transition-all duration-75"
            style={{ width: `${downswingProgress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1 px-1">
          {Array.from({ length: 8 }, (_, i) => (
            <div
              key={i}
              className="w-1 h-2"
              style={{
                backgroundColor: i < (frame - 24) && phase === 'downswing' ? '#F59E0B' : '#1E3A5F',
              }}
            />
          ))}
        </div>
      </div>

      {/* Current frame display */}
      <div className="flex items-center justify-center gap-8 pt-2">
        <div className="text-center">
          <div className="font-mono text-2xl font-bold text-white">{frame < 24 ? frame + 1 : 24}</div>
          <div className="text-[10px] text-[#94A3B8] font-mono">BACK FRAME</div>
        </div>
        <div className="text-[#3B82F6] font-mono text-lg">:</div>
        <div className="text-center">
          <div className="font-mono text-2xl font-bold text-white">{frame >= 24 ? frame - 23 : 0}</div>
          <div className="text-[10px] text-[#94A3B8] font-mono">DOWN FRAME</div>
        </div>
        <div className="text-center border-l border-[#1E3A5F] pl-8">
          <div className={`font-mono text-2xl font-bold ${phase === 'backswing' ? 'text-[#3B82F6]' : phase === 'downswing' ? 'text-[#F59E0B]' : 'text-[#94A3B8]'}`}>
            {phase === 'idle' ? '—' : phase.toUpperCase()}
          </div>
          <div className="text-[10px] text-[#94A3B8] font-mono">PHASE</div>
        </div>
      </div>
    </div>
  )
}
