import { useEffect, useState, type CSSProperties } from 'react'
import { COURSES, waCourse } from '../data/content'
import { EASE } from '../lib/motion'
import type { CourseRequest } from '../lib/courseRequest'

const EXIT_MS = 450

const CourseModal = ({
  request,
  active,
  onClose,
}: {
  request: CourseRequest | null
  active: boolean
  onClose: () => void
}) => {
  const [ready, setReady] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    if (active) {
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setReady(true)))
      return () => {
        cancelAnimationFrame(id)
        setExiting(true)
      }
    }
    const t = setTimeout(() => {
      setExiting(false)
      setReady(false)
    }, EXIT_MS)
    return () => clearTimeout(t)
  }, [active])

  const shown = active || exiting ? request : null
  const open = active && ready
  const origin = shown?.origin
  const offset = origin
    ? { dx: origin.x - window.innerWidth / 2, dy: origin.y - window.innerHeight / 2 }
    : { dx: 0, dy: 28 }

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active, onClose])

  if (!shown) return null
  const index = shown.index
  const course = COURSES[index]
  const stagger = (delay: number): CSSProperties => ({
    opacity: open ? 1 : 0,
    transform: open ? 'none' : 'translateY(14px)',
    transition: open
      ? `opacity .6s ease ${delay}s, transform .8s ${EASE} ${delay}s`
      : 'opacity .2s ease, transform .2s ease',
  })

  return (
    <div className="fixed inset-0 z-[200] grid place-items-center p-6" style={{ pointerEvents: open ? 'auto' : 'none' }}>
      <div
        onClick={onClose}
        className="absolute inset-0 bg-ink/55"
        style={{
          opacity: open ? 1 : 0,
          backdropFilter: `blur(${open ? 4 : 0}px)`,
          WebkitBackdropFilter: `blur(${open ? 4 : 0}px)`,
          transition: `opacity ${open ? 0.6 : 0.4}s ease, backdrop-filter ${open ? 0.6 : 0.4}s ease`,
        }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={course.name}
        data-lenis-prevent
        className="relative flex max-h-[85vh] w-[min(100%,560px)] flex-col gap-4 overflow-y-auto overflow-x-hidden rounded-2xl bg-white p-5 sm:gap-5 sm:p-8"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? 'none' : `translate(${offset.dx}px,${offset.dy}px) scale(${origin ? 0.5 : 0.94})`,
          transition: open
            ? `transform .75s ${EASE}, opacity .35s ease`
            : `transform .4s cubic-bezier(.5,0,.75,0), opacity .3s ease .1s`,
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute right-3 top-3 h-9 w-9 cursor-pointer rounded-full border border-primary bg-white text-base text-primary sm:right-4 sm:top-4"
        >
          ✕
        </button>
        <div className="flex items-center gap-3 pr-10 sm:gap-4 sm:pr-12" style={stagger(0.18)}>
          <div className="grid h-14 w-14 flex-none place-items-center rounded-lg sm:h-[72px] sm:w-[72px]" style={{ background: course.tint }}>
            <img src={`/assets/flowers/bloom-${index + 1}.webp`} alt="" className="block h-auto w-4/5" />
          </div>
          <div className="min-w-0">
            <div className="break-words text-[22px] font-bold leading-tight tracking-[-.02em] text-primary sm:text-[26px]">{course.name}</div>
            <div className="mt-1 text-sm text-ink-muted">{course.tag}</div>
          </div>
        </div>
        <p className="m-0 text-base leading-[1.55] text-ink-muted" style={stagger(0.26)}>{course.desc}</p>
        <div className="flex flex-col gap-5 border-t border-divider pt-5" style={stagger(0.34)}>
          {course.levels.map((l) => (
            <div key={l.title}>
              <h4 className="m-0 mb-1.5 text-base font-bold text-primary">{l.title}</h4>
              <p className="m-0 whitespace-pre-line text-base leading-[1.55] text-ink-muted">{l.desc}</p>
            </div>
          ))}
        </div>
        <div style={stagger(0.42)} className="sticky -bottom-5 -mx-5 -mb-5 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0,#fff_22px)] px-5 pb-5 pt-6 sm:-bottom-8 sm:-mx-8 sm:-mb-8 sm:px-8 sm:pb-8">
          <a
            href={waCourse(course.name)}
            target="_blank"
            rel="noopener"
            data-burst="1"
            className="flex items-center justify-between gap-3 whitespace-nowrap rounded-full bg-primary py-3 pl-5 pr-3 text-sm font-medium text-page transition-colors duration-300 hover:bg-ink sm:gap-3.5 sm:py-3.5 sm:pl-6 sm:pr-3.5 sm:text-base"
          >
            <span className="sm:hidden">Saber mais</span>
            <span className="hidden sm:inline">Quero saber mais sobre este curso</span>
            <span className="grid h-6 w-6 flex-none place-items-center rounded-full bg-page text-[13px] text-primary sm:h-[30px] sm:w-[30px] sm:text-[15px]">→</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default CourseModal
