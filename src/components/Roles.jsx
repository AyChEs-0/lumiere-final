import { motion } from 'framer-motion'

const roles = [
  {
    tag: 'Administrador',
    color: 'from-cinema-red/20 to-cinema-maroon/10',
    border: 'border-cinema-red/30',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    perms: [
      'Gestión completa de usuarios',
      'Configuración de cines y salas',
      'Creación y edición de sesiones',
      'Estadísticas de ocupación',
      'Acceso a todos los módulos',
    ],
  },
  {
    tag: 'Taquilla',
    color: 'from-cinema-maroon/20 to-transparent',
    border: 'border-cinema-maroon/30',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375" />
      </svg>
    ),
    perms: [
      'Gestión de reservas',
      'Venta de entradas presencial',
      'Consulta de disponibilidad',
      'Historial de transacciones',
    ],
  },
  {
    tag: 'Cliente',
    color: 'from-white/5 to-transparent',
    border: 'border-white/10',
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    perms: [
      'Explorar cartelera',
      'Reserva y compra online',
      'Selección de butacas',
      'Historial de entradas',
      'Gestión de perfil',
    ],
  },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
}

export default function Roles() {
  return (
    <section id="roles" className="relative py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="red-line" />
          <h2 className="section-title mb-4">Perfiles de Usuario</h2>
          <p className="text-cinema-muted leading-relaxed">
            Sistema de control de acceso con tres roles diferenciados, cada uno
            con su propio conjunto de permisos y vistas adaptadas a su función.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {roles.map(role => (
            <motion.div
              key={role.tag}
              variants={item}
              whileHover={{ y: -6 }}
              className={`relative glass rounded-2xl p-8 border ${role.border} group overflow-hidden`}
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${role.color} opacity-60 pointer-events-none`} />

              <div className="relative z-10">
                <div className="text-cinema-red mb-5 transition-transform duration-300 group-hover:scale-105 w-fit">
                  {role.icon}
                </div>

                <span className="text-xs font-black uppercase tracking-wide2 text-cinema-red block mb-2">
                  {role.tag}
                </span>

                <ul className="space-y-2 mt-4">
                  {role.perms.map(p => (
                    <li key={p} className="flex items-center gap-3 text-sm text-cinema-muted">
                      <span className="block w-1.5 h-1.5 rounded-full bg-cinema-red shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
