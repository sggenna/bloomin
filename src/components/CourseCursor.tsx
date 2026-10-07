import { useEffect, useRef, useState, type RefObject } from 'react'
import { EASE } from '../lib/motion'

type Mode = 'off' | 'dot' | 'pill'

const finePointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

const CourseCursor = ({ targetRef, open }: { targetRef: RefObject<HTMLElement | null>; open: boolean }) => {
  const [hoverMode, setMode] = useState<Mode>('off')
  const [pressed, setPressed] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = targetRef.current
    const cursor = cursorRef.current
    if (!finePointer || !section || !cursor) return

    section.classList.add('course-cursor-on')
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    let seen = false
    let id = 0

    const loop = () => {
      x += (tx - x) * 0.22
      y += (ty - y) * 0.22
      cursor.style.transform = `translate3d(${x}px,${y}px,0)`
      id = requestAnimationFrame(loop)
    }

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!seen) {
        x = tx
        y = ty
        seen = true
      }
      const overCard = !!(e.target as Element | null)?.closest('[data-course-card]')
      setMode(overCard ? 'pill' : 'dot')
    }
    const onLeave = () => {
      seen = false
      setMode('off')
    }

    id = requestAnimationFrame(loop)
    const onDown = () => setPressed(true)
    const onUp = () => setPressed(false)
    section.addEventListener('mousemove', onMove)
    section.addEventListener('mouseleave', onLeave)
    section.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    return () => {
      cancelAnimationFrame(id)
      section.classList.remove('course-cursor-on')
      section.removeEventListener('mousemove', onMove)
      section.removeEventListener('mouseleave', onLeave)
      section.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
    }
  }, [targetRef])

  if (!finePointer) return null

  const mode: Mode = open ? 'pill' : hoverMode
  const pill = mode === 'pill'

  return (
    <div ref={cursorRef} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[150]">
      <div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-full"
        style={{
          width: pill ? 96 : 14,
          height: pill ? 38 : 14,
          opacity: open || mode === 'off' ? 0 : 1,
          scale: open ? 3.2 : mode === 'off' ? 0.3 : pressed ? 0.88 : 1,
          background: pill ? '#781444' : 'rgba(120,20,68,.45)',
          transition: open
            ? `opacity .45s ease, scale .6s ${EASE}`
            : `width .45s ${EASE}, height .45s ${EASE}, opacity .25s ease, scale .35s ${EASE}, background .3s ease`,
        }}
      >
        <span
          className="whitespace-nowrap text-sm font-medium text-page"
          style={{
            opacity: pill ? 1 : 0,
            transform: pill ? 'none' : 'scale(.6)',
            transition: `opacity .25s ease ${pill ? 0.12 : 0}s, transform .35s ${EASE} ${pill ? 0.12 : 0}s`,
          }}
        >
          Ver mais +
        </span>
      </div>
    </div>
  )
}

export default CourseCursor
