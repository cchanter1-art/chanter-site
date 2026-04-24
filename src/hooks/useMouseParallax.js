import { useState, useEffect, useRef } from 'react'

/**
 * useMouseParallax
 *
 * Tracks mouse position across the viewport and returns smoothly
 * lerped { x, y } values in the range [-1, 1].
 *
 * @param {number} strength  - Multiplier applied to the output (default 1)
 * @param {number} lerp      - Lerp factor per frame 0–1 (default 0.06)
 */
export default function useMouseParallax(strength = 1, lerp = 0.06) {
  const [pos, setPos] = useState({ x: 0, y: 0 })

  const targetRef  = useRef({ x: 0, y: 0 })
  const currentRef = useRef({ x: 0, y: 0 })
  const rafRef     = useRef(null)
  const isTouchRef = useRef(false)

  useEffect(() => {
    // Detect touch-primary devices — skip parallax there
    isTouchRef.current = window.matchMedia('(pointer: coarse)').matches

    const onMove = (e) => {
      if (isTouchRef.current) return
      targetRef.current = {
        x: ((e.clientX / window.innerWidth)  - 0.5) * 2 * strength,
        y: ((e.clientY / window.innerHeight) - 0.5) * 2 * strength,
      }
    }

    const tick = () => {
      const cur = currentRef.current
      const tgt = targetRef.current
      const nx  = cur.x + (tgt.x - cur.x) * lerp
      const ny  = cur.y + (tgt.y - cur.y) * lerp

      if (Math.abs(nx - cur.x) > 0.0005 || Math.abs(ny - cur.y) > 0.0005) {
        currentRef.current = { x: nx, y: ny }
        setPos({ x: nx, y: ny })
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [strength, lerp])

  return pos
}
