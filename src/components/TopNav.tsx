import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
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

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= SCROLL SPY ================= */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;

        const topMost = visible.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top
            ? prev
            : curr
        , visible[0]);

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
  }, [location.pathname]);

  /* ================= ACTIVE BAR ================= */
  useEffect(() => {
    if (!navRef.current || !indicatorRef.current) return;

    const index = sections.findIndex((s) => s.id === active);
    const item = navRef.current.children[index + 1] as HTMLElement;
    // +1 because motion.div is first child

    if (!item) return;

    indicatorRef.current.style.transform = `translateX(${item.offsetLeft}px)`;
    indicatorRef.current.style.width = `${item.offsetWidth}px`;
  }, [active]);

  /* ================= NAV CLICK HANDLER ================= */
  const handleNavClick = (sectionId: string) => {
    setActive(sectionId);

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 overflow-hidden">
      {/* ===== AMBIENT BACKGROUND ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="
          absolute left-1/4 top-1/2
          w-[420px] h-[420px]
          -translate-y-1/2
          bg-cyan-500/20
          rounded-full blur-[200px]
        " />
        <div className="
          absolute inset-0
          bg-gradient-to-r
          from-black/90
          via-blue-950/40
          to-black/90
        " />
      </div>

      {/* ===== NAV CONTENT ===== */}
      <nav className="
        relative
        max-w-9xl
        mx-8
        px-6 md:px-20
        h-16
        flex items-center justify-between
        backdrop-blur-md
        border-b border-white/10
      ">
        {/* LOGO */}
        <button
          onClick={() => handleNavClick("home")}
           className="
            absolute left-1/2 -translate-x-1/2
            md:static md:translate-x-0
            flex items-center justify-center
          "
        >
          <img
            src={logo}
            alt="Abhishek Logo"
            className="h-16 scale-110 md:scale-125 align-middle"
          />
        </button>
        {/* NAV LINKS (DESKTOP) */}
        <ul
          ref={navRef}
          className="relative hidden md:flex gap-10 h-full items-center text-sm tracking-widest"
        >
          {/* ACTIVE BAR */}
          <motion.div
            ref={indicatorRef}
            className="
              absolute bottom-0 h-[2px]
              bg-cyan-400
              shadow-[0_0_12px_rgba(34,211,238,0.6)]
            "
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />

          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={() => handleNavClick(section.id)}
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
