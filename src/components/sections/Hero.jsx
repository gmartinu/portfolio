import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GlitchText from '../ui/GlitchText'
import MagneticButton from '../ui/MagneticButton'
import Scene from '../canvas/Scene'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const containerRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 300])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  useEffect(() => {
    // Animate title on load
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-title-line',
        {
          y: 200,
          rotateX: -90,
          opacity: 0
        },
        {
          y: 0,
          rotateX: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.2
        }
      )

      gsap.fromTo('.hero-subtitle',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, delay: 0.8, ease: 'power3.out' }
      )

      gsap.fromTo('.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.2, ease: 'power3.out' }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh]"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* 3D Background */}
        <div className="absolute inset-0 z-0">
          <Scene />
        </div>

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, #00ff88 1px, transparent 1px),
              linear-gradient(to bottom, #00ff88 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        />

        {/* Content */}
        <motion.div
          style={{ y, opacity, scale }}
          className="relative z-10 h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-20 text-center"
        >
          {/* Top label */}
          <div className="mb-8">
            <motion.span
              initial={{ width: 0 }}
              animate={{ width: 'auto' }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-block overflow-hidden"
            >
              <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-gray-500 flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
                Software Engineer & Creative Developer
                <span className="w-12 h-[1px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent" />
              </span>
            </motion.span>
          </div>

          {/* Main title */}
          <div className="perspective-[1000px]">
            <div className="overflow-hidden mb-2">
              <h1
                ref={titleRef}
                className="hero-title-line text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <GlitchText intensity="medium">GABRIEL</GlitchText>
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1
                ref={subtitleRef}
                className="hero-title-line text-[12vw] md:text-[10vw] lg:text-[8vw] font-black leading-[0.85] tracking-tighter"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
                  <GlitchText
                    intensity="high"
                    alwaysVisible
                  >
                    MARTINUSSO
                  </GlitchText>
                </span>
              </h1>
            </div>
          </div>

          {/* Subtitle & CTA */}
          <div className="mt-12 md:mt-16 flex flex-col items-center gap-8">
            <p className="hero-subtitle text-lg md:text-xl text-gray-400 max-w-lg leading-relaxed">
              Building{' '}
              <span className="text-white">scalable systems</span>{' '}
              and crafting{' '}
              <span className="text-emerald-400">elegant solutions</span>{' '}
              for over 8 years.
            </p>

            <div className="hero-cta flex flex-wrap justify-center gap-4">
              <MagneticButton href="#opensource" strength={0.3}>
                View Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </MagneticButton>
              <MagneticButton href="#contact" strength={0.3}>
                Contact Me
              </MagneticButton>
            </div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-gray-600">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              className="w-[1px] h-16 bg-gradient-to-b from-emerald-400 to-transparent"
            />
          </motion.div>
        </motion.div>

        {/* Side labels */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-600 writing-vertical-lr rotate-180">
            Rio de Janeiro, Brazil
          </span>
        </div>
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
          <span className="text-xs uppercase tracking-[0.2em] text-gray-600 writing-vertical-lr">
            8+ Years Experience
          </span>
        </div>
      </div>

      {/* Horizontal Marquee */}
      <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden py-6 bg-gradient-to-r from-pink-500 via-emerald-400 to-cyan-400">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="flex whitespace-nowrap"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center text-black font-bold text-xl md:text-2xl uppercase tracking-wider">
              <span className="mx-8">React Developer</span>
              <span className="mx-4">★</span>
              <span className="mx-8">Python Expert</span>
              <span className="mx-4">★</span>
              <span className="mx-8">System Architect</span>
              <span className="mx-4">★</span>
              <span className="mx-8">Open Source</span>
              <span className="mx-4">★</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
