'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

const spectrumItems = [
  { position: 5, label: '3:1 Ratio', category: 'science', desc: 'Measurable biomechanical fact verified in professional golf swing analysis.' },
  { position: 15, label: 'Motor Timing', category: 'science', desc: 'Basal ganglia and cerebellum automate rhythmic movements — Neuroscience 101.' },
  { position: 25, label: 'Brainwave Entrainment', category: 'science', desc: 'Documented: external rhythmic cues synchronize neural oscillations.' },
  { position: 35, label: 'Dopamine-Anticipation', category: 'science', desc: 'Basic neurobiology: predictable reward triggers dopamine release.' },
  { position: 48, label: 'Music → Performance', category: 'blend', desc: 'Strong evidence that music aids physical performance, though mechanisms debated.' },
  { position: 58, label: 'Spatial Audio Mapping', category: 'blend', desc: 'Audio engineering informed by music cognition — smart design, not pure science.' },
  { position: 70, label: '448 Micro-Ticks', category: 'engineering', desc: 'Precision marketing meets microtiming research. A branded frame, not a constant.' },
  { position: 80, label: 'Call-and-Response', category: 'engineering', desc: 'Procedural memory hooks — smart engineering packaged as proprietary tech.' },
  { position: 92, label: 'The "Anthem" Identity', category: 'myth', desc: 'Pure identity mythology. Works because myths create belonging and ritual.' },
]

export function ScienceToMythSpectrum() {
  const [activeItem, setActiveItem] = useState<number | null>(null)
  const item = activeItem !== null ? spectrumItems[activeItem] : null

  const categoryColors: Record<string, string> = {
    science: '#10B981',
    blend: '#3B82F6',
    engineering: '#F59E0B',
    myth: '#F97316',
  }

  return (
    <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 space-y-6">
      <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider">
        Science-to-Myth Spectrum
      </div>

      {/* Gradient spectrum bar */}
      <div className="relative">
        <div className="h-3 rounded-full bg-gradient-to-r from-[#10B981] via-[#3B82F6] via-[#F59E0B] to-[#F97316]" />

        {/* Labels */}
        <div className="flex justify-between mt-2">
          <span className="text-[10px] text-[#10B981] font-mono font-bold">HARD SCIENCE</span>
          <span className="text-[10px] text-[#3B82F6] font-mono">APPLIED</span>
          <span className="text-[10px] text-[#F59E0B] font-mono">ENGINEERING</span>
          <span className="text-[10px] text-[#F97316] font-mono font-bold">MYTH</span>
        </div>

        {/* Dot markers */}
        <div className="relative h-8 mt-4">
          {spectrumItems.map((si, i) => (
            <button
              key={i}
              onClick={() => setActiveItem(activeItem === i ? null : i)}
              className={cn(
                'absolute w-4 h-4 rounded-full -translate-x-1/2 transition-all duration-200 cursor-pointer border-2',
                activeItem === i ? 'scale-150 z-10' : 'hover:scale-125',
              )}
              style={{
                left: `${si.position}%`,
                top: '50%',
                transform: `translateX(-50%) translateY(-50%) ${activeItem === i ? 'scale(1.5)' : ''}`,
                backgroundColor: activeItem === i ? categoryColors[si.category] : `${categoryColors[si.category]}80`,
                borderColor: categoryColors[si.category],
              }}
              title={si.label}
            />
          ))}
        </div>
      </div>

      {/* Item list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {spectrumItems.map((si, i) => (
          <button
            key={i}
            onClick={() => setActiveItem(activeItem === i ? null : i)}
            className={cn(
              'text-left px-3 py-2 border transition-all duration-200 cursor-pointer',
              activeItem === i
                ? 'border-current bg-white/5'
                : 'border-[#1E3A5F] hover:border-[#3B82F6]/50',
            )}
            style={{
              borderColor: activeItem === i ? categoryColors[si.category] : undefined,
            }}
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 shrink-0" style={{ backgroundColor: categoryColors[si.category] }} />
              <span className="text-xs text-[#E2E8F0] font-medium">{si.label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Detail */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          item ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        {item && (
          <div className="border-t border-[#1E3A5F] pt-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: categoryColors[item.category] }} />
              <span className="text-sm font-bold text-white">{item.label}</span>
              <span className="text-[10px] font-mono uppercase" style={{ color: categoryColors[item.category] }}>
                {item.category}
              </span>
            </div>
            <p className="text-sm text-[#E2E8F0] leading-relaxed">{item.desc}</p>
          </div>
        )}
      </div>
    </div>
  )
}
