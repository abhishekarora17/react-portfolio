import Layout from "./components/Layout";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import WhatIDo from "./sections/WhatIDo";

export default function App() {
  return (
    <Layout>
      <Hero />
      <WhatIDo />
      <Projects />
    </Layout>
  );
}
