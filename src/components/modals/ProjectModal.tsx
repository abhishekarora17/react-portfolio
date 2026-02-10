import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "../../sections/Projects";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({
  project,
  onClose,
}: Readonly<ProjectModalProps>) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 40, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="
            relative
            max-w-2xl w-full
            rounded-2xl
            p-8
            bg-gradient-to-br
            from-[#0b1220]
            via-[#0b1220]/95
            to-cyan-500/10
            border border-cyan-400/20
            overflow-y-auto
            max-h-[85vh]
          "
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-cyan-300 hover:text-cyan-400"
          >
            ✕
          </button>

          <h3 className="text-2xl font-semibold mb-4">
            {project.title}
          </h3>

          <Section title="Problem" text={project.details.problem} />
          <Section title="Solution" text={project.details.solution} />
          <List title="Architecture" items={project.details.architecture} />
          <List title="Impact" items={project.details.impact} />

          <div className="flex flex-wrap gap-2 mt-6">
            {project.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-3 py-1 rounded-full bg-cyan-400/10 text-cyan-300"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ===================== SUB COMPONENTS ===================== */

interface SectionProps {
  title: string;
  text: string;
}

function Section({ title, text }: Readonly<SectionProps>) {
  return (
    <div className="mb-5">
      <h4 className="text-sm uppercase tracking-wide text-cyan-400 mb-1">
        {title}
      </h4>
      <p className="text-gray-300 text-sm">{text}</p>
    </div>
  );
}

interface ListProps {
  title: string;
  items: string[];
}

function List({ title, items }: Readonly<ListProps>) {
  return (
    <div className="mb-5">
      <h4 className="text-sm uppercase tracking-wide text-cyan-400 mb-1">
        {title}
      </h4>
      <ul className="list-disc list-inside text-gray-300 text-sm space-y-1">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
