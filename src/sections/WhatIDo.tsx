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

  // Lock panel height to tallest content
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
      className="relative min-h-[90vh] md:min-h-[unset] w-full pt-16 md:pt-24 pb-24 md:pb-24 overflow-hidden"
    >
      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-[520px] h-[520px] bg-cyan-500/12 rounded-full blur-[240px]" />
        <div className="absolute bottom-0 right-1/4 w-[620px] h-[300px] bg-blue-500/10 rounded-full blur-[280px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/10 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 px-12 md:px-24">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-14"
        >
          What I Do
        </motion.h2>

        {/* ================= TWO COLUMN LAYOUT ================= */}
        <div className="relative">
          {/* Vertical ambient divider (desktop only) */}
          <div
            className="
              pointer-events-none
              absolute left-[260px] top-0
              h-full w-px
              bg-gradient-to-b
              from-transparent
              via-cyan-400/25
              to-transparent
              hidden md:block
            "
          />

          <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-20">
            {/* ================= LEFT: STEP SELECTOR ================= */}
            <div className="space-y-10">
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
                              ? "bg-cyan-400/25 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.35)]"
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

            {/* ================= RIGHT: DETAIL PANEL ================= */}
            <div
              className="relative"
              style={{ minHeight: panelHeight ?? "auto" }}
            >
              {/* Hidden measure container */}
              <div
                ref={measureRef}
                className="absolute invisible pointer-events-none"
              >
                {capabilities.map((item) => (
                  <div key={item.id}>
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

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
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
