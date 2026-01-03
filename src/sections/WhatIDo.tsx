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

  // Measure tallest content once
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
      id="about"
      className="relative w-full py-20 overflow-hidden"
    >
      {/* ================= AMBIENT SECTION LIGHT ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-1/2 w-[500px] h-[500px] -translate-y-1/2 bg-cyan-500/8 rounded-full blur-[260px]" />
      </div>

      <div className="relative px-12 md:px-24 max-w-6xl mx-auto z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-14">
          What I Do
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16">
          {/* ================= LEFT STEPS ================= */}
          <div className="relative">
            {/* Subtle base guide (optional, very light) */}
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
                    <div className="flex items-center gap-5">
                      {/* Step number */}
                      <div
                        className={`
                          w-9 h-9 flex items-center justify-center
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

        {/* ================= HIDDEN MEASUREMENT ================= */}
        <div
          ref={measureRef}
          className="absolute opacity-0 pointer-events-none -z-10"
        >
          {capabilities.map((item) => (
            <div key={item.id} className="max-w-xl">
              <h3 className="text-2xl font-semibold mb-4">
                {item.title}
              </h3>
              <p className="mb-6">{item.description}</p>
              <ul>
                {item.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
