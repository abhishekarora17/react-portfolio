import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Server, Zap, Activity } from "lucide-react";

const capabilities = [
  {
    id: "01",
    icon: Server,
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
    icon: Zap,
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
    icon: Activity,
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
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  // Auto-advance every 4 seconds
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % capabilities.length);
    }, 4000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    startTimer(); // Reset timer on manual click
  };

  return (
    <section
      id="what-i-do"
      className="relative min-h-[90vh] md:min-h-[unset] w-full pt-16 md:pt-24 pb-24 overflow-hidden"
    >
      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-[520px] h-[520px] bg-cyan-500/10 rounded-full blur-[240px]" />
        <div className="absolute bottom-0 right-1/4 w-[620px] h-[300px] bg-blue-500/8 rounded-full blur-[280px]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 px-8 md:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-cyan-400 uppercase mb-3">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold">What I Do</h2>
        </motion.div>

        {/* ================= TWO COLUMN LAYOUT ================= */}
        <div className="relative">
          <div
            className="pointer-events-none absolute left-[280px] top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent hidden md:block"
          />

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16">
            {/* ================= LEFT: STEP SELECTOR ================= */}
            <div className="space-y-3">
              {capabilities.map((item, index) => {
                const isActive = index === activeIndex;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleClick(index)}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`group w-full text-left rounded-xl p-4 transition-all border ${isActive
                        ? "border-cyan-400/30 bg-cyan-400/5 shadow-[0_0_20px_rgba(34,211,238,0.08)]"
                        : "border-transparent hover:border-white/10 hover:bg-white/[0.02]"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${isActive
                            ? "bg-cyan-400/20 text-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.3)]"
                            : "bg-white/5 text-gray-500 group-hover:text-gray-300"
                          }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <span className={`block text-[10px] font-mono tracking-widest mb-0.5 ${isActive ? "text-cyan-400" : "text-gray-600"}`}>
                          {item.id}
                        </span>
                        <span className={`font-medium text-sm transition ${isActive ? "text-white" : "text-gray-400"}`}>
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* ================= RIGHT: DETAIL PANEL ================= */}
            <div className="relative" style={{ minHeight: panelHeight ?? "auto" }}>
              {/* Hidden measure container */}
              <div ref={measureRef} className="absolute invisible pointer-events-none">
                {capabilities.map((item) => (
                  <div key={item.id} className="py-4">
                    <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                    <p className="mb-6">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.points.map((p) => <span key={p}>{p}</span>)}
                    </div>
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
                  className="py-4"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">{active.title}</h3>

                  <p className="text-gray-400 max-w-xl mb-8 leading-relaxed">{active.description}</p>

                  {/* Pill badges */}
                  <div className="flex flex-wrap gap-3">
                    {active.points.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 text-cyan-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* Auto-advance progress bar */}
                  <div className="mt-10 h-px w-full bg-white/5 relative overflow-hidden rounded-full">
                    <motion.div
                      key={activeIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400/60 to-cyan-400 rounded-full"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
