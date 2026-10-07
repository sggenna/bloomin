import { useEffect, useRef, useState } from 'react'
import { WA_TRIAL } from '../data/content'
import { EASE, reduceMotion, useScrollTick } from '../lib/motion'

const LETTERS = 'BLOOMIN'.split('')


const Hero = () => {
  const [ready, setReady] = useState(reduceMotion)
  const enter = (delay: number) => ({
    opacity: ready ? 1 : 0,
    transform: ready ? 'none' : 'translateY(22px)',
    transition: `opacity .9s ease ${delay}ms, transform 1.1s ${EASE} ${delay}ms`,
  })
  const wrapRef = useRef<HTMLDivElement>(null)
  const wordmarkRef = useRef<HTMLDivElement>(null)
  const flowerRef = useRef<HTMLDivElement>(null)
  const cursorRef = useRef<HTMLDivElement>(null)
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (reduceMotion) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
    const onMove = (e: MouseEvent) => {
      const el = cursorRef.current
      if (!el || window.scrollY >= window.innerHeight) return
      const x = e.clientX / window.innerWidth - 0.5
      const y = e.clientY / window.innerHeight - 0.5
      el.style.transform = `translate(${x * 18}px,${y * 10}px) rotate(${x * 2}deg)`
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(id)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  useScrollTick(() => {
    const wrap = wrapRef.current
    const flower = flowerRef.current
    const a = letterRefs.current[2]
    const b = letterRefs.current[3]
    if (wrap && flower && a && b) {
      const w = wrap.getBoundingClientRect()
      const ra = a.getBoundingClientRect()
      const rb = b.getBoundingClientRect()
      flower.style.left = `${(ra.right + rb.left) / 2 - w.left - flower.offsetWidth * 0.27}px`
    }
    const y = window.scrollY
    if (reduceMotion || y >= window.innerHeight * 1.5) return
    if (wordmarkRef.current) wordmarkRef.current.style.transform = `translateY(${y * 0.22}px) scale(${1 - y * 0.00008})`
    if (flower) flower.style.transform = `translateY(${-y * 0.1}px)`
  })

  return (
    <section
      id="top"
      className="relative mx-auto flex max-w-[1440px] flex-col justify-between gap-5 px-[clamp(20px,4vw,56px)] pb-10 pt-[104px] sm:min-h-svh sm:gap-[clamp(32px,6vh,64px)] sm:pb-[clamp(28px,5vh,56px)] sm:pt-[clamp(88px,12vh,128px)]"
    >
      <div className="flex flex-col justify-center sm:flex-1">
        <div ref={wrapRef} className="relative pb-[30vw] sm:pb-0">
          <div ref={wordmarkRef} className="will-change-transform">
            <h1
              aria-label="Bloomin"
              className="m-0 flex justify-center overflow-hidden pb-[.02em] pt-[.04em] text-[min(19.6vw,29vh)] font-bold leading-[.82] tracking-[-.055em] text-primary"
            >
              {LETTERS.map((letter, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    letterRefs.current[i] = el
                  }}
                  aria-hidden="true"
                  className="inline-block"
                  style={{
                    transform: ready ? 'none' : 'translateY(105%)',
                    transition: `transform 1.3s ${EASE} ${120 + i * 70}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </h1>
          </div>
          <div
            ref={flowerRef}
            className="pointer-events-none absolute left-[38%] top-[28%] z-[2] w-[min(26vw,42vh)]"
          >
            <div
              style={{
                opacity: ready ? 1 : 0,
                transform: ready ? 'none' : 'translateY(8%)',
                transition: `opacity 1.4s ease 450ms, transform 1.8s ${EASE} 450ms`,
              }}
            >
              <div ref={cursorRef} style={{ transition: `transform 1.2s ${EASE}` }}>
                <img
                  src="/assets/flowers/hero-echinacea.webp"
                  alt="Equináceas cor-de-rosa em hastes longas"
                  className="sway-flower block h-auto w-full"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom,#000 70%,transparent)',
                    maskImage: 'linear-gradient(to bottom,#000 70%,transparent)',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-[3] flex flex-col items-start gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-7">
        <div className="flex flex-col gap-3.5">
          <h2 style={enter(700)} className="m-0 text-[26px] font-medium sm:text-[clamp(30px,3.4vw,52px)] leading-[1.02] tracking-[-.045em] text-ink">
            Let’s grow your English.
          </h2>
          <p style={enter(820)} className="m-0 hidden flex-wrap gap-x-4 gap-y-1 text-base leading-normal text-ink-muted sm:flex">
            <span>Aulas 100% online e ao vivo</span>
            <span className="text-rule" aria-hidden="true">·</span>
            <span>Até 10 alunos por turma</span>
            <span className="text-rule" aria-hidden="true">·</span>
            <span>Sem taxa de matrícula</span>
          </p>
        </div>
        <div style={enter(940)} className="flex flex-wrap items-center gap-[clamp(16px,2vw,28px)]">
          <a
            href={WA_TRIAL}
            target="_blank"
            rel="noopener"
            data-burst="1"
            data-magnet="1"
            className="inline-flex max-w-full items-center gap-2.5 whitespace-nowrap rounded-full bg-primary px-5 py-3 min-[340px]:pr-3 text-[clamp(12px,3.8vw,14px)] font-medium text-page transition-[background-color,gap,transform] duration-500 sm:gap-3.5 sm:py-[15px] sm:pl-[26px] sm:pr-4 sm:text-base ease-[cubic-bezier(.2,.7,0,1)] hover:gap-3.5 hover:bg-ink sm:hover:gap-5"
          >
            Agendar aula experimental
            <span className="hidden h-6 w-6 flex-none place-items-center rounded-full bg-page min-[340px]:grid text-[13px] text-primary sm:h-[30px] sm:w-[30px] sm:text-[15px]">→</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
