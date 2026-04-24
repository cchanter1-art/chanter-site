import React, { useEffect, useState } from 'react'
import { works } from '../data/siteContent.js'
import '../styles/experiments.css'

export default function Experiments({ isActive }) {
  const [mounted, setMounted] = useState(false)
  const [openWork, setOpenWork] = useState(null)

  useEffect(() => {
    if (isActive) {
      const t = setTimeout(() => setMounted(true), 80)
      return () => clearTimeout(t)
    }

    setMounted(false)
    setOpenWork(null)
  }, [isActive])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpenWork(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section className={`experiments experiments--archive ${mounted ? 'experiments--in' : ''}`}>
      <div className="experiments__header">
        <span className="scene-label">Creature Archive</span>
        <h2 className="experiments__title">Living prototypes</h2>
        <p className="experiments__intro">
          Early creature studies, cinematic tests, and visual experiments in progress.
        </p>
      </div>

      <div className="creature-grid">
        {works.map((work) => (
          <button
            key={work.id}
            className="creature-card"
            type="button"
            onClick={() => setOpenWork(work)}
          >
            <span className="creature-card__id">{work.id}</span>

            <div className="creature-card__media">
              {work.videoSrc ? (
                <video
                  src={work.videoSrc}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(event) => event.currentTarget.play()}
                  onMouseLeave={(event) => {
                    event.currentTarget.pause()
                    event.currentTarget.currentTime = 0
                  }}
                />
              ) : (
                <div className="creature-card__empty" />
              )}
            </div>

            <div className="creature-card__text">
              <strong>{work.title}</strong>
              <span>{work.category}</span>
            </div>
          </button>
        ))}
      </div>

      {openWork && (
        <div className="creature-modal" role="dialog" aria-modal="true">
          <button
            className="creature-modal__backdrop"
            type="button"
            aria-label="Close"
            onClick={() => setOpenWork(null)}
          />

          <div className="creature-modal__window">
            <div className="creature-modal__top">
              <div>
                <span>{openWork.category}</span>
                <h3>{openWork.title}</h3>
              </div>

              <button
                className="creature-modal__close"
                type="button"
                onClick={() => setOpenWork(null)}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <div className="creature-modal__video">
              {openWork.videoSrc ? (
                <video
                  src={openWork.videoSrc}
                  controls
                  autoPlay
                  loop
                  playsInline
                  ref={(video) => {
                    if (video) {
                      video.muted = false
                      video.volume = 0.85
                      video.play().catch(() => {
                        video.muted = true
                        video.play().catch(() => {})
                      })
                    }
                  }}
                />
              ) : (
                <div className="creature-modal__empty" />
              )}
            </div>

            <p>{openWork.description}</p>
          </div>
        </div>
      )}

      <style>{`
        .experiments--archive {
          padding-bottom: 6vh;
        }

        .experiments__intro {
          max-width: 420px;
          margin-top: 14px;
          color: rgba(190, 210, 230, 0.48);
          font-size: 12px;
          line-height: 1.6;
        }

        .creature-grid {
          width: min(1180px, calc(100vw - 110px));
          margin-top: clamp(34px, 6vh, 62px);
          display: grid;
          grid-template-columns: repeat(5, minmax(0, 1fr));
          gap: 12px;
        }

        .creature-card {
          position: relative;
          border: 1px solid rgba(160, 200, 240, 0.13);
          background: rgba(4, 8, 18, 0.34);
          color: rgba(235, 244, 255, 0.92);
          padding: 0;
          text-align: left;
          overflow: hidden;
          cursor: pointer;
          transition:
            transform 420ms ease,
            border-color 420ms ease,
            background 420ms ease;
        }

        .creature-card:hover {
          transform: translateY(-5px);
          border-color: rgba(190, 225, 255, 0.34);
          background: rgba(8, 14, 28, 0.58);
        }

        .creature-card__id {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          font-size: 9px;
          letter-spacing: 0.2em;
          color: rgba(180, 215, 245, 0.68);
          text-shadow: 0 2px 12px rgba(0, 0, 0, 0.9);
        }

        .creature-card__media {
          width: 100%;
          aspect-ratio: 9 / 11;
          background:
            radial-gradient(circle at 50% 20%, rgba(90, 140, 190, 0.12), transparent 45%),
            rgba(0, 0, 0, 0.32);
          overflow: hidden;
        }

        .creature-card__media video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          opacity: 0.78;
          filter: saturate(0.9) contrast(1.05);
          transition:
            opacity 420ms ease,
            transform 620ms ease,
            filter 420ms ease;
        }

        .creature-card:hover .creature-card__media video {
          opacity: 1;
          transform: scale(1.04);
          filter: saturate(1.05) contrast(1.08);
        }

        .creature-card__empty {
          width: 100%;
          height: 100%;
          background: linear-gradient(145deg, #050814, #10182a);
        }

        .creature-card__text {
          padding: 11px 12px 13px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          min-height: 52px;
        }

        .creature-card__text strong {
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
          color: rgba(245, 248, 255, 0.92);
        }

        .creature-card__text span {
          font-size: 7px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(160, 195, 225, 0.52);
        }

        .creature-modal {
          position: fixed;
          inset: 0;
          z-index: 90;
          display: grid;
          place-items: center;
          padding: 24px;
        }

        .creature-modal__backdrop {
          position: absolute;
          inset: 0;
          border: 0;
          background:
            radial-gradient(circle at center, rgba(90, 140, 190, 0.11), transparent 44%),
            rgba(2, 5, 12, 0.82);
          backdrop-filter: blur(18px);
          cursor: pointer;
        }

        .creature-modal__window {
          position: relative;
          width: min(420px, 92vw);
          max-height: 88vh;
          overflow: hidden;
          border: 1px solid rgba(170, 210, 255, 0.2);
          background: linear-gradient(145deg, rgba(4, 8, 18, 0.98), rgba(8, 15, 28, 0.95));
          box-shadow: 0 30px 120px rgba(0, 0, 0, 0.68);
        }

        .creature-modal__top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 18px 14px;
          border-bottom: 1px solid rgba(170, 210, 255, 0.12);
        }

        .creature-modal__top span {
          display: block;
          margin-bottom: 8px;
          font-size: 9px;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(155, 190, 225, 0.66);
        }

        .creature-modal__top h3 {
          margin: 0;
          font-size: 34px;
          font-weight: 400;
          line-height: 0.95;
          color: rgba(245, 248, 255, 0.96);
        }

        .creature-modal__close {
          width: 34px;
          height: 34px;
          border: 1px solid rgba(190, 220, 255, 0.18);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.04);
          color: rgba(235, 244, 255, 0.92);
          font-size: 24px;
          line-height: 1;
          cursor: pointer;
        }

        .creature-modal__video {
          background: rgba(0, 0, 0, 0.46);
          display: grid;
          place-items: center;
        }

        .creature-modal__video video {
          width: 100%;
          max-height: 62vh;
          object-fit: contain;
          display: block;
        }

        .creature-modal__empty {
          width: 100%;
          height: 420px;
          background: linear-gradient(145deg, #050814, #10182a);
        }

        .creature-modal__window p {
          margin: 0;
          padding: 15px 18px 18px;
          color: rgba(215, 230, 250, 0.66);
          font-size: 12px;
          line-height: 1.65;
        }

        @media (min-width: 1400px) {
          .creature-grid {
            grid-template-columns: repeat(6, minmax(0, 1fr));
          }
        }

        @media (max-width: 1100px) {
          .creature-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }
        }

        @media (max-width: 760px) {
          .experiments__intro {
            font-size: 11px;
            max-width: 280px;
          }

          .creature-grid {
            width: calc(100vw - 84px);
            margin-top: 30px;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .creature-card__media {
            aspect-ratio: 9 / 10.5;
          }

          .creature-card__text {
            padding: 10px;
            min-height: 48px;
          }

          .creature-card__text strong {
            font-size: 13px;
          }

          .creature-card__text span {
            font-size: 7px;
          }

          .creature-modal {
            padding: 14px;
          }

          .creature-modal__window {
            width: 100%;
            max-height: 86vh;
          }

          .creature-modal__top h3 {
            font-size: 30px;
          }

          .creature-modal__video video {
            max-height: 58vh;
          }
        }
      `}</style>
    </section>
  )
}