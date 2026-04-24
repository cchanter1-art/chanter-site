import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useSceneScroll
 * Handles wheel (mouse + trackpad), touch, and keyboard scene navigation.
 * Prevents rapid-fire transitions by locking input during animation.
 *
 * @param {number} totalScenes  - Total number of scenes
 * @param {number} lockMs       - Lock duration after each transition (ms)
 */
export default function useSceneScroll(totalScenes, lockMs = 900) {
  const [currentScene, setCurrentScene] = useState(0)
  const isLocked       = useRef(false)
  const touchStartY    = useRef(null)
  const wheelAccum     = useRef(0)
  const lastWheelTime  = useRef(0)

  // ── Core navigation ─────────────────────────────────────────────────────────
  const navigate = useCallback(
    (direction) => {
      if (isLocked.current) return

      setCurrentScene((prev) => {
        const next = prev + direction
        if (next < 0 || next >= totalScenes) return prev
        isLocked.current = true
        setTimeout(() => { isLocked.current = false }, lockMs)
        return next
      })
    },
    [totalScenes, lockMs],
  )

  const goToScene = useCallback(
    (index) => {
      if (isLocked.current) return
      if (index < 0 || index >= totalScenes) return
      setCurrentScene(index)
      isLocked.current = true
      setTimeout(() => { isLocked.current = false }, lockMs)
    },
    [totalScenes, lockMs],
  )

  // ── Wheel / Trackpad ─────────────────────────────────────────────────────────
  useEffect(() => {
    const ACCUM_THRESHOLD = 80   // pixels to accumulate before firing
    const RESET_GAP_MS   = 300  // reset accumulator if gap between events

    const handleWheel = (e) => {
      const now = Date.now()

      // Reset accumulator if user paused scrolling
      if (now - lastWheelTime.current > RESET_GAP_MS) {
        wheelAccum.current = 0
      }
      lastWheelTime.current = now

      // Normalise deltaY — trackpads emit tiny values, wheels emit large steps
      const delta = Math.abs(e.deltaY) > 100
        ? Math.sign(e.deltaY) * 100  // clamp wheel clicks
        : e.deltaY                    // keep trackpad values raw

      wheelAccum.current += delta

      if (wheelAccum.current > ACCUM_THRESHOLD) {
        wheelAccum.current = 0
        navigate(1)
      } else if (wheelAccum.current < -ACCUM_THRESHOLD) {
        wheelAccum.current = 0
        navigate(-1)
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: true })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [navigate])

  // ── Touch ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY
    }
    const handleTouchEnd = (e) => {
      if (touchStartY.current === null) return
      const diff = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) > 50) navigate(diff > 0 ? 1 : -1)
      touchStartY.current = null
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [navigate])

  // ── Keyboard ─────────────────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') navigate(1)
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  navigate(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [navigate])

  return { currentScene, goToScene }
}
