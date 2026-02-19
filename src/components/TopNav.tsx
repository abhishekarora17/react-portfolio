import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= SCROLL AWARE STYLE ================= */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ================= SCROLL SPY ================= */
  useEffect(() => {
    if (location.pathname !== "/") return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const topMost = visible.reduce((prev, curr) =>
          prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          , visible[0]);
        setActive(topMost.target.id);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
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
    if (!item) return;
    indicatorRef.current.style.transform = `translateX(${item.offsetLeft}px)`;
    indicatorRef.current.style.width = `${item.offsetWidth}px`;
  }, [active]);

  /* ================= NAV CLICK HANDLER ================= */
  const handleNavClick = (sectionId: string) => {
    setActive(sectionId);
    setMobileOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionId } });
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "bg-[#050b18]/90 backdrop-blur-xl border-b border-cyan-400/10 shadow-[0_4px_30px_rgba(34,211,238,0.05)]"
            : "bg-transparent"
          }`}
      >
        <nav className="relative max-w-9xl mx-auto px-6 md:px-20 h-16 flex items-center justify-between">
          {/* LOGO */}
          <button
            onClick={() => handleNavClick("home")}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center justify-center"
          >
            <img src={logo} alt="Abhishek Logo" className="h-16 scale-110 md:scale-125 align-middle" />
          </button>

          {/* NAV LINKS (DESKTOP) */}
          <ul
            ref={navRef}
            className="relative hidden md:flex gap-10 h-full items-center text-sm tracking-widest"
          >
            {/* ACTIVE INDICATOR BAR */}
            <motion.div
              ref={indicatorRef}
              className="absolute bottom-0 h-[2px] bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`py-2 transition-colors text-xs font-medium tracking-[0.15em] ${active === section.id
                      ? "text-cyan-400"
                      : "text-gray-400 hover:text-gray-200"
                    }`}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>

          {/* MOBILE HAMBURGER */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden absolute right-6 w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-300 hover:border-cyan-400/40 hover:text-cyan-400 transition"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed top-16 left-0 right-0 z-40 bg-[#050b18]/95 backdrop-blur-2xl border-b border-cyan-400/10"
          >
            <ul className="flex flex-col py-4">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleNavClick(section.id)}
                    className={`w-full text-left px-8 py-4 text-sm tracking-widest transition ${active === section.id
                        ? "text-cyan-400 bg-cyan-400/5"
                        : "text-gray-400 hover:text-gray-200"
                      }`}
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
