import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type SectionGuide = {
  id: string;
  heading: string;
  intro: string;
};

const sectionGuides: SectionGuide[] = [
  {
    id: "home",
    heading: "Home",
    intro:
      "Hey, I am Abhishek. This is a quick hello and a simple way to jump into my work or contact me.",
  },
  {
    id: "what-i-do",
    heading: "What I Do",
    intro:
      "Here I share what I enjoy building most: backend systems, APIs, and clean scalable architecture.",
  },
  {
    id: "work",
    heading: "Work",
    intro:
      "This part shows some projects I have built, what problems they solved, and the impact they made.",
  },
  {
    id: "about-me",
    heading: "About Me",
    intro:
      "This is a little more about me, how I think, and the way I like to build software.",
  },
  {
    id: "contact",
    heading: "Contact",
    intro:
      "Want to connect? You can drop me a message here and also find all my social links.",
  },
];

export default function SectionAssistant() {
  const [activeSectionId, setActiveSectionId] = useState(sectionGuides[0].id);
  const [isOpen, setIsOpen] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const jumpTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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
    () => sectionGuides.find((section) => section.id === activeSectionId) ?? sectionGuides[0],
    [activeSectionId]
  );

  const handleAssistantPress = () => {
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
    <div className="fixed bottom-2 right-2 z-50 flex flex-col items-end sm:bottom-3 sm:right-3">
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24 }}
            className="mb-2 w-[260px] rounded-2xl border border-cyan-200/20 bg-[#0a1630]/55 p-4 shadow-[0_14px_36px_rgba(0,0,0,0.32)] backdrop-blur-2xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {active.heading}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-gray-100/90">{active.intro}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={handleAssistantPress}
        aria-label="Personal section assistant"
        animate={isJumping ? { y: [0, -10, 0] } : { y: [0, -5, 0] }}
        transition={
          isJumping
            ? { duration: 0.24, ease: "easeOut" }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        className="assistant-avatar relative flex h-[74px] w-[74px] items-center justify-center rounded-full border border-cyan-300/40 bg-gradient-to-b from-cyan-300/25 to-cyan-500/10 shadow-[0_0_22px_rgba(34,211,238,0.35)]"
      >
        <span className="sr-only">Robot assistant</span>
        <span className="text-[34px] leading-none drop-shadow-[0_0_10px_rgba(34,211,238,0.35)]">
          🤖
        </span>

        <span className="pointer-events-none absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border border-white/40 bg-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
      </motion.button>
    </div>
  );
}
