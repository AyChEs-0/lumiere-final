import { motion } from 'framer-motion'
import { fadeUp, wipeUp, ease } from '../utils/motion'

const team = [
  { initials: 'AC', name: 'Ayman Charoui',     color: '#d4183d' },
  { initials: 'DG', name: 'Danna Guevara',     color: '#9333ea' },
  { initials: 'IA', name: 'Ismael Achamrouk',  color: '#0891b2' },
]

export default function FinalSlide() {
  return (
    <div className="film-grain relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-15 scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80')` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e]/98 via-[#160808]/95 to-[#100000]/98" />

      <motion.div className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.07) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/15 to-transparent" />

      <div className="relative z-10 text-center px-8 max-w-3xl w-full">
        <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-4 mb-10">
          <motion.span className="block h-px bg-cinema-red/50" initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }} />
          <span className="label">Fin de la presentación</span>
          <motion.span className="block h-px bg-cinema-red/50" initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }} />
        </motion.div>

        <div className="mb-4">
          <div className="overflow-hidden">
            <motion.h2 {...wipeUp(0.25)}
              className="text-[clamp(3.5rem,10vw,8rem)] font-black uppercase leading-none text-white">
              Gracias
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.p {...wipeUp(0.4)}
              className="text-[clamp(1rem,2.5vw,1.8rem)] font-black uppercase leading-none text-cinema-red/70 mt-1">
              por vuestra atención
            </motion.p>
          </div>
        </div>

        <motion.span className="block h-px mx-auto mb-8 origin-center"
          style={{ background: 'linear-gradient(to right, transparent, #d4183d40, transparent)', width: '16rem' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease, transformOrigin: 'center' }} />

        <motion.p {...fadeUp(0.75)} className="s-body max-w-md mx-auto mb-10">
          Abrimos turno de preguntas.
        </motion.p>

        {/* Team */}
        <motion.div {...fadeUp(0.85)} className="flex items-center justify-center gap-4 mb-10">
          {team.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
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
          CINE <span className="text-cinema-red/25">LUMIÈRE</span> · Grupo 3 · Proyecto Final
        </motion.p>
      </div>
    </div>
  )
}
