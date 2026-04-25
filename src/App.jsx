import React, { useState } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./styles/app.css";

const services = [
  {
    title: "AI Direction",
    text: "Cinematic direction for AI visuals, scenes, campaigns, and creative systems.",
  },
  {
    title: "Creature Design",
    text: "Original characters, alien creatures, dark fantasy forms, and visual identity tests.",
  },
  {
    title: "Visual Systems",
    text: "Worldbuilding, design language, UI mood, prompts, motion logic, and visual consistency.",
  },
  {
    title: "Experimental Film",
    text: "Short cinematic prototypes, image-to-video scenes, music-driven edits, and atmosphere tests.",
  },
  {
    title: "Generative Design",
    text: "AI-assisted creative workflows, brand visuals, web experiments, and creator tools.",
  },
];

const workItems = Array.from({ length: 13 }, (_, index) => {
  const num = String(index + 1).padStart(2, "0");

  return {
    title: `Creature ${num}`,
    tag:
      index === 0
        ? "Prototype"
        : index === 1
        ? "Motion Test"
        : index === 2
        ? "Creature Study"
        : "Visual System",
    videoSrc: `/media/creature/creature_${num}.mp4`,
  };
});

export default function App() {
  const [activeService, setActiveService] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);

  const scrollTo = (id) => {
    const target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openVideo = (index) => setActiveVideo(index);
  const closeVideo = () => setActiveVideo(null);

  const goPrevVideo = () => {
    setActiveVideo((current) =>
      current === null ? 0 : (current - 1 + workItems.length) % workItems.length
    );
  };

  const goNextVideo = () => {
    setActiveVideo((current) =>
      current === null ? 0 : (current + 1) % workItems.length
    );
  };

  return (
    <main className="c-site">
      <Analytics />

      <div className="c-bg" />
      <div className="c-grid-bg" />

      <header className="c-nav">
        <button className="c-brand" type="button" onClick={() => scrollTo("home")}>
          WELCOME WORLD
        </button>

        <nav className="c-links" aria-label="Main navigation">
          <button type="button" onClick={() => scrollTo("systems")}>SYSTEMS</button>
          <button type="button" onClick={() => scrollTo("work")}>WORK</button>
          <button type="button" onClick={() => scrollTo("contact")}>CONTACT</button>
        </nav>
      </header>

      <section id="home" className="c-section c-hero">
        <div className="c-hero-inner">
          <p className="c-kicker">AI DIRECTION / WORLDBUILDING / VISUAL SYSTEMS</p>
          <h1>CHANTER</h1>
          <p className="c-hero-copy">
            Cinematic AI direction, creature design, and visual systems for the next wave of digital worlds.
          </p>
        </div>
      </section>

      <section id="systems" className="c-section c-systems">
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

      <section id="work" className="c-section c-work">
        <div className="c-section-head c-work-head">
          <p className="c-kicker">CREATURE FILE</p>
          <h2>Archive</h2>
          <p className="c-muted">
            Compact visual tests.
          </p>
        </div>

        <div className="c-archive">
          <div className="c-archive-top">
            <span>CREATURE / MEDIA FILE</span>
            <span>{workItems.length} ITEMS</span>
          </div>

          <div className="c-archive-grid">
            {workItems.map((item, index) => (
              <article className="c-card" key={item.videoSrc}>
                <button
                  className="c-card-media"
                  type="button"
                  onClick={() => openVideo(index)}
                  aria-label={`Open ${item.title}`}
                >
                  <video
                    src={item.videoSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                  <span className="c-card-num">{String(index + 1).padStart(3, "0")}</span>
                  <span className="c-card-open">OPEN</span>
                </button>

                <div className="c-card-info">
                  <h3>{item.title}</h3>
                  <p>{item.tag}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="c-section c-contact">
        <p className="c-kicker">CONTACT</p>
        <h2>Begin a world.</h2>

        <p className="c-muted">
          Available for select commissions, collaborations, and long-form creative systems.
        </p>

        <a className="c-email" href="mailto:cchanter1@gmail.com">
          cchanter1@gmail.com
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

      {activeVideo !== null && (
        <div className="c-lightbox" role="dialog" aria-modal="true" aria-label="Video preview">
          <button className="c-lightbox-backdrop" type="button" onClick={closeVideo} aria-label="Close video" />

          <div className="c-lightbox-window">
            <div className="c-lightbox-top">
              <div>
                <p>{workItems[activeVideo].tag}</p>
                <h3>{workItems[activeVideo].title}</h3>
              </div>

              <button className="c-lightbox-close" type="button" onClick={closeVideo}>
                CLOSE
              </button>
            </div>

            <div className="c-lightbox-media">
              <video
                key={workItems[activeVideo].videoSrc}
                src={workItems[activeVideo].videoSrc}
                autoPlay
                muted
                loop
                playsInline
                controls
              />
            </div>

            <div className="c-lightbox-controls">
              <button type="button" onClick={goPrevVideo}>← PREV</button>
              <span>
                {String(activeVideo + 1).padStart(2, "0")} / {String(workItems.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={goNextVideo}>NEXT →</button>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
