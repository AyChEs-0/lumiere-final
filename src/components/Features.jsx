import { motion } from 'framer-motion'
import { useReveal } from '../hooks/useReveal'

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h12A2.25 2.25 0 0120.25 6v12A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: 'Reserva Online',
    desc: 'Sistema completo de selección de butacas con mapa interactivo en tiempo real y bloqueo temporal de asientos.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
      </svg>
    ),
    title: 'Gestión de Roles',
    desc: 'Tres niveles de acceso: Administrador, Taquilla y Cliente, cada uno con permisos y flujos diferenciados.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-3.375c0-.621.504-1.125 1.125-1.125h3.75m3.75 0V6a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0118 6v7.5" />
      </svg>
    ),
    title: 'Cartelera Dinámica',
    desc: 'Integración con API externa para mantener la cartelera actualizada con sinopsis, géneros y pósters en tiempo real.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375" />
      </svg>
    ),
    title: 'Pago Seguro',
    desc: 'Flujo de compra en tres pasos con confirmación visual, historial de entradas y gestión de reservas por usuario.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    title: 'Multi-Cine',
    desc: 'Gestión de múltiples salas y cines con configuración independiente de asientos, sesiones y programación.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0h-18" />
      </svg>
    ),
    title: 'Panel Admin',
    desc: 'Dashboard completo para gestión de usuarios, películas, sesiones y estadísticas de ocupación por sala.',
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function Features() {
  const { ref, inView } = useReveal()

  return (
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <span className="red-line" />
          <h2 className="section-title mb-4">Funcionalidades</h2>
          <p className="text-cinema-muted leading-relaxed">
            Una plataforma completa que cubre todo el ciclo de vida de la experiencia cinematográfica,
            desde la gestión de contenidos hasta el proceso de compra del usuario.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map(f => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="glass rounded-2xl p-8 group cursor-default"
            >
              <div className="text-cinema-red mb-5 transition-transform duration-300 group-hover:scale-110 w-fit">
                {f.icon}
              </div>
              <h3 className="text-lg font-black uppercase tracking-cinema mb-3 text-white">
                {f.title}
              </h3>
              <p className="text-cinema-muted text-sm leading-relaxed">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
