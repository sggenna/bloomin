import { useEffect, useRef, useState } from 'react'
import { WA_ASK } from '../data/content'
import { EASE, requestTick, useScrollTick } from '../lib/motion'

const WhatsAppButton = () => {
  const [on, setOn] = useState(false)
  const lastY = useRef<number | null>(null)
  const hold = useRef(0)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  useScrollTick(() => {
    const y = window.scrollY
    const vh = window.innerHeight
    const cta = document.getElementById('contato')?.getBoundingClientRect()
    const inCta = !!cta && cta.top < vh * 0.6 && cta.bottom > vh * 0.4
    const now = performance.now()
    if (lastY.current != null && y > lastY.current + 1) {
      hold.current = now + 750
      clearTimeout(timer.current)
      timer.current = setTimeout(requestTick, 800)
    }
    lastY.current = y
    setOn(y > vh * 0.75 && !inCta && !(hold.current > now))
  })

  useEffect(() => () => clearTimeout(timer.current), [])

  return (
    <a
      href={WA_ASK}
      target="_blank"
      rel="noopener"
      data-burst="1"
      aria-label="Falar com a Jamile no WhatsApp"
      tabIndex={on ? 0 : -1}
      className="fixed z-[57] inline-flex h-12 w-12 items-center sm:h-14 sm:w-14 justify-center rounded-full bg-primary text-page shadow-[0_18px_40px_-16px_rgba(90,14,50,.55)] hover:bg-primary-deep hover:shadow-[0_22px_48px_-16px_rgba(90,14,50,.7)]"
      style={{
        right: 'max(clamp(16px,2.4vw,32px),env(safe-area-inset-right))',
        bottom: 'max(clamp(16px,2.4vw,32px),env(safe-area-inset-bottom))',
        opacity: on ? 1 : 0,
        transform: on ? 'none' : 'translateY(20px) scale(.92)',
        pointerEvents: on ? 'auto' : 'none',
        transition: `opacity .5s ease, transform .8s ${EASE}, background .3s ease, box-shadow .4s ease`,
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20.5 11.6a8.4 8.4 0 0 1-12.3 7.5L3.5 20.5l1.4-4.6A8.4 8.4 0 1 1 20.5 11.6z" />
      </svg>
    </a>
  )
}

export default WhatsAppButton
