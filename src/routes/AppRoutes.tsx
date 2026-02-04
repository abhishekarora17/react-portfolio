// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ValentinePage from "../pages/Valentine";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/about" element={<AboutPage />} />
       <Route path="/valentine" element={<ValentinePage />} />

    </Routes>
  );
}
