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

  useEffect(() => {
    if (!measureRef.current) return;
    let max = 0;
    Array.from(measureRef.current.children).forEach((el) => {
      max = Math.max(max, (el as HTMLElement).offsetHeight);
    });
    setPanelHeight(max);
  }, []);

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
    startTimer();
  };

  return (
    <section
      id="what-i-do"
      className="relative min-h-[90vh] md:min-h-[unset] w-full pt-16 md:pt-28 pb-28 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 left-1/4 w-[560px] h-[560px] bg-cyan-500/7 rounded-full blur-[260px]" />
        <div className="absolute bottom-0 right-1/4 w-[480px] h-[300px] bg-violet-500/6 rounded-full blur-[220px]" />
      </div>

      <div className="relative z-10 px-8 md:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-16"
        >
          <p className="eyebrow">Capabilities</p>
          <h2 className="text-3xl md:text-4xl font-bold">What I Do</h2>
        </motion.div>

        {/* Two column */}
        <div className="relative">
          <div className="pointer-events-none absolute left-[280px] top-0 h-full w-px bg-gradient-to-b from-transparent via-white/6 to-transparent hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-16">
            {/* LEFT: Step selector */}
            <div className="space-y-2">
              {capabilities.map((item, index) => {
                const isActive = index === activeIndex;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleClick(index)}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className={`group w-full text-left rounded-xl p-4 transition-all border ${
                      isActive
                        ? "border-cyan-400/25 bg-gradient-to-r from-cyan-400/8 to-indigo-500/5 shadow-[0_0_24px_rgba(34,211,238,0.07)]"
                        : "border-transparent hover:border-white/8 hover:bg-white/[0.02]"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-lg transition-all ${
                          isActive
                            ? "bg-gradient-to-br from-cyan-400/25 to-indigo-500/20 text-cyan-300 shadow-[0_0_16px_rgba(34,211,238,0.25)]"
                            : "bg-white/4 text-slate-600 group-hover:text-slate-400"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      <div>
                        <span
                          className={`block text-[10px] font-mono tracking-[0.2em] mb-0.5 ${
                            isActive ? "text-cyan-400" : "text-slate-700"
                          }`}
                        >
                          {item.id}
                        </span>
                        <span
                          className={`font-semibold text-sm transition ${
                            isActive ? "text-white" : "text-slate-500"
                          }`}
                        >
                          {item.title}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* RIGHT: Detail panel */}
            <div className="relative" style={{ minHeight: panelHeight ?? "auto" }}>
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
                  transition={{ duration: 0.3 }}
                  className="py-4"
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 tracking-tight">{active.title}</h3>

                  <p className="text-slate-400 max-w-xl mb-8 leading-relaxed">{active.description}</p>

                  <div className="flex flex-wrap gap-2.5">
                    {active.points.map((p) => (
                      <span
                        key={p}
                        className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full border border-cyan-400/15 bg-gradient-to-r from-cyan-400/6 to-indigo-500/4 text-cyan-300/90 backdrop-blur-sm"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80" />
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-10 h-px w-full bg-white/4 relative overflow-hidden rounded-full">
                    <motion.div
                      key={activeIndex}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 4, ease: "linear" }}
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400/50 via-indigo-400/60 to-cyan-400 rounded-full"
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
