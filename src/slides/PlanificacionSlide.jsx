import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const phases = [
  { weeks: 'Sem. 10–11', title: 'Prototipo PHP nativo',        desc: 'MVC manual con PDO, patrón PRG, XSS con htmlspecialchars. Prueba piloto módulo usuarios.' },
  { weeks: 'Sem. 12',    title: 'Migración Laravel + Docker',  desc: 'Docker Compose, Eloquent, Breeze Auth. Fix DB_CONNECTION hardcoded a sqlite.' },
  { weeks: 'Sem. 13–15', title: 'CRUDs y panel admin',         desc: 'CRUD completo de usuarios, películas, salas y sesiones. Vistas Blade. Fix conflictos merge.' },
  { weeks: 'Sem. 16–19', title: 'Frontend e integración',      desc: 'Tema cinema oscuro. TMDB. Grid visual de butacas. Seeders de cines y salas.' },
  { weeks: 'Sem. 20',    title: 'Tutoría de seguimiento',      desc: 'Detectados: ausencia middleware roles + reservas sin bloqueo temporal. Issues TK-015–019.' },
  { weeks: 'Sem. 22–25', title: 'Checkout, roles y seguridad', desc: 'Dashboard por rol. Precio recalculado en servidor. IsAdmin/CanManage. Fix 404 routes.' },
  { weeks: 'Sem. 26–28', title: 'Arquitectura de servicios',   desc: 'PurchaseService, SeatAvailabilityService, CachedMovieService. SeatLock, 4 roles.' },
  { weeks: 'Sem. 29 · Entrega', title: 'Hardening y despliegue', desc: 'QR firmado. Luhn + E.164. Tabla normalizada. GitLab→GitHub→Railway.' },
]

export default function PlanificacionSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-10">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Metodologia Scrum · Trello</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                8 Fases · 7 Mesos · 38 Tasques
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)}
            className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white/4 leading-none select-none">08</motion.span>
        </div>

        <motion.div variants={staggerContainer(0.05, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-3 mb-6">
          {phases.map((p, i) => (
            <motion.div key={p.weeks} variants={staggerItem}
              className="glass rounded-lg p-4 flex gap-4 relative overflow-hidden">
              <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-lg"
                style={{ background: `hsl(${(i * 35) % 360}, 65%, 55%)`, opacity: 0.4 }} />
              <div className="flex-1 min-w-0">
                <span className="text-[7px] font-black uppercase tracking-[0.16em] text-white/25 block mb-1">{p.weeks}</span>
                <span className="text-[10px] font-black text-white leading-tight block mb-1">{p.title}</span>
                <p className="text-[9px] text-white/35 leading-snug">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.7)} className="flex justify-center">
          <a href="https://trello.com/b/GlRe98Tz/projecte-0616-cine" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.14em] text-cinema-red/70
                       border border-cinema-red/25 rounded-full px-5 py-2 hover:text-cinema-red hover:border-cinema-red/50 transition-colors duration-200">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Tauler Trello actiu →
          </a>
        </motion.div>

      </div>
    </div>
  )
}
