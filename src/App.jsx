import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SlideProgress from './components/SlideProgress'
import TitleSlide from './slides/TitleSlide'
import AboutSlide from './slides/AboutSlide'
import FeaturesSlide from './slides/FeaturesSlide'
import CarteleraSlide from './slides/CarteleraSlide'
import FlujoSlide from './slides/FlujoSlide'
import CinesSlide from './slides/CinesSlide'
import RolesSlide from './slides/RolesSlide'
import TechSlide from './slides/TechSlide'
import FinalSlide from './slides/FinalSlide'

const slides = [
  TitleSlide,
  AboutSlide,
  FeaturesSlide,
  CarteleraSlide,
  FlujoSlide,
  CinesSlide,
  RolesSlide,
  TechSlide,
  FinalSlide,
]

const variants = {
  enter: (dir) => ({
    opacity: 0,
    x: dir > 0 ? 80 : -80,
    filter: 'blur(6px)',
  }),
  center: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
  exit: (dir) => ({
    opacity: 0,
    x: dir > 0 ? -80 : 80,
    filter: 'blur(6px)',
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function App() {
  const [[current, dir], setCurrent] = useState([0, 0])
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback((next) => {
    if (transitioning) return
    if (next < 0 || next >= slides.length) return
    setTransitioning(true)
    setCurrent(([prev]) => [next, next > prev ? 1 : -1])
    setTimeout(() => setTransitioning(false), 600)
  }, [transitioning])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   goTo(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo])

  // Touch swipe
  useEffect(() => {
    let startX = 0
    const onStart = (e) => { startX = e.touches[0].clientX }
    const onEnd   = (e) => {
      const dx = e.changedTouches[0].clientX - startX
      if (Math.abs(dx) > 50) dx < 0 ? goTo(current + 1) : goTo(current - 1)
    }
    window.addEventListener('touchstart', onStart)
    window.addEventListener('touchend', onEnd)
    return () => {
      window.removeEventListener('touchstart', onStart)
      window.removeEventListener('touchend', onEnd)
    }
  }, [current, goTo])

  const Slide = slides[current]

  return (
    <div className="presentation">
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={current}
          custom={dir}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="slide"
        >
          <Slide />
        </motion.div>
      </AnimatePresence>

      <SlideProgress
        current={current}
        total={slides.length}
        onGo={goTo}
      />

      {/* Arrow hints */}
      <AnimatePresence>
        {current < slides.length - 1 && (
          <motion.button
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            onClick={() => goTo(current + 1)}
            className="fixed right-6 top-1/2 -translate-y-1/2 z-50 p-3 glass rounded-full
                       text-white/30 hover:text-cinema-red transition-colors duration-300"
            aria-label="Siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </motion.button>
        )}
        {current > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            onClick={() => goTo(current - 1)}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-50 p-3 glass rounded-full
                       text-white/30 hover:text-cinema-red transition-colors duration-300"
            aria-label="Anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
