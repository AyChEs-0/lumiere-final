import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const roles = [
  {
    tag: 'Administrador',
    accent: 'border-cinema-red/30',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    perms: ['Gestión de usuarios', 'Configuración de cines y salas', 'Crear y editar sesiones', 'Estadísticas de ocupación', 'Acceso a todos los módulos'],
  },
  {
    tag: 'Taquilla',
    accent: 'border-cinema-maroon/30',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
    perms: ['Gestión de reservas', 'Venta de entradas presencial', 'Consulta de disponibilidad', 'Historial de transacciones'],
  },
  {
    tag: 'Cliente',
    accent: 'border-white/10',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0" />
      </svg>
    ),
    perms: ['Explorar cartelera', 'Reserva y compra online', 'Selección de butacas', 'Historial de entradas', 'Gestión de perfil'],
  },
]

export default function RolesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p   {...fadeUp(0.05)} className="label mb-3">3 niveles de acceso</motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="s-title"
              >
                Perfiles de Usuario
              </motion.h2>
            </div>
          </div>
        </div>

        <motion.div
          variants={staggerContainer(0.12, 0.2)}
          initial="initial"
          animate="animate"
          className="grid md:grid-cols-3 gap-5"
        >
          {roles.map((role) => (
            <motion.div
              key={role.tag}
              variants={staggerItem}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className={`glass rounded-2xl p-7 border ${role.accent} flex flex-col gap-5`}
            >
              <div className="text-cinema-red/80">{role.icon}</div>

              <div>
                <span className="label block mb-4">{role.tag}</span>
                <ul className="space-y-2.5">
                  {role.perms.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[11px] text-white/40">
                      <svg className="w-3 h-3 text-cinema-red shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
