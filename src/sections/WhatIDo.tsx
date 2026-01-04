import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

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
  const [panelHeight, setPanelHeight] = useState<number | null>(null);
  const measureRef = useRef<HTMLDivElement>(null);

  const active = capabilities[activeIndex];

  // Measure tallest content once (prevents layout jump)
  useEffect(() => {
    if (!measureRef.current) return;

    let max = 0;
    Array.from(measureRef.current.children).forEach((el) => {
      max = Math.max(max, (el as HTMLElement).offsetHeight);
    });

    setPanelHeight(max);
  }, []);

  return (
  <section
    id="what-i-do"
    className="relative w-full min-h-screen overflow-hidden"
  >
    {/* ================= AMBIENT SECTION LIGHT ================= */}
    <div className="absolute inset-0 pointer-events-none">
      {/* Primary ambient */}
      <div
        className="
          absolute left-1/3 top-1/2
          w-[520px] h-[420px]
          -translate-y-1/2 -translate-x-1/2
          bg-cyan-500/10
          rounded-full
          blur-[260px]
        "
      />

      {/* Secondary soft ambient */}
      <div
        className="
          absolute right-1/4 bottom-1/3
          w-[600px] h-[480px]
          bg-blue-500/6
          rounded-full
          blur-[300px]
        "
      />

      {/* Subtle gradient wash */}
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
    <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-12">
      <div className="w-full max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What I Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[320px_1fr] gap-16">
          {/* ================= LEFT STEPS ================= */}
          <div className="relative">
            <div className="absolute left-[18px] top-0 h-full w-px bg-white/8" />

            <div className="space-y-8">
              {capabilities.map((item, index) => {
                const isActive = index === activeIndex;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className="group w-full text-left"
                  >
                    <div className="flex items-center gap-6">
                      <div
                        className={`
                          w-10 h-10 flex items-center justify-center
                          rounded-full text-xs font-mono
                          transition
                          ${
                            isActive
                              ? "bg-cyan-400/25 text-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.35)]"
                              : "bg-white/5 text-gray-400 group-hover:text-gray-200"
                          }
                        `}
                      >
                        {item.id}
                      </div>

                      <span
                        className={`text-lg transition ${
                          isActive ? "text-white" : "text-gray-400"
                        }`}
                      >
                        {item.title}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= RIGHT PANEL (HEIGHT LOCKED) ================= */}
          <div
            className="relative"
            style={{ minHeight: panelHeight ?? "auto" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-2xl font-semibold mb-4">
                  {active.title}
                </h3>

                <p className="text-gray-400 max-w-xl mb-6">
                  {active.description}
                </p>

                <ul className="space-y-2 text-sm text-gray-300">
                  {active.points.map((p) => (
                    <li key={p}>— {p}</li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
