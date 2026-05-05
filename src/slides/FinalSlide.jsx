import { motion } from 'framer-motion'
import { fadeUp, wipeUp, ease } from '../utils/motion'

export default function FinalSlide() {
  return (
    <div className="film-grain relative w-full h-full flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 scale-105"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=1920&q=80')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e]/98 via-[#160808]/95 to-[#100000]/98" />

      {/* Ambient */}
      <motion.div
        className="absolute w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.07) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/25 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/15 to-transparent" />

      <div className="relative z-10 text-center px-8 max-w-4xl">
        <motion.div {...fadeUp(0.1)} className="flex items-center justify-center gap-4 mb-12">
          <motion.span
            className="block h-px bg-cinema-red/50 origin-right"
            initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          />
          <span className="label">Fin de la presentación</span>
          <motion.span
            className="block h-px bg-cinema-red/50 origin-left"
            initial={{ width: 0 }} animate={{ width: 40 }}
            transition={{ duration: 0.5, delay: 0.15, ease }}
          />
        </motion.div>

        <div className="mb-6">
          <div className="overflow-hidden">
            <motion.h2
              {...wipeUp(0.25)}
              className="text-[clamp(3rem,9vw,7.5rem)] font-black uppercase leading-none text-white"
            >
              Gracias
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              {...wipeUp(0.4)}
              className="text-[clamp(1.5rem,4vw,3rem)] font-black uppercase leading-none text-cinema-red/80"
            >
              por vuestra atención
            </motion.h2>
          </div>
        </div>

        <motion.span
          className="block h-px mx-auto bg-gradient-to-r from-transparent via-cinema-red/30 to-transparent mb-10 origin-center"
          initial={{ scaleX: 0, width: '20rem' }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.7, delay: 0.65, ease }}
          style={{ transformOrigin: 'center' }}
        />

        <motion.p {...fadeUp(0.75)} className="s-body max-w-lg mx-auto mb-12">
          Abrimos turno de preguntas.
        </motion.p>

        <motion.div {...fadeUp(0.85)} className="flex flex-wrap gap-4 justify-center">
          <a
            href="https://github.com/AyChEs-0/lumiere-final"
            target="_blank" rel="noreferrer"
            className="btn-primary"
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
            Volver al inicio
          </button>
        </motion.div>
      </div>
    </div>
  )
}
