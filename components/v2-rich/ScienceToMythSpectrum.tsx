"use client"

// PARKED TEMPLATE — not currently mounted on any page.
//
// Rich "Science → Engineered Art" interactive spectrum ported from
// wearehomeric-collab/anthem-research @ claude/anthem-orange-sBtvP
// at components/scrollytelling/science-to-myth-spectrum.tsx.
//
// 9 data points arrayed along a left-to-right gradient bar, categorized
// as "Bulletproof Science" / "Engineering" / "Engineered Art". Clicking
// any point reveals an evidence card with the claim's supporting
// research. Great for the "Whole Story" narrative — everything 24/8
// Anthems does sits somewhere on this spectrum.
//
// HOW TO MOUNT:
//   import { ScienceToMythSpectrum } from "@/components/v2-rich/ScienceToMythSpectrum"
//   <ScienceToMythSpectrum />
//
// Uses the charcoal / cream / orange / terra-cotta tokens from
// app/globals.css @theme inline.

import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Beaker, Sparkles, Wrench } from "lucide-react"

interface DataPoint {
  id: string
  label: string
  position: number
  category: "science" | "engineering" | "art"
  title: string
  description: string
  evidence: string[]
}

const spectrumData: DataPoint[] = [
  {
    id: "motor-timing",
    label: "Motor Timing",
    position: 8,
    category: "science",
    title: "Motor Timing Consistency",
    description:
      "Cerebellar entrainment to external rhythmic cues is well-documented in neuroscience. The cerebellum acts as the brain's timing center, coordinating movement patterns.",
    evidence: [
      "Peer-reviewed studies confirm cerebellum-mediated motor timing",
      "External auditory cues demonstrably improve movement consistency",
      "fMRI studies show cerebellar activation during rhythmic tasks",
    ],
  },
  {
    id: "brainwave",
    label: "Brainwave Entrainment",
    position: 18,
    category: "science",
    title: "Auditory-Driven Neural Synchronization",
    description:
      "The brain's oscillatory patterns can synchronize to external rhythmic stimuli — a phenomenon called entrainment. This is foundational neuroscience.",
    evidence: [
      "EEG studies confirm neural oscillations sync to auditory beats",
      "10-40 Hz range shows strongest entrainment effects",
      "Cross-modal binding improves with rhythmic stimulation",
    ],
  },
  {
    id: "dopamine",
    label: "Dopamine Release",
    position: 28,
    category: "science",
    title: "Predictive Reward Circuits",
    description:
      "Predictable rhythmic patterns activate the mesolimbic dopamine system. Anticipation — not just pleasure — drives neurochemical reward.",
    evidence: [
      "fMRI shows VTA activation with predictable musical patterns",
      "+48% positive affect documented in rhythm-based interventions",
      "Dopamine release precedes expected beats (anticipatory)",
    ],
  },
  {
    id: "ratio",
    label: "3:1 Ratio",
    position: 38,
    category: "science",
    title: "Biomechanical Optimum",
    description:
      "High-speed analysis of professional golfers consistently reveals a ~3:1 backswing-to-downswing timing ratio. This is measurable, repeatable data.",
    evidence: [
      "Tour pros average 21-24 frames backswing, 7-8 frames downswing",
      "Biomechanical studies across thousands of professional swings",
      "Deviation from 3:1 correlates with inconsistency",
    ],
  },
  {
    id: "bpm",
    label: "112 BPM",
    position: 50,
    category: "engineering",
    title: "The Chosen Tempo",
    description:
      "112 BPM is selected to balance pro tempo ranges with musical groove. It sits in the sweet spot where athletic timing meets musical entrainment.",
    evidence: [
      "Calculated to align with pro swing durations",
      "Within auditory entrainment optimal range",
      "Produces integer frame counts at standard video rates",
    ],
  },
  {
    id: "spatial",
    label: "Spatial Audio",
    position: 60,
    category: "engineering",
    title: "Stereo Positioning Design",
    description:
      "Spatial audio cues force the brain to track position, timing, and sequence — adding a dimensional layer to the timing scaffold.",
    evidence: [
      "L/R panning creates spatial awareness demands",
      "Multi-channel processing engages broader neural networks",
      "Enhances attention through positional novelty",
    ],
  },
  {
    id: "micro-ticks",
    label: "448 Micro-ticks",
    position: 72,
    category: "art",
    title: "Poetic Precision",
    description:
      "112 BPM × 4 beats = 448 subdivisions per measure. While mathematically real, the 'micro-tick' framing adds psychological weight to precision.",
    evidence: [
      "Mathematical calculation is accurate",
      "Resolution benefit is theoretical for gross motor skills",
      "Framing enhances perceived sophistication",
    ],
  },
  {
    id: "anchors",
    label: "Cognitive Anchors",
    position: 82,
    category: "art",
    title: "Call-and-Response Reinforcement",
    description:
      "Lyrical hooks and verbal cues serve as procedural memory anchors — encoding movement patterns into long-term storage through ritual.",
    evidence: [
      "Memory palaces and mnemonics are established techniques",
      "Verbal encoding strengthens motor memory consolidation",
      "Ritual repetition builds automaticity",
    ],
  },
  {
    id: "anthem",
    label: "Anthem Framing",
    position: 92,
    category: "art",
    title: "Belief Amplification",
    description:
      "The 'Anthem' branding transforms audio into identity — creating emotional investment that amplifies physiological effects through belief.",
    evidence: [
      "Placebo effects produce measurable physiological changes",
      "Ritual reduces pre-performance anxiety",
      "Identity framing increases adherence and engagement",
    ],
  },
]

const categoryConfig = {
  science: {
    color: "#F59E0B",
    label: "Bulletproof Science",
    icon: Beaker,
    borderClass: "border-l-orange",
    bgClass: "bg-orange/10",
    textClass: "text-orange",
  },
  engineering: {
    color: "#B45309",
    label: "Engineering",
    icon: Wrench,
    borderClass: "border-l-orange-dark",
    bgClass: "bg-orange-dark/10",
    textClass: "text-orange-dark",
  },
  art: {
    color: "#EA580C",
    label: "Engineered Art",
    icon: Sparkles,
    borderClass: "border-l-terra-cotta",
    bgClass: "bg-terra-cotta/10",
    textClass: "text-terra-cotta",
  },
}

export function ScienceToMythSpectrum() {
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null)
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const selectedData = spectrumData.find((p) => p.id === selectedPoint)

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-charcoal-light bg-charcoal p-6 sm:p-8"
    >
      <div className="mb-2 font-mono text-xs uppercase tracking-[0.15em] text-orange">
        Interactive Spectrum
      </div>
      <h3 className="mb-6 font-sans text-xl font-semibold text-cream-light sm:text-2xl">
        Science to Myth Spectrum
      </h3>

      <div className="mb-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
        {Object.entries(categoryConfig).map(([key, config]) => {
          const Icon = config.icon
          return (
            <div key={key} className="flex items-center gap-2">
              <div
                className="flex h-6 w-6 items-center justify-center rounded-full"
                style={{ backgroundColor: `${config.color}20` }}
              >
                <Icon className="h-3 w-3" style={{ color: config.color }} />
              </div>
              <span className="font-mono text-xs text-cream-dark">{config.label}</span>
            </div>
          )
        })}
      </div>

      <div className="relative mx-auto mb-6 max-w-4xl">
        <div
          className={cn(
            "relative h-3 overflow-hidden rounded-full transition-all duration-700",
            isVisible ? "opacity-100" : "opacity-0",
          )}
          style={{
            background: "linear-gradient(90deg, #F59E0B 0%, #B45309 50%, #EA580C 100%)",
          }}
        >
          <div
            className={cn(
              "absolute inset-0 transition-transform duration-1000",
              isVisible ? "translate-x-full" : "-translate-x-full",
            )}
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
            }}
          />
        </div>

        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2">
          {spectrumData.map((point, index) => {
            const config = categoryConfig[point.category]
            const isSelected = selectedPoint === point.id
            const isHovered = hoveredPoint === point.id

            return (
              <button
                key={point.id}
                type="button"
                onClick={() => setSelectedPoint(isSelected ? null : point.id)}
                onMouseEnter={() => setHoveredPoint(point.id)}
                onMouseLeave={() => setHoveredPoint(null)}
                className={cn(
                  "group absolute z-10 flex -translate-x-1/2 flex-col items-center transition-all duration-300",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                )}
                style={{
                  left: `${point.position}%`,
                  transitionDelay: `${index * 80}ms`,
                }}
                aria-expanded={isSelected}
                aria-label={`${point.label}: ${config.label}`}
              >
                <div
                  className={cn(
                    "relative flex h-7 w-7 items-center justify-center rounded-full border-2 transition-all duration-300 sm:h-8 sm:w-8",
                    isSelected || isHovered ? "scale-125 shadow-lg" : "hover:scale-110",
                  )}
                  style={{
                    backgroundColor: isSelected || isHovered ? config.color : "#1a1a1a",
                    borderColor: config.color,
                    boxShadow: isSelected || isHovered ? `0 0 20px ${config.color}60` : "none",
                  }}
                >
                  <div
                    className={cn(
                      "h-2 w-2 rounded-full transition-all duration-300",
                      isSelected || isHovered ? "bg-black" : "",
                    )}
                    style={{
                      backgroundColor: isSelected || isHovered ? "#1a1a1a" : config.color,
                    }}
                  />

                  {isSelected && (
                    <div
                      className="absolute inset-0 animate-ping rounded-full opacity-30"
                      style={{ backgroundColor: config.color }}
                    />
                  )}
                </div>

                <div
                  className={cn(
                    "absolute top-10 whitespace-nowrap rounded-md px-2 py-1 font-mono text-xs transition-all duration-300 sm:top-11",
                    isSelected || isHovered
                      ? "translate-y-0 opacity-100"
                      : "pointer-events-none translate-y-1 opacity-0",
                  )}
                  style={{
                    backgroundColor: `${config.color}20`,
                    color: config.color,
                  }}
                >
                  {point.label}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      <div className="mx-auto mb-8 flex max-w-4xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Beaker className="h-4 w-4 text-orange" />
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange">
            Bulletproof Science
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-terra-cotta">
            Engineered Art
          </span>
          <Sparkles className="h-4 w-4 text-terra-cotta" />
        </div>
      </div>

      <div
        className={cn(
          "mx-auto mb-4 flex max-w-md items-center justify-center gap-2 text-center transition-all duration-500",
          selectedPoint ? "h-0 opacity-0" : "h-auto opacity-100",
        )}
      >
        <ChevronDown className="h-4 w-4 animate-bounce text-cream-dark/60" />
        <span className="font-mono text-xs italic text-cream-dark/60">
          Click any point to explore evidence
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce text-cream-dark/60" />
      </div>

      <div
        className={cn(
          "mx-auto max-w-3xl overflow-hidden transition-all duration-500",
          selectedPoint ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {selectedData && (
          <div
            className={cn(
              "rounded-xl border-l-4 bg-black/50 p-6 backdrop-blur-sm",
              categoryConfig[selectedData.category].borderClass,
            )}
          >
            <div className="mb-4 flex items-start justify-between gap-4">
              <div>
                <div
                  className={cn(
                    "mb-2 inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-xs uppercase tracking-wider",
                    categoryConfig[selectedData.category].bgClass,
                    categoryConfig[selectedData.category].textClass,
                  )}
                >
                  {(() => {
                    const Icon = categoryConfig[selectedData.category].icon
                    return <Icon className="h-3 w-3" />
                  })()}
                  {categoryConfig[selectedData.category].label}
                </div>
                <h4 className="font-sans text-xl font-bold text-cream-light">
                  {selectedData.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setSelectedPoint(null)}
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-charcoal-light text-cream-dark transition-colors hover:bg-charcoal-lighter hover:text-cream-light"
                aria-label="Close"
              >
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>

            <p className="mb-5 leading-relaxed text-cream-dark">{selectedData.description}</p>

            <div>
              <h5 className="mb-3 font-mono text-xs uppercase tracking-wider text-cream-dark/80">
                Supporting Evidence
              </h5>
              <ul className="space-y-2">
                {selectedData.evidence.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-cream-dark"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{
                        backgroundColor: categoryConfig[selectedData.category].color,
                      }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-orange/40" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-terra-cotta/40" />
    </div>
  )
}
