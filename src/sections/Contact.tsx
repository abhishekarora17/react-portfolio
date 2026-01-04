import { motion } from "framer-motion";
import { Send, Linkedin, Github, MessageCircle } from "lucide-react";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/3 top-1/2 w-[520px] h-[520px] -translate-y-1/2 bg-cyan-500/8 rounded-full blur-[260px]" />
        <div className="absolute right-1/4 bottom-1/3 w-[600px] h-[600px] bg-blue-500/6 rounded-full blur-[300px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/10 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="w-full px-12 md:px-24 max-w-6xl mx-auto">
          {/* Header */}
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold mb-14"
          >
            Contact Me
          </motion.h2>

          {/* ================= FORM WITH AMBIENT BORDER ================= */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Ambient border */}
            <div
              className="
                pointer-events-none
                absolute -inset-1
                rounded-2xl
                bg-gradient-to-br
                from-cyan-400/25
                via-blue-500/10
                to-transparent
                blur-xl
                opacity-70
              "
            />

            <form
              className="
                relative
                rounded-2xl
                bg-black/60
                border border-white/10
                p-8
              "
            >
              {/* ================= TWO-PART FORM ================= */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* LEFT: ADDRESS + EMAIL */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Your Contact Address
                    </label>
                    <input
                      type="text"
                      placeholder="Company / Location / Phone"
                      className="
                        w-full
                        bg-white/5
                        border border-white/10
                        rounded-lg
                        px-4 py-3
                        text-gray-200
                        placeholder-gray-500
                        focus:outline-none
                        focus:border-cyan-400/50
                      "
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      className="
                        w-full
                        bg-white/5
                        border border-white/10
                        rounded-lg
                        px-4 py-3
                        text-gray-200
                        placeholder-gray-500
                        focus:outline-none
                        focus:border-cyan-400/50
                      "
                    />
                  </div>
                </div>

                {/* RIGHT: MESSAGE + SEND */}
                <div className="flex flex-col">
                  <label className="block text-sm text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Tell me briefly what you’d like to discuss..."
                    className="
                      w-full
                      flex-1
                      bg-white/5
                      border border-white/10
                      rounded-lg
                      px-4 py-3
                      text-gray-200
                      placeholder-gray-500
                      resize-none
                      focus:outline-none
                      focus:border-cyan-400/50
                    "
                  />

                  <button
                    type="submit"
                    className="
                      mt-6
                      inline-flex items-center justify-center gap-2
                      self-start
                      px-6 py-3
                      rounded-lg
                      bg-cyan-400/15
                      text-cyan-300
                      border border-cyan-400/20
                      hover:bg-cyan-400/25
                      transition
                    "
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </motion.div>

          {/* ================= CONNECT LINE ================= */}
          <div className="mt-20 flex items-center gap-6">
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-sm text-gray-400 tracking-widest">
              connect with me
            </span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          {/* ================= SOCIAL ICONS ================= */}
          <div className="mt-10 flex items-center justify-center gap-10">
            <a
              href="https://www.linkedin.com/in/abhishek-arora-818942221"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 transition"
            >
              <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
            </a>

            <a
              href="https://wa.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 transition"
            >
              <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
            </a>

            <a
              href="https://github.com/abhishekarora17"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 transition"
            >
              <Github className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
