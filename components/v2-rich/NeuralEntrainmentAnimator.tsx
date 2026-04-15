"use client"

// PARKED TEMPLATE — not currently mounted on any page.
//
// Rich canvas-based neural entrainment animator ported from
// wearehomeric-collab/anthem-research @ claude/anthem-orange-sBtvP
// at components/scrollytelling/neural-entrainment-animator.tsx.
//
// 48 simulated neurons on a connected mesh. When the section scrolls
// into the viewport, neurons gradually synchronize their firing
// phase from chaos → 40Hz gamma lock, with a bottom sync progress
// bar and a "CHAOTIC / ENTRAINING / SYNCHRONIZED" status badge.
//
// This is the 13KB "orange" version from the alt branch — much richer
// than the 4.6KB version currently at components/scrollytelling/
// NeuralEntrainmentAnimator.tsx (which is used by V1 and stays
// untouched). Both can coexist because their paths and export names
// are identical but imported from different folders.
//
// HOW TO MOUNT:
//   import { NeuralEntrainmentAnimator } from "@/components/v2-rich/NeuralEntrainmentAnimator"
//   <NeuralEntrainmentAnimator className="..." />
//
// Palette: uses the bg-charcoal / text-cream / text-orange tokens
// already defined in app/globals.css @theme inline (added for the
// BrainwaveFrequencyChart + SpatialAudioWaveform port).

import { useEffect, useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

interface NeuralEntrainmentAnimatorProps {
  className?: string
}

interface Neuron {
  x: number
  y: number
  phase: number
  frequency: number
  baseFrequency: number
  radius: number
  connections: number[]
}

const NEURON_COUNT = 48
const TARGET_FREQUENCY = 40 // 40Hz gamma frequency
const CONNECTION_DISTANCE = 120

export function NeuralEntrainmentAnimator({ className }: NeuralEntrainmentAnimatorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const neuronsRef = useRef<Neuron[]>([])
  const [synchronization, setSynchronization] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const lastTimeRef = useRef(0)
  const pulsePhaseRef = useRef(0)

  const initializeNeurons = useCallback((width: number, height: number) => {
    const neurons: Neuron[] = []
    const padding = 40

    for (let i = 0; i < NEURON_COUNT; i++) {
      const x = padding + Math.random() * (width - padding * 2)
      const y = padding + Math.random() * (height - padding * 2)
      const baseFrequency = 5 + Math.random() * 60

      neurons.push({
        x,
        y,
        phase: Math.random() * Math.PI * 2,
        frequency: baseFrequency,
        baseFrequency,
        radius: 3 + Math.random() * 2,
        connections: [],
      })
    }

    for (let i = 0; i < neurons.length; i++) {
      for (let j = i + 1; j < neurons.length; j++) {
        const dx = neurons[i].x - neurons[j].x
        const dy = neurons[i].y - neurons[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < CONNECTION_DISTANCE) {
          neurons[i].connections.push(j)
          neurons[j].connections.push(i)
        }
      }
    }

    neuronsRef.current = neurons
  }, [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const ratio = entry.intersectionRatio
            setIsVisible(true)
            if (ratio > 0.4) {
              const rect = entry.boundingClientRect
              const viewportHeight = window.innerHeight
              const elementCenter = rect.top + rect.height / 2
              const viewportCenter = viewportHeight / 2
              const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
              const maxDistance = viewportHeight / 2
              const centeredness = 1 - Math.min(distanceFromCenter / maxDistance, 1)

              setSynchronization(Math.pow(centeredness, 0.5) * Math.min(ratio * 2, 1))
            }
          } else {
            setIsVisible(false)
            setSynchronization(0)
          }
        })
      },
      {
        threshold: Array.from({ length: 20 }, (_, i) => i / 20),
        rootMargin: "-10% 0px",
      },
    )

    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      ctx.scale(dpr, dpr)

      initializeNeurons(rect.width, rect.height)
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp
      const deltaTime = (timestamp - lastTimeRef.current) / 1000
      lastTimeRef.current = timestamp

      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      ctx.clearRect(0, 0, rect.width, rect.height)

      const neurons = neuronsRef.current
      const sync = synchronization

      pulsePhaseRef.current += deltaTime * TARGET_FREQUENCY * Math.PI * 2
      const globalPulse = Math.sin(pulsePhaseRef.current)
      const globalPulseNormalized = (globalPulse + 1) / 2

      neurons.forEach((neuron) => {
        neuron.frequency = neuron.baseFrequency + (TARGET_FREQUENCY - neuron.baseFrequency) * sync
        neuron.phase += deltaTime * neuron.frequency * Math.PI * 2

        if (sync > 0.1) {
          const phaseDiff = pulsePhaseRef.current - neuron.phase
          neuron.phase += phaseDiff * sync * deltaTime * 3
        }
      })

      ctx.lineWidth = 1
      neurons.forEach((neuron, i) => {
        neuron.connections.forEach((j) => {
          if (j > i) {
            const other = neurons[j]
            const dx = other.x - neuron.x
            const dy = other.y - neuron.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            const phaseSimilarity = sync > 0.5 ? (Math.cos(neuron.phase - other.phase) + 1) / 2 : 0.3

            const alpha = sync > 0.5 ? 0.1 + phaseSimilarity * 0.4 * sync : 0.15 * (1 - sync) + 0.1

            const distanceAlpha = 1 - distance / CONNECTION_DISTANCE

            const r = Math.round(100 + (245 - 100) * sync * phaseSimilarity)
            const g = Math.round(100 + (158 - 100) * sync * phaseSimilarity)
            const b = Math.round(100 + (11 - 100) * sync * phaseSimilarity)

            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha * distanceAlpha})`
            ctx.beginPath()
            ctx.moveTo(neuron.x, neuron.y)
            ctx.lineTo(other.x, other.y)
            ctx.stroke()
          }
        })
      })

      neurons.forEach((neuron) => {
        const neuronPulse = Math.sin(neuron.phase)
        const pulseNormalized = (neuronPulse + 1) / 2

        const baseRadius = neuron.radius
        const pulseRadius = baseRadius + pulseNormalized * 2 * (0.3 + sync * 0.7)

        const brightness = 0.4 + pulseNormalized * 0.6
        const r = Math.round((120 + (245 - 120) * sync) * brightness)
        const g = Math.round((120 + (158 - 120) * sync) * brightness)
        const b = Math.round((120 + (11 - 120) * sync) * brightness)

        if (sync > 0.3) {
          const glowRadius = pulseRadius * 3
          const gradient = ctx.createRadialGradient(
            neuron.x,
            neuron.y,
            pulseRadius,
            neuron.x,
            neuron.y,
            glowRadius,
          )
          gradient.addColorStop(0, `rgba(245, 158, 11, ${0.3 * sync * pulseNormalized})`)
          gradient.addColorStop(1, "rgba(245, 158, 11, 0)")
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(neuron.x, neuron.y, glowRadius, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, pulseRadius, 0, Math.PI * 2)
        ctx.fill()
      })

      if (sync > 0.2) {
        const indicatorSize = 60
        const indicatorX = rect.width - indicatorSize - 20
        const indicatorY = rect.height - indicatorSize - 20

        const ringSize = indicatorSize / 2 + globalPulseNormalized * 8 * sync
        const ringAlpha = 0.3 + globalPulseNormalized * 0.5 * sync

        ctx.strokeStyle = `rgba(245, 158, 11, ${ringAlpha})`
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.arc(indicatorX + indicatorSize / 2, indicatorY + indicatorSize / 2, ringSize, 0, Math.PI * 2)
        ctx.stroke()

        ctx.fillStyle = `rgba(245, 158, 11, ${0.6 + globalPulseNormalized * 0.4})`
        ctx.beginPath()
        ctx.arc(
          indicatorX + indicatorSize / 2,
          indicatorY + indicatorSize / 2,
          6 + globalPulseNormalized * 2,
          0,
          Math.PI * 2,
        )
        ctx.fill()

        ctx.fillStyle = `rgba(232, 220, 196, ${0.7 * sync})`
        ctx.font = "bold 12px 'JetBrains Mono', monospace"
        ctx.textAlign = "center"
        ctx.fillText("40Hz", indicatorX + indicatorSize / 2, indicatorY + indicatorSize + 16)
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    if (isVisible) {
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [synchronization, isVisible, initializeNeurons])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-orange/30 bg-charcoal",
        className,
      )}
      style={{ minHeight: "360px" }}
    >
      <div className="absolute top-0 left-0 z-10 p-6">
        <div className="mb-1 font-mono text-xs uppercase tracking-[0.15em] text-orange">
          Interactive Visualization
        </div>
        <div className="font-sans text-lg font-semibold text-cream-light">
          Neural Entrainment
        </div>
      </div>

      <div className="absolute top-6 right-6 z-10 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full transition-colors duration-300"
            style={{
              backgroundColor: synchronization > 0.5 ? "#F59E0B" : "#787878",
              boxShadow: synchronization > 0.5 ? "0 0 8px #F59E0B" : "none",
            }}
          />
          <span className="font-mono text-xs text-cream-dark">
            {synchronization > 0.7 ? "SYNCHRONIZED" : synchronization > 0.3 ? "ENTRAINING" : "CHAOTIC"}
          </span>
        </div>
      </div>

      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#787878]" />
            <span className="font-mono text-xs text-cream-dark/70">Desynchronized</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="h-3 w-3 rounded-full bg-orange"
              style={{ boxShadow: "0 0 6px #F59E0B" }}
            />
            <span className="font-mono text-xs text-cream-dark/70">Entrained</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-cream-dark/70">Sync</span>
          <div className="h-1.5 w-24 overflow-hidden rounded-full bg-charcoal-light">
            <div
              className="h-full rounded-full bg-orange transition-all duration-300"
              style={{
                width: `${synchronization * 100}%`,
                boxShadow: synchronization > 0.5 ? "0 0 8px #F59E0B" : "none",
              }}
            />
          </div>
          <span className="w-10 font-mono text-xs text-orange">
            {Math.round(synchronization * 100)}%
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute top-0 left-0 h-8 w-8 border-t-2 border-l-2 border-orange/50" />
      <div className="pointer-events-none absolute right-0 bottom-0 h-8 w-8 border-r-2 border-b-2 border-orange/50" />

      {!isVisible && (
        <div className="absolute inset-0 flex items-center justify-center bg-charcoal/80">
          <p className="font-mono text-sm text-cream-dark/60">
            Scroll to activate neural entrainment
          </p>
        </div>
      )}
    </div>
  )
}
