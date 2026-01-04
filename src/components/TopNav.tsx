import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "HOME" },
  { id: "what-i-do", label: "WHAT I DO" },
  { id: "work", label: "WORK" },
  { id: "about-me", label: "ABOUT ME" },
  { id: "contact", label: "CONTACT" },
];

export default function TopNav() {
  const [active, setActive] = useState("home");
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // ===== Accurate active section tracking =====
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActive(visible.target.id);
        }
      },
      {
        rootMargin: "-40% 0px -40% 0px",
        threshold: [0.25, 0.5, 0.75],
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // ===== Desktop underline sync =====
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;

    const index = sections.findIndex((s) => s.id === active);
    const item = navRef.current.children[index] as HTMLElement;

    if (!item) return;

    indicatorRef.current.style.transform = `translateX(${item.offsetLeft}px)`;
    indicatorRef.current.style.width = `${item.offsetWidth}px`;
  }, [active]);

  return (
    <header
      className="
        fixed top-0 left-0 right-0
        z-50
        backdrop-blur-md
        bg-gradient-to-r
        from-black/100
        via-blue-950/40
        to-black/100
        border-b border-white/10
      "
    >
      <nav className="max-w-7xl px-20 md:px-24 h-16 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() =>
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="text-lg font-semibold tracking-wide text-white hover:text-cyan-400 transition"
        >
          Abhishek
        </button>

        {/* DESKTOP NAV ONLY */}
        <ul
          ref={navRef}
          className="relative hidden md:flex gap-10 text-sm tracking-widest left-20 right-0"
        >
          {/* ACTIVE BAR */}
          <motion.div
            ref={indicatorRef}
            className="
              absolute -bottom-1 h-[2px]
              bg-cyan-400
              shadow-[0_0_12px_rgba(34,211,238,0.6)]
            "
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />

          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() =>
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className={`py-2 transition-colors ${
                  active === section.id
                    ? "text-cyan-400"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
