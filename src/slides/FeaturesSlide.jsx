import { motion } from 'framer-motion'

const features = [
  { icon: '🎟', title: 'Reserva Online',    desc: 'Selección de butacas en mapa interactivo con bloqueo temporal en tiempo real.' },
  { icon: '👤', title: 'Roles y Permisos',  desc: 'Admin, Taquilla y Cliente con flujos y vistas completamente diferenciados.' },
  { icon: '🎬', title: 'Cartelera API',     desc: 'Películas sincronizadas con una API externa: pósters, sinopsis y géneros.' },
  { icon: '💳', title: 'Flujo de Compra',   desc: 'Proceso guiado en 3 pasos con confirmación visual y resumen de pedido.' },
  { icon: '🏛', title: 'Multi-Cine',        desc: 'Gestión de múltiples cines y salas con configuración independiente.' },
  { icon: '📊', title: 'Panel Admin',       desc: 'Dashboard completo para sesiones, usuarios y estadísticas de ocupación.' },
]

const container = {
  animate: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
}
const item = {
  initial:  { opacity: 0, y: 24 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

export default function FeaturesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 md:px-20 py-16">
      <div className="w-full max-w-6xl mx-auto">

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="red-line" />
          <div className="flex items-end justify-between">
            <h2 className="slide-title">Funcionalidades</h2>
            <span className="slide-label hidden md:block">6 módulos clave</span>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {features.map(f => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -4, transition: { duration: 0.25 } }}
              className="glass rounded-2xl px-6 py-5 flex flex-col gap-2 group"
            >
              <span className="text-2xl">{f.icon}</span>
              <h3 className="text-sm font-black uppercase tracking-[0.1em] text-white">{f.title}</h3>
              <p  className="text-xs text-white/45 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
