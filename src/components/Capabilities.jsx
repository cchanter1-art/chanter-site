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
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    } else {
      setMounted(false)
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

      <style>{`
        .capability-modal {
          position: fixed;
          inset: 0;
          z-index: 95;
          display: grid;
          place-items: center;
          padding: 24px;
          background:
            radial-gradient(circle at center, rgba(90, 140, 190, 0.10), transparent 42%),
            rgba(2, 5, 12, 0.78);
          backdrop-filter: blur(18px);
        }

        .capability-modal__window {
          position: relative;
          width: min(560px, 92vw);
          border: 1px solid rgba(170, 210, 255, 0.18);
          background: linear-gradient(145deg, rgba(4, 8, 18, 0.98), rgba(8, 15, 28, 0.94));
          box-shadow: 0 30px 120px rgba(0, 0, 0, 0.65);
          padding: 26px 24px 24px;
          color: rgba(235, 244, 255, 0.94);
        }

        .capability-modal__close {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 42px;
          height: 42px;
          border: 1px solid rgba(190, 220, 255, 0.18);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(235, 244, 255, 0.92);
          font-size: 28px;
          line-height: 1;
          cursor: pointer;
        }

        .capability-modal__eyebrow {
          display: block;
          margin-bottom: 16px;
          font-size: 10px;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(155, 190, 225, 0.72);
        }

        .capability-modal__title {
          margin: 0 48px 16px 0;
          font-size: clamp(34px, 6vw, 64px);
          font-weight: 400;
          line-height: 0.95;
          color: rgba(245, 248, 255, 0.96);
        }

        .capability-modal__text {
          margin: 0;
          max-width: 520px;
          font-size: 15px;
          line-height: 1.7;
          color: rgba(215, 230, 250, 0.72);
        }

        @media (max-width: 760px) {
          .capabilities__header {
            margin-bottom: 18px;
          }

          .capabilities__title {
            font-size: clamp(42px, 12vw, 62px);
            line-height: 0.95;
          }

          .capabilities__list {
            max-height: calc(100vh - 240px);
            overflow-y: auto;
            padding-right: 6px;
            padding-bottom: 28px;
          }

          .capability {
            min-height: 86px;
            padding: 14px 0;
          }

          .capability__index {
            font-size: 11px;
          }

          .capability__name {
            font-size: clamp(18px, 7vw, 30px);
            line-height: 1.02;
          }

          .capability__desc {
            display: none;
          }

          .capability__trail {
            display: none;
          }

          .capability-modal {
            display: flex;
            align-items: flex-start;
            justify-content: center;
            padding: 90px 14px 18px;
            overflow-y: auto;
          }

          .capability-modal__window {
            width: 100%;
            max-width: 420px;
            padding: 20px 18px 18px;
          }

          .capability-modal__close {
            top: 14px;
            right: 14px;
            width: 38px;
            height: 38px;
            font-size: 24px;
          }

          .capability-modal__eyebrow {
            margin-bottom: 12px;
            font-size: 9px;
          }

          .capability-modal__title {
            margin-right: 42px;
            font-size: clamp(28px, 11vw, 50px);
          }

          .capability-modal__text {
            font-size: 14px;
            line-height: 1.65;
          }
        }
      `}</style>
    </section>
  )
}