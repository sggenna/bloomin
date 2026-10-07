import { useRef } from 'react'
import { STEPS } from '../data/content'
import { clamp01, reduceMotion, useScrollTick } from '../lib/motion'
import FlowerMark from './FlowerMark'
import { Fade, Mask } from './Reveal'

const INLINE_FLOWER = 'spin-slow text-primary ml-[.14em] inline-block h-[.7em] w-[.7em] align-[-.02em]'

const HowItWorks = () => {
  const gridRef = useRef<HTMLDivElement>(null)
  const fills = useRef<(HTMLSpanElement | null)[]>([])

  useScrollTick(() => {
    const grid = gridRef.current
    if (!grid) return
    const vh = window.innerHeight
    const r = grid.getBoundingClientRect()
    const p = reduceMotion ? 1 : clamp01((vh * 0.85 - r.top) / (vh * 0.55))
    fills.current.forEach((f, i) => {
      if (f) f.style.transform = `scaleX(${clamp01(p * STEPS.length - i)})`
    })
  })

  return (
    <section
      id="como-funciona"
      className="mx-auto flex max-w-[1440px] flex-col gap-stack px-[clamp(20px,4vw,56px)] py-section"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <Mask className="m-0 text-[clamp(40px,min(5.6vw,9vh),92px)] font-medium leading-[.92] tracking-[-.055em]">
          Como{' '}
          <span className="whitespace-nowrap">
            começar.
            <FlowerMark className={INLINE_FLOWER} />
          </span>
        </Mask>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 gap-[clamp(28px,3vw,48px)] min-[820px]:grid-cols-3">
        {STEPS.map((s, i) => {
          const dark = i === STEPS.length - 1
          return (
            <Fade
              key={s.title}
              delay={i * 100}
              className="flex min-h-[clamp(300px,40vh,380px)] flex-col gap-[18px] rounded-[20px] p-[clamp(22px,2.4vw,32px)]"
              style={{ background: s.bg }}
            >
              <span className="relative block h-0.5 overflow-hidden rounded-sm" style={{ background: s.track }}>
                <span
                  ref={(el) => {
                    fills.current[i] = el
                  }}
                  className="absolute inset-0 origin-left"
                  style={{ background: s.accent, transform: 'scaleX(0)' }}
                />
              </span>
              <span className="text-sm font-medium tabular-nums" style={{ color: s.accent }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <h3
                className="m-0 text-[clamp(26px,2.4vw,36px)] font-medium leading-[1.05] tracking-[-.045em]"
                style={{ color: s.fg }}
              >
                {s.title}
              </h3>
              <p className="m-0 max-w-[380px] flex-1 text-base leading-[1.55] text-pretty" style={{ color: s.sub }}>
                {s.desc}
              </p>
              <a
                href={s.href}
                target={s.external ? '_blank' : undefined}
                rel={s.external ? 'noopener' : undefined}
                data-burst={s.external ? '1' : '0'}
                className={`inline-flex min-h-11 items-center gap-2.5 self-start border-b pb-[3px] text-[15px] font-medium transition-[gap,border-color,color] duration-300 hover:gap-4 ${
                  dark ? '' : 'hover:!border-primary hover:!text-primary'
                }`}
                style={{ color: s.accent, borderColor: s.track }}
              >
                {s.cta}
                <span>→</span>
              </a>
            </Fade>
          )
        })}
      </div>
    </section>
  )
}

export default HowItWorks
