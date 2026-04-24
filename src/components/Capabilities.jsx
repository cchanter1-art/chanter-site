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
  const [selectedIndex, setSelectedIndex] = useState(null)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    }

    setMounted(false)
    setSelectedIndex(null)
  }, [isActive])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedIndex(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const activeCapability =
    selectedIndex !== null ? capabilities[selectedIndex] : null

  const activeDetail = activeCapability
    ? capabilityDetails[activeCapability.discipline] || {
        title: activeCapability.discipline,
        text: activeCapability.description,
      }
    : null

  return (
    <section className={`capabilities ${mounted ? 'capabilities--in' : ''}`}>
      <div className="capabilities__header">
        <span className="scene-label">Systems</span>
        <h2 className="capabilities__title">What we build</h2>
      </div>

      <div className="capabilities__layout">
        <ol className="capabilities__list" aria-label="Capabilities">
          {capabilities.map(({ index, discipline, description }, i) => (
            <li
              key={index}
              className={`capability ${selectedIndex === i ? 'capability--active' : ''}`}
            >
              <button
                className="capability__trigger"
                type="button"
                onClick={() =>
                  setSelectedIndex((current) => (current === i ? null : i))
                }
                data-cursor="expand"
              >
                <span className="capability__index">{index}</span>

                <div className="capability__body">
                  <h3 className="capability__name">{discipline}</h3>
                  <p className="capability__desc">{description}</p>
                </div>

                <span className="capability__plus" aria-hidden="true">
                  {selectedIndex === i ? '−' : '+'}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <aside
          className={`capability-panel ${activeDetail ? 'capability-panel--open' : ''}`}
          aria-hidden={!activeDetail}
        >
          <div className="capability-panel__inner">
            {activeDetail ? (
              <>
                <div className="capability-panel__top">
                  <span className="capability-panel__eyebrow">Service window</span>

                  <button
                    className="capability-panel__close"
                    type="button"
                    onClick={() => setSelectedIndex(null)}
                    aria-label="Close"
                  >
                    ×
                  </button>
                </div>

                <h3 className="capability-panel__title">{activeDetail.title}</h3>
                <p className="capability-panel__text">{activeDetail.text}</p>
              </>
            ) : (
              <div className="capability-panel__placeholder">
                <span>Select a service</span>
                <p>Tap one of the lines on the left to preview what it offers.</p>
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        .capabilities__layout {
          width: min(1320px, calc(100vw - 110px));
          display: grid;
          grid-template-columns: minmax(0, 1fr) 420px;
          gap: 42px;
          align-items: start;
          margin-top: 28px;
        }

        .capabilities__list {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid rgba(170, 210, 255, 0.1);
        }

        .capability {
          border-bottom: 1px solid rgba(170, 210, 255, 0.1);
          transition: border-color 320ms ease, background 320ms ease;
        }

        .capability--active {
          border-color: rgba(190, 225, 255, 0.2);
          background: rgba(8, 14, 28, 0.16);
        }

        .capability__trigger {
          width: 100%;
          display: grid;
          grid-template-columns: 64px minmax(0, 1fr) 30px;
          gap: 18px;
          align-items: center;
          padding: 26px 0;
          background: transparent;
          border: 0;
          color: inherit;
          text-align: left;
          cursor: pointer;
        }

        .capability__index {
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(170, 205, 235, 0.48);
        }

        .capability__body {
          min-width: 0;
        }

        .capability__name {
          margin: 0;
          font-size: clamp(28px, 3.2vw, 44px);
          font-weight: 400;
          line-height: 1;
          color: rgba(240, 246, 255, 0.94);
          transition: color 320ms ease, transform 320ms ease;
        }

        .capability__desc {
          margin: 10px 0 0;
          max-width: 520px;
          font-size: 12px;
          line-height: 1.65;
          color: rgba(190, 210, 230, 0.42);
          transition: color 320ms ease;
        }

        .capability__plus {
          font-size: 22px;
          line-height: 1;
          color: rgba(190, 220, 250, 0.52);
          transition: transform 320ms ease, color 320ms ease;
        }

        .capability:hover .capability__name,
        .capability--active .capability__name {
          color: rgba(248, 250, 255, 0.98);
          transform: translateX(6px);
        }

        .capability:hover .capability__desc,
        .capability--active .capability__desc {
          color: rgba(210, 225, 245, 0.58);
        }

        .capability:hover .capability__plus,
        .capability--active .capability__plus {
          color: rgba(235, 244, 255, 0.9);
          transform: scale(1.1);
        }

        .capability-panel {
          position: sticky;
          top: 130px;
          min-height: 260px;
        }

        .capability-panel__inner {
          border: 1px solid rgba(170, 210, 255, 0.14);
          background: linear-gradient(145deg, rgba(4, 8, 18, 0.82), rgba(8, 15, 28, 0.88));
          box-shadow: 0 20px 80px rgba(0, 0, 0, 0.22);
          padding: 22px 22px 20px;
          opacity: 0.36;
          transform: translateX(18px);
          transition:
            opacity 380ms ease,
            transform 380ms ease,
            border-color 380ms ease,
            box-shadow 380ms ease;
        }

        .capability-panel--open .capability-panel__inner {
          opacity: 1;
          transform: translateX(0);
          border-color: rgba(190, 225, 255, 0.24);
          box-shadow: 0 24px 100px rgba(0, 0, 0, 0.3);
        }

        .capability-panel__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
        }

        .capability-panel__eyebrow {
          display: block;
          margin-bottom: 16px;
          font-size: 9px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(155, 190, 225, 0.66);
        }

        .capability-panel__close {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(190, 220, 255, 0.18);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(235, 244, 255, 0.9);
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
          flex: 0 0 auto;
        }

        .capability-panel__title {
          margin: 0 0 14px;
          font-size: clamp(34px, 4vw, 58px);
          font-weight: 400;
          line-height: 0.95;
          color: rgba(245, 248, 255, 0.98);
        }

        .capability-panel__text {
          margin: 0;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(215, 230, 250, 0.7);
          max-width: 32ch;
        }

        .capability-panel__placeholder span {
          display: block;
          margin-bottom: 12px;
          font-size: 10px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(160, 195, 225, 0.52);
        }

        .capability-panel__placeholder p {
          margin: 0;
          font-size: 13px;
          line-height: 1.7;
          color: rgba(190, 210, 230, 0.46);
          max-width: 28ch;
        }

        @media (max-width: 980px) {
          .capabilities__layout {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .capability-panel {
            position: relative;
            top: auto;
            min-height: 0;
          }

          .capability-panel__inner {
            transform: translateY(10px);
          }

          .capability-panel--open .capability-panel__inner {
            transform: translateY(0);
          }
        }

        @media (max-width: 760px) {
          .capabilities__layout {
            width: calc(100vw - 84px);
            margin-top: 18px;
          }

          .capability__trigger {
            grid-template-columns: 42px minmax(0, 1fr) 24px;
            gap: 10px;
            padding: 18px 0;
          }

          .capability__name {
            font-size: clamp(18px, 7vw, 30px);
          }

          .capability__desc {
            display: none;
          }

          .capability__plus {
            font-size: 18px;
          }

          .capability-panel__inner {
            padding: 18px 16px 16px;
          }

          .capability-panel__title {
            font-size: clamp(28px, 10vw, 44px);
          }

          .capability-panel__text {
            font-size: 13px;
            line-height: 1.65;
            max-width: none;
          }

          .capability-panel__close {
            width: 32px;
            height: 32px;
            font-size: 20px;
          }
        }
      `}</style>
    </section>
  )
}