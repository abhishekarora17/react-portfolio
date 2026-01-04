import Layout from "./components/Layout";
import AboutMe from "./sections/AboutMe";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import WhatIDo from "./sections/WhatIDo";

export default function App() {
  return (
    <Layout>
      <Hero />
      <WhatIDo />
      <Projects />
      <AboutMe />
      <Contact />
    </Layout>
  );
}
