import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowDown, Github, Linkedin, MessageCircle } from "lucide-react";
import developerImg from "../assets/developerImg.png";

const roles = ["Backend Developer", "API Architect", "Systems Builder"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const target = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
      } else {
        setRoleIndex((i) => (i + 1) % roles.length);
        setTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, typing, roleIndex]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* ================= DOT GRID BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 dot-grid opacity-60 pointer-events-none" />

      {/* ================= FULL-BLEED PHOTO ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={developerImg}
          alt="Developer background"
          className="absolute top-0 right-0 h-full w-full md:w-[55vw] object-cover object-center md:object-right grayscale"
        />

        {/* Cinematic overlay */}
        <div className="absolute inset-0 hero-overlay-x" />
        <div className="absolute inset-0 hero-overlay-y" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-cyan-400/10 rounded-full blur-[220px] pointer-events-none" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-24">
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px bg-cyan-400" />
          <span className="text-xs tracking-[0.3em] text-cyan-400 uppercase font-medium">
            Available for work
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-4"
        >
          Abhishek
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-text)] to-[var(--color-text-soft)]">
            Arora
          </span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center gap-2 text-xl md:text-2xl font-mono text-cyan-400 mb-6 h-8"
        >
          <span>{displayed}</span>
          <span className="cursor-blink text-cyan-400">|</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="max-w-lg text-soft leading-relaxed mb-10 text-base"
        >
          I design scalable backend systems, APIs, and modern web products built
          for performance and growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap items-center gap-4 mb-12"
        >
          <button
            onClick={() => scrollToSection("work")}
            className="shimmer-btn relative inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-cyan-400/40 text-cyan-300 text-sm font-medium hover:border-cyan-400/70 hover:shadow-[0_0_24px_rgba(34,211,238,0.25)] transition-all"
          >
            View My Work
            <ArrowDown className="w-4 h-4" />
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg border border-theme text-soft text-sm font-medium hover:border-theme-strong hover:text-theme transition-all"
          >
            Get in Touch
          </button>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex items-center gap-4"
        >
          {[
            { href: "https://www.linkedin.com/in/abhishek-arora-818942221", Icon: Linkedin },
            { href: "https://github.com/abhishekarora17", Icon: Github },
            {
              href: "https://wa.me/917355874070?text=Hi%20Abhishek%20%F0%9F%91%8B%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you.",
              Icon: MessageCircle,
            },
          ].map(({ href, Icon }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-theme text-soft hover:border-cyan-400/50 hover:text-cyan-400 transition-all"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-transparent to-cyan-400/60"
        />
      </motion.div>
    </section>
  );
}
