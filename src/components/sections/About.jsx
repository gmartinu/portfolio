/* eslint-disable no-unused-vars */
import { useRef, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import profileImg from "../../assets/profile.jpeg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: "8+", label: "Years Experience", color: "emerald" },
  { value: "24", label: "Years Old", color: "cyan" },
  { value: "3+", label: "Years Remote", color: "pink" },
  { value: "∞", label: "Curiosity", color: "yellow" },
];

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate text lines on scroll
      gsap.fromTo(
        ".about-line",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: ".about-text",
            start: "top 80%",
          },
        }
      );

      // Animate stats
      gsap.fromTo(
        ".stat-item",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".stats-grid",
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
      id="about"
      className="py-16 relative overflow-hidden flex flex-col items-center"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.02] to-transparent" />

      <div className="w-full max-w-5xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Section header */}
        <div className="mb-20 overflow-hidden text-center">
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            className="text-emerald-400 text-sm uppercase tracking-[0.3em] mb-4 block"
          >
            About Me
          </motion.span>
          <motion.h2
            initial={{ y: 100 }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
            className="text-5xl md:text-7xl font-bold"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Story
          </motion.h2>
        </div>

        {/* Centered layout */}
        <div className="flex flex-col items-center gap-16">
          {/* Image */}
          <motion.div
            ref={imageRef}
            style={{ y: imageY }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* Image frame */}
              <div className="absolute inset-0 border border-white/10" />

              {/* Main image */}
              <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 1.5, ease: [0.33, 1, 0.68, 1] }}
                className="w-full h-full"
              >
                <img
                  src={profileImg}
                  alt="Gabriel Martinusso"
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
                />
              </motion.div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />

              {/* Corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-emerald-400" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-emerald-400" />
            </div>

            {/* Floating label */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 bg-emerald-400 text-black px-6 py-4"
            >
              <span className="text-sm font-bold uppercase tracking-wider">
                Rio de Janeiro, BR
              </span>
            </motion.div>
          </motion.div>

          {/* Text content */}
          <motion.div
            style={{ y: textY }}
            className="space-y-12 text-center max-w-3xl"
          >
            {/* Main text */}
            <div className="about-text space-y-6">
              <p className="about-line text-2xl md:text-3xl text-gray-300 leading-relaxed">
                I am a{" "}
                <span className="text-white font-semibold">
                  24-year-old Software Engineer
                </span>{" "}
                from Rio de Janeiro, Brazil.
              </p>

              <p className="about-line text-lg text-gray-400 leading-relaxed">
                With over{" "}
                <span className="text-emerald-400 font-semibold">
                  eight years of hands-on programming experience
                </span>
                , starting at 16, I've developed a deep passion for building
                software that makes a real impact.
              </p>

              <p className="about-line text-lg text-gray-400 leading-relaxed">
                My journey began with <span className="text-white">React</span>,
                followed by <span className="text-white">Python/Django</span> at
                18, and <span className="text-white">Golang</span> at 22. Each
                technology has expanded my understanding of what's possible in
                software development.
              </p>

              <p className="about-line text-lg text-gray-400 leading-relaxed">
                My philosophy is simple:
              </p>

              <blockquote className="about-line py-4 px-6 border-y border-emerald-400/30">
                <p className="text-xl text-white italic">
                  "Nothing is impossible when you approach problems with
                  curiosity, persistence, and the right tools."
                </p>
              </blockquote>
            </div>

            {/* Stats grid */}
            <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  className="stat-item group p-6 bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300"
                >
                  <div
                    className={`text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${
                      stat.color === "emerald"
                        ? "from-emerald-400 to-cyan-400"
                        : stat.color === "cyan"
                        ? "from-cyan-400 to-blue-400"
                        : stat.color === "pink"
                        ? "from-pink-400 to-rose-400"
                        : "from-yellow-400 to-orange-400"
                    } bg-clip-text text-transparent`}
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="p-6 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 w-full"
            >
              <span className="text-emerald-400 text-xs uppercase tracking-[0.2em] mb-2 block">
                Mission
              </span>
              <p className="text-lg text-gray-300">
                To build technology that is{" "}
                <span className="text-white font-semibold">reliable</span>,{" "}
                <span className="text-white font-semibold">scalable</span>, and{" "}
                <span className="text-white font-semibold">meaningful</span> —
                software that transforms everyday life.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
