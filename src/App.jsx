import React, { useEffect, useState } from 'react'
import SceneShell from './components/SceneShell.jsx'
import BackgroundVisual from './components/BackgroundVisual.jsx'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Capabilities from './components/Capabilities.jsx'
import Experiments from './components/Experiments.jsx'
import Footer from './components/Footer.jsx'
import IntroScreen from './components/IntroScreen.jsx'
import CustomCursor from './components/CustomCursor.jsx'
import TransitionOverlay from './components/TransitionOverlay.jsx'
import useSceneScroll from './hooks/useSceneScroll.js'
import useMouseParallax from './hooks/useMouseParallax.js'
import './styles/app.css'

const SCENES = [Hero, Capabilities, Experiments, Footer]

const MOBILE_FIX_CSS = `
/* =========================================================
   CHANTER MOBILE HARD FIX
   Keeps the cinematic identity but prevents broken mobile UI.
   ========================================================= */

*,
*::before,
*::after {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  min-height: 100%;
  margin: 0;
  overflow-x: hidden;
  background: #030611;
}

body {
  -webkit-font-smoothing: antialiased;
  text-rendering: geometricPrecision;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

button {
  appearance: none !important;
  -webkit-appearance: none !important;
  background: transparent !important;
  border: 0 !important;
  color: inherit !important;
  font: inherit !important;
  padding: 0;
  margin: 0;
  border-radius: 0 !important;
  box-shadow: none !important;
}

.app-root {
  position: relative;
  width: 100%;
  min-height: 100dvh;
  overflow-x: hidden;
  background: #030611;
}

/* stop any background layer from creating sideways scroll */
.app-root canvas,
.app-root video,
.app-root img,
.background,
.bg,
.bg-layer,
.background-visual,
.visual-background {
  max-width: 100vw;
}

/* =========================================================
   MOBILE
   ========================================================= */

@media (max-width: 768px) {
  html,
  body,
  #root {
    width: 100%;
    min-height: 100dvh;
    overflow-x: hidden !important;
  }

  body {
    background: #030611;
  }

  .app-root {
    min-height: 100dvh;
    overflow-x: hidden !important;
  }

  /* Disable custom cursor on touch screens */
  .custom-cursor,
  [class*="cursor"] {
    display: none !important;
  }

  /* The browser was showing ugly default white buttons.
     This forces every nav button/link back into the design. */
  .app-root button,
  .app-root a {
    appearance: none !important;
    -webkit-appearance: none !important;
    background: transparent !important;
    border: 0 !important;
    color: inherit !important;
    box-shadow: none !important;
    outline: none !important;
  }

  /* Top navigation / navbar */
  .app-root header,
  .app-root nav:not(.scene-dots),
  .navbar,
  .nav,
  .site-nav,
  .topbar,
  .top-bar {
    max-width: 100vw !important;
    overflow: hidden !important;
  }

  .navbar,
  .site-nav,
  .topbar,
  .top-bar,
  header {
    position: fixed !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    z-index: 80 !important;
    width: 100% !important;
    min-height: 64px !important;
    padding: 14px 16px 8px !important;
    display: flex !important;
    align-items: flex-start !important;
    justify-content: space-between !important;
    gap: 14px !important;
    background: linear-gradient(
      to bottom,
      rgba(3, 6, 17, 0.92),
      rgba(3, 6, 17, 0.58),
      rgba(3, 6, 17, 0)
    ) !important;
    backdrop-filter: blur(10px);
  }

  .navbar *,
  .site-nav *,
  .topbar *,
  .top-bar *,
  header * {
    background: transparent !important;
    border: 0 !important;
    box-shadow: none !important;
  }

  /* Brand / WELCOME WORLD */
  .brand,
  .logo,
  .wordmark,
  .welcome,
  .welcome-world,
  [class*="brand"],
  [class*="logo"],
  [class*="wordmark"] {
    color: rgba(245, 248, 255, 0.92) !important;
    font-size: 14px !important;
    line-height: 1.15 !important;
    letter-spacing: 0.08em !important;
    max-width: 124px !important;
    text-align: left !important;
    white-space: normal !important;
  }

  /* Nav links */
  .navbar a,
  .navbar button,
  .site-nav a,
  .site-nav button,
  .topbar a,
  .topbar button,
  .top-bar a,
  .top-bar button,
  header a,
  header button {
    color: rgba(238, 243, 255, 0.66) !important;
    font-size: 10px !important;
    line-height: 1 !important;
    letter-spacing: 0.22em !important;
    text-transform: uppercase !important;
    padding: 4px 0 !important;
    min-width: auto !important;
    height: auto !important;
  }

  .navbar a:hover,
  .navbar button:hover,
  .navbar a:focus,
  .navbar button:focus,
  .navbar .active,
  .navbar [aria-current="page"],
  header .active,
  header [aria-current="page"] {
    color: rgba(255, 255, 255, 0.96) !important;
  }

  /* If nav has an inner links container */
  .nav-links,
  .navbar__links,
  .menu,
  [class*="navLinks"],
  [class*="links"] {
    display: flex !important;
    align-items: center !important;
    justify-content: flex-end !important;
    gap: 16px !important;
    flex-wrap: nowrap !important;
    max-width: calc(100vw - 160px) !important;
    overflow: hidden !important;
  }

  /* Scene dots were rotating/cutting on the left. Hide them on phone. */
  .scene-dots,
  .scroll-hint,
  .side-label,
  .side-nav,
  .vertical-label,
  .scene-index,
  .scene-counter,
  [class*="scrollHint"],
  [class*="side"],
  [class*="vertical"] {
    display: none !important;
  }

  /* Scene shell safety */
  .scene-shell,
  .scenes,
  .scene-stack,
  main,
  section {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
  }

  /* Prevent 100vh mobile browser crop bugs */
  .scene,
  .hero,
  .section,
  section {
    min-height: 100dvh !important;
    height: auto !important;
    max-width: 100vw !important;
    padding-left: 24px !important;
    padding-right: 24px !important;
    overflow-x: hidden !important;
  }

  .hero {
    padding-top: 112px !important;
    padding-bottom: 72px !important;
    display: flex !important;
    align-items: flex-end !important;
  }

  h1 {
    font-size: clamp(42px, 15vw, 76px) !important;
    line-height: 0.92 !important;
    letter-spacing: -0.07em !important;
    max-width: 100% !important;
  }

  h2 {
    font-size: clamp(30px, 9vw, 48px) !important;
    line-height: 1.05 !important;
    letter-spacing: -0.045em !important;
    max-width: 100% !important;
  }

  p {
    max-width: 100% !important;
  }

  /* Systems / services section */
  .capabilities,
  .systems,
  .services,
  .service-list,
  [class*="capabilities"],
  [class*="systems"],
  [class*="services"] {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
  }

  .capabilities,
  .systems {
    padding-top: 108px !important;
  }

  .service-row,
  .system-row,
  .service-item,
  .capability-row,
  [class*="serviceRow"],
  [class*="systemRow"],
  [class*="capabilityRow"] {
    width: 100% !important;
    max-width: 100vw !important;
    display: grid !important;
    grid-template-columns: 38px minmax(0, 1fr) 32px !important;
    align-items: center !important;
    gap: 12px !important;
    padding: 28px 24px !important;
    margin: 0 !important;
    border-bottom: 1px solid rgba(230, 238, 255, 0.11) !important;
    overflow: hidden !important;
  }

  .service-row h3,
  .system-row h3,
  .service-item h3,
  .capability-row h3,
  .service-title,
  .capability-title,
  [class*="serviceTitle"],
  [class*="capabilityTitle"] {
    font-size: clamp(28px, 8.8vw, 44px) !important;
    line-height: 1.04 !important;
    letter-spacing: -0.055em !important;
    white-space: normal !important;
    overflow-wrap: anywhere !important;
    word-break: normal !important;
    max-width: 100% !important;
  }

  .service-number,
  .system-number,
  .capability-number,
  .index,
  [class*="number"],
  [class*="index"] {
    font-size: 12px !important;
    letter-spacing: 0.12em !important;
    color: rgba(225, 234, 255, 0.44) !important;
  }

  .plus,
  .minus,
  .service-icon,
  .capability-icon,
  [class*="icon"] {
    justify-self: end !important;
    color: rgba(230, 238, 255, 0.62) !important;
    font-size: 26px !important;
    line-height: 1 !important;
  }

  /* Service panel / modal */
  .service-window,
  .service-panel,
  .modal,
  .panel,
  .drawer,
  [class*="serviceWindow"],
  [class*="servicePanel"] {
    position: fixed !important;
    left: 16px !important;
    right: 16px !important;
    bottom: 18px !important;
    top: auto !important;
    width: auto !important;
    max-width: calc(100vw - 32px) !important;
    max-height: calc(100dvh - 150px) !important;
    overflow-y: auto !important;
    overflow-x: hidden !important;
    z-index: 90 !important;
    padding: 24px !important;
    background: rgba(5, 10, 24, 0.92) !important;
    border: 1px solid rgba(205, 222, 255, 0.18) !important;
    backdrop-filter: blur(18px);
  }

  .close,
  .close-button,
  .modal-close,
  [class*="close"] {
    position: sticky !important;
    top: 0 !important;
    margin-left: auto !important;
    z-index: 100 !important;
    width: 42px !important;
    height: 42px !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    background: rgba(255, 255, 255, 0.04) !important;
    border: 1px solid rgba(255, 255, 255, 0.12) !important;
    color: rgba(255, 255, 255, 0.9) !important;
  }

  /* Work / experiments */
  .experiments,
  .work,
  [class*="experiments"],
  [class*="work"] {
    padding-top: 108px !important;
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
  }

  /* Footer / contact */
  footer,
  .footer,
  .contact,
  [class*="footer"],
  [class*="contact"] {
    width: 100% !important;
    max-width: 100vw !important;
    overflow-x: hidden !important;
    padding: 108px 24px 110px !important;
  }

  footer a,
  .footer a,
  .contact a {
    overflow-wrap: anywhere !important;
    word-break: break-word !important;
  }

  /* Bottom return buttons must not become ugly browser buttons */
  .return,
  .return-button,
  [class*="return"] {
    background: transparent !important;
    border: 0 !important;
    color: rgba(245, 248, 255, 0.82) !important;
    font-size: 12px !important;
    letter-spacing: 0.22em !important;
    text-transform: uppercase !important;
  }
}

/* Very small phones */
@media (max-width: 390px) {
  .nav-links,
  .navbar__links,
  .menu,
  [class*="navLinks"],
  [class*="links"] {
    gap: 10px !important;
  }

  .navbar a,
  .navbar button,
  header a,
  header button {
    font-size: 9px !important;
    letter-spacing: 0.18em !important;
  }

  .brand,
  .logo,
  .wordmark,
  .welcome,
  .welcome-world,
  [class*="brand"],
  [class*="logo"],
  [class*="wordmark"] {
    font-size: 12px !important;
    max-width: 104px !important;
  }

  .service-row,
  .system-row,
  .service-item,
  .capability-row,
  [class*="serviceRow"],
  [class*="systemRow"],
  [class*="capabilityRow"] {
    grid-template-columns: 30px minmax(0, 1fr) 24px !important;
    padding-left: 18px !important;
    padding-right: 18px !important;
  }

  .service-row h3,
  .system-row h3,
  .service-item h3,
  .capability-row h3,
  .service-title,
  .capability-title,
  [class*="serviceTitle"],
  [class*="capabilityTitle"] {
    font-size: clamp(25px, 8.4vw, 38px) !important;
  }
}
`

function MobileFixStyles() {
  useEffect(() => {
    const id = 'chanter-mobile-hard-fix'
    const existing = document.getElementById(id)

    if (existing) {
      existing.innerHTML = MOBILE_FIX_CSS
      return
    }

    const style = document.createElement('style')
    style.id = id
    style.innerHTML = MOBILE_FIX_CSS
    document.head.appendChild(style)

    return () => {
      const current = document.getElementById(id)
      if (current) current.remove()
    }
  }, [])

  return null
}

export default function App() {
  const { currentScene, goToScene } = useSceneScroll(SCENES.length)
  const mousePos = useMouseParallax(1, 0.055)
  const [introGone, setIntroGone] = useState(false)

  return (
    <div className="app-root">
      <MobileFixStyles />

      <CustomCursor />

      <BackgroundVisual currentScene={currentScene} mousePos={mousePos} />

      <Navbar currentScene={currentScene} goToScene={goToScene} />

      <nav className="scene-dots" aria-label="Scene indicator">
        {SCENES.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`dot ${currentScene === i ? 'dot--active' : ''}`}
            onClick={() => goToScene(i)}
            aria-label={`Go to scene ${i + 1}`}
            data-cursor="invert"
          />
        ))}
      </nav>

      <SceneShell currentScene={currentScene}>
        {SCENES.map((SceneComponent, i) => (
          <SceneComponent
            key={i}
            isActive={currentScene === i}
            goToScene={goToScene}
            mousePos={mousePos}
          />
        ))}
      </SceneShell>

      <TransitionOverlay currentScene={currentScene} />

      <ScrollHint active={currentScene === 0} />

      {!introGone && (
        <IntroScreen onComplete={() => setIntroGone(true)} />
      )}
    </div>
  )
}

function ScrollHint({ active }) {
  return (
    <div
      className={`scroll-hint ${active ? 'scroll-hint--visible' : ''}`}
      aria-hidden="true"
    >
      <span className="scroll-hint__line" />
      <span className="scroll-hint__label">scroll</span>
    </div>
  )
}