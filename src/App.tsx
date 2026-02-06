import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./routes/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
}
