import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import ParticleAcceleratorScene from './ParticleAcceleratorScene'

export default function Preloader({ onComplete }) {
  // Phases: beam1_intro -> beam2_intro -> accelerating -> collision -> explosion -> exit
  const [phase, setPhase] = useState('beam1_intro')
  const [progress, setProgress] = useState(0)
  const [showFlash, setShowFlash] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [energyLevel, setEnergyLevel] = useState(0)
  const containerRef = useRef(null)
  const timelineRef = useRef(null)

  // Phase timing (total ~6.5 seconds)
  const BEAM1_INTRO_DURATION = 1 // first beam appears
  const BEAM2_INTRO_DURATION = 1 // second beam appears
  const ACCELERATING_DURATION = 3 // both beams accelerate
  const COLLISION_DURATION = 1 // atoms rushing to center
  const EXPLOSION_DURATION = 1.5 // explosion and shockwave

  useEffect(() => {
    const tl = gsap.timeline()
    timelineRef.current = tl

    // Phase 1: First beam introduction
    tl.to({ val: 0 }, {
      val: 100,
      duration: BEAM1_INTRO_DURATION,
      ease: 'power2.out',
      onUpdate: function() {
        const val = this.targets()[0].val
        setProgress(Math.round(val))
      },
      onComplete: () => {
        setPhase('beam2_intro')
        setProgress(0)
      }
    })

    // Phase 2: Second beam introduction
    .to({ val: 0 }, {
      val: 100,
      duration: BEAM2_INTRO_DURATION,
      ease: 'power2.out',
      onUpdate: function() {
        const val = this.targets()[0].val
        setProgress(Math.round(val))
      },
      onComplete: () => {
        setPhase('accelerating')
        setProgress(0)
      }
    })

    // Phase 3: Accelerating (both atoms orbiting and speeding up)
    .to({ val: 0 }, {
      val: 100,
      duration: ACCELERATING_DURATION,
      ease: 'power2.in',
      onUpdate: function() {
        const val = this.targets()[0].val
        setProgress(Math.round(val))
        setEnergyLevel(val)
      },
      onComplete: () => {
        setPhase('collision')
        setProgress(0)
      }
    })

    // Phase 4: Collision (atoms rush to center)
    .to({ val: 0 }, {
      val: 100,
      duration: COLLISION_DURATION,
      ease: 'power4.in',
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].val))
      }
    })

    return () => tl.kill()
  }, [])

  // Handle collision event from 3D scene
  const handleCollision = useCallback(() => {
    setShowFlash(true)
    setPhase('explosion')
    setProgress(0)

    const explosionTl = gsap.timeline({
      onComplete: () => {
        setIsExiting(true)
        setTimeout(() => {
          onComplete?.()
        }, 800)
      }
    })

    explosionTl.to({ val: 0 }, {
      val: 100,
      duration: EXPLOSION_DURATION,
      ease: 'power2.out',
      onUpdate: function() {
        setProgress(Math.round(this.targets()[0].val))
      }
    })

    // Flash fade out
    setTimeout(() => setShowFlash(false), 200)
  }, [onComplete])

  // Energy indicator text
  const getEnergyText = () => {
    if (phase === 'beam1_intro') return 'Initializing beam A...'
    if (phase === 'beam2_intro') return 'Initializing beam B...'
    if (phase === 'accelerating') {
      if (energyLevel < 30) return 'Synchronizing particle beams...'
      if (energyLevel < 60) return 'Accelerating particles...'
      if (energyLevel < 85) return 'Approaching collision velocity...'
      return 'Critical energy reached!'
    }
    if (phase === 'collision') return 'COLLISION IMMINENT'
    if (phase === 'explosion') return 'COLLISION DETECTED'
    return ''
  }

  // Calculate overall progress for the energy display
  const getOverallProgress = () => {
    if (phase === 'beam1_intro') return progress * 0.15 // 0-15%
    if (phase === 'beam2_intro') return 15 + progress * 0.15 // 15-30%
    if (phase === 'accelerating') return 30 + energyLevel * 0.6 // 30-90%
    if (phase === 'collision') return 90 + progress * 0.1 // 90-100%
    return 100
  }

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden"
          exit={{
            clipPath: 'circle(150% at 50% 50%)',
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* 3D Scene */}
          <div className="absolute inset-0">
            <ParticleAcceleratorScene
              phase={phase}
              progress={progress}
              onCollision={handleCollision}
            />
          </div>

          {/* Collision Flash */}
          <AnimatePresence>
            {showFlash && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="absolute inset-0 bg-white z-50 pointer-events-none"
              />
            )}
          </AnimatePresence>

          {/* Scanlines overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-20 opacity-[0.03]"
            style={{
              background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,136,0.1) 2px, rgba(0,255,136,0.1) 4px)'
            }}
          />

          {/* Centered Energy Indicator - at collision point */}
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-col items-center"
            >
              {/* Circular energy indicator - larger for focal point */}
              <div className="relative w-36 h-36 md:w-48 md:h-48 lg:w-56 lg:h-56">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full transition-all duration-300"
                  style={{
                    boxShadow: getOverallProgress() > 70
                      ? `0 0 60px rgba(0, 255, 136, ${getOverallProgress() / 200}), 0 0 100px rgba(0, 204, 255, ${getOverallProgress() / 300})`
                      : 'none'
                  }}
                />

                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1.5"
                  />
                  {/* Secondary track */}
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.03)"
                    strokeWidth="4"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#energyGradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray={`${getOverallProgress() * 2.83} 283`}
                    className="transition-all duration-100"
                    style={{
                      filter: getOverallProgress() > 70 ? 'drop-shadow(0 0 8px #00ff88)' : 'none'
                    }}
                  />
                  <defs>
                    <linearGradient id="energyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#00ff88" />
                      <stop offset="50%" stopColor="#00ccff" />
                      <stop offset="100%" stopColor="#ff0055" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-4xl md:text-5xl lg:text-6xl font-bold tabular-nums"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: phase === 'explosion' ? '#00ff88' : phase === 'collision' ? '#ff0055' : getOverallProgress() > 80 ? '#ff0055' : '#00ff88',
                      textShadow: getOverallProgress() > 70 ? '0 0 30px currentColor' : 'none'
                    }}
                  >
                    {phase === 'collision' ? '!' : phase === 'explosion' ? '✓' : Math.round(getOverallProgress())}
                  </span>
                  <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-wider mt-1">
                    {phase === 'collision' ? 'IMPACT' : phase === 'explosion' ? 'SUCCESS' : '%'}
                  </span>
                </div>
              </div>

              {/* Status text below indicator */}
              <motion.p
                key={getEnergyText()}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-6 text-sm uppercase tracking-[0.2em] ${
                  phase === 'collision'
                    ? 'text-red-500 animate-pulse'
                    : phase === 'explosion'
                    ? 'text-emerald-400'
                    : energyLevel > 85
                    ? 'text-yellow-500'
                    : 'text-gray-500'
                }`}
                style={{
                  textShadow: phase === 'collision' ? '0 0 10px #ff0055' : 'none'
                }}
              >
                {getEnergyText()}
              </motion.p>
            </motion.div>
          </div>

          {/* Data readouts - bottom center */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-8 justify-center text-xs uppercase tracking-wider z-10"
          >
            <div className="text-center">
              <div className="text-gray-600">Beam A</div>
              <div className={`font-mono transition-all duration-300 ${
                phase === 'beam1_intro' && progress < 50 ? 'text-yellow-500' :
                phase === 'beam1_intro' ? 'text-emerald-400' :
                'text-emerald-400'
              }`}>
                {phase === 'beam1_intro' && progress < 50 ? 'INIT...' : 'ACTIVE'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Beam B</div>
              <div className={`font-mono transition-all duration-300 ${
                phase === 'beam1_intro' ? 'text-gray-600' :
                phase === 'beam2_intro' && progress < 50 ? 'text-yellow-500' :
                'text-pink-500'
              }`}>
                {phase === 'beam1_intro' ? 'STANDBY' :
                 phase === 'beam2_intro' && progress < 50 ? 'INIT...' : 'ACTIVE'}
              </div>
            </div>
            <div className="text-center">
              <div className="text-gray-600">Status</div>
              <div className={`font-mono ${
                phase === 'explosion' ? 'text-emerald-400' :
                phase === 'collision' ? 'text-red-500 animate-pulse' :
                phase === 'accelerating' ? 'text-cyan-400' :
                'text-yellow-500'
              }`}>
                {phase === 'beam1_intro' || phase === 'beam2_intro' ? 'INIT' :
                 phase === 'accelerating' ? 'ACCELERATING' :
                 phase === 'collision' ? 'COLLISION' :
                 'COMPLETE'}
              </div>
            </div>
          </motion.div>

          {/* Corner decorations - styled as control room interface */}
          <div className="absolute top-6 left-6 text-[10px] text-gray-600 uppercase tracking-wider font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              CERN LHC SIMULATION
            </div>
          </div>
          <div className="absolute top-6 right-6 text-[10px] text-gray-600 uppercase tracking-wider font-mono text-right">
            <div>GABRIEL MARTINUSSO</div>
            <div className="text-emerald-400">PORTFOLIO v2.0</div>
          </div>
          <div className="absolute bottom-6 left-6 text-[10px] text-gray-600 uppercase tracking-wider font-mono">
            <div>EXPERIMENT: PORTFOLIO_INIT</div>
            <div className="text-cyan-400">SECTOR 7-G</div>
          </div>
          <div className="absolute bottom-6 right-6 text-[10px] text-gray-600 uppercase tracking-wider font-mono text-right">
            <div>COLLISION ENERGY</div>
            <div className="text-lg text-white font-bold">{Math.round(getOverallProgress() * 13.6 / 100)} TeV</div>
          </div>

          {/* Side decorative lines */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-emerald-500/50 to-transparent" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[1px] h-32 bg-gradient-to-b from-transparent via-pink-500/50 to-transparent" />

          {/* Bottom progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500"
              style={{
                width: `${getOverallProgress()}%`,
                boxShadow: '0 0 20px rgba(0, 255, 136, 0.5)'
              }}
            />
          </div>

          {/* Vignette */}
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.4) 100%)'
            }}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
