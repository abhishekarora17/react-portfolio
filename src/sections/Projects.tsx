import { motion } from "framer-motion";

const projects = [
  {
    title: "High-Scale Ticketing Platform",
    description:
      "Built a scalable backend system handling real-time pricing, commissions, and reseller workflows.",
    highlights: [
      "Handled 100k+ daily transactions",
      "Optimized pricing queries by 40%",
      "Multi-role access control",
    ],
    tech: ["Node.js", "PostgreSQL", "Sequelize", "Redis"],
  },
  {
    title: "Attendance & Payroll Engine",
    description:
      "Designed a rule-based attendance and salary computation engine for enterprise use.",
    highlights: [
      "Automated salary calculations",
      "Reduced payroll errors significantly",
      "Configurable attendance rules",
    ],
    tech: ["NestJS", "MySQL", "Cron Jobs"],
  },
  {
    title: "SaaS-Ready API Platform",
    description:
      "Developed a modular API architecture ready for multi-tenant SaaS products.",
    highlights: [
      "JWT + Role-based access",
      "API versioning",
      "Clean service-repository pattern",
    ],
    tech: ["Laravel", "REST APIs", "Docker"],
  },
  {
    title: "Analytics & Reporting Engine",
    description:
      "Built data-heavy reporting pipelines with optimized queries and role-based dashboards.",
    highlights: [
      "Large dataset handling",
      "Optimized query performance",
      "Export-ready reports",
    ],
    tech: ["BigQuery", "SQL", "Node.js"],
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
