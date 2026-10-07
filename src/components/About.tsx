import { useRef } from 'react'
import { BIO, INTRO } from '../data/content'
import { clamp01, reduceMotion, useScrollTick } from '../lib/motion'
import { useInView } from '../lib/useInView'
import FlowerMark from './FlowerMark'
import { Fade, Mask } from './Reveal'

const WORDS = INTRO.split(' ')
const INLINE_FLOWER = 'spin-slow text-primary ml-[.14em] inline-block h-[.7em] w-[.7em] align-[-.02em]'
const HEADING = 'm-0 text-[clamp(44px,6.2vw,104px)] font-medium leading-[.92] tracking-[-.055em]'

const About = () => {
  const [photoRef, photoShown] = useInView<HTMLDivElement>()
  const imgRef = useRef<HTMLImageElement>(null)
  const introRef = useRef<HTMLParagraphElement>(null)
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([])

  useScrollTick(() => {
    const vh = window.innerHeight
    const img = imgRef.current
    const box = img?.parentElement
    if (img && box && !reduceMotion) {
      const r = box.getBoundingClientRect()
      img.style.transform = `translateY(${(r.top + r.height / 2 - vh / 2) * 0.08}px)`
    }
    const intro = introRef.current
    if (!intro) return
    const r = intro.getBoundingClientRect()
    const n = WORDS.length
    const p = reduceMotion ? 1 : clamp01((vh * 0.92 - r.top) / (r.height + vh * 0.2))
    wordRefs.current.forEach((w, i) => {
      if (!w) return
      const t = clamp01(p * n * 1.15 - i)
      w.style.color = t >= 1 ? '#221419' : `color-mix(in oklab,#221419 ${Math.round(t * 100)}%,#8A7C82)`
    })
  })

  return (
    <section
      id="professora"
      className="mx-auto flex max-w-[1440px] flex-col items-start gap-[clamp(40px,7vw,120px)] px-[clamp(20px,4vw,56px)] py-section min-[920px]:flex-row"
    >
      <div className="mx-auto w-full max-w-[min(100%,520px)] min-[920px]:sticky min-[920px]:top-[clamp(80px,11vh,104px)] min-[920px]:mx-0 min-[920px]:max-w-[560px] min-[920px]:flex-[1_1_340px]">
        <div
          ref={photoRef}
          className="relative aspect-[4/5] overflow-hidden rounded-md bg-primary-deep min-[920px]:aspect-auto min-[920px]:h-[calc(100svh-clamp(160px,22vh,220px))] min-[920px]:max-h-[760px] min-[920px]:min-h-[420px]"
          style={{
            clipPath: photoShown ? 'inset(0% 0% 0% 0%)' : 'inset(10% 10% 10% 10%)',
            transition: 'clip-path 1.8s cubic-bezier(.7,0,.2,1)',
          }}
        >
          <img
            ref={imgRef}
            src="/assets/team/jamile.jpg"
            alt="Jamile Oliveira"
            className="absolute left-0 top-[-10%] block h-[120%] w-full object-cover object-[50%_30%] will-change-transform"
            style={{ filter: 'saturate(.88) contrast(1.04)' }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(90,24,52,0)_60%,rgba(90,24,52,.4))]" />
        </div>
        <Fade className="mt-[18px] flex items-baseline justify-between gap-4 text-[clamp(12px,3.5vw,15px)]">
          <span className="font-medium tracking-[-.01em]">Jamile Oliveira</span>
          <span className="text-ink-muted">Professora de Inglês · Fundadora</span>
        </Fade>
      </div>

      <div className="flex min-w-0 max-w-[760px] flex-col gap-[clamp(48px,9vh,112px)] pt-[clamp(0px,2vh,24px)] min-[920px]:flex-[1.4_1_440px]">
        <div>
          <Mask className={HEADING}>Prazer, eu</Mask>
          <Mask className={`${HEADING} text-primary`} delay={90}>
            sou{' '}
            <span className="whitespace-nowrap">
              Jamile.
              <FlowerMark className={INLINE_FLOWER} />
            </span>
          </Mask>
        </div>

        <p
          ref={introRef}
          className="m-0 text-[clamp(24px,2.6vw,40px)] font-medium leading-[1.18] tracking-[-.035em] text-ink text-pretty"
        >
          {WORDS.map((w, i) => (
            <span
              key={i}
              ref={(el) => {
                wordRefs.current[i] = el
              }}
              className="text-ink-subtle transition-colors duration-[250ms] ease-linear"
            >
              {w}{' '}
            </span>
          ))}
        </p>

        <div className="flex flex-col">
          {BIO.map((b, i) => (
            <Fade
              key={b.label}
              delay={i * 90}
              className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-[clamp(10px,2vw,40px)] border-t border-ink/[.14] py-[clamp(22px,3.4vh,36px)]"
            >
              <div className="flex items-baseline gap-3.5">
                <span className="text-[13px] text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="m-0 text-[clamp(20px,1.7vw,26px)] font-medium leading-[1.1] tracking-[-.03em]">{b.label}</h3>
              </div>
              <p className="m-0 text-base leading-[1.6] text-ink-muted text-pretty">{b.text}</p>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
