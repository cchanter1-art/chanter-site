import React, { useEffect, useState } from 'react'
import { contact } from '../data/siteContent.js'
import '../styles/footer.css'

/**
 * Footer / Contact — 2026 redesign
 * Monument-style: headline dominates the lower third.
 * Ghost "WORLD" text floats top-right as ambient depth.
 * Email as the centrepiece interactive object.
 */
export default function Footer({ isActive, goToScene }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    } else {
      setMounted(false)
    }
  }, [isActive])

  return (
    <section className={`contact ${mounted ? 'contact--in' : ''}`}>

      {/* ── Ambient ghost word — top right depth layer ── */}
      <div className="contact__ambient" aria-hidden="true">World</div>

      {/* ── Scene label ── */}
      <span className="scene-label">Contact</span>

      {/* ── Monument headline ── */}
      <h2 className="contact__headline">{contact.headline}</h2>

      {/* ── Subtext ── */}
      <p className="contact__subtext">{contact.subtext}</p>

      {/* ── Email — primary CTA ── */}
      <a
        className="contact__email"
        href={`mailto:${contact.email}`}
        data-cursor="expand"
      >
        {contact.email}
      </a>

      {/* ── Divider ── */}
      <div className="contact__rule" aria-hidden="true" />

      {/* ── Social links ── */}
      <nav className="contact__socials" aria-label="Social links">
        {contact.socials.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className="contact__social-link"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="text"
          >
            {label}
          </a>
        ))}
      </nav>

      {/* ── Footer strip ── */}
      <div className="contact__bottom">
        <button
          className="contact__back"
          onClick={() => goToScene(0)}
          aria-label="Return to beginning"
          data-cursor="text"
        >
          ↑ Return
        </button>
        <span className="contact__footnote">{contact.footnote}</span>
      </div>

    </section>
  )
}
