import { Github, Linkedin, MessageCircle } from "lucide-react";
import { useState } from "react";
import profile from "../assets/profile.jpeg";
import resume from "../assets/resume.pdf";

export default function AboutPage() {
    const [activeTab, setActiveTab] = useState<"about" | "resume">("resume");

    return (
        <section className="relative min-h-screen w-full bg-black overflow-hidden">
            {/* ================= AMBIENT BACKGROUND ================= */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-32 left-1/2 w-[800px] h-[520px] bg-cyan-500/10 rounded-full blur-[260px]" />
                <div className="absolute bottom-10 right-1/2 w-[800px] h-[400px] bg-blue-500/10 rounded-full blur-[280px]" />
            </div>

            <div className="relative z-10 max-w-9xl mx-auto px-8 md:px-16 py-20">

                {/* ================= FULL-WIDTH TABS ================= */}
                <div className="flex w-full border border-white/10 rounded-lg overflow-hidden mb-20">
                    <button
                        onClick={() => setActiveTab("about")}
                        className={`w-1/2 py-4 text-sm tracking-widest transition ${activeTab === "about"
                                ? "bg-cyan-400/10 text-cyan-400"
                                : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        ABOUT
                    </button>

                    <button
                        onClick={() => setActiveTab("resume")}
                        className={`w-1/2 py-4 text-sm tracking-widest transition ${activeTab === "resume"
                                ? "bg-cyan-400/10 text-cyan-400"
                                : "text-gray-400 hover:text-gray-200"
                            }`}
                    >
                        RESUME
                    </button>
                </div>

                {/* ================= ABOUT TAB ================= */}
                {activeTab === "about" && (
                    <div className="space-y-20">

                        {/* JOURNEY */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
                            <div className="md:col-span-2">
                                <p className="text-xl text-gray-200 mb-6">
                                    ☕ <span className="text-cyan-400">Let us have a cup of tea together.</span>
                                </p>

                                <p className="text-gray-400 leading-relaxed mb-6">
                                    My journey into backend development started with curiosity —
                                    curiosity about how systems behave under the hood, how data
                                    flows, and how decisions made early can shape scalability
                                    years later.
                                </p>

                                <p className="text-gray-400 leading-relaxed mb-6">
                                    Over time, I gravitated toward designing APIs, structuring
                                    databases, and building backend services that prioritize
                                    reliability, maintainability, and clarity over shortcuts.
                                </p>

                                <p className="text-gray-400 leading-relaxed">
                                    I believe good engineering is quiet — systems that work,
                                    scale, and explain themselves through clean design.
                                </p>
                            </div>

                            {/* PROFILE IMAGE */}
                            <div className="relative">
                                <div
                                    className="
                                        w-full
                                        h-[350px]
                                        aspect-full
                                        rounded-xl
                                        overflow-hidden
                                        border border-white/10
                                        shadow-[0_0_30px_rgba(34,211,238,0.15)]
                                    ">
                                    <img
                                        src={profile}
                                        alt="Abhishek Arora"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* ================= CONNECT DIVIDER ================= */}
                        <div className="mt-24 flex items-center gap-6 w-full">
                            <div className="flex-1 h-px bg-white/15" />
                            <span className="text-sm text-gray-400 tracking-widest whitespace-nowrap">
                                Connect With Me
                            </span>
                            <div className="flex-1 h-px bg-white/15" />
                        </div>

                        {/* ================= SOCIAL LINKS ================= */}
                        <div className="mx-auto flex items-center gap-10">
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
                )}

                {/* ================= RESUME TAB ================= */}
                {activeTab === "resume" && (
                    <div className="flex justify-center">
                        <div
                        className="
                            w-full
                            max-w-6xl
                            border border-white/10
                            rounded-xl
                            bg-[#05070b]
                            shadow-[0_0_40px_rgba(34,211,238,0.15)]
                        "
                        >
                        <iframe
                            src={resume}
                            className="
                            w-full
                            h-[calc(200vh-160px)]
                            border-none
                            "
                        />

                        <div className="p-4 border-t border-white/10 flex justify-between items-center">
                            <span className="text-sm text-gray-400">
                            Resume (PDF)
                            </span>
                        </div>
                        </div>

                    </div>
                )}
            </div>
        </section>
    );
}
