import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Lenis from '@studio-freight/lenis'

import Preloader from './components/loading/Preloader'
import Navigation from './components/ui/Navigation'
import Cursor from './components/ui/Cursor'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import OpenSource from './components/sections/OpenSource'
import Skills from './components/sections/Skills'
import Experience from './components/sections/Experience'
import Contact from './components/sections/Contact'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [lenis, setLenis] = useState(null)

  // Initialize smooth scrolling after loading
  useEffect(() => {
    if (isLoading) return

    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    setLenis(lenisInstance)

    function raf(time) {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenisInstance.destroy()
    }
  }, [isLoading])

  // Handle loading complete
  const handleLoadingComplete = () => {
    setIsLoading(false)
    // Scroll to top when content loads
    window.scrollTo(0, 0)
  }

  return (
    <>
      {/* Preloader */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>

      {/* Main site content */}
      {!isLoading && (
        <>
          {/* Custom Cursor */}
          <Cursor />

          {/* Noise Overlay */}
          <div
            className="fixed inset-0 pointer-events-none z-[100] opacity-[0.015]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Gradient orbs - global background elements */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute top-0 left-0 w-[50vw] h-[50vw] bg-emerald-500/5 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-[40vw] h-[40vw] bg-pink-500/5 rounded-full blur-[200px] translate-x-1/2 translate-y-1/2" />
          </div>

          {/* Navigation */}
          <Navigation />

          {/* Main Content */}
          <main className="relative z-10 bg-[#050505] text-white">
            <Hero />
            <About />
            <OpenSource />
            <Skills />
            <Experience />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}

export default App
