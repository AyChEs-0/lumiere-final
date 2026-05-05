import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image placeholder */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80')`,
        }}
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[rgba(17,17,17,0.7)] to-[rgba(18,0,0,0.5)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#111111]/80 via-transparent to-[#111111]/40" />

      {/* Animated ambient orb */}
      <motion.div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.07) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-start justify-center min-h-screen pb-24 pt-24">
        {/* Badge */}
        <motion.div {...fadeUp(0.2)} className="flex items-center gap-3 mb-8">
          <span className="block w-8 h-px bg-cinema-red" />
          <span className="text-xs font-black uppercase tracking-wide2 text-cinema-red">
            Proyecto de Presentación
          </span>
        </motion.div>

        {/* Title */}
        <motion.div {...fadeUp(0.35)} className="mb-6">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase leading-none">
            <span className="block text-cinema-maroon drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              CINE
            </span>
            <span className="block text-white drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
              LUMIÈRE
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.5)}
          className="max-w-xl text-lg text-white/65 leading-relaxed mb-10"
        >
          Plataforma premium para la gestión y reserva de entradas de cine.
          Experiencia cinematográfica de primer nivel, desde la butaca hasta el pago.
        </motion.p>

        {/* CTAs */}
        <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-4">
          <a href="#features" className="btn-primary">
            Explorar Proyecto
          </a>
          <a href="#cartelera" className="btn-ghost">
            Ver Cartelera
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <span className="text-xs font-bold uppercase tracking-cinema text-white/30">Scroll</span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-cinema-red to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#111111] to-transparent" />
    </section>
  )
}
