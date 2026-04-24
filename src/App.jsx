import React, { useState } from 'react'
import SceneShell        from './components/SceneShell.jsx'
import BackgroundVisual  from './components/BackgroundVisual.jsx'
import Navbar            from './components/Navbar.jsx'
import Hero              from './components/Hero.jsx'
import Capabilities      from './components/Capabilities.jsx'
import Experiments       from './components/Experiments.jsx'
import Footer            from './components/Footer.jsx'
import IntroScreen       from './components/IntroScreen.jsx'
import CustomCursor      from './components/CustomCursor.jsx'
import TransitionOverlay from './components/TransitionOverlay.jsx'
import useSceneScroll    from './hooks/useSceneScroll.js'
import useMouseParallax  from './hooks/useMouseParallax.js'
import './styles/app.css'

// ── Scene registry ─────────────────────────────────────────────────────────
// Each entry: component + whether it receives mousePos
const SCENES = [Hero, Capabilities, Experiments, Footer]

export default function App() {
  const { currentScene, goToScene } = useSceneScroll(SCENES.length)
  const mousePos                    = useMouseParallax(1, 0.055)
  const [introGone, setIntroGone]   = useState(false)

  return (
    <div className="app-root">

      {/* ── Custom cursor (desktop) ── */}
      <CustomCursor />

      {/* ── Persistent ambient background ── */}
      <BackgroundVisual currentScene={currentScene} mousePos={mousePos} />

      {/* ── Fixed chrome ── */}
      <Navbar currentScene={currentScene} goToScene={goToScene} />

      {/* ── Scene dot indicator ── */}
      <nav className="scene-dots" aria-label="Scene indicator">
        {SCENES.map((_, i) => (
          <button
            key={i}
            className={`dot ${currentScene === i ? 'dot--active' : ''}`}
            onClick={() => goToScene(i)}
            aria-label={`Go to scene ${i + 1}`}
            data-cursor="invert"
          />
        ))}
      </nav>

      {/* ── Scene stack ── */}
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

      {/* ── Scene-change shutter ── */}
      <TransitionOverlay currentScene={currentScene} />

      {/* ── Scroll hint (only on hero, fades after first move) ── */}
      <ScrollHint active={currentScene === 0} />

      {/* ── Cinematic intro (once per session) ── */}
      {!introGone && (
        <IntroScreen onComplete={() => setIntroGone(true)} />
      )}

    </div>
  )
}

function ScrollHint({ active }) {
  return (
    <div className={`scroll-hint ${active ? 'scroll-hint--visible' : ''}`} aria-hidden="true">
      <span className="scroll-hint__line" />
      <span className="scroll-hint__label">scroll</span>
    </div>
  )
}

