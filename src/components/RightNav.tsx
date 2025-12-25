import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "home", label: "HOME" },
  { id: "work", label: "WORK" },
  { id: "about", label: "ABOUT" },
  { id: "contact", label: "CONTACT" },
];

export default function RightNav() {
  const [active, setActive] = useState("home");
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const activeIndex = sections.findIndex((s) => s.id === active);

  return (
    <nav
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="
        fixed top-0 right-0 h-full w-10
        z-50
        flex items-center justify-center
        pointer-events-auto
      "
    >
      <div className="relative h-64 w-full flex justify-center">
        
        {/* EDGE LINE */}
        <div className="absolute right-0 h-full w-[2px] bg-white/15" />

        {/* ACTIVE SLIDER */}
        <motion.div
          animate={{ top: `${activeIndex * 25}%` }}
          transition={{ type: "spring", stiffness: 220, damping: 30 }}
          className="
            absolute right-0
            w-[2px] h-[25%]
            bg-cyan-400
            shadow-[0_0_12px_#22d3ee]
          "
        />

        {/* LABEL */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{
            opacity: hovered ? 1 : 0,
            x: hovered ? 0 : 10,
          }}
          transition={{ duration: 0.25 }}
          className="
            absolute right-4
            text-xs tracking-widest
            text-cyan-400
            select-none
          "
        >
          {sections[activeIndex]?.label}
        </motion.div>

        {/* CLICK ZONES */}
        <div className="absolute inset-0 flex flex-col">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() =>
                document
                  .getElementById(section.id)
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex-1"
              aria-label={section.label}
            />
          ))}
        </div>
      </div>
    </nav>
  );
}
