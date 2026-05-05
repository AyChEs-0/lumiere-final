import { motion } from 'framer-motion'

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function TitleSlide() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* BG image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111]/95 via-[#1a0a0a]/80 to-[#120000]/90" />

      {/* Ambient orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.09) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <motion.div {...up(0.1)} className="flex items-center gap-3 mb-10">
          <span className="block w-8 h-px bg-cinema-red" />
          <span className="slide-label">Proyecto Final — Presentación</span>
          <span className="block w-8 h-px bg-cinema-red" />
        </motion.div>

        <motion.h1
          {...up(0.25)}
          className="text-[clamp(4rem,12vw,9rem)] font-black uppercase leading-none mb-6"
        >
          <span className="block text-cinema-maroon drop-shadow-[0_4px_40px_rgba(0,0,0,0.9)]">
            CINE
          </span>
          <span className="block text-white drop-shadow-[0_4px_40px_rgba(0,0,0,0.9)]">
            LUMIÈRE
          </span>
        </motion.h1>

        <motion.p {...up(0.45)} className="text-white/50 text-lg max-w-md mb-12 leading-relaxed">
          Plataforma premium de gestión y reserva de entradas de cine
        </motion.p>

        <motion.div {...up(0.6)} className="flex items-center gap-3 text-white/25">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-xs uppercase tracking-[0.2em]">Usa las flechas para navegar</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </motion.div>
      </div>
    </div>
  )
}
