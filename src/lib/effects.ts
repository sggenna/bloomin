import { useEffect } from 'react'
import { reduceMotion } from './motion'

const BURST_COLORS = ['#781444', '#A3305F', '#D98AA6', '#EBCBD4']
const PETAL_RADIUS = '50% 50% 50% 50% / 85% 85% 15% 15%'

const burst = (x: number, y: number) => {
  for (let i = 0; i < 16; i++) {
    const p = document.createElement('div')
    const w = 6 + Math.random() * 6
    Object.assign(p.style, {
      position: 'fixed',
      left: `${x}px`,
      top: `${y}px`,
      width: `${w}px`,
      height: `${w * 2}px`,
      borderRadius: PETAL_RADIUS,
      background: BURST_COLORS[i % 4],
      pointerEvents: 'none',
      zIndex: '300',
    })
    document.body.appendChild(p)
    const angle = Math.random() * Math.PI * 2
    const dist = 50 + Math.random() * 110
    p.animate(
      [
        { transform: 'translate(-50%,-50%) rotate(0deg)', opacity: 1 },
        {
          transform: `translate(${Math.cos(angle) * dist}px,${Math.sin(angle) * dist + 70}px) rotate(${Math.random() * 540 - 270}deg)`,
          opacity: 0,
        },
      ],
      { duration: 900 + Math.random() * 500, easing: 'cubic-bezier(.2,.7,0,1)' },
    ).onfinish = () => p.remove()
  }
}

export const useGlobalEffects = () => {
  useEffect(() => {
    if (reduceMotion) return
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null
      if (target?.closest('[data-burst="1"]')) burst(e.clientX, e.clientY)
    }
    const onMove = (e: MouseEvent) => {
      document.querySelectorAll<HTMLElement>('[data-magnet]').forEach((m) => {
        const r = m.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        m.style.transform = Math.hypot(dx, dy) < 120 ? `translate(${dx * 0.18}px,${dy * 0.25}px)` : ''
      })
    }
    document.addEventListener('click', onClick)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])
}
