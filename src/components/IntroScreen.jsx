import React, { useEffect, useState, useRef } from 'react'
import '../styles/intro.css'

const LETTERS    = 'CHANTER'.split('')
const SESSION_KEY = 'chanter_intro_seen'

/**
 * IntroScreen — 2026 cold-open
 * Italic Instrument Serif, cold palette, letterforms rise from void.
 */
export default function IntroScreen({ onComplete }) {
  const [phase, setPhase] = useState('idle')
  const timers = useRef([])

  const at = (fn, ms) => {
    const id = setTimeout(fn, ms)
    timers.current.push(id)
  }

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) {
      onComplete?.()
      return
    }

    at(() => setPhase('letters'), 120)
    at(() => setPhase('rule'),    120 + LETTERS.length * 60 + 180)
    at(() => setPhase('sub'),     120 + LETTERS.length * 60 + 450)
    at(() => setPhase('exit'),    120 + LETTERS.length * 60 + 1250)
    at(() => {
      sessionStorage.setItem(SESSION_KEY, '1')
      onComplete?.()
    }, 120 + LETTERS.length * 60 + 2350)

    return () => timers.current.forEach(clearTimeout)
  }, [])

  return (
    <div className={`intro ${phase === 'exit' ? 'intro--exit' : ''}`} aria-hidden="true">
      <div className="intro__noise" />

      <div className="intro__stage">
        <h1 className="intro__title">
          {LETTERS.map((char, i) => (
            <span
              key={i}
              className={`intro__char ${phase !== 'idle' ? 'intro__char--in' : ''}`}
              style={{ '--i': i }}
            >
              {char}
            </span>
          ))}
        </h1>

        <div className={`intro__rule ${phase === 'rule' || phase === 'sub' || phase === 'exit' ? 'intro__rule--in' : ''}`} />

        <p className={`intro__sub ${phase === 'sub' || phase === 'exit' ? 'intro__sub--in' : ''}`}>
          AI direction / worldbuilding / visual systems
        </p>
      </div>

      <span className="intro__coord intro__coord--tl">51°30′N · 00°07′W</span>
      <span className="intro__coord intro__coord--br">{new Date().getFullYear()}</span>
    </div>
  )
}
