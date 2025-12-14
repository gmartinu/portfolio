/* eslint-disable react-hooks/purity */
import { useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, useInView } from "framer-motion";

const skills = [
  {
    name: "React",
    level: "Expert",
    years: "8 years",
    description:
      "Building complex UIs with hooks, context, and modern patterns",
    gridArea: "react",
    accent: "cyan",
  },
  {
    name: "Python",
    level: "Expert",
    years: "6 years",
    description: "Django, FastAPI, data processing, automation",
    gridArea: "python",
    accent: "yellow",
  },
  {
    name: "TypeScript",
    level: "Expert",
    years: "4 years",
    description: "Type-safe applications with advanced generics",
    gridArea: "typescript",
    accent: "blue",
  },
  {
    name: "Golang",
    level: "Advanced",
    years: "2 years",
    description: "High-performance APIs and microservices",
    gridArea: "golang",
    accent: "emerald",
  },
  {
    name: "AWS",
    level: "Advanced",
    years: "ECS/Fargate",
    description: "Cloud infrastructure and containerized deployments",
    gridArea: "aws",
    accent: "orange",
  },
  {
    name: "Docker",
    level: "Advanced",
    years: "3 years",
    description: "Containerization and orchestration",
    gridArea: "docker",
    accent: "sky",
  },
];

const accentColors = {
  cyan: "from-cyan-400 to-blue-500",
  yellow: "from-yellow-400 to-orange-500",
  blue: "from-blue-400 to-indigo-500",
  emerald: "from-emerald-400 to-cyan-500",
  orange: "from-orange-400 to-red-500",
  sky: "from-sky-400 to-cyan-500",
  pink: "from-pink-400 to-rose-500",
};

export default function Skills() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="py-16 pb-32 px-6 md:px-12 lg:px-20 relative overflow-hidden flex flex-col items-center"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.015]">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-white/20 rounded-lg"
            style={{
              width: `${Math.random() * 200 + 100}px`,
              height: `${Math.random() * 200 + 100}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 45}deg)`,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-5xl mx-auto relative">
        {/* Header */}
        <div className="mb-20 text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-emerald-400 text-sm uppercase tracking-[0.3em] mb-4 block"
          >
            Tech Stack
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Skills & Tools
          </motion.h2>
          <div className="align-center justify-center flex">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              className="text-gray-400 mx-auto p-2 max-w-2xl"
            >
              A curated collection of technologies I've mastered over 8+ years
              of building software.
            </motion.p>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 auto-rows-[140px] md:auto-rows-[160px]">
          {skills.map((skill, index) => {
            // Determine grid span based on index for varied layout
            const spans = [
              "col-span-2 row-span-2",
              "col-span-2 row-span-1",
              "col-span-2 row-span-1",
              "col-span-2 row-span-2",
              "col-span-2 row-span-1",
              "col-span-2 row-span-1",
            ];

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`${spans[index]} group relative p-6 bg-white/[0.02] border border-white/5 hover:border-white/20 transition-all duration-500 overflow-hidden`}
              >
                {/* Gradient background on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    accentColors[skill.accent]
                  } opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                />

                {/* Top accent line */}
                <div
                  className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${
                    accentColors[skill.accent]
                  } transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`text-xs font-mono px-2 py-1 bg-gradient-to-r ${
                          accentColors[skill.accent]
                        } bg-clip-text text-transparent border border-white/10`}
                      >
                        {skill.level}
                      </span>
                      <span className="text-xs text-gray-600">
                        {skill.years}
                      </span>
                    </div>
                    <h3
                      className="text-2xl md:text-3xl font-bold mb-2"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {skill.name}
                    </h3>
                  </div>

                  <p className="text-sm text-gray-500 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {skill.description}
                  </p>
                </div>

                {/* Corner decoration */}
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-white/5 group-hover:border-white/20 transition-colors" />
              </motion.div>
            );
          })}

          {/* Additional tools - smaller cards */}
          {["CI/CD", "PostgreSQL", "Redis", "GraphQL"].map((tool, index) => (
            <motion.div
              key={tool}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="col-span-1 group p-4 bg-white/[0.02] border border-white/5 hover:border-emerald-500/30 transition-all duration-300 flex items-center justify-center"
            >
              <span className="text-sm font-medium text-gray-400 group-hover:text-emerald-400 transition-colors">
                {tool}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
          className="pt-6 text-center"
        >
          <p className="text-gray-600 text-sm">
            Always learning. Currently exploring{" "}
            <span className="text-emerald-400">Rust</span> and{" "}
            <span className="text-emerald-400">WebAssembly</span>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
