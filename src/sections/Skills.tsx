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
  { name: "Laravel", icon: "https://cdn.simpleicons.org/laravel/FF2D20", category: "Frameworks" },
  { name: "NestJS", icon: "https://cdn.simpleicons.org/nestjs/E0234E", category: "Frameworks" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E", category: "Frameworks" },
  { name: "PostgreSQL", icon: "https://cdn.simpleicons.org/postgresql/4169E1", category: "Databases" },
  { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1", category: "Databases" },
  { name: "BigQuery", icon: "https://cdn.simpleicons.org/googlebigquery/669DF6", category: "Databases" },
  { name: "GraphQL", icon: "https://cdn.simpleicons.org/graphql/E10098", category: "API & Infra" },
  { name: "CodeIgniter", icon: "https://cdn.simpleicons.org/codeigniter/EF4223", category: "Frameworks" },
];

/* ===================== SEEDED RANDOM ===================== */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/* ===================== BLUE CRYSTAL CARD ===================== */
function SkillCard({ category, skills }: { category: string; skills: Tech[] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const glow = useMotionTemplate`
    radial-gradient(250px circle at ${mouseX}px ${mouseY}px,
    rgba(34,211,238,0.18),
    rgba(34,211,238,0.08) 40%,
    transparent 70%)
  `;

  return (
    <motion.div
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }}
      className="relative rounded-3xl p-8 overflow-hidden
      bg-gradient-to-br from-cyan-500/[0.05] via-white/[0.02] to-transparent
      border border-cyan-400/20
      backdrop-blur-xl
      shadow-[0_0_60px_rgba(34,211,238,0.06)]
      hover:border-cyan-400/40
      transition-all duration-500"
    >
      <h3 className="text-cyan-400 text-xs tracking-[0.35em] uppercase mb-8">
        {category}
      </h3>

      <ul className="space-y-4">
        {skills.map((tech) => (
          <li key={tech.name} className="flex items-center gap-4">
            <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
              <img src={tech.icon} className="w-5 h-5" />
            </div>
            <span className="text-sm text-slate-300">{tech.name}</span>
          </li>
        ))}
      </ul>

      <motion.div
        style={{ background: glow }}
        className="absolute inset-0 pointer-events-none"
      />
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

  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [8, -8]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-8, 8]));

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  /* ==== Stars ==== */
  const stars = useMemo(() => {
    return Array.from({ length: 240 }).map((_, i) => {
      const r1 = seededRandom(i * 2.17);
      const r2 = seededRandom(i * 3.91);
      const r3 = seededRandom(i * 5.73);
      const depthLayer = i % 3;

      return {
        id: i,
        size:
          depthLayer === 0
            ? r1 * 1.2 + 0.3
            : depthLayer === 1
            ? r1 * 2 + 0.6
            : r1 * 2.8 + 1,
        top: r2 * 130 - 15,
        left: r3 * 130 - 15,
        opacity:
          depthLayer === 0
            ? r1 * 0.4 + 0.05
            : depthLayer === 1
            ? r1 * 0.6 + 0.1
            : r1 * 0.9 + 0.15,
        drift: depthLayer === 0 ? 8 : depthLayer === 1 ? 14 : 20,
        duration: r2 * 8 + 6,
      };
    });
  }, []);

  const grouped = techs.reduce((acc: any, tech) => {
    acc[tech.category] = acc[tech.category] || [];
    acc[tech.category].push(tech);
    return acc;
  }, {});

  const layers = [
    { radius: 120, speed: 60, z: -100 },
    { radius: 200, speed: 100, z: -50 },
    { radius: 280, speed: 140, z: 0 },
  ];

  return (
    <section className="relative py-24 md:py-32 bg-[#030712] overflow-hidden">

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
            animate={{
              y: [0, star.drift, 0],
              opacity: [star.opacity, star.opacity * 1.6, star.opacity],
            }}
            transition={{
              duration: star.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Header (Shifted Right on Desktop) */}
      <div className="relative z-10 max-w-3xl mx-auto md:ml-24 px-6 md:px-12">
        <p className="text-xs tracking-[0.4em] text-cyan-400 uppercase mb-4">
          Technical Expertise
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold text-white leading-snug">
          Skills I Expertised
        </h2>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">

        {/* 3D Galaxy */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          style={{
            rotateX,
            rotateY,
            transformPerspective: 1200,
            transformStyle: "preserve-3d",
          }}
          className="relative flex items-center justify-center h-[420px] md:h-[600px] mb-16"
        >

          {/* Core */}
          <div className="absolute w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm md:text-lg border border-white/10 shadow-xl">
            SKILLS
          </div>

          {layers.map((layer, layerIndex) => (
            <motion.div
              key={layerIndex}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: layer.speed, ease: "linear" }}
              style={{
                width: layer.radius * 2,
                height: layer.radius * 2,
                transform: `translateZ(${layer.z}px)`,
              }}
              className="absolute rounded-full border border-cyan-400/20"
            >
              {techs.slice(layerIndex * 3, layerIndex * 3 + 3).map((tech, index) => {
                const angle = (360 / 3) * index;

                return (
                  <div
                    key={tech.name}
                    className="absolute top-1/2 left-1/2"
                    style={{
                      transform: `
                        rotate(${angle}deg)
                        translate(${layer.radius}px)
                        rotate(-${angle}deg)
                      `,
                    }}
                  >
                    <div
                      onClick={() => setActiveTech(tech.name)}
                      className="w-12 h-12 md:w-14 md:h-14 rounded-full
                      bg-slate-900 border border-cyan-400/30
                      flex items-center justify-center shadow-md
                      hover:scale-110 transition"
                    >
                      <img src={tech.icon} className="w-6 h-6 md:w-7 md:h-7" />
                    </div>
                  </div>
                );
              })}
            </motion.div>
          ))}
        </motion.div>

        {activeTech && (
          <div className="text-center mb-12 text-cyan-300 tracking-widest text-sm">
            {activeTech}
          </div>
        )}

        {/* Skill Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {Object.keys(grouped).map((category) => (
            <SkillCard
              key={category}
              category={category}
              skills={grouped[category]}
            />
          ))}
        </div>

      </div>
    </section>
  );
}