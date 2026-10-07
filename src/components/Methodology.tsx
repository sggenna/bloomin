import { useRef, type ReactNode } from 'react'
import { PILLARS } from '../data/content'
import { clamp01, reduceMotion, smoothstep, useScrollTick } from '../lib/motion'
import FlowerMark from './FlowerMark'
import { Mask } from './Reveal'

const INLINE_FLOWER = 'spin-slow text-primary ml-[.14em] inline-block h-[.7em] w-[.7em] align-[-.02em]'
const WAVE = [30, 55, 80, 45, 95, 60, 35, 70, 100, 50, 75, 40, 85, 55, 30, 65, 45, 25, 15, 10]
const BUBBLE = 'border border-ink/[.08] bg-white shadow-[0_18px_40px_-28px_rgba(90,24,52,.35)]'

const Mockup = ({ index }: { index: number }): ReactNode => {
  if (index === 0) {
    return (
      <>
        <div className={`self-start rounded-[16px_16px_16px_4px] px-3.5 py-2.5 ${BUBBLE}`}>So, what do you do?</div>
        <div className="self-end rounded-[16px_16px_4px_16px] bg-primary px-3.5 py-2.5 text-page">I’m a designer. And you?</div>
        <div className={`self-start rounded-[16px_16px_16px_4px] px-3.5 py-2.5 ${BUBBLE}`}>I teach English!</div>
      </>
    )
  }
  if (index === 1) {
    return (
      <div className={`flex flex-col gap-3 rounded-2xl px-4 py-3.5 ${BUBBLE}`}>
        <div className="flex items-center justify-between text-[13px]">
          <span className="flex items-center gap-2 font-medium">
            <span className="h-2 w-2 rounded-full bg-primary" />
            Your turn
          </span>
          <span className="text-ink-muted tabular-nums">00:42</span>
        </div>
        <div className="flex h-[30px] items-center gap-[3px]">
          {WAVE.map((h, j) => (
            <span key={j} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: j < 13 ? '#781444' : 'rgba(34,20,25,.15)' }} />
          ))}
        </div>
        <div className="text-[13px] text-ink-muted">“Describe your favourite place.”</div>
      </div>
    )
  }
  if (index === 2) {
    const done = 'grid h-[18px] w-[18px] place-items-center rounded-full bg-primary text-[10px] text-page'
    return (
      <div className={`flex flex-col gap-2.5 rounded-2xl px-4 py-3.5 ${BUBBLE}`}>
        <div className="text-xs text-ink-muted">Task</div>
        <div className="mb-0.5 font-medium tracking-[-.01em]">Book a table for two</div>
        <div className="flex items-center gap-2.5 text-[13px]">
          <span className={done}>✓</span>Greet the host
        </div>
        <div className="flex items-center gap-2.5 text-[13px]">
          <span className={done}>✓</span>Ask for the menu
        </div>
        <div className="flex items-center gap-2.5 text-[13px] text-ink-muted">
          <span className="h-[18px] w-[18px] rounded-full border border-ink/25" />Pay the bill
        </div>
      </div>
    )
  }
  return (
    <div className={`flex flex-col gap-3 rounded-2xl px-4 py-3.5 ${BUBBLE}`}>
      <div className="flex items-center justify-between">
        <span className="font-medium tracking-[-.01em]">Vocabulary sprint</span>
        <span className="rounded-full bg-blush px-2.5 py-1 text-xs font-medium text-primary">+20 XP</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-md bg-ink/[.08]">
        <div className="h-full w-[68%] rounded-md bg-primary" />
      </div>
      <div className="flex justify-between text-xs text-ink-muted tabular-nums">
        <span>Level B1</span>
        <span>68%</span>
      </div>
    </div>
  )
}

const Methodology = () => {
  const cards = useRef<(HTMLElement | null)[]>([])
  const ins = useRef<(HTMLDivElement | null)[]>([])
  const outs = useRef<(HTMLDivElement | null)[]>([])
  const flowers = useRef<(HTMLDivElement | null)[]>([])

  useScrollTick(() => {
    const vh = window.innerHeight
    cards.current.forEach((card, i) => {
      if (!card) return
      const r = card.getBoundingClientRect()
      const ea = reduceMotion ? 1 : smoothstep(clamp01((vh * 0.78 - r.top) / (vh * 0.3) - i * 0.22))
      card.style.transform = `translateY(${(1 - ea) * 24}px)`
      const inEl = ins.current[i]
      const outEl = outs.current[i]
      const fl = flowers.current[i]
      if (inEl) inEl.style.opacity = String(Math.max(0, ea * 1.6 - 0.6))
      if (outEl) outEl.style.opacity = String(Math.max(0, 1 - ea * 2.2))
      if (fl && fl.parentElement) {
        const fit = Math.min(1, (fl.parentElement.clientHeight - 8) / (fl.offsetHeight || 1))
        fl.style.transform = `translateY(${(1 - ea) * 20}px) scale(${(0.92 + 0.08 * ea) * fit})`
      }
    })
  })

  return (
    <section id="metodologia" className="relative bg-mist">
      <div className="flex flex-col gap-stack py-section">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-end justify-between gap-5 px-[clamp(20px,4vw,56px)]">
          <Mask className="m-0 text-[clamp(26px,8.2vw,34px)] sm:text-[clamp(34px,min(5vw,8vh),80px)] font-medium leading-[.94] tracking-[-.05em]">
            Como você{' '}
            <span className="whitespace-nowrap">
              aprende.
              <FlowerMark className={INLINE_FLOWER} />
            </span>
          </Mask>
        </div>

        <div className="mx-auto w-full max-w-[1440px] px-[clamp(20px,4vw,56px)]">
          <div className="grid grid-cols-1 gap-[clamp(12px,1.4vw,20px)] min-[640px]:grid-cols-2 min-[1100px]:grid-cols-4">
            {PILLARS.map((p, i) => {
              const num = String(i + 1).padStart(2, '0')
              return (
                <article
                  key={p.title}
                  ref={(el) => {
                    cards.current[i] = el
                  }}
                  className="relative min-h-[clamp(440px,62vh,560px)] overflow-hidden rounded-[clamp(20px,2vw,28px)] bg-[#D9C9CC] will-change-transform"
                >
                  <img
                    src={`/assets/photos/${p.photo}.jpg`}
                    alt=""
                    className="absolute inset-0 block h-full w-full scale-[1.3] object-cover blur-[26px] saturate-[1.15]"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(120,20,68,.05),rgba(90,14,50,.35))]" />
                  <div
                    ref={(el) => {
                      outs.current[i] = el
                    }}
                    className="absolute inset-0 flex flex-col justify-between p-[clamp(20px,2.4vw,36px)] text-paper"
                  >
                    <span className="text-[13px] tabular-nums">{num}</span>
                    <h3 className="m-0 text-[clamp(20px,6.2vw,26px)] font-medium sm:text-[clamp(26px,min(2.4vw,4.6vh),40px)] leading-[1.02] tracking-[-.045em] text-balance">
                      {p.title}
                    </h3>
                  </div>
                  <div
                    ref={(el) => {
                      ins.current[i] = el
                    }}
                    className="absolute inset-0 flex flex-col items-center gap-[clamp(10px,2vh,20px)] bg-paper p-[clamp(20px,2.6vw,40px)] text-center opacity-0"
                  >
                    <div className="flex w-full justify-between text-[13px] text-ink-muted tabular-nums">
                      <span>{num}</span>
                    </div>
                    <h3 className="m-0 text-[clamp(20px,6.2vw,24px)] font-medium sm:text-[clamp(24px,min(2.2vw,4.4vh),36px)] leading-[1.04] tracking-[-.045em] text-ink text-balance">
                      {p.title}
                    </h3>
                    <div className="grid min-h-0 w-full flex-1 place-items-center">
                      <div
                        ref={(el) => {
                          flowers.current[i] = el
                        }}
                        className="flex w-[min(100%,290px)] flex-col gap-2 text-left text-sm text-ink will-change-transform"
                      >
                        <Mockup index={i} />
                      </div>
                    </div>
                    <p className="m-0 max-w-[300px] text-base leading-[1.45] text-ink-muted">{p.desc}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Methodology
