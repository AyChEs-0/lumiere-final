import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { fadeUp, wipeUp, ease } from '../../../utils/motion'

const team = [
  { initials: 'AC', name: 'Ayman Charoui',    color: '#d4183d' },
  { initials: 'DG', name: 'Danna Guevara',    color: '#9333ea' },
  { initials: 'IA', name: 'Ismael Achamrouk', color: '#0891b2' },
]

const stats = [
  { end: 9,  label: 'RAs coberts' },
  { end: 4,  label: 'capes seguretat' },
  { end: 3,  label: 'capes MVC' },
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

export default function TancamentSlide() {
  return (
    <div className="film-grain relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15 scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80')` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e]/98 via-[#060d14]/95 to-[#040d16]/98" />

      <motion.div className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.07) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0891b2]/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0891b2]/15 to-transparent" />

      <div className="relative z-10 text-center px-8 max-w-3xl w-full">
        <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-4 mb-8">
          <motion.span className="block h-px bg-[#0891b2]/50" initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }} />
          <span className="label">Mòdul 0613 · Programació Web en Entorn Servidor</span>
          <motion.span className="block h-px bg-[#0891b2]/50" initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }} />
        </motion.div>

        <div className="mb-4">
          <div className="overflow-hidden">
            <motion.h2 {...wipeUp(0.25)}
              className="text-[clamp(3.5rem,10vw,8rem)] font-black uppercase leading-none text-white">
              Gracies
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p {...wipeUp(0.4)}
              className="text-[clamp(1rem,2.5vw,1.8rem)] font-black uppercase leading-none text-[#0891b2]/70 mt-1">
              per la vostra atenció
            </motion.p>
          </div>
        </div>

        <motion.span className="block h-px mx-auto mb-8 origin-center"
          style={{ background: 'linear-gradient(to right, transparent, #0891b240, transparent)', width: '16rem' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease, transformOrigin: 'center' }} />

        <motion.div {...fadeUp(0.7)} className="flex items-center justify-center gap-10 mb-6">
          {stats.map((s, i) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span className="text-[3rem] font-black leading-none text-white tabular-nums">
                <Counter end={s.end} delay={0.8 + i * 0.15} />
              </span>
              <span className="text-[9px] font-black uppercase tracking-[0.22em] text-white/25">{s.label}</span>
            </div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.82)} className="s-body max-w-md mx-auto mb-6 text-white/35">
          De PHP Natiu a Laravel — entenent cada pas del camí.
        </motion.p>

        <motion.div {...fadeUp(0.88)} className="flex items-center justify-center gap-4 mb-8">
          {team.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 + i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black"
                style={{ background: `${m.color}20`, border: `1px solid ${m.color}35`, color: m.color }}>
                {m.initials}
              </div>
              <span className="text-[9px] text-white/30 font-medium">{m.name}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(1.1)} className="text-[9px] uppercase tracking-[0.22em] text-white/12">
          CINE <span className="text-[#0891b2]/25">LUMIÈRE</span> · Equip G3 · Institut F. Vidal i Barraquer · 2025–2026
        </motion.p>

        <motion.p {...fadeUp(1.2)} className="text-[10px] text-white/20 mt-3 italic">
          Obrim torn de preguntes
        </motion.p>
      </div>
    </div>
  )
}
