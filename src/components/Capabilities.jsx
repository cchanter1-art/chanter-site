import React, { useEffect, useState } from 'react'
import { capabilities } from '../data/siteContent.js'
import '../styles/capabilities.css'

/**
 * Capabilities — 2026 redesign
 * Architectural index: numbered rows, hover reveals description.
 * Top rule draws in per row on mount. Category tag trails each row.
 */
export default function Capabilities({ isActive }) {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    } else {
      setMounted(false)
      setHovered(null)
    }
  }, [isActive])

  return (
    <section className={`capabilities ${mounted ? 'capabilities--in' : ''}`}>

      <div className="capabilities__header">
        <span className="scene-label">Systems</span>
        <h2 className="capabilities__title">What we build</h2>
      </div>

      <ol className="capabilities__list" aria-label="Capabilities">
        {capabilities.map(({ index, discipline, description }) => {
          const idx = Number(index) - 1
          return (
            <li
              key={index}
              className="capability"
              style={{ '--idx': idx }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              data-cursor="expand"
            >
              <span className="capability__index">{index}</span>

              <div className="capability__body">
                <h3 className="capability__name">{discipline}</h3>
                <p className="capability__desc">{description}</p>
              </div>

              <span className="capability__trail" aria-hidden="true">
                {discipline.toUpperCase()}
              </span>
            </li>
          )
        })}
      </ol>

    </section>
  )
}
