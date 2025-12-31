import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const capabilities = [
  {
    id: "01",
    title: "Backend Systems",
    description:
      "I design backend systems focused on clarity, maintainability, and long-term scalability.",
    points: [
      "Service–repository separation",
      "Role & permission-driven logic",
      "Business rules designed to evolve",
    ],
  },
  {
    id: "02",
    title: "APIs & Architecture",
    description:
      "I treat APIs as products — predictable, secure, and versioned.",
    points: [
      "REST & GraphQL best practices",
      "JWT authentication flows",
      "Clear versioning & documentation",
    ],
  },
  {
    id: "03",
    title: "Performance & Scale",
    description:
      "I focus on performance early so systems stay fast as data, traffic, and complexity grow.",
    points: [
      "Query optimization & indexing",
      "Redis caching strategies",
      "Queues & background jobs",
    ],
  },
];

export default function WhatIDo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = capabilities[activeIndex];

  return (
    <section
      id="about"
      className="relative w-full py-20 overflow-hidden"
    >
      {/* Subtle ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 w-[480px] h-[480px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/6 rounded-full blur-[240px]" />
      </div>

      <div className="relative flex flex-col justify-center px-12 md:px-24">
        {/* Header */}
        <h2 className="text-3xl md:text-4xl font-bold mb-14">
          What I Do
        </h2>

        {/* ================= MAIN LAYOUT ================= */}
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16">
          {/* ================= LEFT SELECTOR ================= */}
          <div className="space-y-8">
            {capabilities.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveIndex(index)}
                  className="
                    group w-full text-left
                    focus:outline-none
                  "
                >
                  <div className="flex items-center gap-5">
                    {/* Index */}
                    <div
                      className={`
                        w-9 h-9 flex items-center justify-center
                        rounded-full text-xs font-mono
                        transition
                        ${
                          isActive
                            ? "bg-cyan-400/20 text-cyan-300"
                            : "bg-white/5 text-gray-400 group-hover:text-gray-200"
                        }
                      `}
                    >
                      {item.id}
                    </div>

                    {/* Title */}
                    <span
                      className={`
                        text-lg transition
                        ${
                          isActive
                            ? "text-white"
                            : "text-gray-400 group-hover:text-gray-200"
                        }
                      `}
                    >
                      {item.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {active.title}
                </h3>

                <p className="text-gray-400 max-w-xl mb-6 leading-relaxed">
                  {active.description}
                </p>

                <ul className="space-y-2 text-sm text-gray-300">
                  {active.points.map((point) => (
                    <li key={point}>— {point}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
