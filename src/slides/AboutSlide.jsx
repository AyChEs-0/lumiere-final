import { motion } from 'framer-motion'

const stats = [
  { value: '3',     label: 'Roles de usuario' },
  { value: '∞',     label: 'Sesiones por sala' },
  { value: '100%',  label: 'Online' },
  { value: 'REST',  label: 'API externa' },
]

const up = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] },
})

export default function AboutSlide() {
  return (
    <div className="w-full h-full flex items-center justify-center px-12 md:px-20">
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <motion.span {...up(0.1)} className="red-line" />
          <motion.p   {...up(0.1)} className="slide-label mb-4">¿Qué es?</motion.p>
          <motion.h2  {...up(0.2)} className="slide-title mb-6">
            Gestión cinematográfica completa
          </motion.h2>
          <motion.p   {...up(0.35)} className="slide-body mb-8">
            Cine Lumière es una aplicación web full-stack que permite gestionar cines,
            programar sesiones, ofrecer una cartelera dinámica actualizada desde una API
            externa y procesar la compra de entradas de extremo a extremo.
          </motion.p>
          <motion.p {...up(0.45)} className="slide-body">
            Construida con Laravel + MySQL en el backend y Tailwind CSS en el frontend,
            con autenticación, control de roles y un flujo de compra con bloqueo
            temporal de butacas en tiempo real.
          </motion.p>
        </div>

        {/* Right — stats */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          {stats.map(({ value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
              className="glass rounded-2xl p-8 flex flex-col gap-2"
            >
              <span className="text-5xl font-black text-cinema-red leading-none">{value}</span>
              <span className="text-xs uppercase tracking-[0.15em] text-white/40">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
