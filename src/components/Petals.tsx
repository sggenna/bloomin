import { useEffect, useMemo, useRef } from 'react'
import { clamp01, reduceMotion } from '../lib/motion'

const COLORS = ['#781444', '#A3305F', '#D98AA6', '#EBCBD4']
const COUNT = 11

const makePetals = () => {
  let seed = 11
  const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280
  return Array.from({ length: COUNT }, (_, i) => {
    const w = 6 + rnd() * 7
    return {
      x: rnd(),
      y: rnd(),
      speed: 0.22 + rnd() * 0.45,
      rot: (0.08 + rnd() * 0.25) * (rnd() > 0.5 ? 1 : -1),
      sway: 0.6 + rnd(),
      w,
      h: w * (1.8 + rnd() * 0.8),
      bg: COLORS[i % 4],
    }
  })
}

const Petals = () => {
  const petals = useMemo(() => makePetals(), [])
  const els = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion) return
    let id = 0
    const loop = (now: number) => {
      const y = window.scrollY
      const vh = window.innerHeight
      const W = window.innerWidth
      const span = vh + 160
      const tm = now * 0.001
      let fade = clamp01(1 - (y - vh * 0.1) / (vh * 0.5))
      const cta = document.getElementById('contato')
      if (cta) {
        const c = cta.getBoundingClientRect()
        fade = Math.max(fade, clamp01((vh - c.top) / (vh * 0.5)) * clamp01(c.bottom / (vh * 0.5)))
      }
      petals.forEach((p, i) => {
        const el = els.current[i]
        if (!el) return
        const py = ((((p.y * span + (y * p.speed + tm * 34 * p.speed)) % span) + span) % span) - 80
        const px = p.x * W + Math.sin((tm * 0.5 + y * 0.003 + p.y * 6) * p.sway) * 40
        el.style.transform = `translate(${px}px,${py}px) rotate(${(y + tm * 60) * p.rot + p.y * 360}deg)`
        el.style.opacity = String(fade * 0.7)
      })
      id = requestAnimationFrame(loop)
    }
    id = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(id)
  }, [petals])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[55] overflow-hidden">
      {petals.map((p, i) => (
        <div
          key={i}
          ref={(el) => {
            els.current[i] = el
          }}
          className="absolute left-0 top-0 opacity-0 will-change-[transform,opacity]"
          style={{
            width: p.w,
            height: p.h,
            background: p.bg,
            borderRadius: '50% 50% 50% 50% / 85% 85% 15% 15%',
          }}
        />
      ))}
    </div>
  )
}

export default Petals
