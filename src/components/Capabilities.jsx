import React, { useEffect, useState } from 'react'
import { capabilities } from '../data/siteContent.js'
import '../styles/capabilities.css'

const capabilityDetails = {
  'AI Direction': {
    title: 'AI Direction',
    offer:
      'I guide AI outputs into a clear cinematic direction — mood, references, composition, visual consistency, and taste.',
    points: ['Creative direction', 'Prompt systems', 'Mood + reference control'],
  },
  'World Building': {
    title: 'World Building',
    offer:
      'I build the feeling and logic of a world — characters, locations, symbols, atmosphere, and story language.',
    points: ['World logic', 'Characters + environments', 'Cinematic atmosphere'],
  },
  'Visual Systems': {
    title: 'Visual Systems',
    offer:
      'I create repeatable visual rules so a project feels intentional, not random — colors, textures, typography, and image language.',
    points: ['Brand feeling', 'Consistent visuals', 'Scene identity'],
  },
  'Experimental Film': {
    title: 'Experimental Film',
    offer:
      'I shape short cinematic sequences using AI visuals, editing rhythm, image-to-video, sound, and emotional pacing.',
    points: ['Short films', 'AI video direction', 'Mood-driven edits'],
  },
  'Generative Design': {
    title: 'Generative Design',
    offer:
      'I create AI-assisted visual experiments, posters, interfaces, concepts, and evolving design systems.',
    points: ['Posters + concepts', 'Creative tools', 'Generative visuals'],
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
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
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
              className={`capability ${hovered === index ? 'capability--hovered' : ''}`}
              style={{ '--idx': idx }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => setSelected({ index, discipline, description })}
              data-cursor="expand"
            >
              <button
                className="capability__button"
                type="button"
                aria-label={`Open ${discipline}`}
              >
                <span className="capability__index">{index}</span>

                <span className="capability__body">
                  <h3 className="capability__name">{discipline}</h3>
                  <p className="capability__desc">{description}</p>
                </span>

                <span className="capability__trail" aria-hidden="true">
                  OPEN
                </span>
              </button>
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
            <p className="capability-modal__text">{activeDetail.offer}</p>

            <ul className="capability-modal__points">
              {activeDetail.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </section>
  )
}