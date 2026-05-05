import { motion } from 'framer-motion'
import { fadeUp, wipeUp, ease } from '../../../utils/motion'

const team = [
  { initials: 'AC', name: 'Ayman Charoui',    color: '#d4183d' },
  { initials: 'DG', name: 'Danna Guevara',    color: '#9333ea' },
  { initials: 'IA', name: 'Ismael Achamrouk', color: '#0891b2' },
]

export default function TitleSlide0613() {
  return (
    <div className="film-grain relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-12 scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80')` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e]/98 via-[#060d14]/95 to-[#040d16]/98" />

      <motion.div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(8,145,178,0.07) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0891b2]/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0891b2]/15 to-transparent" />

      <div className="relative z-10 text-center px-8 max-w-4xl w-full">
        <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-4 mb-8">
          <motion.span className="block h-px bg-[#0891b2]/50" initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }} />
          <span className="label">Mòdul 0613 · Programació Web en Entorn Servidor · CFGS DAW</span>
          <motion.span className="block h-px bg-[#0891b2]/50" initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }} />
        </motion.div>

        <div className="mb-2">
          <div className="overflow-hidden">
            <motion.h1 {...wipeUp(0.25)}
              className="text-[clamp(3.5rem,9vw,7.5rem)] font-black uppercase leading-none text-white tracking-tight">
              Cine Lumière
            </motion.h1>
          </div>
          <div className="overflow-hidden mt-2">
            <motion.p {...wipeUp(0.4)}
              className="text-[clamp(0.9rem,2.2vw,1.6rem)] font-black uppercase leading-none text-[#0891b2]/70">
              PHP Natiu · MVC Manual · PDO · Seguretat
            </motion.p>
          </div>
        </div>

        <motion.span className="block h-px mx-auto my-8 origin-center"
          style={{ background: 'linear-gradient(to right, transparent, #0891b240, transparent)', width: '16rem' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease, transformOrigin: 'center' }} />

        <motion.div {...fadeUp(0.75)} className="flex items-center justify-center gap-8 mb-8">
          {team.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.1, duration: 0.5 }}
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
      </div>
    </div>
  )
}
