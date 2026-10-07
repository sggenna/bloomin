import { useState, type CSSProperties, type KeyboardEvent } from 'react'
import { WA_LEVEL, WHY, WHY_TITLE_LINES } from '../data/content'
import { EASE, useMediaQuery } from '../lib/motion'
import FlowerMark from './FlowerMark'
import { Fade, Mask } from './Reveal'

const HEADING = 'm-0 text-[clamp(36px,min(5.2vw,9vh),84px)] font-medium leading-[.92] tracking-[-.055em]'
const PAD = 'clamp(20px,2vw,32px)'
const GAP = 'clamp(10px,1.2vw,16px)'
const SMOOTH = 'cubic-bezier(.6,.05,.2,1)'
const ACTIVE_WIDTH = `calc((100cqw - 2 * ${GAP}) * .5652)`
const INLINE_FLOWER = 'spin-slow text-primary ml-[.14em] inline-block h-[.7em] w-[.7em] align-[-.02em]'
const LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']

const Visual = ({ index, active, style }: { index: number; active: boolean; style: CSSProperties }) => {
  if (index === 0) {
    return (
      <div
        className="relative hidden min-h-[260px] min-w-0 flex-[1_1_240px] overflow-hidden rounded-[14px] sm:block bg-[radial-gradient(90%_80%_at_50%_70%,#8E2A58_0%,#5A1834_60%,#4A1029_100%)]"
        style={style}
      >
        <img
          src="/assets/flowers/why-flower.webp"
          alt=""
          className="absolute left-1/2 top-1/2 h-auto w-[min(78%,300px)]"
          style={{
            transform: `translate(-50%,-50%) rotate(${active ? 0 : -14}deg) scale(${active ? 1 : 0.82})`,
            filter: 'drop-shadow(0 24px 34px rgba(40,6,22,.5))',
            transition: `transform 1.6s ${EASE} .25s`,
          }}
        />
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="hidden min-w-0 flex-[1_1_240px] flex-col justify-center gap-2 sm:flex" style={style}>
        <div className="max-w-[280px] self-start rounded-[16px_16px_16px_4px] bg-white px-4 py-3 text-[15px] leading-[1.4] text-ink shadow-[0_20px_40px_-24px_rgba(40,6,22,.6)]">
          Great audio today! Next time, try “I’ve been living here…”
        </div>
        <span className="pl-1 text-[13px] text-on-primary-soft">Jamile · 18:42</span>
      </div>
    )
  }
  return (
    <div className="hidden min-w-0 flex-[1_1_240px] flex-col justify-center sm:flex" style={style}>
      <div className="flex max-w-[300px] flex-col gap-3 rounded-2xl bg-white p-4 text-ink shadow-[0_20px_40px_-24px_rgba(40,6,22,.6)]">
        <div className="flex justify-between text-sm text-ink-muted">
          <span>Your level</span>
          <span className="font-medium text-primary">B1</span>
        </div>
        <div className="grid grid-cols-6 gap-1 text-center text-xs tabular-nums">
          {LEVELS.map((l, i) => (
            <span
              key={l}
              className={`rounded-md py-1.5 ${
                i < 2 ? 'bg-blush-strong text-primary-deep' : i === 2 ? 'bg-primary font-medium text-page' : 'bg-ink/[.06] text-ink-muted'
              }`}
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

const WhyBloomin = () => {
  const [active, setActive] = useState(0)
  const [hover, setHover] = useState(-1)
  const narrow = useMediaQuery('(max-width:1099px)')

  return (
    <section
      id="por-que"
      className="relative mx-auto flex max-w-[1440px] flex-col px-[clamp(20px,4vw,56px)] py-section"
    >
      <div className="mb-stack flex flex-wrap items-end justify-between gap-6">
        <div>
          <Mask className={HEADING}>{WHY_TITLE_LINES[0]}</Mask>
          <Mask className={`${HEADING} text-primary`} delay={90}>
            <span className="whitespace-nowrap">
              {WHY_TITLE_LINES[1]}
              <FlowerMark className={INLINE_FLOWER} />
            </span>
          </Mask>
        </div>
        <Fade>
          <a
            href={WA_LEVEL}
            target="_blank"
            rel="noopener"
            data-burst="1"
            className="inline-flex min-h-11 items-center gap-3 text-[15px] font-medium text-ink transition-colors hover:text-primary"
          >
            Teste de nivelamento gratuito
            <span className="grid h-9 w-9 place-items-center rounded-full border border-ink/20 text-sm">↗</span>
          </a>
        </Fade>
      </div>

      <div className={`flex gap-[clamp(10px,1.2vw,16px)] [container-type:inline-size] ${narrow ? 'flex-col' : 'flex-row'}`}>
        {WHY.map((w, i) => {
          const a = i === active
          const hv = !a && hover === i
          const st = a ? 0.3 : 0
          const d = { d1: st, d2: a ? st + 0.06 : 0, d3: a ? st + 0.12 : 0, d4: a ? st + 0.2 : 0 }
          const eTy = a ? 0 : 14
          const eOp = a ? 1 : 0
          const num = String(i + 1).padStart(2, '0')
          const fade = (delay: number) => ({
            opacity: eOp,
            transform: `translateY(${eTy}px)`,
            transition: `opacity .5s ease ${delay}s, transform .9s ${SMOOTH} ${delay}s`,
          })
          const visualStyle: CSSProperties = {
            opacity: eOp,
            transform: `scale(${a ? 1 : 0.94})`,
            filter: `blur(${a ? 0 : 8}px)`,
            transition: `opacity .7s ease ${d.d2}s, transform 1.1s ${SMOOTH} ${d.d2}s, filter .7s ease ${d.d2}s`,
          }
          const onKey = (e: KeyboardEvent) => {
            if (!a && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault()
              setActive(i)
            }
          }

          const body = (
            <div
              className="flex gap-[clamp(20px,2.4vw,40px)]"
              style={{
                padding: PAD,
                flexWrap: narrow ? 'wrap' : 'nowrap',
                width: narrow ? undefined : ACTIVE_WIDTH,
                height: narrow ? undefined : '100%',
                opacity: eOp,
                pointerEvents: a ? 'auto' : 'none',
                transition: `opacity ${a ? 0.5 : 0.25}s ease ${a ? 0.3 : 0}s`,
              }}
            >
                <div className="flex min-w-0 flex-[1_1_280px] flex-col justify-between gap-7">
                  <div className="flex flex-col gap-[clamp(12px,2vh,20px)]">
                    <span className="text-sm text-on-primary-soft tabular-nums" style={fade(d.d1)}>
                      {num}
                    </span>
                    <h3
                      className="m-0 text-[clamp(15px,5.2vw,26px)] font-medium leading-[1.02] tracking-[-.045em] text-balance sm:text-[clamp(26px,min(2.6vw,4.6vh),40px)]"
                      style={fade(d.d2)}
                    >
                      {w.title}
                    </h3>
                    <p className="m-0 max-w-[460px] text-base leading-[1.55] text-on-primary-soft text-pretty" style={fade(d.d3)}>
                      {w.desc}
                    </p>
                  </div>
                  <a
                    href={w.href}
                    target={w.external ? '_blank' : undefined}
                    rel={w.external ? 'noopener' : undefined}
                    data-burst={w.external ? '1' : '0'}
                    className="inline-flex items-center gap-3 self-start rounded-full bg-page py-3 pl-5 pr-3 text-base font-medium text-primary hover:gap-[18px] hover:bg-white"
                    style={{
                      ...fade(d.d4),
                      transition: `gap .35s ${EASE}, background .3s ease, opacity .55s ease ${d.d4}s, transform .9s ${EASE} ${d.d4}s`,
                    }}
                  >
                    {w.cta}
                    <span className="grid h-7 w-7 place-items-center rounded-full bg-primary text-[13px] text-page">→</span>
                  </a>
                </div>
                <Visual index={i} active={a} style={visualStyle} />
            </div>
          )

          return (
            <Fade
              key={w.title}
              delay={i * 90}
              role="button"
              tabIndex={0}
              aria-expanded={a}
              onClick={() => !a && setActive(i)}
              onKeyDown={onKey}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover((h) => (h === i ? -1 : h))}
              className="relative min-w-0 overflow-hidden rounded-[20px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              extraTransition={`flex 1s ${SMOOTH}, min-height 1s ${SMOOTH}, background .6s ease, color .6s ease`}
              style={{
                flex: narrow ? 'none' : a ? '2.6 1 0' : '1 1 0',
                minHeight: narrow ? '96px' : 'clamp(420px,58vh,480px)',
                background: a ? '#781444' : hv ? '#F1D6DD' : '#F6E4E6',
                color: a ? '#F4F0EC' : '#221419',
                cursor: a ? 'default' : 'pointer',
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 flex justify-between gap-4"
                style={{
                  padding: PAD,
                  flexDirection: narrow ? 'row-reverse' : 'column',
                  alignItems: narrow ? 'center' : 'stretch',
                  opacity: a ? 0 : 1,
                  transform: `translateY(${a ? -8 : 0}px)`,
                  transition: `opacity ${a ? 0.2 : 0.35}s ease ${a ? 0 : 0.4}s, transform .6s ${SMOOTH} ${a ? 0 : 0.4}s`,
                }}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="hidden text-sm text-ink-muted tabular-nums sm:inline">{num}</span>
                  <span
                    aria-hidden="true"
                    className="grid h-9 w-9 place-items-center rounded-full border text-[18px] font-normal"
                    style={{
                      borderColor: hv ? '#781444' : 'rgba(34,20,25,.2)',
                      background: hv ? '#781444' : 'transparent',
                      color: hv ? '#F4F0EC' : '#221419',
                      transform: `rotate(${hv ? 90 : 0}deg) scale(${hv ? 1.08 : 1})`,
                      transition: `transform .6s ${EASE}, background .35s ease, color .35s ease, border-color .35s ease`,
                    }}
                  >
                    +
                  </span>
                </div>
                <h3
                  lang="pt-BR"
                  className="m-0 break-words text-[clamp(12px,3.9vw,24px)] font-medium leading-[1.1] tracking-[-.03em] hyphens-auto text-balance min-[1100px]:text-[clamp(18px,1.5vw,24px)]"
                >
                  {w.title}
                </h3>
              </div>

              {narrow ? (
                <div className="grid" style={{ gridTemplateRows: a ? '1fr' : '0fr', transition: `grid-template-rows 1s ${SMOOTH}` }}>
                  <div className="min-h-0 overflow-hidden">{body}</div>
                </div>
              ) : (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">{body}</div>
              )}
            </Fade>
          )
        })}
      </div>
    </section>
  )
}

export default WhyBloomin
