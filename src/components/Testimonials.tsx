import { useCallback, useEffect, useRef, useState } from 'react'
import { TESTIMONIALS } from '../data/content'
import { EASE } from '../lib/motion'
import FlowerMark from './FlowerMark'
import { Fade, Mask } from './Reveal'

const INLINE_FLOWER = 'spin-slow text-primary ml-[.14em] inline-block h-[.7em] w-[.7em] align-[-.02em]'
const HEADING = 'm-0 text-[clamp(40px,min(6.4vw,11vh),104px)] font-medium leading-[.92] tracking-[-.055em]'
const ARROW =
  'grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/[.18] bg-transparent text-base text-ink transition-[background-color,color,border-color] duration-300 hover:border-ink hover:bg-ink hover:text-page'

const Testimonials = () => {
  const [current, setCurrent] = useState(0)
  const [stageHeight, setStageHeight] = useState(560)
  const n = TESTIMONIALS.length
  const hovering = useRef(false)
  const lastMove = useRef(0)
  const downX = useRef<number | null>(null)
  const cards = useRef<(HTMLElement | null)[]>([])

  const step = useCallback(
    (dir: number) => {
      lastMove.current = Date.now()
      setCurrent((c) => (c + dir + n) % n)
    },
    [n],
  )

  const go = useCallback((i: number) => {
    lastMove.current = Date.now()
    setCurrent(i)
  }, [])

  useEffect(() => {
    const onUp = (e: PointerEvent) => {
      if (downX.current == null) return
      const dx = e.clientX - downX.current
      downX.current = null
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1)
    }
    lastMove.current = Date.now()
    window.addEventListener('pointerup', onUp)
    const auto = setInterval(() => {
      if (!hovering.current && !document.hidden && Date.now() - lastMove.current > 8000) step(1)
    }, 1000)
    return () => {
      window.removeEventListener('pointerup', onUp)
      clearInterval(auto)
    }
  }, [step])

  useEffect(() => {
    const measure = () => {
      const tallest = Math.max(0, ...cards.current.map((c) => c?.offsetHeight ?? 0))
      if (tallest) setStageHeight(tallest + 16)
    }
    const ro = new ResizeObserver(measure)
    cards.current.forEach((c) => c && ro.observe(c))
    measure()
    return () => ro.disconnect()
  }, [])

  return (
    <section
      id="depoimentos"
      className="flex flex-col gap-stack overflow-hidden py-section"
    >
      <div className="px-[clamp(20px,4vw,56px)] text-center">
        <Mask className={HEADING}>Quem já</Mask>
        <Mask className={`${HEADING} text-primary`} delay={90}>
          <span className="whitespace-nowrap">
            floresceu.
            <FlowerMark className={INLINE_FLOWER} />
          </span>
        </Mask>
      </div>

      <Fade
        className="relative cursor-grab select-none touch-pan-y"
        style={{ height: stageHeight }}
        onMouseEnter={() => {
          hovering.current = true
        }}
        onMouseLeave={() => {
          hovering.current = false
        }}
        onPointerDown={(e: React.PointerEvent) => {
          downX.current = e.clientX
        }}
      >
        {TESTIMONIALS.map((t, i) => {
          let d = (((i - current) % n) + n) % n
          if (d > n / 2) d -= n
          const a = Math.abs(d)
          const isCurrent = a === 0
          return (
            <figure
              key={t.name}
              ref={(el) => {
                cards.current[i] = el
              }}
              onClick={() => !isCurrent && go(i)}
              aria-hidden={!isCurrent}
              className="absolute left-1/2 top-1/2 m-0 box-border flex h-auto w-[min(560px,84vw)] flex-col gap-[clamp(16px,2.4vh,24px)] rounded-[28px] border border-ink/[.06] p-[clamp(22px,3vw,40px)]"
              style={{
                background: isCurrent ? '#FFFFFF' : '#FBF8F4',
                boxShadow: isCurrent ? '0 40px 80px -40px rgba(90,24,52,.28)' : 'none',
                transform: `translate(-50%,-50%) translateX(${d * 62}%) scale(${isCurrent ? 1 : a === 1 ? 0.86 : 0.72})`,
                opacity: isCurrent ? 1 : a === 1 ? 0.5 : 0,
                filter: `blur(${isCurrent ? 0 : a === 1 ? 1.5 : 6}px)`,
                zIndex: 10 - a,
                pointerEvents: a > 1 ? 'none' : 'auto',
                transition: `transform .9s ${EASE}, opacity .7s ease, filter .7s ease, background .6s ease, box-shadow .6s ease`,
              }}
            >
              <blockquote className="m-0 flex flex-col gap-[clamp(14px,2vh,20px)]">
                <p className="m-0 text-[clamp(22px,2vw,30px)] font-medium leading-[1.2] tracking-[-.03em] text-ink text-pretty">
                  <span aria-hidden="true" className="mr-1 text-primary/40">“</span>
                  {t.headline}
                  <span aria-hidden="true" className="ml-0.5 text-primary/40">”</span>
                </p>
                <p className="m-0 text-[14px] leading-[1.6] text-ink-muted sm:text-[15px]">{t.quote}</p>
              </blockquote>
              <figcaption className="flex items-center gap-3.5 border-t border-ink/[.08] pt-[clamp(14px,2vh,20px)]">
                <img
                  src={`/assets/testimonials/${t.photo}.jpg`}
                  alt={t.name}
                  loading="lazy"
                  className="h-14 w-14 flex-none rounded-full bg-blush object-cover"
                />
                <div className="flex min-w-0 flex-col gap-0.5 text-[15px]">
                  <span className="font-medium tracking-[-.01em]">{t.name}</span>
                  <span className="text-sm text-ink-muted">
                    {t.detail}
                    {t.result && <span className="text-primary"> · {t.result}</span>}
                  </span>
                </div>
              </figcaption>
            </figure>
          )
        })}
      </Fade>

      <Fade className="flex items-center justify-center gap-5">
        <button type="button" onClick={() => step(-1)} aria-label="Depoimento anterior" className={ARROW}>
          ←
        </button>
        <div className="flex">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => go(i)}
              aria-label={`Depoimento ${i + 1}`}
              className="grid h-11 cursor-pointer place-items-center bg-transparent px-[3px]"
            >
              <span
                className="block h-1.5 rounded-md"
                style={{
                  width: i === current ? 28 : 6,
                  background: i === current ? '#781444' : 'rgba(34,20,25,.18)',
                  transition: `width .5s ${EASE}, background .4s ease`,
                }}
              />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => step(1)} aria-label="Próximo depoimento" className={ARROW}>
          →
        </button>
      </Fade>
    </section>
  )
}

export default Testimonials
