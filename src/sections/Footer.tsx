"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, MessageCircle } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "what-i-do", label: "What I Do" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "about-me", label: "About Me" },
  { id: "contact", label: "Contact" },
];

const socials = [
  {
    href: "https://www.linkedin.com/in/abhishek-arora-818942221",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://wa.me/917355874070?text=Hi%20Abhishek%20%F0%9F%91%8B%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you.",
    icon: MessageCircle,
    label: "WhatsApp",
  },
  {
    href: "https://github.com/abhishekarora17",
    icon: Github,
    label: "GitHub",
  },
];

export default function Footer() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#03070f] border-t border-white/[0.06]">

      <div className="relative px-8 md:px-24 pt-16 pb-10">

        {/* Main Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-14 mb-14"
        >
          {/* Brand */}
          <div>
            <h3 className="text-xl font-semibold text-white tracking-wide">
              Abhishek Arora
            </h3>
            <p className="mt-3 text-sm text-slate-400 leading-relaxed max-w-[240px]">
              Backend developer building scalable systems and high-performance APIs.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow mb-6">Navigation</p>

            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="group relative text-sm text-slate-400 hover:text-cyan-400 transition"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="eyebrow mb-6">Connect</p>

            <div className="flex items-center gap-4">
              {socials.map(({ href, icon: Icon, label }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 flex items-center justify-center rounded-full
                  border border-white/[0.05]
                  text-slate-400
                  hover:border-cyan-400/40
                  hover:text-cyan-400
                  transition"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.05] pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500 m-auto">
            © {new Date().getFullYear()}{" "}
            <span className="text-slate-300 font-medium">
              Abhishek Arora
            </span>. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}