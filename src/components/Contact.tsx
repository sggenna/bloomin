import { useRef } from 'react'
import { WA_TRIAL } from '../data/content'
import { clamp01, reduceMotion, sectionProgress, useScrollTick } from '../lib/motion'

const LINES = [
  ['Let’s', 'grow'],
  ['your', 'English.'],
]
const WORD_COUNT = LINES.flat().length

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const clipRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const echoRef = useRef<HTMLDivElement>(null)
  const words = useRef<(HTMLSpanElement | null)[]>([])

  useScrollTick(() => {
    const section = sectionRef.current
    if (!section) return
    const p = sectionProgress(section)
    const e = Math.min(1, p / 0.55)
    const ee = 1 - Math.pow(1 - e, 3)
    if (clipRef.current) {
      clipRef.current.style.clipPath = reduceMotion
        ? 'none'
        : `inset(${(1 - ee) * 22}% ${(1 - ee) * 30}% round ${(1 - ee) * 12}px)`
    }
    if (imgRef.current) imgRef.current.style.transform = `scale(${1.35 - ee * 0.35 + p * 0.06})`
    const wp = Math.max(0, (p - 0.3) / 0.55)
    words.current.forEach((w, i) => {
      if (!w) return
      const t = reduceMotion ? 1 : clamp01(wp * WORD_COUNT * 1.2 - i)
      w.style.opacity = String(t)
      w.style.transform = `translateY(${(1 - t) * 0.3}em)`
      w.style.filter = t < 1 ? `blur(${(1 - t) * 8}px)` : 'none'
    })
    if (echoRef.current) {
      const t = reduceMotion ? 1 : clamp01((p - 0.82) / 0.12)
      echoRef.current.style.opacity = String(t)
      echoRef.current.style.transform = `translateY(${(1 - t) * 12}px)`
    }
  })

  let wordIndex = 0

  return (
    <section ref={sectionRef} id="contato" className="relative h-[220vh]">
      <div className="sticky top-0 h-svh overflow-hidden px-[clamp(12px,1.5vw,20px)] py-3">
        <div className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end p-6 text-page sm:p-[clamp(32px,5vw,72px)]">
          <div ref={clipRef} className="absolute inset-0 overflow-hidden rounded-[clamp(16px,2vw,28px)] will-change-[clip-path]">
            <img
              ref={imgRef}
              src="/assets/photos/florals-blur.jpg"
              alt="Flores em movimento"
              className="block h-full w-full object-cover will-change-transform"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(120,20,68,.15)_0%,rgba(90,14,50,.78)_100%)]" />
          </div>

          <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <h2 className="m-0 text-[clamp(48px,min(8vw,13vh),136px)] font-medium leading-[.95] tracking-[-.06em]">
              {LINES.map((line, li) => (
                <span key={li} className="block">
                  {line.map((word) => {
                    const idx = wordIndex++
                    return (
                      <span
                        key={word}
                        ref={(el) => {
                          words.current[idx] = el
                        }}
                        className="mr-[.22em] inline-block opacity-0"
                      >
                        {word}
                      </span>
                    )
                  })}
                </span>
              ))}
            </h2>
            <div ref={echoRef} className="flex w-full min-w-0 max-w-[340px] flex-col gap-6 opacity-0">
              <p className="m-0 text-[17px] leading-normal">
                Sem taxa de matrícula. Aulas ao vivo, 100% online, em turmas de até 10 alunos.
              </p>
              <div>
                <a
                  href={WA_TRIAL}
                  target="_blank"
                  rel="noopener"
                  data-burst="1"
                  data-magnet="1"
                  className="inline-flex max-w-full items-center gap-2.5 whitespace-nowrap rounded-full bg-page py-3 pl-5 pr-3 text-[clamp(12px,3.8vw,14px)] font-medium text-primary transition-[background-color,gap,transform] duration-500 sm:gap-3.5 sm:py-[17px] sm:pl-[30px] sm:pr-[18px] sm:text-[17px] ease-[cubic-bezier(.2,.7,0,1)] hover:gap-3.5 hover:bg-white sm:hover:gap-[22px]"
                >
                  Agendar aula experimental
                  <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-primary text-[13px] text-page sm:h-8 sm:w-8 sm:text-[15px]">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
