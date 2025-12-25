import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const symbols = ["</>", "{}", ";", "_", "=>"];

type Trail = {
  id: number;
  x: number;
  y: number;
  symbol: string;
};

export default function CodeCursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([]);

  useEffect(() => {
    // Disable on mobile
    if (window.innerWidth < 768) return;

    let id = 0;

    const handleMove = (e: MouseEvent) => {
      const trail: Trail = {
        id: id++,
        x: e.clientX,
        y: e.clientY,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      };

      setTrails((prev) => [...prev.slice(-4), trail]);
    };

    window.addEventListener("mousemove", handleMove);

    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      <AnimatePresence>
        {trails.map((t) => (
          <motion.span
            key={t.id}
            initial={{ opacity: 0.35, y: 0 }}
            animate={{ opacity: 0, y: -6 }}
            exit={{ opacity: 0.7 }}
            transition={{
              duration: 0.5, // 👈 disappears in 0.2s
              ease: "easeOut",
            }}
            style={{
              left: t.x + 6,
              top: t.y + 6,
            }}
            className="
              absolute
              text-[11px]
              font-mono
              text-cyan-400/50
              select-none
            "
          >
            {t.symbol}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  );
}
