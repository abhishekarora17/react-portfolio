import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1400;
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

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { label: "Years Experience", value: 3, suffix: "+" },
  { label: "Projects Shipped", value: 8, suffix: "+" },
  { label: "Technologies", value: 6, suffix: "+" },
];

const principles = [
  {
    title: "Engineering Mindset",
    body: "I prefer clear abstractions, predictable behavior, and systems that explain themselves through structure.",
    accent: "from-cyan-400/20 to-cyan-400/0",
  },
  {
    title: "Long-Term Thinking",
    body: "I optimize for maintainability and clarity, not just shipping speed.",
    accent: "from-indigo-400/20 to-indigo-400/0",
  },
  {
    title: "Ownership",
    body: "I take responsibility for the systems I build — from design decisions to production behavior.",
    accent: "from-violet-400/20 to-violet-400/0",
  },
];

export default function AboutMe() {
  const navigate = useNavigate();

  return (
    <section
      id="about-me"
      className="relative min-h-[90vh] md:min-h-[unset] w-full pt-16 md:pt-28 pb-24 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-cyan-500/7 rounded-full blur-[260px]" />
        <div className="absolute bottom-0 right-1/4 w-[620px] h-[620px] bg-indigo-500/6 rounded-full blur-[300px]" />
      </div>

      <div className="relative z-10 px-8 md:px-24 pb-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-14"
        >
          <p className="eyebrow">Who I Am</p>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="grid grid-cols-3 gap-4 mb-16 max-w-lg"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card p-5 text-center gradient-border"
            >
              <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-indigo-400 mb-1 font-mono">
                <Counter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-xs text-slate-500 leading-tight">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Two column */}
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent hidden md:block" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-slate-300 leading-relaxed mb-5 font-medium">
                I'm a backend-focused software developer who enjoys building
                systems that are reliable, understandable, and built to last.
              </p>

              <p className="text-slate-500 leading-relaxed mb-5">
                Over the years, I've worked on products where correctness,
                performance, and scalability mattered more than quick wins.
                I care deeply about writing code that other engineers can
                confidently work with months or years later.
              </p>

              <p className="text-slate-500 leading-relaxed">
                I'm most comfortable working close to the core of a system —
                designing APIs, structuring data, and solving problems that
                don't always have obvious answers.
              </p>
            </motion.div>

            {/* Right: Principle cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="relative rounded-xl p-5 overflow-hidden border border-white/[0.04] bg-gradient-to-br from-white/[0.035] to-transparent backdrop-blur-sm hover:border-white/[0.07] transition-all duration-300"
                >
                  <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r ${p.accent}`} />
                  <h3 className="text-sm font-semibold mb-1.5 text-white">{p.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              ))}

              <button
                onClick={() => navigate("/about")}
                className="mt-4 inline-flex items-center gap-2 text-sm text-cyan-400/80 hover:text-cyan-300 transition-colors group"
              >
                Read more about me
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
