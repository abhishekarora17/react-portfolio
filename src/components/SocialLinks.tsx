import { Github, Linkedin, MessageCircle } from "lucide-react";

export default function Contacts() {
    return (
        <div className="mx-auto flex items-center gap-10">
            <a
                href="https://www.linkedin.com/in/abhishek-arora-818942221"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/[0.05] hover:border-cyan-400/40 transition"
            >
                <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
            </a>

            <a
                href="https://wa.me/917355874070?text=Hi%20Abhishek%20%F0%9F%91%8B%0AI%20came%20across%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you."
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/[0.05] hover:border-cyan-400/40 transition"
            >
                <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
            </a>

            <a
                href="https://github.com/abhishekarora17"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/[0.05] hover:border-cyan-400/40 transition"
            >
                <Github className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition" />
            </a>
        </div>
    )
}