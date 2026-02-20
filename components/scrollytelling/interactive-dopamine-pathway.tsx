'use client'

import React from "react"

import { useEffect, useRef, useState } from 'react'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip'

interface PathwayNode {
  id: string
  name: string
  x: number
  y: number
  info: string
}

const BPM = 112
const BEAT_INTERVAL = (60 / BPM) * 1000 // milliseconds per beat

export function InteractiveDopaminePathway() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>()
  const lastBeatRef = useRef<number>(0)
  const [currentPulse, setCurrentPulse] = useState(0)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  // Define the pathway nodes
  const nodes: PathwayNode[] = [
    {
      id: 'vta',
      name: 'VTA',
      x: 0.15,
      y: 0.6,
      info: 'Ventral Tegmental Area: Origin of dopamine neurons. Fires in response to predictable reward cues.',
    },
    {
      id: 'striatum',
      name: 'Striatum',
      x: 0.5,
      y: 0.5,
      info: 'Striatum (Nucleus Accumbens): Processes reward prediction and motor sequencing. Critical for habit formation.',
    },
    {
      id: 'pfc',
      name: 'PFC',
      x: 0.85,
      y: 0.4,
      info: 'Prefrontal Cortex: Integrates reward signals with executive control and decision-making.',
    },
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size with device pixel ratio for sharp rendering
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    const width = rect.width
    const height = rect.height

    let pulsePosition = 0 // 0 to 3 (representing progress through pathway)

    const drawBrain = () => {
      // Clear canvas
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, width, height)

      // Draw brain outline (simplified)
      ctx.strokeStyle = '#2d2d2d'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.ellipse(width / 2, height / 2, width * 0.4, height * 0.35, 0, 0, Math.PI * 2)
      ctx.stroke()

      // Draw pathway connections
      ctx.strokeStyle = '#3d3d3d'
      ctx.lineWidth = 3
      ctx.setLineDash([5, 5])

      for (let i = 0; i < nodes.length - 1; i++) {
        const from = nodes[i]
        const to = nodes[i + 1]
        
        ctx.beginPath()
        ctx.moveTo(from.x * width, from.y * height)
        
        // Curved path
        const cpX = (from.x + to.x) / 2 * width
        const cpY = ((from.y + to.y) / 2 - 0.1) * height
        ctx.quadraticCurveTo(cpX, cpY, to.x * width, to.y * height)
        ctx.stroke()
      }

      ctx.setLineDash([])

      // Draw animated pulses along the pathway
      const currentTime = Date.now()
      const timeSinceLastBeat = currentTime - lastBeatRef.current

      if (timeSinceLastBeat >= BEAT_INTERVAL) {
        lastBeatRef.current = currentTime
        setCurrentPulse((prev) => (prev + 1) % 4)
      }

      // Calculate pulse position (0-3, with decimals for smooth animation)
      pulsePosition = (timeSinceLastBeat / BEAT_INTERVAL) * 3

      // Draw pulses at different stages
      for (let i = 0; i < 3; i++) {
        const pulseOffset = (currentPulse - i + 4) % 4
        if (pulseOffset < 3) {
          drawPulse(ctx, pulseOffset - (3 - pulsePosition), width, height, 0.8 - i * 0.25)
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const isHovered = hoveredNode === node.id
        
        // Glow effect for hovered nodes
        if (isHovered) {
          ctx.shadowBlur = 20
          ctx.shadowColor = '#ff6b35'
        } else {
          ctx.shadowBlur = 10
          ctx.shadowColor = '#ff6b35'
        }

        // Node circle
        ctx.fillStyle = isHovered ? '#ff6b35' : '#e07a5f'
        ctx.beginPath()
        ctx.arc(node.x * width, node.y * height, isHovered ? 18 : 14, 0, Math.PI * 2)
        ctx.fill()

        // Reset shadow
        ctx.shadowBlur = 0

        // Node label
        ctx.fillStyle = '#faf8f3'
        ctx.font = `bold ${isHovered ? 14 : 12}px 'JetBrains Mono', monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText(node.name, node.x * width, node.y * height)
      })
    }

    const drawPulse = (
      ctx: CanvasRenderingContext2D,
      position: number,
      width: number,
      height: number,
      opacity: number
    ) => {
      if (position < 0 || position > 3) return

      let x, y

      if (position < 1) {
        // VTA to Striatum
        const t = position
        const from = nodes[0]
        const to = nodes[1]
        const cpX = (from.x + to.x) / 2
        const cpY = (from.y + to.y) / 2 - 0.1
        
        x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cpX + t * t * to.x
        y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cpY + t * t * to.y
      } else if (position < 2) {
        // Striatum to PFC
        const t = position - 1
        const from = nodes[1]
        const to = nodes[2]
        const cpX = (from.x + to.x) / 2
        const cpY = (from.y + to.y) / 2 - 0.1
        
        x = (1 - t) * (1 - t) * from.x + 2 * (1 - t) * t * cpX + t * t * to.x
        y = (1 - t) * (1 - t) * from.y + 2 * (1 - t) * t * cpY + t * t * to.y
      } else {
        // Beyond PFC (fade out)
        const t = position - 2
        const node = nodes[2]
        x = node.x + t * 0.1
        y = node.y
        opacity *= Math.max(0, 1 - t)
      }

      // Draw pulse with glow
      ctx.shadowBlur = 25
      ctx.shadowColor = `rgba(255, 107, 53, ${opacity})`
      
      const gradient = ctx.createRadialGradient(
        x * width, y * height, 0,
        x * width, y * height, 12
      )
      gradient.addColorStop(0, `rgba(255, 107, 53, ${opacity})`)
      gradient.addColorStop(0.5, `rgba(255, 107, 53, ${opacity * 0.5})`)
      gradient.addColorStop(1, `rgba(255, 107, 53, 0)`)
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(x * width, y * height, 12, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.shadowBlur = 0
    }

    const animate = () => {
      drawBrain()
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [hoveredNode])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    // Check if mouse is over any node
    let found = false
    for (const node of nodes) {
      const distance = Math.sqrt(
        Math.pow((x - node.x) * rect.width, 2) +
        Math.pow((y - node.y) * rect.height, 2)
      )
      
      if (distance < 20) {
        setHoveredNode(node.id)
        found = true
        break
      }
    }

    if (!found) {
      setHoveredNode(null)
    }
  }

  const handleMouseLeave = () => {
    setHoveredNode(null)
  }

  return (
    <div className="relative">
      {/* Header */}
      <div className="mb-4">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-orange-dark">
          Neural Pathway Visualization
        </p>
        <h3 className="mt-1 font-sans text-lg font-bold text-cream-light">
          Mesolimbic Dopamine Pathway
        </h3>
        <p className="mt-2 text-sm text-cream-dark">
          Pulses synced to 112 BPM show dopamine release triggered by predictable rhythm.
          Hover over nodes for details.
        </p>
      </div>

      {/* Canvas */}
      <div className="relative overflow-hidden rounded-xl border border-charcoal-light bg-charcoal">
        <canvas
          ref={canvasRef}
          className="h-[380px] w-full cursor-pointer"
          style={{ display: 'block' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        />

        {/* Overlay tooltips for nodes */}
        <TooltipProvider>
          <div className="pointer-events-none absolute inset-0">
            {nodes.map((node) => {
              const canvas = canvasRef.current
              if (!canvas) return null

              const rect = canvas.getBoundingClientRect()
              const left = node.x * 100
              const top = node.y * 100

              return (
                <div
                  key={node.id}
                  className="absolute"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  <Tooltip open={hoveredNode === node.id}>
                    <TooltipTrigger asChild>
                      <div className="pointer-events-auto h-10 w-10" />
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="max-w-xs border-orange-dark/50 bg-charcoal text-cream-light"
                    >
                      <p className="mb-1 font-mono text-xs font-bold text-orange-dark">
                        {node.name}
                      </p>
                      <p className="text-xs leading-relaxed">{node.info}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              )
            })}
          </div>
        </TooltipProvider>
      </div>

      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-orange shadow-[0_0_10px_rgba(255,107,53,0.6)]" />
          <span className="font-mono text-xs text-cream-dark">Dopamine Pulse</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-terra-cotta" />
          <span className="font-mono text-xs text-cream-dark">Neural Node</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-orange-dark">112 BPM</span>
          <span className="font-mono text-xs text-cream-dark">Synchronized</span>
        </div>
      </div>
    </div>
  )
}
