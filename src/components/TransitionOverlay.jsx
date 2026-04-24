import React, { useEffect, useRef, useState } from 'react'
import '../styles/transition-overlay.css'

/**
 * TransitionOverlay
 *
 * Watches `currentScene` for changes and triggers a brief shutter effect:
 *   1. A horizontal bar sweeps across the screen (left→right)
 *   2. Immediately retreats (right→left)
 * Total visible duration ≈ 280ms — felt, not noticed.
 */
export default function TransitionOverlay({ currentScene }) {
  const [active, setActive]     = useState(false)
  const [phase, setPhase]       = useState('idle')   // idle | sweep | retreat
  const prevScene = useRef(currentScene)
  const timeouts  = useRef([])

  useEffect(() => {
    if (currentScene === prevScene.current) return
    prevScene.current = currentScene

    // Clear any in-flight timers
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []

    setActive(true)
    setPhase('sweep')

    const t1 = setTimeout(() => setPhase('retreat'), 160)
    const t2 = setTimeout(() => {
      setPhase('idle')
      setActive(false)
    }, 440)

    timeouts.current = [t1, t2]
    return () => timeouts.current.forEach(clearTimeout)
  }, [currentScene])

  if (!active) return null

  return (
    <div className={`transition-overlay transition-overlay--${phase}`} aria-hidden="true">
      <div className="transition-overlay__bar" />
    </div>
  )
}
