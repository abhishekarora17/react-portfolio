import { motion } from "framer-motion";
import { Github, Linkedin, MessageCircle } from "lucide-react";

const navLinks = [
  { id: "home", label: "Home" },
  { id: "what-i-do", label: "What I Do" },
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
    <footer className="relative w-full overflow-hidden border-t border-theme">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-cyan-500/8 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 px-8 md:px-24 pt-14 pb-8">
        {/* Three column layout */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12"
        >
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-2 text-theme">Abhishek Arora</h3>
            <p className="text-sm text-muted leading-relaxed max-w-[200px]">
              Backend developer building scalable systems and APIs.
            </p>
          </div>

          {/* Nav Links */}
          <div>
            <p className="text-xs tracking-[0.2em] text-faint uppercase mb-4">Navigation</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-sm text-muted hover:text-cyan-400 transition"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <p className="text-xs tracking-[0.2em] text-faint uppercase mb-4">Connect</p>
            <div className="flex items-center gap-3">
              {socials.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-theme text-muted hover:border-cyan-400/40 hover:text-cyan-400 transition"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-theme pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()}{" "}
            <span className="text-soft font-medium">Abhishek Arora</span>. All rights reserved.
          </p>
          <p className="text-xs text-faint">
            Built with React · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
