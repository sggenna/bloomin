import { useCallback, useEffect, useState } from 'react'
import { ReactLenis, useLenis } from 'lenis/react'
import Navbar from './components/Navbar'
import Petals from './components/Petals'
import Hero from './components/Hero'
import About from './components/About'
import HowItWorks from './components/HowItWorks'
import Courses from './components/Courses'
import CourseModal from './components/CourseModal'
import WhyBloomin from './components/WhyBloomin'
import Methodology from './components/Methodology'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { useGlobalEffects } from './lib/effects'
import { reduceMotion } from './lib/motion'
import type { CourseRequest } from './lib/courseRequest'

const SmoothAnchors = () => {
  const lenis = useLenis()
  useEffect(() => {
    if (!lenis) return
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const id = link.getAttribute('href')!.slice(1)
      const target = id ? document.getElementById(id) : null
      if (id && !target) return
      e.preventDefault()
      lenis.scrollTo(target ?? 0)
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [lenis])
  return null
}

function App() {
  const [course, setCourse] = useState<CourseRequest | null>(null)
  const [courseOpen, setCourseOpen] = useState(false)
  const openCourse = useCallback((index: number, origin?: { x: number; y: number }) => {
    setCourse({ index, origin })
    setCourseOpen(true)
  }, [])
  const closeCourse = useCallback(() => setCourseOpen(false), [])
  useGlobalEffects()

  const content = (
    <div className="w-full overflow-x-clip bg-page text-ink">
      <Petals />
      <Navbar />
      <WhatsAppButton />
      <Hero />
      <About />
      <HowItWorks />
      <Courses onOpen={openCourse} activeIndex={courseOpen ? (course?.index ?? null) : null} />
      <WhyBloomin />
      <Methodology />
      <Testimonials />
      <FAQ />
      <Contact />
      <Footer onOpenCourse={openCourse} />
      <CourseModal request={course} active={courseOpen} onClose={closeCourse} />
    </div>
  )

  if (reduceMotion) return content

  return (
    <ReactLenis root>
      <SmoothAnchors />
      {content}
    </ReactLenis>
  )
}

export default App
