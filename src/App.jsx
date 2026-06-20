import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useCallback } from "react";
import Navbar from "./components/layout/Navbar.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import ServiceDetail from "./pages/ServiceDetail.jsx";
import FloatingCTA from "./components/ui/FloatingCTA.jsx";
import "./styles/tokens.css";
import "./styles/global.css";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

function AppContent() {
  const handleAnchorClick = useCallback((id) => {
    requestAnimationFrame(() => {
      const el = document.getElementById(id);
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  }, []);

  return (
    <>
      <ScrollToTop />
      <Navbar onAnchorClick={handleAnchorClick} />
      <Routes>
        <Route path="/" element={<Home onAnchorClick={handleAnchorClick} />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <FloatingCTA />
    </>
  );
}

function NotFound() {
  return (
    <main id="main-content" style={{ paddingTop: "10rem", paddingBottom: "5rem", textAlign: "center" }}>
      <div className="container">
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "var(--text-4xl)", color: "var(--color-primary)", marginBottom: "1rem" }}>
          Page Not Found
        </h1>
        <p style={{ color: "var(--color-text-muted)", marginBottom: "2rem" }}>
          The page you are looking for does not exist.
        </p>
        <a
          href="/"
          style={{
            display: "inline-flex",
            background: "var(--color-accent)",
            color: "white",
            padding: "0.875rem 2rem",
            borderRadius: "999px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
