import { useEffect, useRef, useSyncExternalStore } from 'react'

export const reduceMotion =
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const EASE = 'cubic-bezier(.2,.7,0,1)'

export const clamp01 = (v: number) => Math.max(0, Math.min(1, v))
export const smoothstep = (x: number) => x * x * (3 - 2 * x)

const subscribers = new Set<() => void>()
let frame = 0
let attached = false

const run = () => {
  frame = 0
  subscribers.forEach((fn) => fn())
}

export const requestTick = () => {
  if (!frame) frame = requestAnimationFrame(run)
}

const attach = () => {
  if (attached) return
  attached = true
  window.addEventListener('scroll', requestTick, { passive: true })
  window.addEventListener('resize', requestTick)
  window.addEventListener('load', requestTick)
  setTimeout(requestTick, 300)
  document.fonts?.ready.then(requestTick)
}

export const subscribeScroll = (fn: () => void) => {
  attach()
  subscribers.add(fn)
  fn()
  return () => {
    subscribers.delete(fn)
  }
}

export const useScrollTick = (fn: () => void) => {
  const ref = useRef(fn)
  useEffect(() => {
    ref.current = fn
  })
  useEffect(() => subscribeScroll(() => ref.current()), [])
}

export const sectionProgress = (el: HTMLElement) => {
  const r = el.getBoundingClientRect()
  return clamp01(-r.top / (r.height - window.innerHeight))
}

export const useMediaQuery = (query: string) =>
  useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(query)
      mq.addEventListener('change', notify)
      return () => mq.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
