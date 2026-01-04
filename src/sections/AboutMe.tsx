import { motion } from "framer-motion";

export default function AboutMe() {
  return (
    <section
      id="about-me"
      className="relative min-h-[90vh] md:min-h-[unset] w-full pt-16 md:pt-24 pb-20 md:pb-12 overflow-hidden"
    >
      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-cyan-500/12 rounded-full blur-[240px]" />
        <div className="absolute bottom-0 right-1/4 w-[620px] h-[620px] bg-blue-500/10 rounded-full blur-[280px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/10 to-transparent" />
      </div>

      {/* ===================== CONTENT ===================== */}
      <div className="relative z-10 px-12 md:px-24 pb-24">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-20"
        >
          About Me
        </motion.h2>

        {/* ===================== TWO COLUMN CONTENT ===================== */}
        <div className="relative">
          {/* Between-column ambient divider (desktop only) */}
          <div
            className="
              pointer-events-none
              absolute left-1/2 top-0
              h-full w-[1px]
              bg-gradient-to-b
              from-transparent
              via-cyan-400/25
              to-transparent
              hidden md:block
            "
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
            {/* ===================== LEFT COLUMN ===================== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
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

            {/* ===================== RIGHT COLUMN ===================== */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-10"
            >
              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Engineering Mindset
                </h3>
                <p className="text-gray-400">
                  I prefer clear abstractions, predictable behavior, and
                  systems that explain themselves through structure.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
                  Long-Term Thinking
                </h3>
                <p className="text-gray-400">
                  I optimize for maintainability and clarity, not just
                  shipping speed.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">
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
