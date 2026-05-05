import { motion } from 'framer-motion'

export default function CTAFinal() {
  return (
    <section id="cta" className="relative py-40 px-6 overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.08) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/30 to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="block w-12 h-1 bg-cinema-red rounded-full mx-auto mb-8" />

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase leading-none mb-6">
            <span className="text-cinema-maroon">LUCES,</span>{' '}
            <span className="text-white">CÁMARA,</span>{' '}
            <span className="bg-gradient-to-r from-cinema-red to-cinema-maroon bg-clip-text text-transparent">
              ACCIÓN
            </span>
          </h2>

          <p className="text-cinema-muted text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Cine Lumière es un proyecto full-stack desarrollado con Laravel, MySQL y Tailwind CSS.
            Desde la gestión de sesiones hasta la compra de entradas, todo en una sola plataforma.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <motion.a
              href="https://github.com"
              whileHover={{ scale: 1.04, boxShadow: '0 4px 30px rgba(212,24,61,0.4)' }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              Ver Repositorio
            </motion.a>
            <motion.a
              href="#hero"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost flex items-center gap-2 text-sm"
            >
              ↑ Volver al inicio
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-xs text-white/20 uppercase tracking-cinema">
          CINE <span className="text-cinema-red/40">LUMIÈRE</span> — Proyecto de Presentación
        </p>
      </motion.div>
    </section>
  )
}
