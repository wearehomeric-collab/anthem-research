'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

const bands = [
  { name: 'Delta', range: '0.5–4 Hz', color: '#6366F1', min: 0.5, max: 4, role: 'Deep restorative states', relevance: 'Baseline recovery between practice sessions' },
  { name: 'Theta', range: '4–8 Hz', color: '#8B5CF6', min: 4, max: 8, role: 'Flow & memory consolidation', relevance: 'Motor skill encoding — swing patterns move to long-term memory' },
  { name: 'Alpha', range: '8–13 Hz', color: '#3B82F6', min: 8, max: 13, role: 'Relaxed focused attention', relevance: 'Pre-shot calm — the "quiet eye" state elite golfers enter' },
  { name: 'Beta', range: '13–30 Hz', color: '#06B6D4', min: 13, max: 30, role: 'Active processing & motor planning', relevance: '112 BPM entrains beta oscillations for precise timing' },
  { name: 'Gamma', range: '30–100+ Hz', color: '#F59E0B', min: 30, max: 100, role: 'Cognitive binding & peak performance', relevance: '40 Hz gamma = the focus frequency. Neural synchrony at its peak' },
]

export function BrainwaveFrequencyChart() {
  const [activeBand, setActiveBand] = useState<string | null>(null)
  const active = bands.find((b) => b.name === activeBand)

  return (
    <div className="h-full flex flex-col bg-[#0C1220] border border-[#1E3A5F] p-6">
      <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-4">
        Brainwave Frequency Spectrum
      </div>

      {/* Frequency bars */}
      <div className="flex-1 flex items-end gap-2 mb-4">
        {bands.map((band) => {
          const height = ((band.max - band.min) / 100) * 100 + 15 // Scaled height
          const isActive = activeBand === band.name
          return (
            <button
              key={band.name}
              onClick={() => setActiveBand(isActive ? null : band.name)}
              className={cn(
                'flex-1 relative transition-all duration-300 cursor-pointer group',
                isActive ? 'opacity-100' : 'opacity-70 hover:opacity-90',
              )}
            >
              <div
                className="w-full rounded-t transition-all duration-300"
                style={{
                  height: `${height}%`,
                  minHeight: '40px',
                  backgroundColor: isActive ? band.color : `${band.color}80`,
                  boxShadow: isActive ? `0 0 20px ${band.color}40` : undefined,
                }}
              />
              <div className="mt-2 text-center">
                <div className="text-[10px] font-mono font-bold" style={{ color: band.color }}>
                  {band.name}
                </div>
                <div className="text-[9px] text-[#94A3B8] font-mono">{band.range}</div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Detail panel */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300 border-t border-[#1E3A5F]',
          active ? 'max-h-40 pt-4 opacity-100' : 'max-h-0 opacity-0 pt-0',
        )}
      >
        {active && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2" style={{ backgroundColor: active.color }} />
              <span className="text-sm font-bold text-white">{active.name} Waves</span>
              <span className="text-xs text-[#94A3B8] font-mono">{active.range}</span>
            </div>
            <p className="text-xs text-[#94A3B8] mb-1"><strong className="text-[#E2E8F0]">Role:</strong> {active.role}</p>
            <p className="text-xs text-[#94A3B8]"><strong className="text-[#E2E8F0]">24/8 Relevance:</strong> {active.relevance}</p>
          </div>
        )}
      </div>

      <p className="text-[10px] text-[#64748B] font-mono mt-2">Click a band to explore</p>
    </div>
  )
}
