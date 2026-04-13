import Script from "next/script"
import { Section } from "@/components/scrollytelling/Section"
import { Callout, MetricDisplay, PrincipleBox } from "@/components/scrollytelling/Callout"
import { TableOfContents } from "@/components/scrollytelling/TableOfContents"
import { Footer } from "@/components/scrollytelling/Footer"
import { HeroWaveformVisualization } from "@/components/HeroWaveformVisualization"
import { TempoRatioVisualizer } from "@/components/visualizations/TempoRatioVisualizer"
import { BpmTempoComparisonSlider } from "@/components/scrollytelling/BpmTempoComparisonSlider"
import { BrainwaveFrequencyChart } from "@/components/interactive/BrainwaveFrequencyChart"
import { NeuralEntrainmentAnimator } from "@/components/scrollytelling/NeuralEntrainmentAnimator"
import { InteractiveDopaminePathway } from "@/components/visualizations/InteractiveDopaminePathway"
import { SpatialAudioWaveform } from "@/components/scrollytelling/SpatialAudioWaveform"
import { ScienceToMythSpectrum } from "@/components/scrollytelling/ScienceToMythSpectrum"

const tocItems = [
  { id: "listen", number: "♪", label: "Listen: The Masters 2026 Anthems" },
  { id: "product", number: "★", label: "What is a 24/8 Anthem?" },
  { id: "tempo-truth", number: "01", label: "Tempo as Truth: The 3:1 Ratio & 112 BPM Advantage" },
  { id: "brainwave-symphony", number: "02", label: "Brainwave Symphony: Entraining Focus & Peak Performance" },
  { id: "dopamine-drive", number: "03", label: "Dopamine Drive: Fueling Flow & Confidence" },
  { id: "audio-alchemy", number: "04", label: "Audio Alchemy: Spatial Cues & Cognitive Anchors" },
  { id: "beyond-belief", number: "05", label: "Beyond Belief: The Science of Engineered Performance" },
]

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <Section variant="royal" fullHeight className="relative overflow-hidden">
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        
        <div className="relative z-10 flex flex-col justify-center min-h-[calc(100vh-8rem)]">
          {/* Eyebrow */}
          <div className="font-mono text-sm text-[#94A3B8] uppercase tracking-[0.3em] mb-6">
            Neuro-Golf Performance Audio
          </div>
          
          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl text-balance">
            The 24/8 Anthem: Your Brain Doesn&apos;t Negotiate
          </h1>
          
          {/* Subhead */}
          <p className="text-lg md:text-xl text-[#E2E8F0] max-w-2xl mb-8 leading-relaxed">
            This isn&apos;t workout music. This isn&apos;t a motivational podcast. This is{" "}
            <span className="text-[#3B82F6] font-semibold">neuro-golf performance audio</span>—engineered 
            to hijack your motor timing, entrain your brainwaves, and install professional-level 
            tempo into your swing mechanics.
          </p>
          
          {/* Key metrics row */}
          <div className="flex flex-wrap gap-8 mb-12">
            <div className="border-l-2 border-[#3B82F6] pl-4">
              <div className="font-mono text-3xl md:text-4xl font-bold text-white">24</div>
              <div className="text-sm text-[#94A3B8]">Frames Backswing</div>
            </div>
            <div className="border-l-2 border-[#F59E0B] pl-4">
              <div className="font-mono text-3xl md:text-4xl font-bold text-white">8</div>
              <div className="text-sm text-[#94A3B8]">Frames Downswing</div>
            </div>
            <div className="border-l-2 border-[#00F0FF] pl-4">
              <div className="font-mono text-3xl md:text-4xl font-bold text-white">3:1</div>
              <div className="text-sm text-[#94A3B8]">Pro Tempo Ratio</div>
            </div>
            <div className="border-l-2 border-[#10B981] pl-4">
              <div className="font-mono text-3xl md:text-4xl font-bold text-white">112</div>
              <div className="text-sm text-[#94A3B8]">BPM Precision</div>
            </div>
          </div>
          
          {/* Hero waveform visualization */}
          <HeroWaveformVisualization />
        </div>
      </Section>

      {/* Listen: Elfsight playlist embed */}
      <Section id="listen" variant="dark">
        <div className="mb-10 max-w-3xl">
          <div className="font-mono text-sm text-[#3B82F6] uppercase tracking-[0.3em] mb-3">
            Listen · The Masters 2026
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-5 text-balance">
            Hear the Anthems Built for Augusta
          </h2>
          <p className="text-lg text-[#E2E8F0] leading-relaxed">
            Press play. Every track below is a 24/8 Anthem engineered for a specific hole at
            Augusta National — 3:1 tempo ratio locked at 112 BPM, lyrics seeded from the course&apos;s
            real strategy data, mastered for Masters week.
          </p>
        </div>

        <div className="bg-[#0C1220] border border-[#1E3A5F] p-4 md:p-6">
          <Script
            src="https://elfsightcdn.com/platform.js"
            strategy="afterInteractive"
          />
          <div
            className="elfsight-app-6a38b85d-2e93-4765-8a0c-80415ee7b970"
            data-elfsight-app-lazy
          />
        </div>

        <p className="mt-6 text-sm text-[#94A3B8] font-mono">
          Player provided by Elfsight · Streaming enabled on click
        </p>
      </Section>

      {/* Product: What is a 24/8 Anthem? */}
      <Section id="product" variant="default">
        <div className="mb-10">
          <div className="font-mono text-sm text-[#F59E0B] uppercase tracking-wider mb-3">
            The Product
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Your Course. Your Strategy. Your Anthem.
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 mb-16">
          <div className="lg:col-span-3 space-y-6">
            <p className="text-xl text-[#E2E8F0] leading-relaxed">
              A 24/8 Anthem isn&apos;t a playlist. It&apos;s a custom song — written, scored, and produced
              for a specific course, a specific tee box, and a specific player. Every anthem is
              built on real research into the layout, the hazards, and the history of the holes
              you&apos;re about to play.
            </p>
            <p className="text-[#E2E8F0] leading-relaxed">
              Tell us your club yardages, pick your tee box, and choose your strategy —
              <strong className="text-white"> Smart</strong>,{" "}
              <strong className="text-white">Aggressive</strong>,{" "}
              <strong className="text-white">Conservative</strong>, or{" "}
              <strong className="text-white">Risk-Reward</strong>. Our AI pipeline researches the
              course, writes lyrics that call out the shots that matter for your game, and
              generates an original track locked to 112 BPM / 3:1 tempo. The science is on the
              other sections of this page. This is the product.
            </p>

            <PrincipleBox title="ONE COURSE. ONE PLAYER. ONE ANTHEM.">
              Built from the ground up for the round you&apos;re about to play.
            </PrincipleBox>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <MetricDisplay
              value="1 of 1"
              label="Custom Per Round"
              description="Every anthem is generated fresh for your course, tees, and strategy — never a stock track"
              sentiment="good"
            />
            <MetricDisplay
              value="4"
              label="Strategy Types"
              description="Smart · Aggressive · Conservative · Risk-Reward — shapes the lyrics and the vibe"
              sentiment="neutral"
            />
            <MetricDisplay
              value="112"
              label="BPM Locked"
              description="Every track quantized to the 3:1 tempo signature that elite motor control demands"
              sentiment="good"
            />
          </div>
        </div>

        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            Three Things Every 24/8 Anthem Does
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0C1220] border border-[#1E3A5F] p-6">
              <div className="text-[#3B82F6] font-bold mb-2">Personalized</div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Your club yardages decide which hazards matter on every hole — the lyrics call out
                the shots your bag can actually reach.
              </p>
            </div>
            <div className="bg-[#0C1220] border border-[#1E3A5F] p-6">
              <div className="text-[#F59E0B] font-bold mb-2">Course-Specific</div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Deep research into the layout, signature holes, and history of your course — not
                generic &quot;golf pump-up music.&quot;
              </p>
            </div>
            <div className="bg-[#0C1220] border border-[#1E3A5F] p-6">
              <div className="text-[#00F0FF] font-bold mb-2">Strategy-Tuned</div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">
                Pick your play style and the anthem leans into it — attack mode, patient par play,
                or tactical risk-reward.
              </p>
            </div>
          </div>
        </div>

        <Callout variant="insight" className="mt-12">
          <p className="text-lg text-white font-medium">
            <span className="text-[#00F0FF]">THE WORKFLOW:</span> Course research → hole-by-hole
            strategy → lyrics → music generation → quality control → your anthem. All automated,
            all grounded in real data, all locked to the 24/8 tempo signature.
          </p>
        </Callout>
      </Section>

      {/* Executive Summary / Table of Contents */}
      <Section variant="dark">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              The Science of Swing
            </h2>
            <p className="text-[#E2E8F0] mb-4 leading-relaxed">
              The name tells you everything: <strong className="text-white">24 frames backswing, 
              8 frames downswing</strong>. A 3:1 ratio locked at 112 BPM. The exact temporal 
              structure your basal ganglia craves for automated, repeatable movement.
            </p>
            <p className="text-[#94A3B8] leading-relaxed">
              This report breaks down the neuroscience, biomechanics, and audio engineering 
              that makes 24/8 Anthems a new category: performance audio that doesn&apos;t 
              motivate—it <em>entrains</em>.
            </p>
          </div>
          <div>
            <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-4">
              Navigate the System
            </div>
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </Section>

      {/* Section 1: Tempo as Truth */}
      <Section id="tempo-truth" variant="default">
        <div className="mb-8">
          <div className="font-mono text-sm text-[#3B82F6] uppercase tracking-wider mb-2">
            Section 01
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Tempo as Truth: The 3:1 Ratio & 112 BPM Advantage
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              The 3:1 Ratio: Non-Negotiable Motor Control
            </h3>
            <p className="text-[#E2E8F0] leading-relaxed">
              Every elite golfer—from Nick Price to Ernie Els to Jordan Spieth—swings with a 
              backswing-to-downswing ratio around <strong className="text-[#3B82F6]">3:1</strong>. 
              Not because they&apos;re &quot;natural athletes.&quot; Because the human motor system—specifically 
              your basal ganglia and cerebellum—automates rhythm better when timing ratios are consistent.
            </p>
            <p className="text-[#E2E8F0] leading-relaxed">
              Tour pros swing between <strong className="text-white">60-75 BPM</strong> (start to impact). 
              Most amateurs? Under 40 BPM. They&apos;re thinking, not swinging. They&apos;re 
              micromanaging mechanics instead of automating motor programs.
            </p>
            
            <PrincipleBox title="TEMPO AS TRUTH">
              Your cerebellum doesn&apos;t care about your feelings. It cares about timing.
            </PrincipleBox>
            
            {/* 3:1 Ratio Visualization */}
            <TempoRatioVisualizer />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            <MetricDisplay
              value="3:1"
              label="Pro Tempo Ratio"
              description="The universal backswing-to-downswing timing found in elite golfers"
              sentiment="good"
            />
            <MetricDisplay
              value="60-75"
              label="Tour Pro BPM"
              description="Typical professional golf swing tempo range (start to impact)"
              sentiment="neutral"
            />
            <MetricDisplay
              value="<40"
              label="Amateur BPM"
              description="Where most amateur swings land—too slow, too conscious"
              sentiment="warning"
            />
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-6">
            112 BPM: The Math Behind the Tempo
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-[#E2E8F0] leading-relaxed">
                Here&apos;s where it gets precise. <strong className="text-[#F59E0B]">112 BPM at 4 beats 
                per measure = 448 micro-ticks</strong>. That&apos;s the granular timing resolution your 
                brain uses for motor control—millisecond-level temporal precision that separates 
                &quot;good contact&quot; from &quot;flushed iron.&quot;
              </p>
              <p className="text-[#E2E8F0] leading-relaxed">
                The 24/8 structure embeds the 3:1 ratio <em>within</em> 112 BPM, creating a 
                perceptual scaffold. Your cerebellum syncs to the beat. Your basal ganglia 
                automate the pattern. Your prefrontal cortex gets out of the way.
              </p>
              
              <PrincipleBox title="FRAMES, NOT SECONDS">
                Quantized movement. Math meets muscle.
              </PrincipleBox>
            </div>
            <div>
              {/* BPM Comparison Visualization */}
              <BpmTempoComparisonSlider />
            </div>
          </div>
        </div>
        
        <Callout variant="insight" className="mt-12">
          <p className="text-lg text-white font-medium">
            <span className="text-[#00F0FF]">BRAIN-MUSCLE INTERFACE:</span> Not metaphor. Mechanism. 
            The 24/8 Anthem doesn&apos;t <em>motivate</em> you to swing better. It entrains your brain 
            to the timing signature of elite performance.
          </p>
        </Callout>
      </Section>

      {/* Section 2: Brainwave Symphony */}
      <Section id="brainwave-symphony" variant="dark">
        <div className="mb-8">
          <div className="font-mono text-sm text-[#3B82F6] uppercase tracking-wider mb-2">
            Section 02
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Brainwave Symphony: Entraining Focus & Peak Performance
          </h2>
        </div>
        
        <div className="space-y-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Your Brain is an Orchestra. We&apos;re Conducting.
              </h3>
              <p className="text-[#E2E8F0] leading-relaxed">
                Here&apos;s the thing about your brain during a golf swing: it&apos;s oscillating at 
                multiple frequencies simultaneously, like a neural symphony where every section 
                needs to hit its cue.
              </p>
              <ul className="space-y-3 text-[#E2E8F0]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#6366F1] shrink-0" />
                  <span><strong className="text-white">Delta (0.5-4 Hz)</strong> — Deep states</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#8B5CF6] shrink-0" />
                  <span><strong className="text-white">Theta (4-8 Hz)</strong> — Flow and memory consolidation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#3B82F6] shrink-0" />
                  <span><strong className="text-white">Alpha (8-13 Hz)</strong> — Relaxed focus</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#06B6D4] shrink-0" />
                  <span><strong className="text-white">Beta (13-30 Hz)</strong> — Active thinking</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#F59E0B] shrink-0" />
                  <span><strong className="text-white">Gamma (30-100+ Hz)</strong> — Cognitive binding & peak performance</span>
                </li>
              </ul>
              <p className="text-[#E2E8F0] leading-relaxed">
                The 24/8 system doesn&apos;t ask your brain politely. It <em>entrains</em> it.
              </p>
            </div>
            <div className="h-96">
              {/* Brainwave Spectrum Visualization */}
              <BrainwaveFrequencyChart />
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              {/* Neural Entrainment Animator - Interactive brainwave synchronization visualization */}
              <NeuralEntrainmentAnimator />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Entrainment: Neural Lockstep
              </h3>
              <p className="text-[#E2E8F0] leading-relaxed">
                When you expose the brain to rhythmic auditory stimulation at specific frequencies, 
                something remarkable happens: neurons synchronize their firing patterns to match 
                the external rhythm. This is <strong className="text-[#3B82F6]">brainwave entrainment</strong>—your 
                neural networks literally locking into the tempo of the sound.
              </p>
              <p className="text-[#E2E8F0] leading-relaxed">
                Research shows brainwaves synchronize with external stimuli between 10-40 Hz, 
                with delta responses peaking at 2 Hz and augmented phase synchronization throughout 
                the beta/gamma range (13-44 Hz). The 24/8 Anthem&apos;s 112 BPM framework operates 
                precisely in this sweet spot.
              </p>
              
              <Callout variant="principle">
                <p className="text-white font-semibold text-lg">
                  40Hz Gamma: The Focus Frequency
                </p>
                <p className="text-[#E2E8F0] mt-2">
                  Gamma oscillations at 40 Hz are associated with heightened attention, 
                  perceptual binding, and peak cognitive performance.
                </p>
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 3: Dopamine Drive */}
      <Section id="dopamine-drive" variant="gradient">
        <div className="mb-8">
          <div className="font-mono text-sm text-[#00F0FF] uppercase tracking-wider mb-2">
            Section 03
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Dopamine Drive: Fueling Flow & Confidence
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-xl text-[#E2E8F0] leading-relaxed">
              Here&apos;s what separates champions from chumps: <strong className="text-white">anticipation</strong>. 
              Not hope. Not motivation. Actual neurochemical anticipation—the brain&apos;s reward prediction 
              system lighting up <em>before</em> you even swing.
            </p>
            <p className="text-[#E2E8F0] leading-relaxed">
              The 24/8 Anthem hacks this system deliberately. Predictable rhythmic structure at 112 BPM 
              creates a dopamine drip that your mesolimbic pathway can&apos;t resist. Music triggers dopamine 
              release—this isn&apos;t metaphor, it&apos;s measurable neurochemistry. But here&apos;s the engineering 
              twist: <em>predictability</em> matters more than pleasure.
            </p>
            
            {/* Interactive Dopamine Pathway Visualization */}
            <InteractiveDopaminePathway />
          </div>
          <div>
            <MetricDisplay
              value="+48%"
              label="Positive Affect"
              description="Increased positive affect with music during physical activity"
              sentiment="good"
            />
            <Callout variant="metric" className="mt-6">
              <div className="font-mono text-sm text-[#F59E0B] uppercase tracking-wider mb-2">
                Flow State Marker
              </div>
              <p className="text-[#E2E8F0]">
                Flow state associated with upper alpha & beta power in frontal brain regions
              </p>
            </Callout>
          </div>
        </div>
        
        <div className="space-y-6">
          <h3 className="text-xl md:text-2xl font-bold text-white">
            The Flow Equation
          </h3>
          <p className="text-[#E2E8F0] leading-relaxed">
            Flow state isn&apos;t mystical. It&apos;s a specific neural configuration: reduced prefrontal 
            cortex interference + heightened striatal automation + synchronized gamma oscillations. 
            The 24/8 system engineers this by:
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-[#0C1220] border border-[#1E3A5F] p-6">
              <div className="text-[#3B82F6] font-bold mb-2">Rhythmic Predictability</div>
              <p className="text-[#94A3B8] text-sm">
                → anticipatory dopamine → reduced cognitive load
              </p>
            </div>
            <div className="bg-[#0C1220] border border-[#1E3A5F] p-6">
              <div className="text-[#F59E0B] font-bold mb-2">Spatial Audio Cues</div>
              <p className="text-[#94A3B8] text-sm">
                → enhanced movement mapping → smoother motor execution
              </p>
            </div>
            <div className="bg-[#0C1220] border border-[#1E3A5F] p-6">
              <div className="text-[#00F0FF] font-bold mb-2">Lyrical Cognitive Anchors</div>
              <p className="text-[#94A3B8] text-sm">
                → procedural memory reinforcement → automatic sequencing
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* Section 4: Audio Alchemy */}
      <Section id="audio-alchemy" variant="default">
        <div className="mb-8">
          <div className="font-mono text-sm text-[#3B82F6] uppercase tracking-wider mb-2">
            Section 04
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Audio Alchemy: Spatial Cues & Cognitive Anchors
          </h2>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-xl md:text-2xl font-bold text-white">
              Beyond Sound Design
            </h3>
            <p className="text-[#E2E8F0] leading-relaxed">
              Call-and-response patterns aren&apos;t decoration—they&apos;re <strong className="text-[#3B82F6]">motor 
              sequencing reinforcement</strong>. Left ear cue → right hemisphere processing → body maps 
              movement. The spatial design forces your brain to track position, timing, sequence.
            </p>
            <p className="text-[#E2E8F0] leading-relaxed">
              The lyrics work as procedural memory hooks. &quot;Frames not seconds&quot; becomes a neural 
              shorthand your cerebellum recognizes faster than conscious thought. Repetition with 
              variation keeps it fresh—avoiding habituation while deepening the groove.
            </p>
            
            <PrincipleBox title="ENGINEERED FLOW">
              The system doesn&apos;t motivate flow—it manufactures the conditions where flow becomes inevitable.
            </PrincipleBox>
          </div>
          <div>
            {/* Audio Waveform Visualization */}
            <SpatialAudioWaveform />
          </div>
        </div>
        
        <Callout variant="insight" className="mt-12">
          <p className="text-lg text-white font-medium">
            <span className="text-[#00F0FF]">NEURO-GOLF MECHANICS WITH SWAGGER:</span> Math meets muscle. 
            Your swing doesn&apos;t feel faster—it feels <em>inevitable</em>.
          </p>
        </Callout>
      </Section>

      {/* Section 5: Beyond Belief */}
      <Section id="beyond-belief" variant="dark">
        <div className="mb-8">
          <div className="font-mono text-sm text-[#F59E0B] uppercase tracking-wider mb-2">
            Section 05
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 text-balance">
            Beyond Belief: The Science of Engineered Performance
          </h2>
        </div>
        
        <div className="space-y-12">
          <p className="text-xl text-[#E2E8F0] leading-relaxed max-w-3xl">
            Let&apos;s get real about what&apos;s happening here. The 24/8 system sits on a spectrum—part 
            rigorous neuroscience, part brilliant engineering theater. And here&apos;s the twist: 
            <strong className="text-white"> both sides produce measurable results</strong>.
          </p>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Where the Science is Bulletproof
              </h3>
              <ul className="space-y-4 text-[#E2E8F0]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#10B981] shrink-0" />
                  <span><strong className="text-white">Motor timing consistency</strong> — Neuroscience 101. The basal ganglia and cerebellum automate rhythmic movements with predictable temporal structure.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#10B981] shrink-0" />
                  <span><strong className="text-white">Brainwave entrainment</strong> — Documented extensively. External rhythmic cues synchronize neural oscillations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#10B981] shrink-0" />
                  <span><strong className="text-white">Dopamine-anticipation link</strong> — Basic neurobiology. Predictable reward triggers dopamine release.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#10B981] shrink-0" />
                  <span><strong className="text-white">The 3:1 ratio</strong> — Measurable biomechanical fact in professional golf.</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                Where Engineering Becomes Art
              </h3>
              <ul className="space-y-4 text-[#E2E8F0]">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#F59E0B] shrink-0" />
                  <span><strong className="text-white">448 micro-ticks</strong> — Precision marketing meeting microtiming perception research. A branded frame, not a neurological constant.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#F59E0B] shrink-0" />
                  <span><strong className="text-white">Call-and-response anchors</strong> — Smart audio engineering informed by music cognition research—packaged as proprietary tech.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 mt-2 bg-[#F59E0B] shrink-0" />
                  <span><strong className="text-white">The &quot;Anthem&quot; framing</strong> — Pure identity mythology. And it works precisely because myths create belonging.</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Science-to-Myth Spectrum */}
          <div id="science-myth-spectrum">
            <ScienceToMythSpectrum />
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-white">
                The Power of Engineered Belief
              </h3>
              <p className="text-[#E2E8F0] leading-relaxed">
                Here&apos;s what the research actually shows: <strong className="text-white">Placebo effects 
                produce real physiological changes.</strong> Expectation modulates dopamine, reduces 
                perceived exertion, and enhances performance.
              </p>
              <p className="text-[#E2E8F0] leading-relaxed">
                Athletes who engage in superstitious rituals—even knowing they&apos;re &quot;just rituals&quot;—show 
                reduced anxiety and increased confidence. Body posture alone affects hormonal states 
                and self-perception.
              </p>
              <p className="text-[#E2E8F0] leading-relaxed">
                <strong className="text-white">Translation:</strong> The ritual of pressing play on your 
                &quot;neuro-engineered anthem&quot; triggers genuine neurobiological responses—whether or not 
                every claim is peer-reviewed.
              </p>
            </div>
            <div className="space-y-4">
              <MetricDisplay
                value="Moderate"
                label="Placebo Effect"
                description="Placebo interventions showed measurable perceptual recovery benefits"
                sentiment="good"
              />
              <MetricDisplay
                value="Physical + Mental"
                label="Ritual Impact"
                description="Superstitious rituals impact both confidence and anxiety in athletes"
                sentiment="neutral"
              />
            </div>
          </div>
          
          {/* Final revelation box */}
          <div className="bg-gradient-to-r from-[#1E3A8A]/40 to-[#8B5CF6]/20 border border-[#3B82F6] p-8 mt-8">
            <div className="font-mono text-sm text-[#3B82F6] uppercase tracking-wider mb-4">
              The 24/8 Revelation
            </div>
            <p className="text-lg text-white leading-relaxed">
              It works because the foundational science is real (motor timing, brainwave entrainment, 
              dopamine-flow mechanics) <strong>AND</strong> the engineered belief system amplifies those 
              effects through ritual, identity, and expectation. You&apos;re not being tricked. You&apos;re 
              being <em className="text-[#00F0FF]">optimized</em>—with science as the engine and story as the fuel.
            </p>
          </div>
          
          <div className="text-center pt-8">
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              Welcome to neuro-golf performance audio.
            </p>
            <p className="text-[#94A3B8]">
              Where it works because the science is real AND the story makes you believe.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA: Request Your Anthem */}
      <Section id="cta" variant="gradient">
        <div className="max-w-4xl mx-auto text-center">
          <div className="font-mono text-sm text-[#00F0FF] uppercase tracking-[0.3em] mb-4">
            Request Your Anthem
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-balance">
            Engineered For Your Round.
          </h2>
          <p className="text-lg md:text-xl text-[#E2E8F0] leading-relaxed mb-10 max-w-2xl mx-auto">
            Tell us your course, your tees, and your strategy. We&apos;ll research the layout,
            write lyrics locked to your game, and generate an original track at 112 BPM / 3:1
            tempo. One anthem. Your round. Ready when you tee off.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {/* TODO: wire href to real signup/request flow */}
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white font-semibold px-8 py-4 transition-colors duration-200"
            >
              Start My Anthem
              <span className="font-mono">→</span>
            </a>
            <a
              href="#listen"
              className="inline-flex items-center gap-2 border border-[#1E3A5F] hover:border-[#3B82F6] text-[#E2E8F0] hover:text-white font-semibold px-8 py-4 transition-colors duration-200"
            >
              Listen Again
            </a>
          </div>

          <div className="grid md:grid-cols-4 gap-4 text-left pt-8 border-t border-[#1E3A5F]/50">
            <div>
              <div className="font-mono text-xs text-[#3B82F6] uppercase tracking-wider mb-1">01 · Setup</div>
              <p className="text-[#94A3B8] text-sm">Course, tees, clubs, strategy.</p>
            </div>
            <div>
              <div className="font-mono text-xs text-[#F59E0B] uppercase tracking-wider mb-1">02 · Research</div>
              <p className="text-[#94A3B8] text-sm">Deep AI research per hole.</p>
            </div>
            <div>
              <div className="font-mono text-xs text-[#00F0FF] uppercase tracking-wider mb-1">03 · Lyrics</div>
              <p className="text-[#94A3B8] text-sm">Written from your actual yardages.</p>
            </div>
            <div>
              <div className="font-mono text-xs text-[#10B981] uppercase tracking-wider mb-1">04 · Anthem</div>
              <p className="text-[#94A3B8] text-sm">Generated, QC&apos;d, delivered.</p>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  )
}
