import { useState } from "react";
import { motion } from "framer-motion";
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
}

/* ===================== DATA ===================== */
const projects: Project[] = [
  {
    id: "hms",
    title: "Hospital Management System (HMS)",
    description:
      "Built a scalable backend system handling real-time medicine stock and patient records.",
    highlights: [
      "Handled 100k+ daily patient records",
      "Optimized pricing queries by 40%",
      "Multi-role access control",
    ],
    tech: ["Laravel", "MySQL", "CodeIgnitor"],
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
    tech: ["BigQuery", "SQL", "CodeIgnitor"],
    details: {
      problem:
        "Slow analytics queries over massive ticketing datasets.",
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

/* ===================== COMPONENT ===================== */
export default function Projects(): JSX.Element {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  return (
    <section
      id="work"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* ===================== AMBIENT BACKGROUND ===================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[200px]" />
        <div className="absolute top-1/3 -right-40 w-[620px] h-[620px] bg-blue-600/20 rounded-full blur-[220px]" />
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-cyan-400/15 rounded-full blur-[180px]" />
      </div>

      {/* ===================== CONTENT ===================== */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-12 md:px-24">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-20"
        >
          Works I Have Done
        </motion.h2>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 h-full w-px bg-gradient-to-b from-transparent via-cyan-400/25 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  onClick={() => setActiveProject(project)}
                  className="
                    cursor-pointer
                    relative
                    rounded-2xl
                    p-8 md:p-10
                    border border-cyan-400/10
                    bg-gradient-to-br
                    from-white/5
                    via-white/[0.03]
                    to-cyan-400/5
                    backdrop-blur-sm
                  "
                >
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-cyan-400/15 blur-3xl opacity-25" />

                  <div className="relative">
                    <h3 className="text-xl font-semibold mb-3">
                      {project.title}
                    </h3>

                    <p className="text-gray-400 mb-5">
                      {project.description}
                    </p>

                    <ul className="space-y-1 text-sm text-gray-300 mb-6">
                      {project.highlights.map((point) => (
                        <li key={point}>— {point}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
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
