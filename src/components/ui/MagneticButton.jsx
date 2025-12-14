import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

export default function MagneticButton({
  children,
  className = '',
  strength = 0.5,
  as = 'button',
  href,
  onClick,
  ...props
}) {
  const buttonRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouse = (e) => {
    if (!buttonRef.current) return

    const { clientX, clientY } = e
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect()

    const x = (clientX - left - width / 2) * strength
    const y = (clientY - top - height / 2) * strength

    setPosition({ x, y })
  }

  const reset = () => {
    setPosition({ x: 0, y: 0 })
  }

  const Component = href ? 'a' : as

  return (
    <motion.div
      ref={buttonRef}
      className="inline-block"
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 350, damping: 15, mass: 0.5 }}
    >
      <Component
        href={href}
        onClick={onClick}
        className={`group relative inline-flex items-center justify-center overflow-hidden ${className}`}
        {...props}
      >
        {/* Background hover effect */}
        <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Border */}
        <span className="absolute inset-0 border-2 border-white/20 group-hover:border-transparent transition-colors duration-300" />

        {/* Content */}
        <span className="relative z-10 flex items-center gap-2 px-8 py-4 text-sm font-bold uppercase tracking-wider transition-colors duration-300 group-hover:text-black">
          {children}
        </span>

        {/* Shine effect on hover */}
        <motion.span
          className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:translate-x-full transition-transform duration-700"
          aria-hidden="true"
        />
      </Component>
    </motion.div>
  )
}
