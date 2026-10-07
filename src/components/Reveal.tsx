import type { CSSProperties, ElementType, ReactNode } from 'react'
import { EASE } from '../lib/motion'
import { useInView } from '../lib/useInView'

type FadeProps = {
  as?: ElementType
  delay?: number
  className?: string
  style?: CSSProperties
  extraTransition?: string
  children?: ReactNode
  [key: string]: unknown
}

export const Fade = ({ as: Tag = 'div', delay = 0, className, style, extraTransition, children, ...rest }: FadeProps) => {
  const [ref, shown] = useInView<HTMLElement>()
  const base = `transform 1s ${EASE} ${delay}ms, opacity .9s ease ${delay}ms`
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        transform: shown ? 'none' : 'translateY(28px)',
        opacity: shown ? 1 : 0,
        transition: extraTransition ? `${base}, ${extraTransition}` : base,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

type MaskProps = {
  as?: ElementType
  delay?: number
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export const Mask = ({ as: Tag = 'h2', delay = 0, className, style, children }: MaskProps) => {
  const [ref, shown] = useInView<HTMLDivElement>()
  return (
    <div ref={ref} className="-mb-[.14em] overflow-hidden pb-[.14em]">
      <Tag
        className={className}
        style={{
          transform: shown ? 'none' : 'translateY(110%)',
          transition: `transform 1.1s ${EASE} ${delay}ms, opacity .9s ease ${delay}ms`,
          ...style,
        }}
      >
        {children}
      </Tag>
    </div>
  )
}
