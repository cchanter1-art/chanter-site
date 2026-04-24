import React, { useEffect, useState } from 'react'
import { capabilities } from '../data/siteContent.js'
import '../styles/capabilities.css'

const capabilityDetails = {
  'AI Direction': {
    title: 'AI Direction',
    text:
      'Creative direction for AI visuals: mood, references, composition, consistency, and cinematic taste.',
  },
  'Creature Design': {
    title: 'Creature Design',
    text:
      'Original creature concepts shaped through silhouette, mood, personality, movement, and cinematic presence.',
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

      <div className="systems-layout-clean">
        <ol className="systems-list-clean" aria-label="Capabilities">
          {capabilities.map(({ index, discipline }, i) => (
            <li
              key={index}
              className={`systems-row-clean ${selectedIndex === i ? 'systems-row-clean--active' : ''}`}
            >
              <button
                className="systems-button-clean"
                type="button"
                onClick={() =>
                  setSelectedIndex((current) => (current === i ? null : i))
                }
              >
                <span className="systems-index-clean">{index}</span>
                <span className="systems-title-clean">{discipline}</span>
                <span className="systems-plus-clean">
                  {selectedIndex === i ? '−' : '+'}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <aside className={`systems-panel-clean ${activeDetail ? 'systems-panel-clean--open' : ''}`}>
          {activeDetail ? (
            <>
              <div className="systems-panel-clean__top">
                <span>Service Window</span>
                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <h3>{activeDetail.title}</h3>
              <p>{activeDetail.text}</p>
            </>
          ) : (
            <>
              <span className="systems-panel-clean__ghost">Select a service</span>
              <p className="systems-panel-clean__placeholder">
                Tap one of the lines to preview what it offers.
              </p>
            </>
          )}
        </aside>
      </div>

      <style>{`
        .systems-layout-clean {
          width: min(1320px, calc(100vw - 110px));
          margin-top: 34px;
          display: grid;
          grid-template-columns: minmax(520px, 0.92fr) 420px;
          gap: 46px;
          align-items: start;
        }

        .systems-list-clean {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid rgba(170, 210, 255, 0.11);
        }

        .systems-row-clean {
          border-bottom: 1px solid rgba(170, 210, 255, 0.11);
        }

        .systems-button-clean {
          width: 100%;
          min-height: 94px;
          display: grid;
          grid-template-columns: 54px 1fr 32px;
          gap: 18px;
          align-items: center;
          padding: 18px 0;
          border: 0;
          background: transparent;
          color: rgba(235, 244, 255, 0.92);
          text-align: left;
          cursor: pointer;
        }

        .systems-index-clean {
          font-size: 10px;
          letter-spacing: 0.22em;
          color: rgba(170, 205, 235, 0.48);
        }

        .systems-title-clean {
          display: block;
          font-size: clamp(28px, 3vw, 44px);
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
          transition: transform 320ms ease, color 320ms ease;
        }

        .systems-plus-clean {
          font-size: 20px;
          color: rgba(190, 220, 250, 0.52);
          transition: transform 320ms ease, color 320ms ease;
        }

        .systems-row-clean:hover .systems-title-clean,
        .systems-row-clean--active .systems-title-clean {
          color: rgba(255, 255, 255, 0.98);
          transform: translateX(6px);
        }

        .systems-row-clean:hover .systems-plus-clean,
        .systems-row-clean--active .systems-plus-clean {
          color: rgba(255, 255, 255, 0.9);
          transform: scale(1.1);
        }

        .systems-panel-clean {
          position: sticky;
          top: 132px;
          min-height: 210px;
          border: 1px solid rgba(170, 210, 255, 0.13);
          background: linear-gradient(145deg, rgba(4, 8, 18, 0.68), rgba(8, 15, 28, 0.78));
          padding: 22px;
          opacity: 0.42;
          transform: translateX(16px);
          transition: opacity 360ms ease, transform 360ms ease, border-color 360ms ease;
        }

        .systems-panel-clean--open {
          opacity: 1;
          transform: translateX(0);
          border-color: rgba(190, 225, 255, 0.25);
        }

        .systems-panel-clean__top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
          margin-bottom: 14px;
        }

        .systems-panel-clean__top span,
        .systems-panel-clean__ghost {
          display: block;
          font-size: 9px;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(155, 190, 225, 0.66);
        }

        .systems-panel-clean__top button {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(190, 220, 255, 0.18);
          background: rgba(255, 255, 255, 0.04);
          color: rgba(235, 244, 255, 0.9);
          font-size: 20px;
          line-height: 1;
          cursor: pointer;
        }

        .systems-panel-clean h3 {
          margin: 0 0 14px;
          font-size: clamp(34px, 4vw, 58px);
          font-weight: 400;
          line-height: 0.95;
          color: rgba(245, 248, 255, 0.98);
        }

        .systems-panel-clean p {
          margin: 0;
          max-width: 34ch;
          font-size: 14px;
          line-height: 1.7;
          color: rgba(215, 230, 250, 0.7);
        }

        .systems-panel-clean__placeholder {
          margin-top: 14px !important;
          color: rgba(190, 210, 230, 0.46) !important;
        }

        @media (max-width: 980px) {
          .systems-layout-clean {
            grid-template-columns: 1fr;
            gap: 18px;
          }

          .systems-panel-clean {
            position: relative;
            top: auto;
            transform: translateY(8px);
          }

          .systems-panel-clean--open {
            transform: translateY(0);
          }
        }

        @media (max-width: 760px) {
          .systems-layout-clean {
            width: calc(100vw - 84px);
            margin-top: 24px;
          }

          .systems-button-clean {
            min-height: 86px;
            grid-template-columns: 42px 1fr 24px;
            gap: 10px;
            padding: 16px 0;
          }

          .systems-title-clean {
            font-size: clamp(22px, 7vw, 31px);
            white-space: normal;
          }

          .systems-panel-clean {
            padding: 18px 16px;
          }

          .systems-panel-clean h3 {
            font-size: clamp(30px, 10vw, 46px);
          }

          .systems-panel-clean p {
            max-width: none;
            font-size: 13px;
          }
        }
      `}</style>
    </section>
  )
}