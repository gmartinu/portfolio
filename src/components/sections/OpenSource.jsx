import { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Simulated GitHub stats (in real app, fetch from GitHub API)
const projects = [
  {
    name: "thermal-print",
    description:
      "A powerful React library for thermal receipt printing. Generate professional receipts with ease using a simple component-based API.",
    language: "TypeScript",
    url: "https://github.com/gmartinu/thermal-print",
    npmUrl: "https://www.npmjs.com/package/thermal-print",
    featured: true,
    codeSnippet: `import { Document, Page, View, Text, StyleSheet } from '@thermal-print/react'
import { convertToESCPOS } from '@thermal-print/react'

const styles = StyleSheet.create({
  header: { fontSize: 20, textAlign: 'center', fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
})

function Receipt() {
  return (
    <Document>
      <Page>
        <Text style={styles.header}>MY STORE</Text>
        <View style={styles.row}>
          <Text>Coffee</Text>
          <Text>$3.50</Text>
        </View>
      </Page>
    </Document>
  )
}

// Convert to ESC/POS commands
const buffer = await convertToESCPOS(<Receipt />)`,
  },
];

export default function OpenSource() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".opensource-title span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".opensource-title",
            start: "top 80%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="opensource"
      className="py-16 pb-32 px-6 md:px-12 lg:px-20 relative overflow-hidden flex flex-col items-center"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at center, #00ff88 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Section number */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="absolute top-20 right-6 md:right-20 text-[20vw] font-bold text-transparent leading-none pointer-events-none"
        style={{
          WebkitTextStroke: "1px rgba(0, 255, 136, 0.1)",
          fontFamily: "var(--font-display)",
        }}
      >
        OS
      </motion.div>

      <div className="w-full max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-emerald-400 text-sm uppercase tracking-[0.3em] mb-4 block"
          >
            Open Source
          </motion.span>
          <h2
            className="opensource-title text-5xl md:text-7xl lg:text-8xl font-bold overflow-hidden"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {"Featured Project".split(" ").map((word, i) => (
              <span key={i} className="inline-block mr-[0.3em]">
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* Featured Project */}
        {projects
          .filter((p) => p.featured)
          .map((project) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex flex-col items-center text-center gap-12"
            >
              {/* Project Info */}
              <div className="space-y-8 max-w-2xl">
                <div>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <span className="text-emerald-400 text-sm font-mono">
                      {project.language}
                    </span>
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  </div>
                  <h3
                    className="text-4xl md:text-5xl font-bold mb-4"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {project.name}
                  </h3>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* CTAs */}
                <div className="pt-8 flex flex-wrap justify-center gap-4">
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-black font-bold uppercase tracking-wider text-sm hover:bg-emerald-400 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                    </svg>
                    View on GitHub
                  </a>
                  <a
                    href={project.npmUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-3 px-6 py-3 border-2 border-white/20 font-bold uppercase tracking-wider text-sm hover:border-emerald-400 hover:text-emerald-400 transition-colors"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M0 0v24h24V0H0zm6.168 20.4H2.4V6h3.768v14.4zm7.2 0H9.6V6h7.2v10.8h-3.432V8.4H13.2v12h.168zm8.232 0h-3.768V6H24v14.4h-2.4z" />
                    </svg>
                    npm Package
                  </a>
                </div>
              </div>

              {/* Code Preview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="relative w-full max-w-2xl mx-auto"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-3xl opacity-50" />
                <div className="relative bg-[#0d0d0d] border border-white/10 rounded-lg overflow-hidden">
                  {/* Window header */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/50">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className="ml-4 text-xs text-gray-500 font-mono">
                      example.tsx
                    </span>
                  </div>

                  {/* Code */}
                  <pre className="p-6 text-sm overflow-x-auto text-left">
                    <code className="font-mono text-left">
                      {project.codeSnippet.split("\n").map((line, i) => {
                        // Escape HTML first, then apply syntax highlighting
                        const escaped = line
                          .replace(/&/g, "&amp;")
                          .replace(/</g, "&lt;")
                          .replace(/>/g, "&gt;");

                        const highlighted = escaped
                          // Keywords
                          .replace(
                            /\b(import|from|const|function|return|await)\b/g,
                            '<span class="text-pink-500">$1</span>'
                          )
                          // Strings
                          .replace(
                            /('[^']*')/g,
                            '<span class="text-emerald-400">$1</span>'
                          )
                          // JSX Components (escaped angle brackets)
                          .replace(
                            /(&lt;\/?)(Document|Page|View|Text|Receipt)/g,
                            '$1<span class="text-cyan-400">$2</span>'
                          )
                          // Function/class names
                          .replace(
                            /\b(StyleSheet|Receipt|convertToESCPOS)\b/g,
                            '<span class="text-yellow-400">$1</span>'
                          )
                          // Comments
                          .replace(
                            /(\/\/.*)/g,
                            '<span class="text-gray-500">$1</span>'
                          );

                        return (
                          <div key={i} className="flex">
                            <span className="text-gray-600 w-8 select-none text-right pr-4">
                              {i + 1}
                            </span>
                            <span
                              className="flex-1 whitespace-pre"
                              dangerouslySetInnerHTML={{ __html: highlighted }}
                            />
                          </div>
                        );
                      })}
                    </code>
                  </pre>
                </div>

                {/* Decorative elements */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-10 -right-10 w-32 h-32 border border-emerald-500/20 rounded-full"
                />
              </motion.div>
            </motion.div>
          ))}

        {/* More projects coming soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="pt-5 text-center"
        >
          <p className="text-gray-500 text-sm uppercase tracking-[0.2em]">
            More open source projects coming soon
          </p>
        </motion.div>
      </div>
    </section>
  );
}
