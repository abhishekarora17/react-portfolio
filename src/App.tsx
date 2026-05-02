import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./routes/ScrollToTop";
import IntroLoader from "./components/IntroLoader";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <IntroLoader onComplete={() => setLoaded(true)} />}
      <BrowserRouter>
        <Layout>
          <ScrollToTop />
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </>
  );
}
