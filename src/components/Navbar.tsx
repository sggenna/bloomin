import { useEffect, useState } from 'react'
import { NAV_LINKS, WA_TRIAL } from '../data/content'
import { EASE, reduceMotion, useScrollTick } from '../lib/motion'

const DESKTOP_LINKS = ['#professora', '#cursos', '#metodologia', '#faq']

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [past, setPast] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menu, setMenu] = useState(false)
  const [mounted, setMounted] = useState(reduceMotion)

  useScrollTick(() => {
    const y = window.scrollY
    const vh = window.innerHeight
    setScrolled(y > 24)
    setPast(y > vh * 0.75)
    const about = document.getElementById('professora')?.getBoundingClientRect()
    setHidden(!!about && about.top < 60 && about.bottom > 60)
  })

  useEffect(() => {
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setMounted(true)))
    return () => cancelAnimationFrame(id)
  }, [])

  useEffect(() => {
    const close = () => {
      if (window.innerWidth >= 900) setMenu(false)
    }
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const linkClass = 'text-ink transition-colors hover:text-primary'

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[60]"
        style={{
          background: scrolled ? 'rgba(244,240,236,.82)' : 'transparent',
          backdropFilter: scrolled ? 'saturate(1.4) blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'saturate(1.4) blur(16px)' : 'none',
          boxShadow: scrolled ? '0 1px 0 rgba(34,20,25,.08)' : 'none',
          transform: hidden ? 'translateY(-100%)' : mounted ? 'none' : 'translateY(-14px)',
          opacity: mounted ? 1 : 0,
          transition: `background .4s ease, box-shadow .4s ease, transform .9s ${EASE}, opacity .9s ease .25s`,
        }}
      >
        <nav className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-[clamp(20px,4vw,56px)] py-5">
          <a href="#top" className="flex">
            <img src="/assets/brand/bloomin-logo.svg" alt="Bloomin" className="hidden h-7 w-auto sm:block" />
            <img src="/assets/brand/bloomin-monogram.svg" alt="Bloomin" className="block h-9 w-auto sm:hidden" />
          </a>
          <div className="hidden justify-center gap-[clamp(20px,2.6vw,40px)] text-[15px] min-[900px]:flex">
            {NAV_LINKS.filter((l) => DESKTOP_LINKS.includes(l.href)).map((l) => (
              <a key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            <a
              href={WA_TRIAL}
              target="_blank"
              rel="noopener"
              data-burst="1"
              tabIndex={past ? 0 : -1}
              className="hidden whitespace-nowrap rounded-full border border-primary px-[22px] py-[11px] text-[15px] font-medium text-primary hover:bg-primary hover:text-page min-[560px]:inline-flex"
              style={{
                opacity: past ? 1 : 0,
                transform: past ? 'none' : 'translateY(-6px) scale(.96)',
                pointerEvents: past ? 'auto' : 'none',
                transition: `opacity .45s ease, transform .6s ${EASE}, background .3s ease, color .3s ease`,
              }}
            >
              Agendar aula
            </a>
            <button
              type="button"
              aria-label="Menu"
              aria-expanded={menu}
              onClick={() => setMenu((m) => !m)}
              className="relative h-11 w-11 cursor-pointer bg-transparent min-[900px]:hidden"
            >
              <span
                className="absolute right-0 top-1/2 w-[22px] -mt-[5px] h-[2px] rounded-full bg-primary"
                style={{ transform: menu ? 'translateY(5px) rotate(45deg)' : 'none', transition: `transform .45s ${EASE}` }}
              />
              <span
                className="absolute right-0 top-1/2 w-[22px] mt-[3px] h-[2px] rounded-full bg-primary"
                style={{ transform: menu ? 'translateY(-5px) rotate(-45deg)' : 'none', transition: `transform .45s ${EASE}` }}
              />
            </button>
          </div>
        </nav>
      </header>

      {menu && (
        <div className="fixed inset-0 z-[58] flex flex-col justify-between gap-8 overflow-y-auto bg-page px-[clamp(20px,4vw,56px)] pb-8 pt-24">
          <nav className="flex flex-col">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenu(false)}
                className="flex items-baseline justify-between border-b border-ink/10 py-2.5 text-[clamp(30px,8vw,44px)] font-medium tracking-[-.045em] text-ink hover:text-primary"
              >
                {l.label}
                <span className="text-sm tracking-normal text-primary tabular-nums">{String(i + 1).padStart(2, '0')}</span>
              </a>
            ))}
          </nav>
          <a
            href={WA_TRIAL}
            target="_blank"
            rel="noopener"
            data-burst="1"
            onClick={() => setMenu(false)}
            className="flex items-center justify-center gap-3 whitespace-nowrap rounded-full bg-primary px-5 py-4 text-[15px] font-medium text-page hover:bg-ink sm:text-[17px]"
          >
            Agendar aula experimental →
          </a>
        </div>
      )}
    </>
  )
}

export default Navbar
