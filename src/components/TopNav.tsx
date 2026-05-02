import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Home, Layers, Code2, Briefcase, User2, Mail } from "lucide-react";
import logo from "../assets/logo.png";

const sections = [
  { id: "home", label: "HOME", Icon: Home },
  { id: "what-i-do", label: "WHAT I DO", Icon: Layers },
  { id: "skills", label: "SKILLS", Icon: Code2 },
  { id: "work", label: "WORK", Icon: Briefcase },
  { id: "about-me", label: "ABOUT ME", Icon: User2 },
  { id: "contact", label: "CONTACT", Icon: Mail },
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
      setScrollProgress((window.scrollY / totalScroll) * 100);
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
          prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr,
          visible[0]
        );
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

  /* ================= NAV CLICK ================= */
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
        className={`fixed top-0 left-0 right-0 z-50 px-3 md:px-6 transition-all duration-300 ${scrolled ? "pt-2 md:pt-3" : "pt-3 md:pt-5"
          }`}
      >
        <nav
          className={`relative max-w-8xl mx-auto h-14 md:h-[68px] px-40 md:px-12 flex items-center justify-between rounded-2xl border transition-all duration-400 overflow-hidden ${scrolled
              ? "bg-[#03070f]/75 backdrop-blur-[48px] border-white/[0.05] shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(34,211,238,0.07),inset_0_1px_0_rgba(255,255,255,0.04)]"
              : "bg-[#03070f]/20 backdrop-blur-2xl border-white/[0.04] shadow-[0_4px_24px_rgba(2,6,23,0.2)]"
            }`}
        >
          {/* SCROLL PROGRESS LINE */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-cyan-300/80 z-50 rounded-r-full"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* LOGO */}
          <button
            onClick={() => handleNavClick("home")}
            className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0 flex items-center justify-center"
          >
            <img src={logo} alt="Abhishek Logo" className="h-12 md:h-14" />
          </button>

          {/* NAV LINKS (DESKTOP) */}
          <ul ref={navRef} className="relative hidden md:flex gap-1 h-full items-center text-sm">
            {/* ACTIVE INDICATOR PILL */}
            <motion.div
              ref={indicatorRef}
              className="absolute top-1/2 -mt-[17px] h-[34px] rounded-xl bg-gradient-to-r from-cyan-400/12 via-indigo-500/10 to-cyan-400/8 border border-cyan-300/25 shadow-[0_0_20px_rgba(34,211,238,0.18),inset_0_1px_0_rgba(34,211,238,0.12)]"
              transition={{ type: "spring", stiffness: 380, damping: 35 }}
            />

            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleNavClick(section.id)}
                  className={`relative z-10 h-[34px] px-4 rounded-xl transition-all duration-200 text-[11px] font-semibold tracking-[0.13em] ${active === section.id
                      ? "text-cyan-200"
                      : "text-slate-400 hover:text-slate-200"
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
            className="md:hidden absolute right-4 w-9 h-9 flex items-center justify-center rounded-xl border border-white/[0.06] bg-slate-900/50 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-300 hover:bg-cyan-400/10 transition-all"
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileOpen ? "x" : "menu"}
                initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                transition={{ duration: 0.15 }}
              >
                {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            className="fixed top-[72px] left-3 right-3 z-40 bg-[#080e20]/95 backdrop-blur-[40px] border border-cyan-400/25 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.7),0_0_0_1px_rgba(34,211,238,0.06)] overflow-hidden"
          >
            {/* Top accent line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

            <ul className="flex flex-col py-3">
              {sections.map((section, idx) => {
                const Icon = section.Icon;
                const isActive = active === section.id;
                return (
                  <motion.li
                    key={section.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <button
                      onClick={() => handleNavClick(section.id)}
                      className={`w-full text-left px-6 py-3.5 flex items-center gap-3.5 text-[11px] font-bold tracking-[0.18em] transition-all border-l-2 ${isActive
                          ? "text-cyan-300 bg-cyan-400/8 border-cyan-400"
                          : "text-slate-400 hover:text-white border-transparent hover:bg-white/[0.03]"
                        }`}
                    >
                      <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-cyan-400" : "text-slate-600"}`} />
                      {section.label}
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </ul>

            {/* Bottom accent line */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
