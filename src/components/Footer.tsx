import { COURSES, EMAIL, INSTAGRAM, WA_DOUBT } from '../data/content'
import { EASE } from '../lib/motion'
import { useInView } from '../lib/useInView'
import FlowerMark from './FlowerMark'

const LETTERS = 'BLOOMIN'.split('')
const COL_TITLE = 'mb-1.5 text-sm text-ink-muted'
const LINK = 'inline-flex min-h-11 items-center text-ink transition-colors duration-300 hover:text-primary'

const Footer = ({ onOpenCourse }: { onOpenCourse: (index: number) => void }) => {
  const [markRef, shown] = useInView<HTMLDivElement>()

  return (
    <footer className="mx-auto flex max-w-[1440px] flex-col justify-between gap-stack px-[clamp(20px,4vw,56px)] pb-7 pt-section">
      <div className="flex flex-wrap items-start justify-between gap-10">
        <div className="flex max-w-[420px] items-start gap-4">
          <p className="m-0 text-xl leading-[1.35] tracking-[-.015em]">
            Conhecimento, confiança e a liberdade de se comunicar em inglês.
          </p>
          <FlowerMark className="spin-slow mt-1 h-9 w-9 flex-none text-primary" />
        </div>
        <div className="flex flex-wrap gap-[clamp(32px,5vw,80px)] text-[15px]">
          <div className="flex flex-col items-start gap-0.5">
            <span className={COL_TITLE}>Cursos</span>
            {COURSES.map((c, i) => (
              <button key={c.name} type="button" onClick={() => onOpenCourse(i)} className={`cursor-pointer bg-transparent ${LINK}`}>
                {c.name}
              </button>
            ))}
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className={COL_TITLE}>Escola</span>
            <a href="#professora" className={LINK}>Sobre</a>
            <a href="#como-funciona" className={LINK}>Como funciona</a>
            <a href="#metodologia" className={LINK}>Metodologia</a>
            <a href="#depoimentos" className={LINK}>Depoimentos</a>
            <a href="#faq" className={LINK}>FAQ</a>
          </div>
          <div className="flex flex-col items-start gap-0.5">
            <span className={COL_TITLE}>Contato</span>
            <a href={WA_DOUBT} target="_blank" rel="noopener" className={LINK}>
              WhatsApp · (79) 99123-9606
            </a>
            <a href={INSTAGRAM.url} target="_blank" rel="noopener" className={LINK}>
              Instagram · {INSTAGRAM.handle}
            </a>
            <a href={`mailto:${EMAIL}`} className={`${LINK} break-all`}>
              E-mail · {EMAIL}
            </a>
          </div>
        </div>
      </div>

      <div ref={markRef} className="mt-auto overflow-hidden pt-8">
        <div
          aria-hidden="true"
          className="flex justify-center pt-[.04em] text-[min(20.4vw,36vh)] font-bold leading-[.8] tracking-[-.06em] text-primary"
        >
          {LETTERS.map((l, i) => (
            <span
              key={i}
              className="inline-block"
              style={{
                transform: shown ? 'none' : 'translateY(105%)',
                transition: `transform 1.2s ${EASE} ${i * 60}ms`,
              }}
            >
              {l}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-7 flex flex-wrap justify-between gap-4 border-t border-ink/[.12] pt-5 text-sm text-ink-muted">
        <span>© 2026 Bloomin. Escola de inglês online. Aulas ao vivo, 100% online.</span>
        <a href="#top" className="-my-2 py-2 text-ink-muted transition-colors hover:text-primary">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  )
}

export default Footer
