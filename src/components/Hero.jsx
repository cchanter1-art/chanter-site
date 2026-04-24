import React, { useEffect, useState } from 'react'
import { brand } from '../data/siteContent.js'
import '../styles/hero.css'

/**
 * Hero — 2026 redesign
 * Bottom-anchored composition: title sits heavy at the base,
 * information stratified above it. Ghost letterform drifts opposite.
 * Parallax depth on the title and the ghost layer.
 */
export default function Hero({ isActive, goToScene, mousePos = { x: 0, y: 0 } }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    } else {
      setMounted(false)
    }
  }, [isActive])

  const px = mousePos.x * 6
  const py = mousePos.y * 4

  return (
    <section className={`hero ${mounted ? 'hero--in' : ''}`}>

      {/* ── Top-right coordinates ── */}
      <div className="hero__coords" aria-hidden="true">
        <span>51°30′ N</span><br/>
        <span>00°07′ W</span>
      </div>

      {/* ── Ghost letterform — deepest parallax layer ── */}
      <div
        className={`hero__ghost ${mounted ? 'hero__ghost--in' : ''}`}
        aria-hidden="true"
        style={{
          transform: `translateY(calc(-50% + ${py * -0.7}px)) translateX(${px * -0.9}px)`,
          transition: 'transform 1.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        C
      </div>

      {/* ── Eyebrow rule ── */}
      <div className="hero__rule" />

      {/* ── Main title with per-character parallax depth ── */}
      <h1
        className="hero__title"
        style={{
          transform: `translate(${px * 0.4}px, ${py * 0.3}px)`,
          transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
      >
        {'CHANTER'.split('').map((char, i) => (
          <span
            key={i}
            className="hero__title-char"
            style={{
              '--i': i,
              ...(mounted && {
                transform: `translate(${px * (0.25 + i * 0.035)}px, ${py * (0.18 + i * 0.025)}px)`,
                transition: 'transform 1.1s cubic-bezier(0.22, 1, 0.36, 1)',
              }),
            }}
          >
            {char}
          </span>
        ))}
      </h1>

      {/* ── Tagline ── */}
      <p className="hero__tagline">{brand.tagline}</p>

      {/* ── CTA cluster ── */}
      <div className="hero__cta-group">
        <button
          className="hero__cta"
          onClick={() => goToScene(1)}
          data-cursor="expand"
        >
          <span>Enter</span>
          <svg
            className="hero__cta-arrow"
            viewBox="0 0 28 8"
            fill="none"
            aria-hidden="true"
          >
            <line x1="0" y1="4" x2="23" y2="4" stroke="currentColor" strokeWidth="0.7"/>
            <polyline points="19,0.5 26,4 19,7.5" fill="none" stroke="currentColor" strokeWidth="0.7"/>
          </svg>
        </button>

        <button
          className="hero__cta-secondary"
          onClick={() => goToScene(3)}
          data-cursor="text"
        >
          Commission
        </button>
      </div>

      {/* ── Right info column ── */}
      <div className="hero__info" aria-hidden="true">
        <span className="hero__info-year">{brand.year}</span>
        <span className="hero__info-status">
          <span className="hero__info-dot" />
          Available
        </span>
      </div>

    </section>
  )
}
