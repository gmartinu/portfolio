import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

export default function GlitchText({
  children,
  className = '',
  glitchOnHover = true,
  intensity = 'medium',
  autoGlitch = false,
  autoGlitchInterval = { min: 2000, max: 5000 },
  alwaysVisible = false
}) {
  const [isGlitching, setIsGlitching] = useState(false)
  const textRef = useRef(null)
  const timeoutRef = useRef(null)

  const intensityValues = {
    low: { offset: 2, duration: 100 },
    medium: { offset: 5, duration: 150 },
    high: { offset: 10, duration: 200 }
  }

  const { offset, duration } = intensityValues[intensity]

  const triggerGlitch = useCallback(() => {
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), duration * 3)
  }, [duration])

  useEffect(() => {
    if (!autoGlitch) return

    const { min, max } = autoGlitchInterval

    const scheduleNextGlitch = () => {
      const delay = Math.random() * (max - min) + min
      timeoutRef.current = setTimeout(() => {
        triggerGlitch()
        scheduleNextGlitch()
      }, delay)
    }

    scheduleNextGlitch()

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [autoGlitch, autoGlitchInterval, triggerGlitch])

  return (
    <span
      ref={textRef}
      className={`relative inline-block ${className}`}
      onMouseEnter={glitchOnHover ? triggerGlitch : undefined}
      style={{ fontFamily: 'var(--font-display)' }}
    >
      {/* Main text */}
      <span className="relative z-10">{children}</span>

      {/* Always visible glitch layers */}
      {alwaysVisible && (
        <>
          {/* Cyan - full text, always visible */}
          <motion.span
            className="absolute top-0 left-0 z-0 text-cyan-400 mix-blend-screen"
            animate={{
              x: [0, -offset, offset, -offset/2, 0],
              opacity: 1
            }}
            transition={{
              duration: duration / 1000 * 2,
              times: [0, 0.2, 0.4, 0.6, 1],
              repeat: Infinity,
              repeatDelay: 1.5
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>
          {/* Pink - bottom only, flashes then fades */}
          <motion.span
            className="absolute top-0 left-0 z-0 text-pink-500 mix-blend-screen"
            style={{ clipPath: 'inset(50% 0 0 0)' }}
            animate={{
              x: [0, offset, -offset, offset/2, 0],
              opacity: [1, 0.5, 0.2, 0, 0]
            }}
            transition={{
              duration: duration / 1000 * 2,
              times: [0, 0.2, 0.4, 0.6, 1],
              repeat: Infinity,
              repeatDelay: 1.5
            }}
            aria-hidden="true"
          >
            {children}
          </motion.span>
        </>
      )}

      {/* Glitch layers on trigger */}
      {!alwaysVisible && isGlitching && (
        <>
          <motion.span
            className="absolute top-0 left-0 z-0 text-cyan-400 mix-blend-screen"
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, -offset, offset, -offset/2, 0],
              opacity: [0, 0.8, 0.8, 0.8, 0],
              clipPath: [
                'inset(0 0 50% 0)',
                'inset(30% 0 40% 0)',
                'inset(60% 0 10% 0)',
                'inset(10% 0 70% 0)',
                'inset(0 0 50% 0)'
              ]
            }}
            transition={{ duration: duration / 1000, times: [0, 0.2, 0.4, 0.6, 1] }}
            aria-hidden="true"
          >
            {children}
          </motion.span>
          <motion.span
            className="absolute top-0 left-0 z-0 text-pink-500 mix-blend-screen"
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, offset, -offset, offset/2, 0],
              opacity: [0, 0.8, 0.8, 0.8, 0],
              clipPath: [
                'inset(50% 0 0 0)',
                'inset(40% 0 30% 0)',
                'inset(10% 0 60% 0)',
                'inset(70% 0 10% 0)',
                'inset(50% 0 0 0)'
              ]
            }}
            transition={{ duration: duration / 1000, times: [0, 0.2, 0.4, 0.6, 1] }}
            aria-hidden="true"
          >
            {children}
          </motion.span>
        </>
      )}

      {/* Subtle scanlines on hover */}
      {!alwaysVisible && isGlitching && (
        <motion.span
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ duration: 0.2 }}
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
          }}
        />
      )}
    </span>
  )
}
