// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AboutPage from "../pages/AboutPage";
import ValentinePage from "../pages/Valentine";
import PageWrapper from "../components/PageWrapper";

export default function AppRoutes() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PageWrapper><Home /></PageWrapper>
        } 
      />
      <Route 
        path="/about" 
        element={
            <PageWrapper><AboutPage /></PageWrapper>
        } 
      />
      <Route 
       path="/valentine" 
       element={
          <PageWrapper><ValentinePage /></PageWrapper>
        } 
      />
    </Routes>
  );
}
