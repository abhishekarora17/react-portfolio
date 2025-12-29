import { motion } from "framer-motion";

const capabilities = [
  {
    id: "01",
    title: "Backend Systems",
    description:
      "I design backend systems that prioritize clarity, maintainability, and long-term scalability over short-term hacks.",
    points: [
      "Clean service–repository separation",
      "Role & permission-driven logic",
      "Business rules designed to evolve",
    ],
  },
  {
    id: "02",
    title: "APIs & Architecture",
    description:
      "I treat APIs as products — predictable, secure, and versioned — built for developers who didn’t write them.",
    points: [
      "REST & GraphQL best practices",
      "JWT-based authentication flows",
      "Clear versioning & documentation",
    ],
  },
  {
    id: "03",
    title: "Performance & Scale",
    description:
      "I design systems to stay fast as data, traffic, and complexity grow — not after they break.",
    points: [
      "Query optimization & indexing",
      "Caching with Redis & memory layers",
      "Queues, background jobs, cron workflows",
    ],
  },
];

export default function WhatIDo() {
  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* ================= SUBTLE SECTION AMBIENT ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-1/2 w-[600px] h-[600px] -translate-y-1/2 bg-cyan-500/8 rounded-full blur-[260px]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-12 md:px-24">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-24"
        >
          What I Do
        </motion.h2>

        {/* ================= CAPABILITY LIST ================= */}
        <div className="relative">
          {/* Vertical guide line */}
          <div
            className="
              absolute left-4 top-0 h-full w-px
              bg-gradient-to-b
              from-transparent
              via-cyan-400/30
              to-transparent
            "
          />

          <div className="space-y-24">
            {capabilities.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative pl-16"
              >
                {/* Index marker */}
                <div
                  className="
                    absolute left-0 top-1
                    w-8 h-8
                    rounded-full
                    bg-cyan-400/15
                    text-cyan-300
                    flex items-center justify-center
                    text-xs font-mono
                  "
                >
                  {item.id}
                </div>

                <h3 className="text-2xl font-semibold mb-4">
                  {item.title}
                </h3>

                <p className="text-gray-400 max-w-2xl mb-6 leading-relaxed">
                  {item.description}
                </p>

                <ul className="space-y-2 text-sm text-gray-300">
                  {item.points.map((point) => (
                    <li key={point}>— {point}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
