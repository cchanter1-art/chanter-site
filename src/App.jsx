import React, { useEffect, useState } from "react";

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

const workItems = [
  {
    title: "Creature 01",
    tag: "Prototype",
  },
  {
    title: "Creature 02",
    tag: "Motion Test",
  },
  {
    title: "World System",
    tag: "Visual Study",
  },
  {
    title: "Neon Archive",
    tag: "Experiment",
  },
];

export default function App() {
  const [activeService, setActiveService] = useState(0);

  useEffect(() => {
    const id = "chanter-clean-mobile-css";
    const old = document.getElementById(id);
    if (old) old.remove();

    const style = document.createElement("style");
    style.id = id;
    style.innerHTML = CSS;
    document.head.appendChild(style);

    document.documentElement.style.background = "#030611";
    document.body.style.background = "#030611";
    document.body.style.margin = "0";
    document.body.style.overflowX = "hidden";

    return () => {
      const current = document.getElementById(id);
      if (current) current.remove();
    };
  }, []);

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

        <nav className="c-links">
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
        <div className="c-section-head">
          <p className="c-kicker">CREATURE ARCHIVE</p>
          <h2>Living prototypes</h2>
          <p className="c-muted">
            Early creature studies, cinematic tests, and visual experiments in progress.
          </p>
        </div>

        <div className="c-grid">
          {workItems.map((item, index) => (
            <article className="c-card" key={item.title}>
              <div className="c-card-image">
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
          Available for select commissions, collaborations, and long-form creative systems.
        </p>

        <a className="c-email" href="mailto:cchanter1@gmail.com">
          cchanter1@gmail.com
        </a>
      </section>
    </main>
  );
}

const CSS = `
*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: #030611;
}

body {
  margin: 0;
  background: #030611;
  color: #eef3ff;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  overflow-x: hidden;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button {
  appearance: none;
  -webkit-appearance: none;
  border: 0;
  background: transparent;
  color: inherit;
  font: inherit;
  cursor: pointer;
}

.c-site {
  position: relative;
  min-height: 100dvh;
  overflow-x: hidden;
  background: #030611;
  color: #eef3ff;
}

.c-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  background:
    radial-gradient(circle at 70% 15%, rgba(90, 120, 180, 0.18), transparent 34%),
    radial-gradient(circle at 20% 75%, rgba(80, 110, 170, 0.13), transparent 38%),
    linear-gradient(180deg, #050817 0%, #02040d 100%);
}

.c-bg::before {
  content: "";
  position: absolute;
  inset: -20%;
  background:
    repeating-radial-gradient(
      ellipse at 50% 50%,
      rgba(160, 190, 255, 0.065) 0px,
      rgba(160, 190, 255, 0.065) 1px,
      transparent 2px,
      transparent 18px
    );
  opacity: 0.34;
  transform: rotate(-18deg);
}

.c-noise {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
  background-size: 120px 120px;
  opacity: 0.42;
}

.c-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  height: 76px;
  padding: 0 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(3,6,17,0.95), rgba(3,6,17,0.66), transparent);
  backdrop-filter: blur(12px);
}

.c-brand,
.c-links button {
  color: rgba(238, 243, 255, 0.78);
  letter-spacing: 0.32em;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
}

.c-brand {
  letter-spacing: 0.24em;
}

.c-links {
  display: flex;
  align-items: center;
  gap: 34px;
}

.c-links button:hover,
.c-brand:hover {
  color: #ffffff;
}

.c-section {
  position: relative;
  z-index: 3;
  width: 100%;
  min-height: 100dvh;
  padding: 120px 64px 80px;
}

.c-hero {
  display: flex;
  align-items: flex-end;
}

.c-hero-inner {
  max-width: 980px;
}

.c-kicker {
  margin: 0 0 22px;
  color: rgba(190, 205, 235, 0.62);
  font-size: 12px;
  line-height: 1.6;
  letter-spacing: 0.34em;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  margin-bottom: 22px;
  color: #f4f7ff;
  font-size: clamp(70px, 13vw, 180px);
  line-height: 0.82;
  letter-spacing: -0.09em;
  font-weight: 500;
}

h2 {
  margin-bottom: 28px;
  color: #f3f6ff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(46px, 8vw, 96px);
  font-style: italic;
  font-weight: 400;
  line-height: 0.96;
  letter-spacing: -0.06em;
}

.c-hero-copy,
.c-muted {
  max-width: 680px;
  color: rgba(222, 230, 250, 0.72);
  font-size: 18px;
  line-height: 1.65;
}

.c-section-head {
  max-width: 900px;
  margin-bottom: 70px;
}

.c-service-list {
  width: 100%;
  border-top: 1px solid rgba(230, 238, 255, 0.13);
}

.c-service {
  width: 100%;
  display: grid;
  grid-template-columns: 82px 1fr 40px;
  align-items: center;
  gap: 20px;
  padding: 34px 0;
  border-bottom: 1px solid rgba(230, 238, 255, 0.13);
  text-align: left;
}

.c-service-num {
  color: rgba(210, 222, 250, 0.42);
  font-size: 15px;
  letter-spacing: 0.16em;
}

.c-service-title {
  color: rgba(238, 243, 255, 0.92);
  font-size: clamp(38px, 6vw, 76px);
  line-height: 1;
  letter-spacing: -0.06em;
  font-weight: 400;
}

.c-service-icon {
  justify-self: end;
  color: rgba(220, 232, 255, 0.68);
  font-size: 42px;
  line-height: 1;
}

.c-service.is-active .c-service-title,
.c-service:hover .c-service-title {
  color: #ffffff;
}

.c-panel {
  margin-top: 44px;
  max-width: 760px;
  padding: 34px;
  border: 1px solid rgba(210, 225, 255, 0.18);
  background: rgba(5, 10, 24, 0.58);
  backdrop-filter: blur(18px);
}

.c-panel-label {
  margin-bottom: 22px;
  color: rgba(180, 198, 235, 0.55);
  font-size: 12px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
}

.c-panel h3 {
  margin-bottom: 14px;
  color: #f5f8ff;
  font-size: 32px;
  letter-spacing: -0.04em;
  font-weight: 400;
}

.c-panel p:last-child {
  margin-bottom: 0;
  color: rgba(220, 230, 250, 0.72);
  font-size: 17px;
  line-height: 1.7;
}

.c-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 26px;
}

.c-card {
  min-width: 0;
}

.c-card-image {
  position: relative;
  aspect-ratio: 1 / 1;
  margin-bottom: 18px;
  overflow: hidden;
  border: 1px solid rgba(210, 225, 255, 0.14);
  background:
    radial-gradient(circle at 32% 28%, rgba(160, 235, 180, 0.65), transparent 18%),
    radial-gradient(circle at 70% 45%, rgba(70, 150, 255, 0.46), transparent 24%),
    linear-gradient(135deg, rgba(15, 28, 54, 0.95), rgba(4, 8, 19, 0.95));
}

.c-card-image::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to bottom, transparent, rgba(3,6,17,0.34)),
    repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 28px);
}

.c-card-image span {
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 2;
  color: rgba(238, 243, 255, 0.74);
  letter-spacing: 0.22em;
  font-size: 13px;
}

.c-card h3 {
  margin: 0 0 6px;
  color: #f2f6ff;
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.03em;
}

.c-card p {
  margin: 0;
  color: rgba(180, 198, 235, 0.58);
  font-size: 12px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
}

.c-contact {
  min-height: 76dvh;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.c-email {
  width: fit-content;
  margin-top: 26px;
  color: #f5f8ff;
  font-size: clamp(30px, 6vw, 72px);
  line-height: 1;
  letter-spacing: -0.06em;
  text-decoration: none;
  border-bottom: 1px solid rgba(245, 248, 255, 0.34);
}

.c-email:hover {
  border-bottom-color: #ffffff;
}

/* MOBILE */
@media (max-width: 768px) {
  .c-nav {
    height: 64px;
    padding: 0 22px;
  }

  .c-brand {
    font-size: 11px;
    letter-spacing: 0.24em;
    max-width: 150px;
    text-align: left;
  }

  .c-links {
    gap: 18px;
  }

  .c-links button {
    font-size: 10px;
    letter-spacing: 0.22em;
  }

  .c-section {
    min-height: auto;
    padding: 104px 28px 72px;
  }

  .c-hero {
    min-height: 100dvh;
    align-items: flex-end;
    padding-bottom: 96px;
  }

  .c-kicker {
    margin-bottom: 18px;
    font-size: 10px;
    letter-spacing: 0.26em;
  }

  h1 {
    font-size: clamp(66px, 20vw, 104px);
    line-height: 0.84;
  }

  h2 {
    font-size: clamp(42px, 13vw, 64px);
    line-height: 0.98;
  }

  .c-hero-copy,
  .c-muted {
    font-size: 15px;
    line-height: 1.65;
  }

  .c-section-head {
    margin-bottom: 44px;
  }

  .c-service {
    grid-template-columns: 38px minmax(0, 1fr) 26px;
    gap: 12px;
    padding: 28px 0;
  }

  .c-service-num {
    font-size: 12px;
  }

  .c-service-title {
    font-size: clamp(29px, 8.5vw, 43px);
    letter-spacing: -0.055em;
    white-space: normal;
  }

  .c-service-icon {
    font-size: 30px;
  }

  .c-panel {
    margin-top: 34px;
    padding: 24px;
  }

  .c-panel h3 {
    font-size: 26px;
  }

  .c-panel p:last-child {
    font-size: 15px;
  }

  .c-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 16px;
  }

  .c-card h3 {
    font-size: 18px;
  }

  .c-card p {
    font-size: 10px;
    letter-spacing: 0.22em;
  }

  .c-contact {
    min-height: 70dvh;
  }

  .c-email {
    font-size: clamp(28px, 8vw, 44px);
    overflow-wrap: anywhere;
  }
}

@media (max-width: 430px) {
  .c-nav {
    padding: 0 18px;
  }

  .c-brand {
    font-size: 10px;
    max-width: 120px;
  }

  .c-links {
    gap: 13px;
  }

  .c-links button {
    font-size: 9px;
    letter-spacing: 0.18em;
  }

  .c-section {
    padding-left: 22px;
    padding-right: 22px;
  }

  .c-grid {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 370px) {
  .c-brand {
    max-width: 95px;
  }

  .c-links {
    gap: 9px;
  }

  .c-links button {
    font-size: 8px;
  }
}
`;