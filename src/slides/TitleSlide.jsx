import { motion } from 'framer-motion'
import { wipeUp, fadeUp, ease } from '../utils/motion'

export default function TitleSlide() {
  return (
    <div className="film-grain relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80')` }} />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e]/96 via-[#160808]/88 to-[#100000]/95" />

      {/* Letterbox */}
      <motion.div className="absolute top-0 left-0 right-0 bg-[#0e0e0e] z-20"
        initial={{ height: '22%' }} animate={{ height: 0 }} transition={{ duration: 0.9, delay: 0.05, ease }} />
      <motion.div className="absolute bottom-0 left-0 right-0 bg-[#0e0e0e] z-20"
        initial={{ height: '22%' }} animate={{ height: 0 }} transition={{ duration: 0.9, delay: 0.05, ease }} />

      <motion.div className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.07) 0%, transparent 68%)' }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <motion.div {...fadeUp(0.55)} className="flex items-center gap-4 mb-8">
          <motion.span className="block h-px bg-cinema-red/60 origin-right"
            initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 0.5, delay: 0.6, ease }} />
          <span className="label">Defensa del Sistema · Grupo 3</span>
          <motion.span className="block h-px bg-cinema-red/60 origin-left"
            initial={{ width: 0 }} animate={{ width: 32 }} transition={{ duration: 0.5, delay: 0.6, ease }} />
        </motion.div>

        <div className="mb-6">
          <div className="overflow-hidden">
            <motion.span {...wipeUp(0.65)}
              className="block text-[clamp(4rem,11vw,8.5rem)] font-black uppercase leading-none text-cinema-maroon drop-shadow-[0_4px_60px_rgba(0,0,0,0.95)]">
              CINE
            </motion.span>
          </div>
          <div className="overflow-hidden">
            <motion.span {...wipeUp(0.8)}
              className="block text-[clamp(4rem,11vw,8.5rem)] font-black uppercase leading-none text-white drop-shadow-[0_4px_60px_rgba(0,0,0,0.95)]">
              LUMIÈRE
            </motion.span>
          </div>
        </div>

        <motion.span className="block h-[2px] mb-6 origin-center"
          style={{ background: 'linear-gradient(to right, transparent, #d4183d, transparent)', width: '18rem' }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 1.05, ease, transformOrigin: 'center' }} />

        <motion.p {...fadeUp(1.1)} className="text-white/50 text-base max-w-lg leading-relaxed mb-3">
          Plataforma web integral de gestión de cines y venta de entradas online
        </motion.p>
        <motion.p {...fadeUp(1.2)} className="text-white/28 text-sm max-w-md leading-relaxed mb-12">
          Análisis de arquitectura, toma de decisiones y organización del desarrollo del MVP
        </motion.p>

        <motion.div {...fadeUp(1.35)} className="flex items-center gap-3 text-white/20">
          <kbd className="glass px-2 py-1 rounded text-[10px] font-black text-white/30">←</kbd>
          <span className="text-[10px] uppercase tracking-[0.22em]">navega con las flechas</span>
          <kbd className="glass px-2 py-1 rounded text-[10px] font-black text-white/30">→</kbd>
        </motion.div>
      </div>
    </div>
  )
}
