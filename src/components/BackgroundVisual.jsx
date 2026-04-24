import React, { useEffect, useRef } from 'react'
import '../styles/background-visual.css'

/**
 * BackgroundVisual — 2026 cold dream atmosphere
 *
 * Layers (back→front):
 *   ::before   deep base gradient (CSS)
 *   .bg-orbs   cold north/east/iris orbs with mouse parallax
 *   .bg-fog    drifting horizontal fog plane
 *   canvas     animated vector-field particles (cold silver)
 *   .bg-grid   subtle perspective grid (reveals on scene 2+)
 *   canvas     static film grain
 *   .bg-vignette
 */
export default function BackgroundVisual({ currentScene, mousePos = { x: 0, y: 0 } }) {
  const noiseRef = useRef(null)
  const grainRef = useRef(null)
  const rafRef   = useRef(null)

  // ── Animated vector-field particles ───────────────────────────────────────
  useEffect(() => {
    const canvas = noiseRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const COUNT = 320
    let w = 0, h = 0, particles = [], t = 0

    const resize = () => {
      w = canvas.width  = window.innerWidth
      h = canvas.height = window.innerHeight
      particles = Array.from({ length: COUNT }, () => ({
        x:    Math.random() * w,
        y:    Math.random() * h,
        age:  Math.floor(Math.random() * 200),
        life: 140 + Math.floor(Math.random() * 200),
      }))
    }
    resize()
    window.addEventListener('resize', resize)

    const tick = () => {
      // Very dark trailing wash
      ctx.fillStyle = 'rgba(4, 5, 10, 0.06)'
      ctx.fillRect(0, 0, w, h)

      for (const p of particles) {
        p.age++
        const nx  = p.x / w
        const ny  = p.y / h
        // Flow field: cold, slow, directional — slight leftward drift
        const ang =
          Math.sin(nx * 2.8 + t * 0.00018) * Math.cos(ny * 2.2 + t * 0.00015) * Math.PI * 1.8
          + Math.sin(ny * 1.8 - t * 0.00012) * 0.6
          - 0.15 // slight horizontal bias

        const speed = 0.5 + Math.sin(p.age * 0.035) * 0.18
        const dx = Math.cos(ang) * speed
        const dy = Math.sin(ang) * speed

        const prog  = p.age / p.life
        const alpha = Math.sin(prog * Math.PI) * 0.048

        // Cold silver-blue particles
        ctx.strokeStyle = `rgba(138, 180, 204, ${alpha})`
        ctx.lineWidth   = 0.6
        ctx.beginPath()
        ctx.moveTo(p.x, p.y)
        p.x += dx; p.y += dy
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        if (p.age >= p.life || p.x < -2 || p.x > w + 2 || p.y < -2 || p.y > h + 2) {
          p.x   = Math.random() * w
          p.y   = Math.random() * h
          p.age = 0
          p.life = 140 + Math.floor(Math.random() * 200)
        }
      }
      t++
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── Static grain ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = grainRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const draw = () => {
      canvas.width  = window.innerWidth  * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width  = window.innerWidth  + 'px'
      canvas.style.height = window.innerHeight + 'px'
      const id = ctx.createImageData(canvas.width, canvas.height)
      const buf = id.data
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 255) | 0
        buf[i] = buf[i + 1] = buf[i + 2] = v
        buf[i + 3] = 12
      }
      ctx.putImageData(id, 0, 0)
    }
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  const orbStyle = {
    '--mouse-x': mousePos.x,
    '--mouse-y': mousePos.y,
  }

  return (
    <div className="bg-visual" aria-hidden="true">

      {/* ── Cold orbs with mouse parallax ── */}
      <div
        className={`bg-orbs bg-orbs--scene-${currentScene}`}
        style={orbStyle}
      >
        <div className="orb orb--north" />
        <div className="orb orb--east"  />
        <div className="orb orb--iris"  />
      </div>

      {/* ── Drifting fog plane ── */}
      <div className="bg-fog" />

      {/* ── Vector field particles ── */}
      <canvas ref={noiseRef} className="bg-noise-field" />

      {/* ── Perspective grid (reveals scene 2+) ── */}
      <div className={`bg-grid ${currentScene >= 1 ? 'bg-grid--visible' : ''}`} />

      {/* ── Film grain ── */}
      <canvas ref={grainRef} className="bg-grain" />

      {/* ── Vignette ── */}
      <div className="bg-vignette" />

    </div>
  )
}
