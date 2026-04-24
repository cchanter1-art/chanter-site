import React, { useEffect, useState } from 'react'
import { capabilities } from '../data/siteContent.js'
import '../styles/capabilities.css'

const capabilityDetails = {
  'AI Direction': {
    title: 'AI Direction',
    text:
      'Creative direction for AI visuals: mood, references, composition, consistency, and cinematic taste.',
  },
  'World Building': {
    title: 'World Building',
    text:
      'Building the logic of a world: atmosphere, characters, locations, symbols, and story language.',
  },
  'Visual Systems': {
    title: 'Visual Systems',
    text:
      'A clear visual language for a project: color, texture, typography, image style, and repeatable rules.',
  },
  'Experimental Film': {
    title: 'Experimental Film',
    text:
      'Short cinematic sequences shaped with AI visuals, editing rhythm, sound, and emotional pacing.',
  },
  'Generative Design': {
    title: 'Generative Design',
    text:
      'AI-assisted posters, concepts, interfaces, creative experiments, and evolving design systems.',
  },
}

export default function Capabilities({ isActive }) {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState(null)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    } else {
      setMounted(false)
      setHovered(null)
      setSelected(null)
    }
  }, [isActive])

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelected(null)
    }

    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [])

  const activeDetail = selected ? capabilityDetails[selected.discipline] : null

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
              onClick={() => setSelected({ index, discipline, description })}
              data-cursor="expand"
              role="button"
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelected({ index, discipline, description })
                }
              }}
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

      {activeDetail && (
        <div
          className="capability-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeDetail.title}
          onClick={() => setSelected(null)}
        >
          <div
            className="capability-modal__window"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="capability-modal__close"
              type="button"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ×
            </button>

            <span className="capability-modal__eyebrow">Service window</span>
            <h3 className="capability-modal__title">{activeDetail.title}</h3>
            <p className="capability-modal__text">{activeDetail.text}</p>
          </div>
        </div>
      )}

    </section>
  )
}