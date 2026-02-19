'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

const tempoZones = [
  { min: 30, max: 40, label: 'Amateur', color: '#EF4444', desc: 'Overthinking. Conscious control. Inconsistent contact.' },
  { min: 40, max: 60, label: 'Improving', color: '#F59E0B', desc: 'Building rhythm awareness. Still some conscious interference.' },
  { min: 60, max: 75, label: 'Tour Pro', color: '#10B981', desc: 'Automated motor programs. Consistent tempo. Basal ganglia driving.' },
  { min: 75, max: 90, label: 'Speed Zone', color: '#3B82F6', desc: 'Aggressive tempo. Power players. Requires excellent timing.' },
]

export function BpmTempoComparisonSlider() {
  const [bpm, setBpm] = useState(112)

  const currentZone = tempoZones.find((z) => {
    const swingBpm = bpm / (32 / 60) * (1 / 60) // Convert anthem BPM to approximate swing tempo
    const approxSwingBpm = bpm * 0.6 // Simplified relationship
    return approxSwingBpm >= z.min && approxSwingBpm < z.max
  }) || tempoZones[2]

  const backswingMs = (24 / bpm) * 60 * 1000 / 4
  const downswingMs = (8 / bpm) * 60 * 1000 / 4

  return (
    <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 space-y-6">
      <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider">
        BPM Tempo Explorer
      </div>

      {/* BPM Slider */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-[#94A3B8] font-mono">ANTHEM BPM</span>
          <span className="font-mono text-2xl font-bold text-white">{bpm}</span>
        </div>
        <input
          type="range"
          min={60}
          max={160}
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full h-2 bg-[#1E3A5F] rounded appearance-none cursor-pointer accent-[#3B82F6]"
        />
        <div className="flex justify-between mt-1">
          <span className="text-[10px] text-[#64748B] font-mono">60</span>
          <span className={cn('text-[10px] font-mono font-bold', bpm === 112 ? 'text-[#3B82F6]' : 'text-[#64748B]')}>
            112 (OPTIMAL)
          </span>
          <span className="text-[10px] text-[#64748B] font-mono">160</span>
        </div>
      </div>

      {/* Timing breakdown */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#05080F] border border-[#1E3A5F] p-4">
          <div className="text-[10px] text-[#94A3B8] font-mono mb-1">BACKSWING (24 FRAMES)</div>
          <div className="font-mono text-xl font-bold text-[#3B82F6]">{backswingMs.toFixed(0)}ms</div>
        </div>
        <div className="bg-[#05080F] border border-[#1E3A5F] p-4">
          <div className="text-[10px] text-[#94A3B8] font-mono mb-1">DOWNSWING (8 FRAMES)</div>
          <div className="font-mono text-xl font-bold text-[#F59E0B]">{downswingMs.toFixed(0)}ms</div>
        </div>
      </div>

      {/* Visual comparison bar */}
      <div>
        <div className="text-[10px] text-[#94A3B8] font-mono mb-2">VISUAL RATIO</div>
        <div className="flex h-6 w-full">
          <div className="bg-[#3B82F6] h-full" style={{ width: '75%' }}>
            <span className="text-[9px] text-white font-mono px-2 leading-6">24</span>
          </div>
          <div className="bg-[#F59E0B] h-full" style={{ width: '25%' }}>
            <span className="text-[9px] text-white font-mono px-2 leading-6">8</span>
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="text-xs text-[#94A3B8] font-mono">3:1 RATIO = CONSTANT</span>
        </div>
      </div>

      {/* 112 BPM highlight */}
      {bpm === 112 && (
        <div className="bg-[#3B82F6]/10 border border-[#3B82F6] p-3 text-center">
          <span className="text-xs text-[#3B82F6] font-mono font-bold">
            OPTIMAL: 112 BPM x 4 beats = 448 micro-ticks
          </span>
        </div>
      )}
    </div>
  )
}
