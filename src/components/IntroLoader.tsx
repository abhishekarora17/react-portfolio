import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/logo.png";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<"logo" | "text" | "exit">("logo");
  const [visible, setVisible] = useState(true);
  const name = "Abhishek Arora";
  const tagline = "Backend Developer · API Architect · Systems Builder";

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 900);
    const t2 = setTimeout(() => setPhase("exit"), 2800);
    const t3 = setTimeout(() => setVisible(false), 4000);
    const t4 = setTimeout(() => onComplete(), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: [0.4, 0, 0.2, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: "#050b18" }}
        >
          {/* Radial glow behind logo */}
          <motion.div
            className="absolute rounded-full"
            style={{
              width: 340,
              height: 340,
              background:
                "radial-gradient(circle, rgba(34,211,238,0.18) 0%, transparent 70%)",
              filter: "blur(32px)",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              phase === "exit"
                ? { opacity: 0, scale: 2.4 }
                : { opacity: 1, scale: 1 }
            }
            transition={
              phase === "exit"
                ? { duration: 1.3, ease: [0.4, 0, 0.2, 1] }
                : { duration: 1, ease: "easeOut" }
            }
          />

          {/* Logo */}
          <motion.img
            src={logo}
            alt="Logo"
            className="relative z-10 w-20 h-20 object-contain"
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={
              phase === "exit"
                ? { opacity: 0, scale: 0.7, y: -10 }
                : { opacity: 1, scale: 1, y: 0 }
            }
            transition={
              phase === "exit"
                ? { duration: 1, ease: [0.4, 0, 1, 1] }
                : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
            }
          />

          {/* Name — letter-by-letter reveal */}
          <motion.div
            className="relative z-10 mt-5 flex gap-0 overflow-hidden"
            initial="hidden"
            animate={phase === "text" ? "visible" : phase === "exit" ? "exit" : "hidden"}
          >
            {name.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: { opacity: 1, y: 0 },
                  exit: { opacity: 0, y: -12, filter: "blur(4px)" },
                }}
                transition={{
                  delay:
                    phase === "exit"
                      ? (name.length - 1 - i) * 0.025
                      : i * 0.045,
                  duration: phase === "exit" ? 0.5 : 0.35,
                  ease: "easeInOut",
                }}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(1.5rem, 4vw, 2rem)",
                  fontWeight: 700,
                  letterSpacing: char === " " ? "0.3em" : "0.02em",
                  color: "#fff",
                  display: "inline-block",
                  whiteSpace: "pre",
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="relative z-10 mt-2 tracking-widest uppercase text-center px-6"
            style={{
              color: "#22d3ee",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "clamp(0.6rem, 2.2vw, 0.8rem)",
              lineHeight: 1.6,
              wordBreak: "break-word",
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={
              phase === "exit"
                ? { opacity: 0, y: 6, filter: "blur(6px)" }
                : phase === "text"
                ? { opacity: 0.75, y: 0, filter: "blur(0px)" }
                : { opacity: 0, y: 8 }
            }
            transition={
              phase === "exit"
                ? { duration: 0.7, ease: "easeIn" }
                : { delay: 0.85, duration: 0.55, ease: "easeOut" }
            }
          >
            {tagline}
          </motion.p>

          {/* Bottom progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, #22d3ee, #3b82f6)" }}
            initial={{ width: "0%", opacity: 1 }}
            animate={
              phase === "exit"
                ? { width: "100%", opacity: 0 }
                : { width: "100%", opacity: 1 }
            }
            transition={
              phase === "exit"
                ? { duration: 0.6, ease: "easeIn" }
                : { duration: 2.6, ease: "linear", delay: 0.2 }
            }
          />
        </motion.div>
      ) : null }
    </AnimatePresence>
  );
}
