import { motion } from 'framer-motion'

const technologies = [
  'React',
  'Python',
  'TypeScript',
  'Golang',
  'AWS',
  'Docker',
  'CI/CD',
  'Big Data',
  'Django',
  'PostgreSQL',
]

export default function Marquee() {
  return (
    <div className="py-8 bg-gradient-to-r from-emerald-400 to-cyan-400 overflow-hidden">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="flex whitespace-nowrap"
      >
        {/* Duplicate content for seamless loop */}
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex items-center">
            {technologies.map((tech, index) => (
              <div key={`${setIndex}-${index}`} className="flex items-center mx-8">
                <span
                  className="text-2xl md:text-3xl font-bold text-[#0a0a0a]"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {tech}
                </span>
                <span className="mx-8 w-3 h-3 bg-[#0a0a0a] rounded-full" />
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
