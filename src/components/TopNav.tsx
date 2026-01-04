import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

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

  /* ---------- SCROLL SPY ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        const topMost = visible.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top
            ? prev
            : curr
        );

        setActive(topMost.target.id);
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  /* ---------- ACTIVE INDICATOR ---------- */
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;

    const index = sections.findIndex((s) => s.id === active);
    const item = navRef.current.children[index + 1] as HTMLElement;
    // +1 because motion.div is first child

    if (!item) return;

    indicatorRef.current.style.transform = `translateX(${item.offsetLeft}px)`;
    indicatorRef.current.style.width = `${item.offsetWidth}px`;
  }, [active]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
      {/* ===== BLUE AMBIENT BACKGROUND ===== */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft cyan glow */}
        <div
          className="
        absolute left-1/4 top-1/2
        w-[420px] h-[420px]
        -translate-y-1/2
        bg-cyan-500/20
        rounded-full
        blur-[200px]
      "
        />

        {/* Subtle gradient wash */}
        <div
          className="
        absolute inset-0
        bg-gradient-to-r
        from-black/90
        via-blue-950/40
        to-black/90
      "
        />
      </div>

      {/* ===== NAV CONTENT ===== */}
      <nav className="relative max-w-7xl mx-8 px-20 h-16 flex items-center justify-between backdrop-blur-md border-b border-white/10">
        {/* LOGO */}
        <button
          onClick={() => {
            setActive("home");
            document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="
            flex items-center justify-between pt-3
            text-white hover:text-cyan-800
            transition
          "
        >
          <img
            src={logo}
            alt="Abhishek Logo"
            className="w-24 h-24 object-contain"
          />
        </button>

        {/* NAV */}
        <ul
          ref={navRef}
          className="relative hidden ml-20 md:flex gap-10 h-full items-center text-sm tracking-widest"
        >
          {/* ACTIVE BAR */}
          <motion.div
            ref={indicatorRef}
            className="absolute bottom-0 h-[2px] bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />

          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => {
                  setActive(section.id);
                  document
                    .getElementById(section.id)
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
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
