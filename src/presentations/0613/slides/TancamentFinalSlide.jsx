import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fadeUp, wipeUp, ease } from '../../../utils/motion'

const team = [
  { initials: 'AC', name: 'Ayman Charoui',    color: '#d4183d' },
  { initials: 'DG', name: 'Danna Guevara',    color: '#9333ea' },
  { initials: 'IA', name: 'Ismael Achamrouk', color: '#0891b2' },
]

const stats = [
  { end: 3, label: 'Capes MVC' },
  { end: 4, label: 'Middlewares' },
  { end: 7, label: 'Serveis' },
  { end: 9, label: 'Models Eloquent' },
]

function Counter({ end, delay = 0 }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))
  useEffect(() => {
    const controls = animate(count, end, { duration: 1.8, delay, ease: [0.4, 0, 0.2, 1] })
    return controls.stop
  }, [count, end, delay])
  return <motion.span>{rounded}</motion.span>
}

export default function TancamentFinalSlide() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-white">
      <motion.div className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.04) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/10 to-transparent" />

      <div className="relative z-10 text-center px-8 max-w-3xl w-full">
        <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-4 mb-6">
          <motion.span className="block h-px bg-cinema-red/30" initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }} />
          <span className="label">Mòdul 0613 · Programació Web en Entorn Servidor</span>
          <motion.span className="block h-px bg-cinema-red/30" initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }} />
        </motion.div>

        <div className="mb-4">
          <div className="overflow-hidden">
            <motion.h2 {...wipeUp(0.25)}
              className="text-[clamp(4rem,10vw,8rem)] font-black uppercase leading-none text-gray-900">
              Gracies
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p {...wipeUp(0.4)}
              className="text-[clamp(0.9rem,2vw,1.5rem)] font-black uppercase leading-none text-cinema-red mt-1">
              per la vostra atenció
            </motion.p>
          </div>
        </div>

        <motion.span className="block h-px mx-auto mb-6 origin-center"
          style={{ background: 'linear-gradient(to right, transparent, rgba(212,24,61,0.25), transparent)', width: '14rem' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease, transformOrigin: 'center' }} />

        <motion.div {...fadeUp(0.7)} className="flex items-center justify-center gap-10 mb-5">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-[3.4rem] font-black leading-none text-gray-900 tabular-nums">
                <Counter end={s.end} delay={0.8 + i * 0.12} />
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.82)} className="text-[16px] text-gray-400 max-w-md mx-auto mb-5">
          Cada decisió tècnica té una raó. Cada servei resol un problema real.
        </motion.p>

        <motion.div {...fadeUp(0.88)} className="flex items-center justify-center gap-4 mb-5">
          {team.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-black"
                style={{ background: `${m.color}15`, border: `2px solid ${m.color}30`, color: m.color }}>
                {m.initials}
              </div>
              <span className="text-[13px] text-gray-400 font-medium">{m.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(1.05)} className="flex justify-center mb-4">
          <Link to="/0616"
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-cinema-red/60
                       border border-cinema-red/25 rounded-full px-5 py-2 hover:text-cinema-red hover:border-cinema-red/50 transition-colors duration-200">
            Veure gestió del projecte M0616
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </Link>
        </motion.div>

        <motion.p {...fadeUp(1.2)} className="text-[13px] text-gray-400 italic">
          Obrim torn de preguntes
        </motion.p>
      </div>
    </div>
  )
}
