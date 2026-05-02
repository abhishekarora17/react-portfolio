"use client";

import { useRef, useState, useMemo } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

/* ===================== TYPES ===================== */
type Tech = {
  name: string;
  icon: string;
  category: string;
};

/* ===================== DATA ===================== */
const techs: Tech[] = [
  // Frameworks / Backend
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20", category: "Backend" },
  { name: "NestJS", icon: "https://cdn.simpleicons.org/nestjs/E0234E", category: "Backend" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", category: "Backend" },
  { name: "CodeIgniter", icon: "https://cdn.simpleicons.org/codeigniter/EF4223", category: "Backend" },
  // Databases
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", category: "Databases" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", category: "Databases" },
  { name: "BigQuery", icon: "https://cdn.simpleicons.org/googlebigquery/669DF6", category: "Databases" },
  // API & Infra
  { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/E10098", category: "API & Infra" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032", category: "API & Infra" },
  // Frontend
  { name: "HTML", icon: "https://cdn.simpleicons.org/html5/E34C26", category: "Frontend" },
  { name: "CSS", icon: "https://cdn.jsdelivr.net/npm/simple-icons@v7/icons/css3.svg", category: "Frontend" },
  { name: "BootStrap", icon: "https://cdn.simpleicons.org/bootstrap/7952B3", category: "Frontend" },
];

/* ===================== ORBIT LAYERS ===================== */
const layers = [
  { radius: 110, speed: 55, count: 4 },
  { radius: 195, speed: 95, count: 5 },
  { radius: 278, speed: 135, count: 5 },
];

/* ===================== SEEDED RANDOM ===================== */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/* ===================== SKILL CARD ===================== */
function SkillCard({ category, skills }: { category: string; skills: Tech[] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useMotionTemplate`
    radial-gradient(220px circle at ${mouseX}px ${mouseY}px,
    rgba(34,211,238,0.16),
    rgba(34,211,238,0.06) 45%,
    transparent 70%)
  `;

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
      className="relative rounded-2xl p-7 overflow-hidden
      bg-gradient-to-br from-cyan-500/[0.06] via-white/[0.02] to-slate-900/40
      border border-cyan-400/15
      backdrop-blur-xl
      shadow-[0_0_40px_rgba(34,211,238,0.04)]
      hover:border-cyan-400/35 hover:shadow-[0_0_60px_rgba(34,211,238,0.10)]
      transition-all duration-400"
    >
      {/* Category label */}
      <h3 className="text-cyan-400 text-[10px] tracking-[0.38em] uppercase mb-6 font-semibold">
        {category}
      </h3>

      <ul className="space-y-3.5">
        {skills.map((tech) => (
          <motion.li
            key={tech.name}
            className="flex items-center gap-3.5 group"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center border border-white/[0.05] group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 transition-all duration-300 shrink-0">
              <img src={tech.icon} className="w-4 h-4" alt={tech.name} />
            </div>
            <span className="text-sm text-slate-300 group-hover:text-white transition-colors duration-200">{tech.name}</span>
          </motion.li>
        ))}
      </ul>

      <motion.div style={{ background: glow }} className="absolute inset-0 pointer-events-none" />
    </motion.div>
  );
}

/* ===================== ORBIT TECH NODE ===================== */
function OrbitNode({ tech, active, onClick }: { tech: Tech; active: boolean; onClick: () => void }) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.95 }}
      className={`w-11 h-11 md:w-13 md:h-13 rounded-full flex items-center justify-center cursor-pointer
        border shadow-lg transition-all duration-200
        ${active
          ? "bg-cyan-400/25 border-cyan-400/70 shadow-[0_0_18px_rgba(34,211,238,0.5)]"
          : "bg-slate-900/80 border-cyan-400/25 hover:border-cyan-400/50 hover:shadow-[0_0_14px_rgba(34,211,238,0.3)]"
        }`}
    >
      <img src={tech.icon} className="w-5 h-5 md:w-6 md:h-6" alt={tech.name} />
    </motion.div>
  );
}

/* ===================== MAIN SECTION ===================== */
export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTech, setActiveTech] = useState<string | null>(null);

  /* ==== Controlled Tilt ==== */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [6, -6]), { stiffness: 80, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-6, 6]), { stiffness: 80, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  /* ==== Stars ==== */
  const stars = useMemo(() => {
    return Array.from({ length: 200 }).map((_, i) => {
      const r1 = seededRandom(i * 2.17);
      const r2 = seededRandom(i * 3.91);
      const r3 = seededRandom(i * 5.73);
      const depthLayer = i % 3;

      return {
        id: i,
        size: depthLayer === 0 ? r1 * 1.1 + 0.3 : depthLayer === 1 ? r1 * 1.8 + 0.5 : r1 * 2.4 + 0.9,
        top: r2 * 130 - 15,
        left: r3 * 130 - 15,
        opacity: depthLayer === 0 ? r1 * 0.3 + 0.05 : depthLayer === 1 ? r1 * 0.5 + 0.08 : r1 * 0.75 + 0.12,
        drift: depthLayer === 0 ? 6 : depthLayer === 1 ? 12 : 18,
        duration: r2 * 8 + 6,
      };
    });
  }, []);

  /* ==== Grouped cards ==== */
  const grouped = techs.reduce((acc: Record<string, Tech[]>, tech) => {
    acc[tech.category] = acc[tech.category] || [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  /* ==== Assign techs to orbit layers ==== */
  const orbitTechs = layers.map((layer, li) => {
    const start = layers.slice(0, li).reduce((s, l) => s + l.count, 0);
    return techs.slice(start, start + layer.count);
  });

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">

      {/* Star Background */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-white rounded-full"
            style={{
              width: star.size,
              height: star.size,
              top: `${star.top}%`,
              left: `${star.left}%`,
              opacity: star.opacity,
            }}
            animate={{ y: [0, star.drift, 0], opacity: [star.opacity, star.opacity * 1.5, star.opacity] }}
            transition={{ duration: star.duration, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-cyan-500/8 rounded-full blur-[220px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[380px] h-[380px] bg-blue-500/8 rounded-full blur-[200px]" />
      </div>

      {/* Section Header */}
      <div className="relative z-10 max-w-6xl mx-10 mb-40">
        <p className="eyebrow">Technical Expertise</p>
        <h2 className="text-3xl md:text-4xl font-bold text-white leading-snug">
          Skills & Technologies
        </h2>
        <p className="mt-3 text-slate-500 text-sm max-w-lg">
          A curated stack I use daily to build reliable, high-performance systems.
        </p>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

        {/* 3D Galaxy */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1400,
            transformStyle: "preserve-3d",
          }}
          className="relative flex items-center justify-center h-[380px] md:h-[560px] mb-16 select-none"
        >
          {/* Core sphere */}
          <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-xs md:text-sm border border-white/10 shadow-[0_0_80px_rgba(34,211,238,0.45),0_0_40px_rgba(139,92,246,0.3)] z-10">
            <span className="tracking-widest font-mono">SKILLS</span>
          </div>

          {/* Pulsing core ring */}
          <motion.div
            className="absolute rounded-full border border-cyan-400/30"
            style={{ width: 140, height: 140 }}
            animate={{ scale: [1, 1.18, 1], opacity: [0.6, 0.15, 1] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Orbit rings + nodes */}
          {layers.map((layer, layerIndex) => (
            <motion.div
              key={layerIndex}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: layer.speed, ease: "linear" }}
              style={{ width: layer.radius * 2, height: layer.radius * 2 }}
              className="absolute rounded-full"
            >
              {/* Orbit track */}
              <div
                className="absolute inset-0 rounded-full border"
                style={{
                  borderColor: `rgba(34,211,238,${0.08 + layerIndex * 0.04})`,
                  borderStyle: layerIndex === 0 ? "dashed" : "solid",
                }}
              />

              {orbitTechs[layerIndex]?.map((tech, index) => {
                const count = orbitTechs[layerIndex].length;
                const angle = (360 / count) * index;
                return (
                  <div
                    key={tech.name}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `rotate(${angle}deg) translate(${layer.radius}px) rotate(-${angle}deg) translate(-50%, -50%)`,
                    }}
                  >
                    {/* Counter-rotate to keep icons upright */}
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ repeat: Infinity, duration: layer.speed, ease: "linear" }}
                    >
                      <OrbitNode
                        tech={tech}
                        active={activeTech === tech.name}
                        onClick={() => setActiveTech((p) => (p === tech.name ? null : tech.name))}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        {/* Active tech label */}
        {activeTech && (
          <motion.div
            key={activeTech}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center -mt-10 mb-12"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 text-sm tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              {activeTech}
            </span>
          </motion.div>
        )}

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.keys(grouped).map((category, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <SkillCard category={category} skills={grouped[category]} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}