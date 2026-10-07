import { useEffect, useRef, useState } from 'react'
import { reduceMotion } from './motion'

export const useInView = <T extends Element>() => {
  const ref = useRef<T>(null)
  const [shown, setShown] = useState(reduceMotion)

  useEffect(() => {
    const el = ref.current
    if (!el || reduceMotion) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting || e.boundingClientRect.top < 0)) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return [ref, shown] as const
}
