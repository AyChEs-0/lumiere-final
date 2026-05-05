import { motion } from 'framer-motion'

const roles = [
  {
    tag: 'Administrador',
    accent: 'border-cinema-red/40',
    glow: '0 0 40px rgba(212,24,61,0.15)',
    icon: '🛡',
    perms: ['Gestión de usuarios', 'Configuración de cines y salas', 'Crear y editar sesiones', 'Estadísticas de ocupación', 'Acceso total al sistema'],
  },
  {
    tag: 'Taquilla',
    accent: 'border-cinema-maroon/40',
    glow: '0 0 40px rgba(128,0,0,0.15)',
    icon: '🎫',
    perms: ['Gestión de reservas', 'Venta presencial de entradas', 'Consulta de disponibilidad', 'Historial de transacciones'],
  },
  {
    tag: 'Cliente',
    accent: 'border-white/10',
    glow: 'none',
    icon: '🎬',
    perms: ['Explorar cartelera', 'Reserva y compra online', 'Selección de butacas', 'Historial de entradas', 'Gestión de perfil'],
  },
]

export default function RolesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 md:px-20 py-14">
      <div className="w-full max-w-6xl mx-auto">

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="red-line" />
          <div className="flex items-end justify-between">
            <h2 className="slide-title">Perfiles de Usuario</h2>
            <span className="slide-label hidden md:block">3 niveles de acceso</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.tag}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.13, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -5, boxShadow: role.glow }}
              className={`glass rounded-2xl p-8 border ${role.accent} flex flex-col gap-4`}
            >
              <div>
                <span className="text-3xl">{role.icon}</span>
              </div>
              <span className="slide-label">{role.tag}</span>
              <ul className="space-y-2 mt-1">
                {role.perms.map(p => (
                  <li key={p} className="flex items-center gap-2.5 text-xs text-white/45">
                    <span className="w-1 h-1 rounded-full bg-cinema-red shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
