import { motion } from 'framer-motion'

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function FinalSlide() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* BG */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#111111] via-[#1a0a0a]/95 to-[#120000]" />

      {/* Ambient orb */}
      <motion.div
        className="absolute w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.1) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Decorative lines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/15 to-transparent" />

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <motion.div {...up(0.1)} className="flex items-center justify-center gap-3 mb-10">
          <span className="block w-8 h-px bg-cinema-red" />
          <span className="slide-label">Fin de la presentación</span>
          <span className="block w-8 h-px bg-cinema-red" />
        </motion.div>

        <motion.h2
          {...up(0.25)}
          className="text-[clamp(3rem,8vw,7rem)] font-black uppercase leading-none mb-6"
        >
          <span className="text-cinema-maroon">LUCES,</span>{' '}
          <span className="text-white">CÁMARA</span>
          <br />
          <span className="bg-gradient-to-r from-cinema-red to-cinema-maroon bg-clip-text text-transparent">
            ACCIÓN
          </span>
        </motion.h2>

        <motion.p {...up(0.4)} className="slide-body max-w-xl mx-auto mb-12">
          Cine Lumière — Full-stack con Laravel, MySQL y Tailwind CSS.
          Desde la gestión hasta la compra, todo en una sola plataforma.
        </motion.p>

        <motion.div {...up(0.55)} className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://github.com/AyChEs-0/lumiere-final"
            target="_blank"
            rel="noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.59 9.59 0 012.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Ver Repositorio
          </a>
          <button
            onClick={() => window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }))}
            className="btn-ghost"
          >
            ← Volver al inicio
          </button>
        </motion.div>

        <motion.p
          {...up(0.75)}
          className="mt-16 text-[10px] uppercase tracking-[0.2em] text-white/15"
        >
          CINE <span className="text-cinema-red/30">LUMIÈRE</span> — Proyecto de Presentación
        </motion.p>
      </div>
    </div>
  )
}
