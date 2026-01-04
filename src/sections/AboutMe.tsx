import { motion } from "framer-motion";

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* ================= LAYERED BLUE AMBIENT ================= */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Primary ambient (slightly stronger) */}
        <div
          className="
            absolute right-1/4 top-1/2
            w-[480px] h-[480px]
            -translate-y-1/2
            bg-cyan-500/10
            rounded-full
            blur-[240px]
          "
        />

        {/* Secondary ambient (very soft & wide) */}
        <div
          className="
            absolute left-1/4 bottom-1/3
            w-[600px] h-[600px]
            bg-blue-500/10
            rounded-full
            blur-[300px]
          "
        />

        {/* Cinematic gradient wash */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-transparent
            via-blue-900/10
            to-transparent
          "
        />
      </div>

      {/* ================= CENTERED CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-12 md:px-24">
        <div className="w-full px-6 md:px-6 max-w-6xl">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-16"
          >
            About Me
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* ================= LEFT: STORY ================= */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                I’m a backend-focused software developer who enjoys building
                systems that are reliable, understandable, and built to last.
              </p>

              <p className="text-gray-400 leading-relaxed mb-6">
                Over the years, I’ve worked on products where correctness,
                performance, and scalability mattered more than quick wins.
                I care deeply about writing code that other engineers can
                confidently work with months or years later.
              </p>

              <p className="text-gray-400 leading-relaxed">
                I’m most comfortable working close to the core of a system —
                designing APIs, structuring data, and solving problems that
                don’t always have obvious answers.
              </p>
            </motion.div>

            {/* ================= RIGHT: PRINCIPLES ================= */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Engineering Mindset
                </h3>
                <p className="text-gray-400">
                  I prefer clear abstractions, predictable behavior, and
                  systems that explain themselves through structure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Long-Term Thinking
                </h3>
                <p className="text-gray-400">
                  I optimize for maintainability and clarity, not just
                  shipping speed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Ownership
                </h3>
                <p className="text-gray-400">
                  I take responsibility for the systems I build — from design
                  decisions to production behavior.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
