import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";

/* ===================== STAT COUNTER ===================== */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1500;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

const stats = [
  { label: "Years Experience", value: 4, suffix: "+" },
  { label: "Projects Shipped", value: 10, suffix: "+" },
  { label: "Technologies", value: 8, suffix: "+" },
];

const principles = [
  {
    title: "Engineering Mindset",
    body: "I prefer clear abstractions, predictable behavior, and systems that explain themselves through structure.",
  },
  {
    title: "Long-Term Thinking",
    body: "I optimize for maintainability and clarity, not just shipping speed.",
  },
  {
    title: "Ownership",
    body: "I take responsibility for the systems I build — from design decisions to production behavior.",
  },
];

export default function AboutMe() {
  const navigate = useNavigate();

  return (
    <section
      id="about-me"
      className="relative min-h-[90vh] md:min-h-[unset] w-full pt-16 md:pt-24 pb-20 overflow-hidden"
    >
      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-cyan-500/10 rounded-full blur-[240px]" />
        <div className="absolute bottom-0 right-1/4 w-[620px] h-[620px] bg-blue-500/8 rounded-full blur-[280px]" />
      </div>

      {/* ===================== CONTENT ===================== */}
      <div className="relative z-10 px-8 md:px-24 pb-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.3em] text-cyan-400 uppercase mb-3">Who I Am</p>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
        </motion.div>

        {/* ===================== ANIMATED STATS ===================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-16 max-w-xl"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-card p-5 text-center"
            >
              <div className="text-3xl font-bold text-cyan-400 mb-1 font-mono">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-muted leading-tight">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* ===================== TWO COLUMN CONTENT ===================== */}
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* LEFT COLUMN */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-soft leading-relaxed mb-6">
                I'm a backend-focused software developer who enjoys building
                systems that are reliable, understandable, and built to last.
              </p>

              <p className="text-soft leading-relaxed mb-6">
                Over the years, I've worked on products where correctness,
                performance, and scalability mattered more than quick wins.
                I care deeply about writing code that other engineers can
                confidently work with months or years later.
              </p>

              <p className="text-soft leading-relaxed">
                I'm most comfortable working close to the core of a system —
                designing APIs, structuring data, and solving problems that
                don't always have obvious answers.
              </p>
            </motion.div>

            {/* RIGHT COLUMN — Principle Glass Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass-card p-5"
                >
                  <h3 className="text-base font-semibold mb-1.5 text-theme">{p.title}</h3>
                  <p className="text-soft text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              ))}

              <button
                onClick={() => navigate("/about")}
                className="mt-4 inline-flex items-center gap-2 border border-cyan-400/30 text-cyan-400 px-4 py-2.5 rounded-lg hover:bg-cyan-400/10 transition text-sm"
              >
                Read more about me →
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
