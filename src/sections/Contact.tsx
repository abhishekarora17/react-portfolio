import { motion } from "framer-motion";
import { Send } from "lucide-react";
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
      const res = await fetch("https://nodemailer-weld.vercel.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
        <div className="absolute -top-40 left-1/4 w-[520px] h-[520px] bg-cyan-500/[0.04] rounded-full blur-[260px]" />
        <div className="absolute bottom-0 right-1/4 w-[620px] h-[620px] bg-blue-500/[0.03] rounded-full blur-[300px]" />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-8 md:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full bg-emerald-400/[0.07] border border-emerald-400/[0.12]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Available for opportunities</span>
          </div>

          <p className="eyebrow">Contact</p>
          <h2 className="text-3xl md:text-4xl font-bold mb-16">Let's Connect</h2>
        </motion.div>

        {/* ================= FORM ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative max-w-5xl mx-auto w-full"
        >
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border border-white/[0.05] p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* LEFT */}
              <div className="space-y-5">
                <div className="floating-label">
                  <input
                    type="text"
                    placeholder=" "
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <label>Your Name</label>
                </div>

                <div className="floating-label">
                  <input
                    type="text"
                    placeholder=" "
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                  />
                  <label>Company / Location / Phone</label>
                </div>

                <div className="floating-label">
                  <input
                    type="email"
                    placeholder=" "
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                  <label>Email Address *</label>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col">
                <div className="floating-label flex-1">
                  <textarea
                    rows={7}
                    placeholder=" "
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    style={{ resize: "none" }}
                  />
                  <label>Message *</label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-5 btn-primary self-start disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  {loading ? "Sending..." : "Send Message"}
                </button>

                {sent && (
                  <motion.p
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-emerald-400 text-sm flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Message sent! I'll get back to you soon 🙂
                  </motion.p>
                )}
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
