import { motion } from "framer-motion";
import developerImg from "../assets/developerImg.png";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* ================= FULL-BLEED BACKGROUND ================= */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src={developerImg}
          alt="Developer background"
          className="
            absolute top-0 right-0
            h-full
            w-[55vw]
            object-cover
            object-center
            opacity-100
            grayscale
          "
        />

        {/* Dark base */}
        <div className="absolute inset-0 bg-black/75" />

        {/* Cinematic blue band (kept subtle) */}
        <div
          className="
            absolute inset-0
            bg-gradient-to-r
            from-black
            via-blue-900/25
            to-black
          "
        />
      </div>

      {/* ================= SOFT AMBIENT GLOW (REDUCED) ================= */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="
            absolute top-1/2 left-1/3
            w-[420px] h-[420px]
            -translate-x-1/2 -translate-y-1/2
            bg-cyan-400/12
            rounded-full
            blur-[200px]
          "
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-12 md:px-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight"
        >
          Abhishek Arora
          <span className="block text-cyan-400">Backend Developer</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-xl text-gray-400"
        >
          I design scalable backend systems, APIs, and modern web products built
          for performance and growth.
        </motion.p>
      </div>
    </section>
  );
}
