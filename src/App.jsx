import React, { useState } from "react";

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

const workItems = Array.from({ length: 13 }, (_, i) => {
  const num = String(i + 1).padStart(2, "0");

  return {
    title: `Creature ${num}`,
    tag:
      i === 0
        ? "Prototype"
        : i === 1
        ? "Motion Test"
        : i === 2
        ? "Creature Study"
        : "Visual System",
    videoSrc: `/media/creature/creature_${num}.mp4`,
  };
});

export default function App() {
  const [activeService, setActiveService] = useState(0);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="c-site">
      <div className="c-bg" />
      <div className="c-noise" />

      <header className="c-nav">
        <button className="c-brand" onClick={() => scrollTo("home")}>
          WELCOME WORLD
        </button>

        <nav className="c-links" aria-label="Main navigation">
          <button onClick={() => scrollTo("systems")}>SYSTEMS</button>
          <button onClick={() => scrollTo("work")}>WORK</button>
          <button onClick={() => scrollTo("contact")}>CONTACT</button>
        </nav>
      </header>

      <section id="home" className="c-section c-hero">
        <div className="c-hero-inner">
          <p className="c-kicker">AI DIRECTION / WORLDBUILDING / VISUAL SYSTEMS</p>

          <h1>CHANTER</h1>

          <p className="c-hero-copy">
            Cinematic AI direction, creature design, and visual systems for the
            next wave of digital worlds.
          </p>

          <div className="c-socials">
            <a
              href="https://www.instagram.com/___chanter/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@__chanter"
              target="_blank"
              rel="noreferrer"
            >
              TikTok
            </a>
          </div>
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
              className={`c-service ${activeService === index ? "is-active" : ""}`}
              onClick={() => setActiveService(index)}
            >
              <span className="c-service-num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="c-service-title">{item.title}</span>
              <span className="c-service-icon">
                {activeService === index ? "−" : "+"}
              </span>
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
        <div className="c-section-head">
          <p className="c-kicker">CREATURE ARCHIVE</p>
          <h2>Living prototypes</h2>
          <p className="c-muted">
            Early creature studies, cinematic tests, and visual experiments in
            progress. The archive grows as the world becomes clearer.
          </p>
        </div>

        <div className="c-grid">
          {workItems.map((item, index) => (
            <article className="c-card" key={item.videoSrc}>
              <div className="c-card-image">
                <video
                  src={item.videoSrc}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />

                <span>{String(index + 1).padStart(3, "0")}</span>
              </div>

              <h3>{item.title}</h3>
              <p>{item.tag}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="c-section c-contact">
        <p className="c-kicker">CONTACT</p>

        <h2>Begin a world.</h2>

        <p className="c-muted">
          Available for select commissions, collaborations, and long-form
          creative systems.
        </p>

        <a className="c-email" href="mailto:cchanter1@gmail.com">
          cchanter1@gmail.com
        </a>

        <div className="c-socials c-socials-bottom">
          <a
            href="https://www.instagram.com/___chanter/"
            target="_blank"
            rel="noreferrer"
          >
            Instagram
          </a>
          <a
            href="https://www.tiktok.com/@__chanter"
            target="_blank"
            rel="noreferrer"
          >
            TikTok
          </a>
        </div>
      </section>
    </main>
  );
}