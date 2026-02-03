// src/pages/Home.tsx
import Hero from "../sections/Hero";
import WhatIDo from "../sections/WhatIDo";
import Projects from "../sections/Projects";
import AboutMe from "../sections/AboutMe";
import Contact from "../sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <WhatIDo />
      <Projects />
      <AboutMe />
      <Contact />
    </>
  );
}
