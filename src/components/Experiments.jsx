import React, { useEffect, useState } from 'react'
import { works } from '../data/siteContent.js'
import '../styles/experiments.css'

/**
 * Experiments — 2026 redesign
 * Left: indexed title list. Right: spatial preview panel.
 * Hover on row changes preview. Active row gets full colour.
 */
export default function Experiments({ isActive }) {
  const [mounted,   setMounted]   = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const [hovered,   setHovered]   = useState(null)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    } else {
      setMounted(false)
    }
  }, [isActive])

  const displayIdx = hovered !== null ? hovered : activeIdx

  return (
    <section className={`experiments ${mounted ? 'experiments--in' : ''}`}>

      <div className="experiments__header">
        <span className="scene-label">Selected Work</span>
        <h2 className="experiments__title">Constructed worlds</h2>
      </div>

      <div className="experiments__body">

        {/* ── List ── */}
        <ol className="work-list">
          {works.map(({ id, title, category, year }, i) => (
            <li
              key={id}
              className={`work-item ${activeIdx === i ? 'work-item--active' : ''}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setActiveIdx(i)}
              data-cursor="expand"
            >
              <span className="work-item__num">{id}</span>
              <span className="work-item__title">{title}</span>
              <span className="work-item__meta">
                <span className="work-item__category">{category}</span>
                <span className="work-item__year">{year}</span>
              </span>
            </li>
          ))}
        </ol>

        {/* ── Preview ── */}
        <div className="work-preview">
          {works.map(({ id, title, description, imageSrc, gradient }, i) => (
            <div
              key={id}
              className={`work-preview__panel ${displayIdx === i ? 'work-preview__panel--active' : ''}`}
            >
              {imageSrc
                ? <img src={imageSrc} alt={title} className="work-preview__img" />
                : <div className="work-preview__placeholder" style={{ background: gradient }} />
              }
              <div className="work-preview__meta">
                <p className="work-preview__desc">{description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

    </section>
  )
}
