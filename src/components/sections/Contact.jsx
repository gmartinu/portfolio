import { useRef, useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import MagneticButton from "../ui/MagneticButton";
import GlitchText from "../ui/GlitchText";

const socialLinks = [
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/gabmartinu/",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: "GitHub",
    url: "https://github.com/gmartinu",
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: "Email",
    url: "mailto:gabmartinu@gmail.com",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [emailRevealed, setEmailRevealed] = useState(false);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 px-6 md:px-12 lg:px-20 relative overflow-hidden min-h-screen flex flex-col items-center justify-center"
    >
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-emerald-500 rounded-full blur-[150px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-500 rounded-full blur-[150px]"
        />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #fff 1px, transparent 1px),
              linear-gradient(to bottom, #fff 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="w-full max-w-5xl mx-auto relative flex flex-col items-center">
        {/* Main content */}
        <div className="text-center mb-20 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-emerald-400 text-sm uppercase tracking-[0.3em] mb-6 block"
          >
            Get in Touch
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Let's Build
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500 bg-clip-text text-transparent">
              <GlitchText intensity="high" alwaysVisible>
                Something Great
              </GlitchText>
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8 text-center"
          >
            I'm always excited to collaborate on interesting projects. Whether
            you have a question or just want to say hi, feel free to reach out.
          </motion.p>

          {/* Email reveal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            {!emailRevealed ? (
              <button
                onClick={() => setEmailRevealed(true)}
                className="group inline-flex items-center gap-4 text-2xl md:text-4xl font-bold text-gray-400 hover:text-white transition-colors"
              >
                <span className="relative">
                  Click to reveal email
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400 group-hover:w-full transition-all duration-300" />
                </span>
                <span className="text-emerald-400 group-hover:translate-x-2 transition-transform">
                  →
                </span>
              </button>
            ) : (
              <motion.a
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                href="mailto:gabmartinu@gmail.com"
                className="inline-flex items-center gap-4 text-2xl md:text-4xl font-bold text-white hover:text-emerald-400 transition-colors"
              >
                gabmartinu@gmail.com
              </motion.a>
            )}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <MagneticButton
              href="mailto:gabmartinu@gmail.com"
              strength={0.4}
              className="text-lg"
            >
              Start a Project
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-8"
        >
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3"
            >
              <span className="p-4 border border-white/10 group-hover:border-emerald-500/50 group-hover:bg-emerald-500/10 transition-all duration-300 text-gray-400 group-hover:text-emerald-400">
                {link.icon}
              </span>
              <span className="text-xs text-gray-600 uppercase tracking-wider group-hover:text-white transition-colors">
                {link.name}
              </span>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-32 pt-8 border-t border-white/5"
        >
          <div className="flex flex-col items-center gap-4 text-sm text-gray-600 text-center">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span>Available for new opportunities</span>
            </div>
            <span>© {new Date().getFullYear()} Gabriel Martinusso</span>
            <span>Rio de Janeiro, Brazil</span>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
