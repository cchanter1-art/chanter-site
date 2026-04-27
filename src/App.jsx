import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import ParticleArchiveScene from "./components/ParticleArchiveScene";
import LoginButton from "./components/LoginButton";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import CreatureFolder from "./pages/CreatureFolder";
import "./styles/app.css";

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const timeoutId = window.setTimeout(() => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);

    return () => window.clearTimeout(timeoutId);
  }, [location.pathname, location.hash]);

  const scrollTo = (id) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      return;
    }

    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="c-site">
      <Analytics />

      <div className="c-bg" />
      <ParticleArchiveScene />
      <div className="c-grid-bg" />

      <header className="c-nav">
        <button className="c-brand" type="button" onClick={() => scrollTo("home")}>
          WELCOME WORLD
        </button>

        <nav className="c-links" aria-label="Main navigation">
          <button type="button" onClick={() => scrollTo("systems")}>
            SYSTEMS
          </button>
          <button type="button" onClick={() => scrollTo("work")}>
            WORK
          </button>
          <button type="button" onClick={() => scrollTo("contact")}>
            CONTACT
          </button>
          <LoginButton compact />
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/creatures"
          element={
            <ProtectedRoute>
              <CreatureFolder />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
  );
}
