import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

type SectionGuide = {
  id: string;
  heading: string;
  intro: string;
  emoji: string;
};

const sectionGuides: SectionGuide[] = [
  {
    id: "home",
    heading: "Home",
    emoji: "👋",
    intro: "Hey, I'm Abhishek. This is a quick hello and a simple way to jump into my work or contact me.",
  },
  {
    id: "what-i-do",
    heading: "What I Do",
    emoji: "⚙️",
    intro: "I share what I enjoy building most: backend systems, APIs, and clean scalable architecture.",
  },
  {
    id: "skills",
    heading: "Skills",
    emoji: "🚀",
    intro: "Explore the technologies I use daily — hover the orbit to interact with each tech.",
  },
  {
    id: "work",
    heading: "Work",
    emoji: "💼",
    intro: "Some projects I've built, the problems they solved, and the impact they made.",
  },
  {
    id: "about-me",
    heading: "About Me",
    emoji: "🧠",
    intro: "A bit more about how I think and the way I like to build software.",
  },
  {
    id: "contact",
    heading: "Contact",
    emoji: "✉️",
    intro: "Want to connect? Drop me a message here — or reach me via social links.",
  },
];

export default function SectionAssistant() {
  const [activeSectionId, setActiveSectionId] = useState(sectionGuides[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const jumpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ================= SCROLL SPY ================= */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (!visible.length) return;
        const topMost = visible.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
        );
        setActiveSectionId(topMost.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    sectionGuides.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const active = useMemo(
    () => sectionGuides.find((s) => s.id === activeSectionId) ?? sectionGuides[0],
    [activeSectionId]
  );

  const handlePress = () => {
    setIsJumping(true);
    if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    jumpTimeoutRef.current = setTimeout(() => setIsJumping(false), 240);
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    return () => {
      if (jumpTimeoutRef.current) clearTimeout(jumpTimeoutRef.current);
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

      {/* Tooltip Card */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mb-3 w-[270px] rounded-2xl overflow-hidden shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
          >
            {/* Gradient border top */}
            <div className="h-[1px] w-full bg-gradient-to-r from-cyan-400/60 via-blue-400/40 to-transparent" />

            <div className="bg-[#080f20]/80 backdrop-blur-2xl border border-cyan-300/15 border-t-0 rounded-b-2xl p-4">
              {/* Header row */}
              <div className="flex items-center gap-2 mb-2.5">
                <span className="text-lg leading-none">{active.emoji}</span>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400 flex-1">
                  {active.heading}
                </p>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-5 h-5 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>

              <p className="text-[13px] leading-relaxed text-slate-300/90">{active.intro}</p>

              {/* Section dots */}
              <div className="flex items-center gap-1.5 mt-3.5">
                {sectionGuides.map((s) => (
                  <div
                    key={s.id}
                    className={`h-1 rounded-full transition-all duration-300 ${s.id === activeSectionId
                        ? "w-4 bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.7)]"
                        : "w-1 bg-slate-600"
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Button */}
      <motion.button
        type="button"
        onClick={handlePress}
        aria-label="Section assistant"
        animate={
          isJumping
            ? { y: [0, -12, 0] }
            : isOpen
              ? { y: 0 }
              : { y: [0, -5, 0] }
        }
        transition={
          isJumping
            ? { duration: 0.22, ease: "easeOut" }
            : isOpen
              ? { duration: 0.1 }
              : { duration: 2.4, repeat: Infinity, ease: "easeInOut" }
        }
        className="assistant-avatar relative flex h-[68px] w-[68px] items-center justify-center rounded-full border border-cyan-300/35 bg-gradient-to-b from-cyan-400/20 to-cyan-600/10 shadow-[0_0_24px_rgba(34,211,238,0.3)] hover:shadow-[0_0_32px_rgba(34,211,238,0.45)] transition-shadow"
      >
        <span className="sr-only">Robot assistant</span>

        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={isOpen ? "open" : "closed"}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            className="text-[30px] leading-none drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]"
          >
            {isOpen ? "🤖" : "🤖"}
          </motion.span>
        </AnimatePresence>

        {/* Online indicator */}
        <span className="pointer-events-none absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full border border-slate-900 bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.9)]" />

        {/* Open badge */}
        {isOpen && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute -bottom-1 -right-1 h-5 w-5 flex items-center justify-center rounded-full bg-cyan-400 border-2 border-slate-900 shadow-md"
          >
            <X className="w-2.5 h-2.5 text-slate-900" />
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
