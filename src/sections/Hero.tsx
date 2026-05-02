import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowRight, Github, Linkedin, MessageCircle, Download } from "lucide-react";
import developerImg from "../assets/developerImg.png";

const roles = ["Backend Developer", "API Architect", "Systems Builder"];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const target = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (typing) {
      if (displayed.length < target.length) {
        timeout = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 70);
      } else {
        timeout = setTimeout(() => setTyping(false), 2200);
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
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

      {/* ================= DOT GRID ================= */}
      <div className="absolute inset-0 z-0 dot-grid opacity-50 pointer-events-none" />

      {/* ================= DEVELOPER IMAGE ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={developerImg}
          alt="Developer background"
          className="absolute top-0 right-0 h-full w-full md:w-[55vw] object-cover object-center md:object-right"
          style={{ filter: "grayscale(1) brightness(0.55) contrast(1.1)" }}
        />
        {/* Directional overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#03070f] via-[#03070f]/85 to-[#03070f]/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#03070f] via-transparent to-[#03070f]/30" />

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-[30%] w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 bg-cyan-500/8 rounded-full blur-[260px] pointer-events-none" />
        <div className="absolute top-1/3 left-[20%] w-[300px] h-[300px] bg-violet-500/6 rounded-full blur-[180px] pointer-events-none" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-24">

        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Open to new opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.02] tracking-tight mb-4"
        >
          Abhishek
          <br />
          <span className="gradient-text">Arora</span>
        </motion.h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.45 }}
          className="flex items-center gap-2 text-xl md:text-2xl font-mono mb-6 h-8"
          style={{ color: "rgba(34,211,238,0.9)" }}
        >
          <span>{displayed}</span>
          <span className="cursor-blink" style={{ color: "rgba(34,211,238,0.9)" }}>|</span>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="max-w-md text-slate-400 leading-relaxed mb-10 text-base"
        >
          I design scalable backend systems, APIs, and modern web products built
          for performance, reliability, and long-term growth.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85 }}
          className="flex flex-wrap items-center gap-3 mb-12"
        >
          <button onClick={() => scrollToSection("work")} className="btn-primary">
            View My Work
            <ArrowRight className="w-4 h-4" />
          </button>

          <button onClick={() => scrollToSection("contact")} className="btn-ghost">
            Get in Touch
          </button>

          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-3 rounded-lg text-slate-400 hover:text-white text-sm font-medium transition-colors"
          >
            <Download className="w-4 h-4" />
            Resume
          </a>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05 }}
          className="flex items-center gap-3"
        >
          {[
            { href: "https://www.linkedin.com/in/abhishek-arora-818942221", Icon: Linkedin, label: "LinkedIn" },
            { href: "https://github.com/abhishekarora17", Icon: Github, label: "GitHub" },
            {
              href: "https://wa.me/917355874070?text=Hi%20Abhishek%20%F0%9F%91%8B%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you.",
              Icon: MessageCircle,
              label: "WhatsApp",
            },
          ].map(({ href, Icon, label }) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group w-10 h-10 flex items-center justify-center rounded-full border border-white/[0.05] text-slate-500 hover:border-cyan-400/40 hover:text-cyan-400 hover:bg-cyan-400/5 transition-all duration-200"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}

          <div className="ml-2 h-px w-12 bg-gradient-to-r from-white/10 to-transparent" />
          <span className="text-xs text-slate-600 tracking-widest uppercase">Follow</span>
        </motion.div>
      </div>

      {/* ================= SCROLL INDICATOR ================= */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-[1px] h-12 bg-gradient-to-b from-transparent via-cyan-400/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}
