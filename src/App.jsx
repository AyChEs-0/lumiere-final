import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SlideProgress      from './components/SlideProgress'
import TitleSlide         from './slides/TitleSlide'
import PropositSlide      from './slides/PropositSlide'
import AboutSlide         from './slides/AboutSlide'
import PlanificacionSlide from './slides/PlanificacionSlide'
import FeaturesSlide      from './slides/FeaturesSlide'
import CarteleraSlide     from './slides/CarteleraSlide'
import FlujoSlide         from './slides/FlujoSlide'
import DecisionesSlide    from './slides/DecisionesSlide'
import ArquitecturaSlide  from './slides/ArquitecturaSlide'
import TechSlide          from './slides/TechSlide'
import ReflexionSlide     from './slides/ReflexionSlide'
import FinalSlide         from './slides/FinalSlide'

const SLIDES = [
  TitleSlide, PropositSlide, AboutSlide, PlanificacionSlide, FeaturesSlide, CarteleraSlide,
  FlujoSlide, DecisionesSlide, ArquitecturaSlide,
  TechSlide, ReflexionSlide, FinalSlide,
]

const variants = {
  enter: (dir) => ({ opacity: 0, x: dir > 0 ? 110 : -110, scale: 0.97, filter: 'blur(10px)' }),
  center: { opacity: 1, x: 0, scale: 1, filter: 'blur(0px)', transition: { duration: 0.62, ease: [0.4, 0, 0.2, 1] } },
  exit:   (dir) => ({ opacity: 0, x: dir > 0 ? -110 : 110, scale: 0.97, filter: 'blur(10px)', transition: { duration: 0.42, ease: [0.6, 0, 1, 1] } }),
}

export default function App() {
  const [[current, dir], setCurrent] = useState([0, 0])
  const [busy, setBusy] = useState(false)

  const goTo = useCallback((next) => {
    if (busy || next < 0 || next >= SLIDES.length) return
    setBusy(true)
    setCurrent(([prev]) => [next, next > prev ? 1 : -1])
    setTimeout(() => setBusy(false), 700)
  }, [busy])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goTo(current + 1)
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')  goTo(current - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [current, goTo])

  useEffect(() => {
    let sx = 0
    const start = (e) => { sx = e.touches[0].clientX }
    const end   = (e) => {
      const dx = e.changedTouches[0].clientX - sx
      if (Math.abs(dx) > 50) dx < 0 ? goTo(current + 1) : goTo(current - 1)
    }
    window.addEventListener('touchstart', start)
    window.addEventListener('touchend', end)
    return () => { window.removeEventListener('touchstart', start); window.removeEventListener('touchend', end) }
  }, [current, goTo])

  const Slide = SLIDES[current]

  return (
    <div className="presentation">
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-cinema-red z-50 origin-left"
        animate={{ scaleX: (current + 1) / SLIDES.length }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ width: '100%' }}
      />
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div key={current} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" className="slide">
          <Slide />
        </motion.div>
      </AnimatePresence>
      <SlideProgress current={current} total={SLIDES.length} onGo={goTo} />
      <AnimatePresence>
        {current < SLIDES.length - 1 && (
          <motion.button key="next" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }}
            onClick={() => goTo(current + 1)}
            className="fixed right-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 glass rounded-full flex items-center justify-center text-white/25 hover:text-cinema-red transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
          </motion.button>
        )}
        {current > 0 && (
          <motion.button key="prev" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }}
            onClick={() => goTo(current - 1)}
            className="fixed left-5 top-1/2 -translate-y-1/2 z-50 w-10 h-10 glass rounded-full flex items-center justify-center text-white/25 hover:text-cinema-red transition-colors duration-300">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
