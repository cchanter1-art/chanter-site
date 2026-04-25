import React, { useMemo, useState } from 'react'
import './styles/app.css'

const services = [
  {
    title: 'AI Direction',
    label: 'Direction',
    text: 'Cinematic guidance for AI visuals, story moments, prompts, lighting, pacing, and final image language.',
  },
  {
    title: 'Creature Design',
    label: 'World Forms',
    text: 'Alien creatures, mythic companions, dark fantasy silhouettes, emotional character beats, and prototype studies.',
  },
  {
    title: 'Visual Systems',
    label: 'Identity',
    text: 'Consistent visual rules for worlds, campaigns, interfaces, archives, and creator workflows.',
  },
  {
    title: 'Experimental Film',
    label: 'Motion',
    text: 'Short cinematic tests, image-to-video scenes, atmospheric loops, music-led edits, and narrative fragments.',
  },
  {
    title: 'Generative Design',
    label: 'Tools',
    text: 'AI-assisted web experiments, utility windows, prompt systems, and creative production pipelines.',
  },
]

const work = [
  { title: 'Creature 01', tag: 'Prototype', tone: 'acid' },
  { title: 'Creature 02', tag: 'Motion Test', tone: 'blue' },
  { title: 'World System', tag: 'Visual Study', tone: 'violet' },
  { title: 'Neon Archive', tag: 'Experiment', tone: 'gold' },
]

export default function App() {
  const [activeService, setActiveService] = useState(0)
  const selectedService = useMemo(() => services[activeService], [activeService])

  const scrollToSection = (id) => {
    const section = document.getElementById(id)
    if (!section) return
    section.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <main className="chanter-site">
      <div className="site-background" aria-hidden="true">
        <div className="site-background__orb site-background__orb--one" />
        <div className="site-background__orb site-background__orb--two" />
        <div className="site-background__field" />
        <div className="site-background__grain" />
        <div className="site-background__vignette" />
      </div>

      <header className="site-nav">
        <button className="site-nav__brand" type="button" onClick={() => scrollToSection('home')}>
          <span>WELCOME</span>
          <span>WORLD</span>
        </button>

        <nav className="site-nav__links" aria-label="Primary navigation">
          <button type="button" onClick={() => scrollToSection('systems')}>Systems</button>
          <button type="button" onClick={() => scrollToSection('work')}>Work</button>
          <button type="button" onClick={() => scrollToSection('contact')}>Contact</button>
        </nav>
      </header>

      <section id="home" className="section hero-section">
        <div className="hero-section__content">
          <p className="eyebrow">AI direction / worldbuilding / visual systems</p>
          <h1>CHANTER</h1>
          <p className="hero-section__copy">
            Cinematic AI direction, creature design, and visual systems for digital worlds that feel alive.
          </p>
          <button className="primary-link" type="button" onClick={() => scrollToSection('systems')}>
            Explore systems
          </button>
        </div>

        <p className="hero-section__status" aria-hidden="true">
          Paphos / 2085 / visual engine online
        </p>
      </section>

      <section id="systems" className="section systems-section">
        <div className="section-heading">
          <p className="eyebrow">Systems</p>
          <h2>What we build</h2>
        </div>

        <div className="systems-layout">
          <div className="service-list" role="list">
            {services.map((service, index) => (
              <button
                key={service.title}
                type="button"
                className={`service-row ${index === activeService ? 'service-row--active' : ''}`}
                onClick={() => setActiveService(index)}
                aria-expanded={index === activeService}
              >
                <span className="service-row__number">{String(index + 1).padStart(2, '0')}</span>
                <span className="service-row__main">
                  <span className="service-row__title">{service.title}</span>
                  <span className="service-row__label">{service.label}</span>
                </span>
                <span className="service-row__icon">{index === activeService ? '−' : '+'}</span>
              </button>
            ))}
          </div>

          <aside className="service-panel" aria-label="Selected service">
            <p className="service-panel__label">Service window</p>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.text}</p>
          </aside>
        </div>
      </section>

      <section id="work" className="section work-section">
        <div className="section-heading section-heading--wide">
          <p className="eyebrow">Creature archive</p>
          <h2>Living prototypes</h2>
          <p className="section-copy">
            Early creature studies, cinematic tests, and visual experiments in progress. The archive grows as the world becomes clearer.
          </p>
        </div>

        <div className="work-grid">
          {work.map((item, index) => (
            <article className={`work-card work-card--${item.tone}`} key={item.title}>
              <div className="work-card__visual">
                <span>{String(index + 1).padStart(3, '0')}</span>
              </div>
              <div className="work-card__body">
                <h3>{item.title}</h3>
                <p>{item.tag}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="section contact-section">
        <div>
          <p className="eyebrow">Contact</p>
          <h2>Begin a world.</h2>
          <p className="section-copy">
            Available for selected commissions, collaborations, visual systems, and long-form creative direction.
          </p>
          <a className="email-link" href="mailto:cchanter1@gmail.com">cchanter1@gmail.com</a>
        </div>
      </section>
    </main>
  )
}
