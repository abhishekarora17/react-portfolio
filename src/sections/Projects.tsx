import { useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import ProjectModal from "../components/modals/ProjectModal";

/* ===================== TYPES ===================== */
export interface ProjectDetails {
  problem: string;
  solution: string;
  architecture: string[];
  impact: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  highlights: string[];
  tech: string[];
  details: ProjectDetails;
  accent: string;
}

/* ===================== DATA ===================== */
const projects: Project[] = [
  {
    id: "hms",
    title: "Hospital Management System",
    description:
      "Built a scalable backend system handling real-time medicine stock and patient records.",
    highlights: [
      "Handled 100k+ daily patient records",
      "Optimized pricing queries by 40%",
      "Multi-role access control",
    ],
    tech: ["Laravel", "MySQL", "CodeIgniter"],
    accent: "from-cyan-400/30 to-cyan-400/0",
    details: {
      problem:
        "Manual record handling and unoptimized queries caused delays and data inconsistency.",
      solution:
        "Designed modular backend services with optimized queries and role-based access control.",
      architecture: [
        "Role-based access control",
        "Optimized relational schema",
        "Service-oriented backend",
      ],
      impact: [
        "40% faster query execution",
        "Stable handling of high daily traffic",
      ],
    },
  },
  {
    id: "flash",
    title: "Flash: Learning App",
    description:
      "Role-based learning platform for kids with progress tracking and analytics.",
    highlights: [
      "JWT + Role-based access",
      "API versioning",
      "Clean service-repository pattern",
    ],
    tech: ["NestJS", "PostgreSQL", "Cron Jobs", "GraphQL"],
    accent: "from-violet-500/30 to-violet-500/0",
    details: {
      problem:
        "Lack of centralized learning progress tracking for students and teachers.",
      solution:
        "Built scalable APIs with role separation and automated background jobs.",
      architecture: [
        "JWT authentication",
        "GraphQL API layer",
        "Cron-based scheduled jobs",
      ],
      impact: [
        "Improved data consistency",
        "Scalable for growing user base",
      ],
    },
  },
  {
    id: "touchtight",
    title: "Touchtight",
    description:
      "Modular API architecture designed for soccer leagues and tournaments.",
    highlights: [
      "JWT + Role-based access",
      "Modular architecture",
      "Scalable tournament design",
    ],
    tech: ["Node.js", "GraphQL", "SQL"],
    accent: "from-emerald-500/30 to-emerald-500/0",
    details: {
      problem:
        "Monolithic systems made league and tournament management hard to scale.",
      solution:
        "Designed modular APIs separating leagues, matches, and teams.",
      architecture: [
        "Service-based modules",
        "GraphQL schema-first design",
        "Optimized relational queries",
      ],
      impact: [
        "Easier feature expansion",
        "Reduced development complexity",
      ],
    },
  },
  {
    id: "prioticket",
    title: "Prioticket",
    description:
      "High-performance ticketing system optimized for large datasets.",
    highlights: [
      "Large dataset handling",
      "Optimized query performance",
      "Export-ready reports",
    ],
    tech: ["BigQuery", "SQL", "CodeIgniter"],
    accent: "from-orange-400/30 to-orange-400/0",
    details: {
      problem: "Slow analytics queries over massive ticketing datasets.",
      solution:
        "Used BigQuery with optimized SQL for analytical workloads.",
      architecture: [
        "BigQuery analytical layer",
        "Optimized SQL pipelines",
        "Report-ready data views",
      ],
      impact: [
        "Significantly faster analytics",
        "Reliable reporting at scale",
      ],
    },
  },
];

/* ===================== TILT CARD ===================== */
function TiltCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [6, -6]);
  const rotateY = useTransform(x, [-80, 80], [-6, 6]);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetTilt = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      onClick={onClick}
      className="cursor-pointer group relative rounded-2xl border border-theme bg-gradient-to-br from-[var(--color-surface-soft)] to-transparent hover:border-theme-strong transition-all duration-300 overflow-hidden"
    >
      {/* Glowing top border */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${project.accent}`} />

      {/* Number badge */}
      <div className="absolute top-5 right-5 text-xs font-mono text-faint group-hover:text-soft transition">
        {String(index + 1).padStart(2, "0")}
      </div>

      <div className="relative p-8 md:p-9">
        <h3 className="text-lg font-semibold mb-3 pr-8 text-theme transition">
          {project.title}
        </h3>

        <p className="text-soft mb-5 text-sm leading-relaxed">{project.description}</p>

        <ul className="space-y-1.5 text-sm text-soft mb-6">
          {project.highlights.map((point) => (
            <li key={point} className="flex items-start gap-2">
              <span className="text-cyan-400 mt-0.5">›</span>
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-xs px-2.5 py-1 rounded-md bg-surface border border-theme text-soft"
            >
              {t}
            </span>
          ))}
        </div>

        {/* View details hint */}
        <p className="mt-5 text-xs text-cyan-400/0 group-hover:text-cyan-400/70 transition-all duration-300">
          View details →
        </p>
      </div>

      {/* Hover glow backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cyan-400/[0.04] to-transparent rounded-2xl" />
    </motion.div>
  );
}

/* ===================== COMPONENT ===================== */
export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* ===================== AMBIENT BACKGROUND ===================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-cyan-500/15 rounded-full blur-[200px]" />
        <div className="absolute top-1/3 -right-40 w-[620px] h-[620px] bg-blue-600/15 rounded-full blur-[220px]" />
      </div>

      {/* ===================== CONTENT ===================== */}
      <div className="relative z-10 px-8 md:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs tracking-[0.3em] text-cyan-400 uppercase mb-3">Portfolio</p>
          <h2 className="text-3xl md:text-4xl font-bold">Works I Have Done</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <TiltCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setActiveProject(project)}
            />
          ))}
        </div>
      </div>

      {/* ===================== MODAL ===================== */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </section>
  );
}
