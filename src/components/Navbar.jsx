import React from 'react'
import { nav } from '../data/siteContent.js'
import '../styles/navbar.css'

export default function Navbar({ currentScene, goToScene }) {
  return (
    <header className="navbar" aria-label="Primary navigation">
      <button
        className="navbar__brand"
        type="button"
        onClick={() => goToScene(0)}
        data-cursor="invert"
      >
        WELCOME WORLD
      </button>

      <nav className="navbar__links" aria-label="Site sections">
        {nav.map(({ label, scene }) => (
          <button
            key={label}
            className={`navbar__link ${currentScene === scene ? 'navbar__link--active' : ''}`}
            type="button"
            onClick={() => goToScene(scene)}
            data-cursor="invert"
          >
            {label}
          </button>
        ))}
      </nav>

      <span className="navbar__counter" aria-hidden="true">
        {String(currentScene + 1).padStart(2, '0')} / 04
      </span>
    </header>
  )
}