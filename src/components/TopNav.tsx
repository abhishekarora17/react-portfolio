import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";

const sections = [
  { id: "home", label: "HOME" },
  { id: "what-i-do", label: "WHAT I DO" },
  { id: "skills", label: "SKILLS" },
  { id: "work", label: "WORK" },
  { id: "about-me", label: "ABOUT ME" },
  { id: "contact", label: "CONTACT" },
];

export default function TopNav() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navRef = useRef<HTMLUListElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  /* ================= SCROLL AWARE STYLE ================= */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalScroll) * 100;
      setScrollProgress(progress);
    };
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
        className={`fixed top-0 left-0 right-0 z-50 px-3 md:px-6 transition-all duration-300 ${scrolled
          ? "pt-2 md:pt-3"
          : "pt-3 md:pt-4"
          }`}
      >
        <nav
          className={`relative max-w-8xl mx-auto h-16 md:h-[72px] px-5 md:px-8 flex items-center justify-between rounded-2xl border transition-all duration-400 overflow-hidden ${scrolled
            ? "bg-[#0a0f1e]/40 backdrop-blur-3xl border-cyan-400/30 shadow-[0_12px_40px_rgba(8,145,178,0.25)]"
            : "bg-slate-950/15 backdrop-blur-2xl border-white/15 shadow-[0_10px_28px_rgba(2,6,23,0.2)]"
            }`}
        >
          {/* SCROLL PROGRESS LINE */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent z-50"
            style={{ width: `${scrollProgress}%` }}
          />
          {/* LOGO */}
          <button
            onClick={() => handleNavClick("home")}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center justify-center rounded-xl  ring-white/10 px-1/2 py-1/2 "
          >
            <img src={logo} alt="Abhishek Logo" className="h-16 md:h-16 align-middle" />
          </button>

          {/* NAV LINKS (DESKTOP) */}
          <ul
            ref={navRef}
            className="relative hidden md:flex gap-2 h-full items-center text-sm"
          >
            {/* ACTIVE INDICATOR BAR */}
            <motion.div
              ref={indicatorRef}
              className="absolute top-1/2 -mt-[18px] h-9 rounded-xl bg-cyan-400/20 border border-cyan-300/40 shadow-[0_0_20px_rgba(34,211,238,0.3)]"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />

            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`relative z-10 h-9 px-4 rounded-xl transition-colors text-xs font-semibold tracking-[0.14em] ${active === section.id
                    ? "text-cyan-200"
                    : "text-slate-300 hover:text-white"
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
            className="md:hidden absolute right-5 w-10 h-10 flex items-center justify-center rounded-xl border border-white/15 bg-slate-900/40 text-slate-200 hover:border-cyan-400/40 hover:text-cyan-300 transition"
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
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-[78px] md:top-[88px] left-3 right-3 z-40 bg-slate-950/95 backdrop-blur-3xl border border-cyan-400/30 rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.6)] overflow-hidden"
          >
            <ul className="flex flex-col py-4">
              {sections.map((section, idx) => (
                <motion.li
                  key={section.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <button
                    onClick={() => handleNavClick(section.id)}
                    className={`w-full text-left px-8 py-4 text-xs font-bold tracking-[0.2em] transition-all border-l-2 ${active === section.id
                      ? "text-cyan-300 bg-cyan-400/10 border-cyan-400"
                      : "text-slate-400 hover:text-white border-transparent hover:bg-white/5"
                      }`}
                  >
                    {section.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
