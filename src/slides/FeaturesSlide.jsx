import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const features = [
  {
    num: '01',
    title: 'Reserva Online',
    desc: 'Mapa interactivo de sala con bloqueo temporal de butacas en tiempo real.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Control de Roles',
    desc: 'Tres perfiles diferenciados — Admin, Taquilla y Cliente — con accesos y vistas propias.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Cartelera Dinámica',
    desc: 'Sincronización con API externa para pósters, sinopsis y géneros actualizados.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-3.375c0-.621.504-1.125 1.125-1.125h3.75m3.75 0V6a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0118 6v7.5" />
      </svg>
    ),
  },
  {
    num: '04',
    title: 'Flujo de Compra',
    desc: 'Proceso guiado en 3 pasos con resumen lateral y confirmación visual al finalizar.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
  {
    num: '05',
    title: 'Multi-Cine',
    desc: 'Gestión de múltiples cines y salas con configuración de asientos y sesiones independiente.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    num: '06',
    title: 'Panel de Admin',
    desc: 'Dashboard completo: usuarios, sesiones, estadísticas y ocupación por sala.',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5" />
      </svg>
    ),
  },
]

export default function FeaturesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-16">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p   {...fadeUp(0.05)} className="label mb-3">Módulos del sistema</motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="s-title"
              >
                Funcionalidades
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)} className="text-[clamp(3rem,6vw,5rem)] font-black text-white/4 leading-none select-none">
            06
          </motion.span>
        </div>

        <motion.div
          variants={staggerContainer(0.08, 0.2)}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
        >
          {features.map((f) => (
            <motion.div
              key={f.num}
              variants={staggerItem}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="glass rounded-xl p-5 flex gap-4 group relative overflow-hidden"
            >
              {/* Hover accent */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cinema-red/5 to-transparent opacity-0
                           group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              />

              {/* Number */}
              <span className="shrink-0 text-[10px] font-black text-cinema-red/40 tracking-[0.1em] pt-0.5">{f.num}</span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5 text-cinema-red">
                  {f.icon}
                  <h3 className="text-xs font-black uppercase tracking-[0.1em] text-white">{f.title}</h3>
                </div>
                <p className="text-[11px] text-white/38 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
