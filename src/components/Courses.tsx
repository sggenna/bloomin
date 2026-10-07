import { useEffect, useRef, useState } from 'react'
import { COURSES } from '../data/content'
import { reduceMotion } from '../lib/motion'
import CourseCursor from './CourseCursor'
import FlowerMark from './FlowerMark'
import { Fade, Mask } from './Reveal'

const INLINE_FLOWER = 'spin-slow text-primary ml-[.14em] inline-block h-[.7em] w-[.7em] align-[-.02em]'
const BLOOM_EASE = 'cubic-bezier(.16,.9,.2,1)'

const Bloom = ({ count, order, play, alt }: { count: number; order: number; play: boolean; alt: string }) => {
  const imgs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    if (!play || reduceMotion) return
    const timers: ReturnType<typeof setTimeout>[] = []
    const base = 250 + order * 520
    imgs.current.forEach((im, j) => {
      if (!im) return
      const at = base + j * 420
      timers.push(
        setTimeout(() => {
          im.style.opacity = '1'
          im.style.transform = 'none'
        }, at),
      )
      if (j < count - 1) timers.push(setTimeout(() => (im.style.opacity = '0'), at + 580))
    })
    return () => timers.forEach(clearTimeout)
  }, [play, count, order])

  return (
    <div role="img" aria-label={alt} className="relative aspect-[540/452] w-[min(78%,240px)]">
      {Array.from({ length: count }, (_, j) => (
        <img
          key={j}
          ref={(el) => {
            imgs.current[j] = el
          }}
          src={`/assets/flowers/bloom-${j + 1}.webp`}
          alt=""
          className="absolute inset-0 block h-full w-full origin-[50%_88%] object-contain will-change-[opacity,transform]"
          style={{
            opacity: reduceMotion && j === count - 1 ? 1 : 0,
            transform: reduceMotion ? 'none' : j === 0 ? 'translateY(12px) scale(.55) rotate(-14deg)' : 'scale(.96)',
            transition: `opacity ${j === 0 ? 0.8 : 0.55}s ease, transform ${j === 0 ? 1.4 : 1}s ${BLOOM_EASE}`,
          }}
        />
      ))}
    </div>
  )
}

const Courses = ({
  onOpen,
  activeIndex,
}: {
  onOpen: (index: number, origin?: { x: number; y: number }) => void
  activeIndex: number | null
}) => {
  const rowRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [play, setPlay] = useState(false)

  useEffect(() => {
    const row = rowRef.current
    if (!row) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPlay(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -20% 0px' },
    )
    io.observe(row)
    return () => io.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="cursos"
      className="mx-auto flex max-w-[1440px] flex-col px-[clamp(20px,4vw,56px)] py-section"
    >
      <div className="mb-stack flex flex-wrap items-end justify-between gap-8">
        <Mask className="m-0 text-[clamp(40px,min(6.4vw,11vh),104px)] font-medium leading-[.92] tracking-[-.055em]">
          <span className="whitespace-nowrap">
            Cursos<span className="text-primary">.</span>
            <FlowerMark className={INLINE_FLOWER} />
          </span>
        </Mask>
        <Fade className="flex w-[min(100%,360px)] flex-col gap-4">
          <div className="h-px bg-divider" />
          <p className="m-0 text-base leading-[1.55] text-ink-muted">
            Quatro caminhos, um mesmo cuidado. Todos começam com um nivelamento para você entrar na turma certa.
          </p>
        </Fade>
      </div>

      <div ref={rowRef} className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-[clamp(12px,1.2vw,20px)]">
        {COURSES.map((c, i) => (
          <Fade
            key={c.name}
            as="button"
            type="button"
            data-course-card="true"
            delay={i * 90}
            onClick={(e: React.MouseEvent<HTMLElement>) => {
              const r = e.currentTarget.getBoundingClientRect()
              const fromPointer = e.detail > 0
              onOpen(i, fromPointer ? { x: e.clientX, y: e.clientY } : { x: r.left + r.width / 2, y: r.top + r.height / 2 })
            }}
            aria-label={`Ver detalhes: ${c.name}`}
            className="group flex cursor-pointer flex-col gap-3.5 bg-transparent p-0 text-left text-ink"
          >
            <div
              className="relative grid h-[min(34vh,340px)] place-items-center overflow-hidden rounded-lg transition-[transform,opacity] duration-700 ease-[cubic-bezier(.2,.7,0,1)] group-hover:-translate-y-1.5"
              style={{ background: c.tint, opacity: activeIndex === i ? 0.15 : 1, transform: activeIndex === i ? 'scale(.96)' : undefined }}
            >
              <span className="absolute left-4 top-3.5 text-sm font-medium tracking-[-.01em] text-primary">{c.tag}</span>
              <span className="absolute right-4 top-3.5 text-sm text-ink-muted tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              <Bloom count={i + 1} order={i} play={play} alt={c.alt} />
            </div>
            <span className="text-[19px] font-bold tracking-[-.02em]">{c.name}</span>
            <p className="m-0 text-base leading-normal text-ink-muted">{c.desc}</p>
            <span className="text-[15px] font-medium text-primary">Saiba mais →</span>
          </Fade>
        ))}
      </div>
      <CourseCursor targetRef={sectionRef} open={activeIndex !== null} />
    </section>
  )
}

export default Courses
