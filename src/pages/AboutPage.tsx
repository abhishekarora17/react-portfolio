import { useState } from "react";
import profile from "../assets/profile.jpeg";
import resume from "../assets/resume.pdf";
import Contacts from "../components/SocialLinks";

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
                        <div className="w-full flex justify-center">
                            <Contacts />
                        </div>
                    </div>
                )}

                {/* ================= RESUME TAB ================= */}
                {activeTab === "resume" && (
                <div className="flex justify-center">
                    <div
                    className="
                        w-full
                        max-w-5xl
                        border border-white/10
                        rounded-xl
                        bg-[#05070b]
                        shadow-[0_0_40px_rgba(34,211,238,0.15)]
                        overflow-hidden
                    "
                    >
                    {/* ===== TOP BAR ===== */}
                    <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                        <span className="text-sm text-gray-400 tracking-wide">
                        Resume (PDF)
                        </span>

                        <a
                        href={resume}
                        download="Abhishek_Arora_Resume.pdf"
                        className="
                            inline-flex items-center gap-2
                            text-cyan-400
                            border border-cyan-400/30
                            px-4 py-2
                            rounded-md
                            hover:bg-cyan-400/10
                            transition
                            text-sm
                        "
                        >
                        ⬇ Download
                        </a>
                    </div>

                    {/* ===== PDF VIEW ===== */}
                    <iframe
                        src={resume}
                        className="
                        w-full
                        h-[70vh]
                        md:h-[80vh]
                        border-none
                        "
                        title="Resume PDF"
                    />
                    </div>
                </div>
                )}
            </div>
        </section>
    );
}
