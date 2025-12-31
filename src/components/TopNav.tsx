import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "HOME" },
  { id: "about", label: "WHAT I DO" },
  { id: "work", label: "WORK" },
  { id: "contact", label: "CONTACT" },
];

export default function TopNav() {
  const [active, setActive] = useState("home");
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Track active section on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Move underline smoothly
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;

    const activeIndex = sections.findIndex((s) => s.id === active);
    const navItem = navRef.current.children[activeIndex] as HTMLElement;
    if (!navItem) return;

    indicatorRef.current.style.transform = `translateX(${navItem.offsetLeft}px)`;
    indicatorRef.current.style.width = `${navItem.offsetWidth}px`;
  }, [active]);

  return (
    <header
      className="
        fixed top-0 left-0 right-0
        z-50
        bg-black/80 backdrop-blur-md
        border-b border-gray-900/50
      "
    >
      <nav className="max-w-10xl  px-12 md:px-24 h-16 flex items-center justify-between">
        {/* LOGO (LEFT) */}
        <button
          onClick={() =>
            document
              .getElementById("home")
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
          className="
            text-lg font-semibold tracking-wide
            text-white hover:text-cyan-400
            transition-colors
          "
        >
          Abhishek
        </button>

        {/* NAV ITEMS (RIGHT) */}
        <ul
          ref={navRef}
          className="relative flex gap-10 text-sm tracking-widest"
        >
          {/* MOVING ACTIVE INDICATOR */}
          <motion.div
            ref={indicatorRef}
            className="
              absolute -bottom-1 h-[2px]
              bg-cyan-400
              shadow-[0_0_10px_rgba(34,211,238,0.6)]
            "
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
          />

          {sections.map((section) => {
            const isActive = active === section.id;

            return (
              <li key={section.id}>
                <button
                  onClick={() =>
                    document
                      .getElementById(section.id)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className={`
                    py-2 transition-colors
                    ${
                      isActive
                        ? "text-cyan-400"
                        : "text-gray-400 hover:text-gray-200"
                    }
                  `}
                >
                  {section.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
