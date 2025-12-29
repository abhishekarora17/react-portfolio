import { motion } from "framer-motion";

const projects = [
  {
    title: "Hospital Management System (HMS)",
    description:
      "Built a scalable backend system handling real-time medicine stock and patient records.",
    highlights: [
      "Handled 100k+ daily patient records",
      "Optimized pricing queries by 40%",
      "Multi-role access control",
    ],
    tech: ['Laravel', 'MySQL', 'CodeIgnitor'],
  },
  {
    title: "Flash: Learning App",
    description:
      "Designed a role based learning platform for kids to study online and track their progress.",
    highlights: [
      "JWT + Role-based access",
      "API versioning",
      "Clean service-repository pattern",
    ],
    tech: ["NestJS", "PostgresSQL", "Cron Jobs", "GraphQL"],
  },
  {
    title: "Project: Touchtight",
    description:
      "Developed a modular API architecture ready for soccer leagues and tournaments.",
    highlights: [
      "JWT + Role-based access",
      "API versioning",
      "Clean service-repository pattern",
    ],
    tech: ["Node.js", "Graphql", "SQL"],
  },
  {
    title: "Prioticket",
    description:
      "Built data-heavy reporting pipelines with optimized queries and role-based dashboards.",
    highlights: [
      "Large dataset handling",
      "Optimized query performance",
      "Export-ready reports",
    ],
    tech: ["BigQuery", "SQL", "CodeIgnitor"],
  },
];

export default function Projects() {
  return (
    <section
      id="work"
      className="relative min-h-screen w-full py-32 overflow-hidden"
    >
      {/* ===================== AMBIENT BLUE BACKGROUND ===================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top-left glow */}
        <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-cyan-500/20 rounded-full blur-[200px]" />

        {/* Center-right glow */}
        <div className="absolute top-1/3 -right-40 w-[620px] h-[620px] bg-blue-600/20 rounded-full blur-[220px]" />

        {/* Bottom-center glow */}
        <div className="absolute bottom-0 left-1/3 w-[420px] h-[420px] bg-cyan-400/15 rounded-full blur-[180px]" />
      </div>

      {/* ===================== CONTENT ===================== */}
      <div className="relative px-12 md:px-24 max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-20"
        >
          Selected Work
        </motion.h2>

        {/* ===================== GRID WRAPPER ===================== */}
        <div className="relative">
          {/* Between-column ambient glow (desktop only) */}
          <div
            className="
              pointer-events-none
              absolute left-1/2 top-0
              h-full w-[1px]
              bg-gradient-to-b
              from-transparent
              via-cyan-400/25
              to-transparent
              hidden md:block
            "
          />

          {/* ===================== PROJECT GRID ===================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="
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
                {/* Card glow */}
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

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button className="text-sm text-cyan-400 hover:underline">
                    View Details →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
