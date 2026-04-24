import React from 'react'
import { brand, nav } from '../data/siteContent.js'
import '../styles/navbar.css'

export default function Navbar({ currentScene, goToScene }) {
  return (
    <header className="navbar">

      <button
        className="navbar__logo"
        onClick={() => goToScene(0)}
        aria-label="Return to beginning"
        data-cursor="text"
      >
        {brand.name}
      </button>

      <nav className="navbar__links" aria-label="Scene navigation">
        {nav.map(({ label, scene }) => (
          <button
            key={label}
            className={`navbar__link ${currentScene === scene ? 'navbar__link--active' : ''}`}
            onClick={() => goToScene(scene)}
            data-cursor="text"
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="navbar__counter" aria-hidden="true">
        <span className="navbar__counter-current">
          {String(currentScene + 1).padStart(2, '0')}
        </span>
        <span className="navbar__counter-sep">/</span>
        <span className="navbar__counter-total">
          {String(nav.length + 1).padStart(2, '0')}
        </span>
      </div>

    </header>
  )
}
