import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { fadeUp, drawLine, scaleIn, ease } from '../utils/motion'

function Counter({ to, suffix = '', delay = 0 }) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const start = performance.now()
      const dur = 1200
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1)
        const e = 1 - Math.pow(1 - p, 3)
        setVal(Math.round(e * to))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delay)
    return () => clearTimeout(t)
  }, [to, delay])
  return <>{val}{suffix}</>
}

const stats = [
  { display: <Counter to={3} delay={400} />,    label: 'Roles de usuario',    sub: 'Admin · Taquilla · Cliente' },
  { display: <Counter to={100} suffix="%" delay={500} />, label: 'Online',    sub: 'Sin app — solo navegador' },
  { display: <Counter to={3} delay={600} />,    label: 'Pasos de compra',     sub: 'Sesión · Butaca · Pago' },
  { display: 'API',                              label: 'Integración externa', sub: 'Cartelera en tiempo real' },
]

export default function AboutSlide() {
  return (
    <div className="w-full h-full flex items-center px-[8vw] py-16">
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1fr_1px_1fr] gap-0 items-center">

        {/* Left — text */}
        <div className="pr-16">
          <motion.span {...drawLine(0.1)} className="red-bar" />
          <motion.p   {...fadeUp(0.1)} className="label mb-4">¿Qué es?</motion.p>

          <div className="overflow-hidden mb-2">
            <motion.h2
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.72, delay: 0.2, ease }}
              className="s-title"
            >
              Gestión cinematográfica
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.72, delay: 0.3, ease }}
              className="s-title text-cinema-red"
            >
              de extremo a extremo.
            </motion.h2>
          </div>

          <motion.p {...fadeUp(0.45)} className="s-body mb-5">
            Cine Lumière es una aplicación web full-stack que gestiona cines,
            salas y sesiones, ofrece cartelera dinámica desde una API externa
            y procesa la compra de entradas de principio a fin.
          </motion.p>
          <motion.p {...fadeUp(0.55)} className="s-body">
            Construida con Laravel 11 y MySQL, con autenticación por roles,
            bloqueo temporal de butacas y flujo de compra en tres pasos.
          </motion.p>
        </div>

        {/* Vertical divider */}
        <motion.div
          className="hidden md:block h-64 w-px bg-gradient-to-b from-transparent via-cinema-red/25 to-transparent origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
        />

        {/* Right — stats */}
        <div className="pl-16 grid grid-cols-2 gap-4">
          {stats.map(({ display, label, sub }, i) => (
            <motion.div
              key={label}
              {...scaleIn(0.35 + i * 0.1)}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-6 flex flex-col gap-1"
            >
              <span className="text-[clamp(2.2rem,4vw,3.2rem)] font-black text-cinema-red leading-none tabular-nums">
                {display}
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.14em] text-white mt-2">{label}</span>
              <span className="text-[10px] text-white/30">{sub}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
