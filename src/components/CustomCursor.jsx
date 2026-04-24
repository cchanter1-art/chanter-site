import React, { useEffect, useRef, useState } from 'react'
import '../styles/cursor.css'

/**
 * CustomCursor
 *
 * Two elements:
 *   • dot  — snaps instantly to pointer (1px precision)
 *   • ring — lags behind with spring lerp, morphs on hover
 *
 * Automatically hidden on touch-primary devices.
 * Adds `data-cursor` attribute listeners globally:
 *   data-cursor="expand"   → ring grows + fades fill
 *   data-cursor="invert"   → ring inverts color
 *   data-cursor="text"     → ring squashes into thin pill
 *   (default)              → normal ring
 */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)

  const mouse   = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const raf     = useRef(null)

  const [variant, setVariant]   = useState('default')
  const [visible, setVisible]   = useState(false)
  const [isTouch, setIsTouch]   = useState(false)

  useEffect(() => {
    // Skip on touch-primary devices
    const touch = window.matchMedia('(pointer: coarse)').matches
    setIsTouch(touch)
    if (touch) return

    // Hide the system cursor while ours is active
    document.body.classList.add('cursor-custom')

    // ── Mouse position ─────────────────────────────────────
    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)
    }

    // ── Hover variant detection ────────────────────────────
    const LERP_SPEED = 0.12

    const onEnter = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (target) setVariant(target.dataset.cursor)

      const isInteractive = e.target.closest('a, button, [role="button"], input, label, select')
      if (isInteractive && !target) setVariant('expand')
    }

    const onLeave = (e) => {
      const stillInside = e.target.closest('[data-cursor], a, button, [role="button"]')
      if (!stillInside) setVariant('default')
    }

    // ── RAF loop ───────────────────────────────────────────
    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * LERP_SPEED
      ring.current.y += (mouse.current.y - ring.current.y) * LERP_SPEED

      if (dotRef.current) {
        dotRef.current.style.transform =
          `translate(${mouse.current.x}px, ${mouse.current.y}px)`
      }

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x}px, ${ring.current.y}px)`
      }

      raf.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove,  { passive: true })
    document.addEventListener('mouseover',  onEnter, { passive: true })
    document.addEventListener('mouseout',   onLeave, { passive: true })
    raf.current = requestAnimationFrame(tick)

    return () => {
      document.body.classList.remove('cursor-custom')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover',  onEnter)
      document.removeEventListener('mouseout',   onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  if (isTouch) return null

  return (
    <>
      {/* Precision dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${visible ? 'cursor-dot--visible' : ''}`}
        aria-hidden="true"
      />

      {/* Lagged ring */}
      <div
        ref={ringRef}
        className={`cursor-ring cursor-ring--${variant} ${visible ? 'cursor-ring--visible' : ''}`}
        aria-hidden="true"
      />
    </>
  )
}
