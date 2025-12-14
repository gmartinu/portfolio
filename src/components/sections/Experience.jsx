/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: "01",
    period: "Apr 2022 - Present",
    duration: "2+ years",
    title: "Software Engineer",
    subtitle: "Solutions Developer",
    company: "Connect 5G, Inc.",
    location: "Texas, USA (Remote)",
    description:
      "Lead and develop network analysis projects, supporting telecommunications engineers with actionable insights.",
    highlights: [
      "Backend systems in Go",
      "Data pipelines in Python",
      "Big Data XML processing",
      "Interactive visualizations",
      "AWS ECS/Fargate deployments",
    ],
    tags: ["React", "TypeScript", "Python", "Golang", "AWS"],
    accent: "emerald",
  },
  {
    id: "02",
    period: "Age 18 - 22",
    duration: "4 years",
    title: "Python Developer",
    subtitle: "Backend Journey",
    company: "Self-Driven Learning",
    location: "Building foundations",
    description:
      "Expanded into backend development with Python and Django, building robust web applications and APIs.",
    highlights: [
      "RESTful API design",
      "Database architecture",
      "Server-side rendering",
      "Authentication systems",
    ],
    tags: ["Python", "Django", "PostgreSQL", "REST"],
    accent: "cyan",
  },
  {
    id: "03",
    period: "Age 16 - Present",
    duration: "8+ years",
    title: "React Developer",
    subtitle: "Frontend Mastery",
    company: "Where It All Began",
    location: "The starting point",
    description:
      "Started programming journey with React at age 16, mastering modern frontend development.",
    highlights: [
      "Component architecture",
      "State management",
      "Performance optimization",
      "Modern UI/UX patterns",
    ],
    tags: ["React", "JavaScript", "TypeScript", "CSS"],
    accent: "pink",
  },
];

const accentColors = {
  emerald: {
    bg: "from-emerald-500/20 to-cyan-500/20",
    border: "border-emerald-500/30",
    text: "text-emerald-400",
    glow: "shadow-emerald-500/20",
  },
  cyan: {
    bg: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30",
    text: "text-cyan-400",
    glow: "shadow-cyan-500/20",
  },
  pink: {
    bg: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30",
    text: "text-pink-400",
    glow: "shadow-pink-500/20",
  },
};

export default function Experience() {
  const containerRef = useRef(null);
  const horizontalRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-114vw"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate section title
      gsap.fromTo(
        ".exp-title span",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".exp-title",
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative"
      style={{ height: "300vh" }}
    >
      {/* Sticky container */}
      <div className="sticky top-20 h-screen overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          {/* Gradient orbs */}
          <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[150px]" />

          {/* Horizontal lines */}
          <div className="absolute inset-0 opacity-[0.02]">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-full h-[1px] bg-white"
                style={{ top: `${10 + i * 10}%` }}
              />
            ))}
          </div>
        </div>

        {/* Header */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-10 text-center">
          <span className="text-emerald-400 text-sm uppercase tracking-[0.3em] mb-2 block">
            Journey
          </span>
          <h2
            className="exp-title text-4xl md:text-6xl font-bold overflow-hidden"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {"Experience".split("").map((char, i) => (
              <span key={i} className="inline-block">
                {char}
              </span>
            ))}
          </h2>
        </div>

        {/* Scroll Progress */}
        <div className="absolute top-8 right-6 md:right-12 lg:right-20 z-10">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-600 uppercase tracking-wider">
              Scroll
            </span>
            <div className="w-24 h-[2px] bg-white/10 overflow-hidden">
              <motion.div
                style={{ scaleX: scrollYProgress }}
                className="h-full bg-emerald-400 origin-left"
              />
            </div>
          </div>
        </div>

        {/* Horizontal scroll content */}
        <motion.div
          ref={horizontalRef}
          style={{ x }}
          className="absolute top-1/2 -translate-y-1/2 flex gap-8 px-6 md:px-12 lg:px-20"
        >
          {experiences.map((exp, index) => {
            const colors = accentColors[exp.accent];

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex-shrink-0 w-[85vw] md:w-[60vw] lg:w-[45vw] h-[50vh] md:h-[55vh] p-6 md:p-8 bg-gradient-to-br ${colors.bg} border ${colors.border} backdrop-blur-sm`}
              >
                {/* Card number */}
                <div
                  className="absolute top-4 right-4 text-[5rem] md:text-[7rem] font-bold text-white/[0.02] leading-none pointer-events-none"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {exp.id}
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between text-center items-center">
                  {/* Top */}
                  <div>
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <span className={`text-xs font-mono ${colors.text}`}>
                        {exp.period}
                      </span>
                      <span className="w-8 h-[1px] bg-white/20" />
                      <span className="text-xs text-gray-600">
                        {exp.duration}
                      </span>
                    </div>

                    <h3
                      className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {exp.title}
                    </h3>
                    <p className={`text-lg ${colors.text} mb-4`}>
                      {exp.subtitle}
                    </p>

                    <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                      <span>{exp.company}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Middle */}
                  <div className="py-4">
                    <p className="text-gray-400 text-lg leading-relaxed">
                      {exp.description}
                    </p>
                  </div>

                  {/* Bottom */}
                  <div>
                    {/* Highlights */}
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {exp.highlights.map((highlight, i) => (
                        <span
                          key={i}
                          className="text-xs text-gray-500 uppercase tracking-wider"
                        >
                          {highlight}
                          {i < exp.highlights.length - 1 && " •"}
                        </span>
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap justify-center gap-2">
                      {exp.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-3 py-1 text-xs font-medium ${colors.text} bg-white/5 border border-white/10`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corner decoration */}
                <div
                  className={`absolute bottom-0 left-0 w-24 h-24 border-l-2 border-b-2 ${colors.border}`}
                />
                <div
                  className={`absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 ${colors.border}`}
                />
              </motion.div>
            );
          })}

          {/* Final card - Call to action */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            className="flex-shrink-0 w-[85vw] md:w-[40vw] h-[50vh] md:h-[55vh] flex items-center justify-center"
          >
            <div className="text-center">
              <div className="flex justify-center pb-6">
                <motion.div
                  animate={{
                    rotate: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="w-32 h-32 mx-auto mb-8 border border-emerald-500/30 rounded-full flex items-center justify-center"
                >
                  <span className="text-4xl pl-1">→</span>
                </motion.div>
              </div>
              <h4
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Let's Write the Next Chapter
              </h4>
              <p className="text-gray-500 mb-6">
                Ready for new challenges and opportunities
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-emerald-400 hover:text-white transition-colors"
              >
                <span>Get in touch</span>
                <svg
                  className="w-4 h-4"
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
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Navigation dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
          {experiences.map((exp, i) => (
            <motion.div
              key={exp.id}
              className="w-2 h-2 rounded-full bg-white/20"
              style={{
                scale: useTransform(
                  scrollYProgress,
                  [i / experiences.length, (i + 1) / experiences.length],
                  [1, 1.5]
                ),
                opacity: useTransform(
                  scrollYProgress,
                  [
                    i / experiences.length,
                    (i + 0.5) / experiences.length,
                    (i + 1) / experiences.length,
                  ],
                  [0.3, 1, 0.3]
                ),
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
