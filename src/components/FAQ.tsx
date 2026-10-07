import { useState } from 'react'
import { FAQS, WA_DOUBT } from '../data/content'
import { EASE } from '../lib/motion'
import FlowerMark from './FlowerMark'
import { Fade, Mask } from './Reveal'

const INLINE_FLOWER = 'spin-slow text-primary ml-[.14em] inline-block h-[.7em] w-[.7em] align-[-.02em]'
const HEADING = 'm-0 text-[clamp(40px,min(5.2vw,9vh),80px)] font-medium leading-[.92] tracking-[-.055em]'

const FAQ = () => {
  const [open, setOpen] = useState(-1)

  return (
    <section
      id="faq"
      className="mx-auto flex max-w-[1440px] flex-wrap items-start gap-[clamp(32px,6vw,96px)] px-[clamp(20px,4vw,56px)] py-section"
    >
      <div className="flex max-w-[480px] flex-[1_1_280px] flex-col gap-[clamp(20px,3vh,32px)]">
        <div>
          <Mask className={HEADING}>Perguntas</Mask>
          <Mask className={`${HEADING} text-primary`} delay={90}>
            <span className="whitespace-nowrap">
              frequentes.
              <FlowerMark className={INLINE_FLOWER} />
            </span>
          </Mask>
        </div>
        <Fade delay={150} className="flex flex-col items-start gap-4">
          <p className="m-0 max-w-[300px] text-base leading-normal text-ink-muted">Não encontrou sua dúvida? Fale direto comigo.</p>
          <a
            href={WA_DOUBT}
            target="_blank"
            rel="noopener"
            data-burst="1"
            className="inline-flex min-h-11 items-center gap-2.5 border-b border-primary/30 pb-1 text-[15px] font-medium text-primary transition-[gap,border-color] duration-300 hover:gap-4 hover:border-primary"
          >
            Enviar mensagem<span>→</span>
          </a>
        </Fade>
      </div>

      <div className="flex min-w-0 flex-[1.8_1_420px] flex-col gap-2.5">
        {FAQS.map((f, i) => {
          const o = i === open
          return (
            <Fade
              key={f.q}
              delay={i * 60}
              className="rounded-[22px] border border-ink/[.06]"
              extraTransition="background .45s ease, box-shadow .45s ease"
              style={{
                background: o ? '#FFFFFF' : 'rgba(255,255,255,.45)',
                boxShadow: o ? '0 24px 50px -36px rgba(90,24,52,.3)' : 'none',
              }}
            >
              <button
                type="button"
                aria-expanded={o}
                onClick={() => setOpen(o ? -1 : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 bg-transparent px-[clamp(20px,2.4vw,32px)] py-[clamp(18px,2.6vh,26px)] text-left text-[clamp(15px,4.2vw,21px)] font-medium leading-[1.25] tracking-[-.02em] transition-colors duration-300 hover:text-ink"
                style={{ color: o ? '#221419' : '#3A2A30' }}
              >
                <span>{f.q}</span>
                <span aria-hidden="true" className="relative h-[18px] w-[18px] flex-none">
                  <span className="absolute inset-x-0 top-1/2 -mt-[.75px] h-[1.5px] rounded-sm bg-current" />
                  <span
                    className="absolute inset-y-0 left-1/2 -ml-[.75px] w-[1.5px] rounded-sm bg-current"
                    style={{ transform: `scaleY(${o ? 0 : 1})`, transition: `transform .45s ${EASE}` }}
                  />
                </span>
              </button>
              <div
                className="grid"
                style={{ gridTemplateRows: o ? '1fr' : '0fr', transition: `grid-template-rows .6s ${EASE}` }}
              >
                <div className="overflow-hidden">
                  <p
                    className="m-0 max-w-[620px] whitespace-pre-line px-[clamp(20px,2.4vw,32px)] pb-[clamp(20px,2.8vh,28px)] text-base leading-[1.6] text-ink-muted"
                    style={{
                      opacity: o ? 1 : 0,
                      transform: `translateY(${o ? 0 : -6}px)`,
                      transition: `opacity .45s ease, transform .6s ${EASE}`,
                    }}
                  >
                    {f.a}
                  </p>
                </div>
              </div>
            </Fade>
          )
        })}
      </div>
    </section>
  )
}

export default FAQ
