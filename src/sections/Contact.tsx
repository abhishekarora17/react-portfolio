import { motion } from "framer-motion";
import { Send, Linkedin, Github, MessageCircle } from "lucide-react";
import { useState, useEffect } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.message) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3004/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSent(true);
        setForm({ name: "", contact: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("Form submit error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (sent) {
      const t = setTimeout(() => setSent(false), 4000);
      return () => clearTimeout(t);
    }
  }, [sent]);

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-20 overflow-hidden"
    >
      {/* ================= AMBIENT BACKGROUND ================= */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-cyan-500/12 rounded-full blur-[240px]" />
        <div className="absolute bottom-0 right-1/4 w-[620px] h-[620px] bg-blue-500/10 rounded-full blur-[280px]" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-900/10 to-transparent" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-12 md:px-24">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-20"
        >
          Let's Connect
        </motion.h2>

        {/* ================= FORM ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto w-full"
        >
          {/* Ambient border */}
          <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-br from-cyan-400/25 via-blue-500/10 to-transparent blur-xl opacity-70" />

          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl bg-black/60 border border-white/10 p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* LEFT */}
              <div className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    placeholder="Your name here"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Your Contact Address
                  </label>
                  <input
                    type="text"
                    placeholder="Company / Location / Phone"
                    value={form.contact}
                    onChange={(e) =>
                      setForm({ ...form, contact: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-cyan-400/50"
                    required
                  />
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col">
                <label className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  rows={6}
                  placeholder="Tell me briefly what you’d like to discuss..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-gray-200 placeholder-gray-500 resize-none focus:outline-none focus:border-cyan-400/50"
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 inline-flex items-center gap-2 self-start px-6 py-3 rounded-lg bg-cyan-400/15 text-cyan-300 border border-cyan-400/20 hover:bg-cyan-400/25 transition disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {sent && (
                  <p className="mt-4 text-green-400 text-sm">
                    Message sent successfully. I’ll get back to you soon 🙂
                  </p>
                )}
              </div>
            </div>
          </form>
        </motion.div>

        {/* ================= CONNECT DIVIDER ================= */}
        <div className="mt-24 flex items-center gap-6 w-full">
          <div className="flex-1 h-px bg-white/15" />
          <span className="text-sm text-gray-400 tracking-widest whitespace-nowrap">
            connect with me
          </span>
          <div className="flex-1 h-px bg-white/15" />
        </div>

        {/* ================= SOCIAL LINKS ================= */}
        <div className="mt-10 mx-auto flex items-center gap-10">
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
    </section>
  );
}
