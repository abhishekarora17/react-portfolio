import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../sections/Hero";
import WhatIDo from "../sections/WhatIDo";
import Skills from "../sections/Skills";
import Projects from "../sections/Projects";
import AboutMe from "../sections/AboutMe";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import SectionAssistant from "../components/SectionAssistant";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const target = location.state?.scrollTo;
    if (!target) return;

    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <>
      <Hero />
      <WhatIDo />
      <Skills />
      <Projects />
      <AboutMe />
      <Contact />
      <Footer />
      <SectionAssistant />
    </>
  );
}
