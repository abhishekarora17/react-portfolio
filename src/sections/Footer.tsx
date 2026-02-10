import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden">
      {/* ================= AMBIENT GLOW ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom- left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-cyan-500/15 rounded-full blur-[200px]" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[180px]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 px-12 md:px-24 py-8 border-t border-cyan-400/10">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center"
        >
          <p className="text-xs text-gray-400 tracking-wide">
            © {new Date().getFullYear()}{" "}
            <span className="text-gray-300 font-medium">
              Abhishek Arora
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
