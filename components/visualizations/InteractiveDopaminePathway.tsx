'use client'

import React, { useState } from 'react'
import { cn } from '@/lib/utils'

const pathwayStages = [
  {
    id: 'vta',
    label: 'VTA',
    fullName: 'Ventral Tegmental Area',
    description: 'Origin of dopamine neurons. Rhythmic auditory stimulation at 112 BPM activates reward prediction circuits here.',
    color: '#6366F1',
    x: 10,
    y: 50,
  },
  {
    id: 'nac',
    label: 'NAc',
    fullName: 'Nucleus Accumbens',
    description: 'Reward processing hub. Predictable beat patterns trigger anticipatory dopamine release before the downswing cue.',
    color: '#3B82F6',
    x: 35,
    y: 30,
  },
  {
    id: 'pfc',
    label: 'PFC',
    fullName: 'Prefrontal Cortex',
    description: 'Executive control. Dopamine reduces interference here — less overthinking, more automatic execution.',
    color: '#06B6D4',
    x: 60,
    y: 50,
  },
  {
    id: 'bg',
    label: 'BG',
    fullName: 'Basal Ganglia',
    description: 'Motor automation center. Dopamine + rhythm = automated motor programs. Your swing becomes procedural memory.',
    color: '#F59E0B',
    x: 85,
    y: 30,
  },
]

export function InteractiveDopaminePathway() {
  const [activeStage, setActiveStage] = useState<string | null>(null)
  const active = pathwayStages.find((s) => s.id === activeStage)

  return (
    <div className="bg-[#0C1220] border border-[#1E3A5F] p-6 space-y-4">
      <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider">
        Interactive Dopamine Pathway
      </div>
      <p className="text-xs text-[#94A3B8]">Click each node to explore how 112 BPM drives the reward circuit.</p>

      {/* Pathway visualization */}
      <div className="relative h-40 md:h-48">
        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366F1" stopOpacity="0.6" />
              <stop offset="33%" stopColor="#3B82F6" stopOpacity="0.6" />
              <stop offset="66%" stopColor="#06B6D4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
            </linearGradient>
          </defs>
          <path
            d="M 10 50 C 20 30, 25 30, 35 30 C 45 30, 50 50, 60 50 C 70 50, 75 30, 85 30"
            fill="none"
            stroke="url(#pathGrad)"
            strokeWidth="0.5"
            strokeDasharray="2,2"
          />
        </svg>

        {/* Nodes */}
        {pathwayStages.map((stage) => (
          <button
            key={stage.id}
            onClick={() => setActiveStage(activeStage === stage.id ? null : stage.id)}
            className={cn(
              'absolute w-14 h-14 md:w-16 md:h-16 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 flex flex-col items-center justify-center transition-all duration-300 cursor-pointer',
              activeStage === stage.id
                ? 'scale-110 shadow-lg shadow-current/30'
                : 'hover:scale-105',
            )}
            style={{
              left: `${stage.x}%`,
              top: `${stage.y}%`,
              borderColor: stage.color,
              backgroundColor: activeStage === stage.id ? `${stage.color}20` : '#0C1220',
              boxShadow: activeStage === stage.id ? `0 0 20px ${stage.color}40` : undefined,
            }}
          >
            <span className="font-mono text-xs font-bold" style={{ color: stage.color }}>
              {stage.label}
            </span>
          </button>
        ))}
      </div>

      {/* Detail panel */}
      <div
        className={cn(
          'overflow-hidden transition-all duration-300',
          active ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        {active && (
          <div className="border-t border-[#1E3A5F] pt-4 mt-2">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: active.color }} />
              <span className="font-mono text-sm font-bold text-white">{active.fullName}</span>
              <span className="font-mono text-xs text-[#94A3B8]">({active.label})</span>
            </div>
            <p className="text-sm text-[#E2E8F0] leading-relaxed">{active.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
