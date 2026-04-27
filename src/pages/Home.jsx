import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../data/services";
import { useAuth } from "../auth/AuthProvider";
import AuthModal from "../components/AuthModal";

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const openCreatureFolder = () => {
    if (user) {
      navigate("/creatures");
      return;
    }

    setAuthOpen(true);
  };

  return (
    <>
      <section id="home" className="c-section c-hero c-align-left">
        <div className="c-hero-inner">
          <p className="c-kicker">AI DIRECTION / WORLDBUILDING / VISUAL SYSTEMS</p>
          <h1>CHANTER</h1>
          <p className="c-hero-copy">
            Cinematic AI direction, creature design, and visual systems for the next wave of digital worlds.
          </p>
        </div>

        <div className="c-hero-illusion" aria-hidden="true">
          <div className="c-light-beam beam-a" />
          <div className="c-light-beam beam-b" />
          <div className="c-light-beam beam-c" />

          <div className="c-glass-core">
            <span className="c-crack c-crack-1" />
            <span className="c-crack c-crack-2" />
            <span className="c-crack c-crack-3" />
            <span className="c-crack c-crack-4" />
            <span className="c-crack c-crack-5" />

            <span className="c-shard shard-1" />
            <span className="c-shard shard-2" />
            <span className="c-shard shard-3" />
            <span className="c-shard shard-4" />
          </div>
        </div>
      </section>

      <section id="systems" className="c-section c-systems c-section-side c-align-right">
        <div className="c-section-head">
          <p className="c-kicker">SYSTEMS</p>
          <h2>What we build</h2>
        </div>

        <div className="c-service-list">
          {services.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`c-service ${activeService === index ? "is-active" : ""}`}
              onClick={() => setActiveService(index)}
            >
              <span className="c-service-num">{String(index + 1).padStart(2, "0")}</span>
              <span className="c-service-title">{item.title}</span>
              <span className="c-service-icon">{activeService === index ? "−" : "+"}</span>
            </button>
          ))}
        </div>

        <div className="c-panel">
          <p className="c-panel-label">SERVICE WINDOW</p>
          <h3>{services[activeService].title}</h3>
          <p>{services[activeService].text}</p>
        </div>
      </section>

      <section id="work" className="c-section c-work c-work-minimal-folder c-section-side c-align-left">
        <button
          className="c-closed-folder c-simple-folder"
          type="button"
          onClick={openCreatureFolder}
          aria-label="Open creature archive folder"
        >
          <span className="c-simple-folder-title">Archive</span>
          <span className="c-simple-folder-icon" aria-hidden="true" />
        </button>
      </section>

      <section id="contact" className="c-section c-contact c-section-side c-align-right">
        <p className="c-kicker">CONTACT</p>
        <h2>Begin a world.</h2>

        <p className="c-muted">
          Available for select commissions, collaborations, and long-form creative systems.
        </p>

        <a className="c-email" href="mailto:hello@chanterr.com">
  hello@chanterr.com
		</a>

        <div className="c-socials">
          <a href="https://www.instagram.com/___chanter/" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://www.tiktok.com/@__chanter" target="_blank" rel="noreferrer">
            TikTok
          </a>
        </div>
      </section>

      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => {
          setAuthOpen(false);
          navigate("/creatures");
        }}
      />
    </>
  );
}
