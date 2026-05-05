import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const kanban = ['Backlog', 'To Do', 'Doing', 'Review / Testing', 'Done']

const phases = [
  { weeks: 'Sem. 10–11', title: 'Prototipo PHP nativo',        desc: 'MVC manual con PDO, patrón PRG, XSS con htmlspecialchars. Prueba piloto módulo usuarios.' },
  { weeks: 'Sem. 12',    title: 'Migración Laravel + Docker',  desc: 'Docker Compose, Eloquent, Breeze Auth. Fix DB_CONNECTION hardcoded a sqlite.' },
  { weeks: 'Sem. 13–15', title: 'CRUDs y panel admin',         desc: 'CRUD completo de usuarios, películas, salas y sesiones. Vistas Blade. Fix conflictos merge web.php.' },
  { weeks: 'Sem. 16–19', title: 'Frontend e integración',      desc: 'Tema cinema oscuro. TMDB. Grid visual de butacas. Seeders de cines y salas.' },
  { weeks: 'Sem. 20',    title: 'Tutoría de seguimiento',      desc: 'Detectados: ausencia middleware roles + reservas sin bloqueo temporal. Issues TK-015–019.' },
  { weeks: 'Sem. 22–25', title: 'Checkout, roles y seguridad', desc: 'Dashboard por rol. Precio recalculado en servidor. IsAdmin/CanManage. Fix 404 routes.' },
  { weeks: 'Sem. 26–28', title: 'Arquitectura de servicios',   desc: 'PurchaseService, SeatAvailabilityService, CachedMovieService. SeatLock TTL, 4 roles.' },
  { weeks: 'Sem. 29 · Entrega', title: 'Hardening y despliegue', desc: 'QR HMAC-SHA256. Luhn + E.164. CSV→tabla normalizada. GitLab→GitHub→Railway.' },
]

const incidents = [
  { week: 'Sem. 12',    title: 'DB_CONNECTION sqlite',          problem: 'config/database.php tenía el driver fijado a sqlite ignorando el .env.', solution: "env('DB_CONNECTION', 'mysql') como valor por defecto." },
  { week: 'Sem. 21',    title: 'Middleware de roles ausente',   problem: 'Un cliente podía acceder a rutas de admin forzando la URL.', solution: 'IsAdmin y CanManage en los grupos de rutas. Verificación ENUM rol en cada petición.' },
  { week: 'Sem. 22–25', title: 'Conflicto rutas wildcard',      problem: '/peliculas/create interpretada como show({id}), retornaba 404.', solution: 'Reordenar web.php: isAdmin antes de auth, rutas específicas antes de Route::resource.' },
  { week: 'Sem. 26–28', title: 'Race conditions en butacas',    problem: 'Dos usuarios podían seleccionar la misma butaca simultáneamente.', solution: 'SeatLock expires_at + lockForUpdate dentro de DB::transaction. AJAX en tiempo real.' },
  { week: 'Sem. 26–28', title: 'Datos duplicados de esquema',   problem: 'Cambios al modelo generaban registros duplicados y datos huérfanos en BD.', solution: 'Migraciones de limpieza. Índices únicos (nombre, ciudad). Excepciones personalizadas.' },
]

const sprintTasks = [
  { id: 'TK-033', desc: 'PurchaseService, SeatAvailabilityService, CachedMovieService',  who: 'Ayman',    dates: '07–10/04' },
  { id: 'TK-034', desc: 'Sistema SeatLock con bloqueo temporal y ReservaSeat normalizada', who: 'Ismael',   dates: '08–12/04' },
  { id: 'TK-035', desc: 'Integración avanzada TMDB con sync automática y gestión de pósters', who: 'Danna', dates: '09–11/04' },
  { id: 'TK-036', desc: 'Guest checkout y sistema de 4 roles de usuario',                 who: 'En equipo', dates: '10–14/04' },
  { id: 'TK-037', desc: 'Tests de integración para flujo de compra y concurrencia',       who: 'Ismael',   dates: '13–16/04' },
  { id: 'TK-038', desc: 'Documentación e informes finales',                               who: 'Danna',    dates: '15–18/04' },
]

const whoColor = { Ayman: '#d4183d', Ismael: '#0891b2', Danna: '#9333ea', 'En equipo': '#f97316' }

export default function PlanificacionSlide() {
  return (
    <div className="w-full h-full flex flex-col px-[8vw] py-10 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full gap-5">

        {/* Header */}
        <div className="flex items-end justify-between shrink-0">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Metodología Scrum · Trello</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Planificación y Seguimiento
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)}
            className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white/4 leading-none select-none">08</motion.span>
        </div>

        {/* Kanban row */}
        <motion.div {...fadeUp(0.25)} className="glass rounded-xl px-5 py-3 flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-1.5 flex-1 flex-wrap">
            {kanban.map((col, i) => (
              <div key={col} className="flex items-center gap-1.5">
                <span className={`text-[9px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full
                  ${col === 'Done' ? 'bg-cinema-red/15 text-cinema-red' : 'bg-white/5 text-white/45'}`}>
                  {col}
                </span>
                {i < kanban.length - 1 && (
                  <svg className="w-3 h-3 text-white/15 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-[8px] text-white/25 uppercase tracking-[0.12em]">Límite WIP · 2 tareas/persona</span>
            <a href="https://trello.com/b/GlRe98Tz/projecte-0616-cine" target="_blank" rel="noreferrer"
              className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.1em] text-cinema-red/70
                         border border-cinema-red/25 rounded-full px-3 py-1 hover:text-cinema-red hover:border-cinema-red/50 transition-colors duration-200">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 13v10h-6v-6h-4v6H5V13H2L12 3l10 10z" />
              </svg>
              Ver tablero Trello
              <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </motion.div>

        {/* Timeline + Incidents & Sprint table */}
        <div className="grid grid-cols-[1fr_1fr] gap-4 flex-1 min-h-0">

          {/* Timeline */}
          <div className="flex flex-col gap-2 min-h-0">
            <motion.p {...fadeUp(0.3)} className="text-[8px] font-black uppercase tracking-[0.2em] text-white/25 shrink-0">
              Timeline · 8 fases
            </motion.p>
            <motion.div variants={staggerContainer(0.05, 0.3)} initial="initial" animate="animate"
              className="grid grid-cols-2 gap-2 content-start">
              {phases.map((p, i) => (
                <motion.div key={p.weeks} variants={staggerItem}
                  className="glass rounded-lg p-3 flex flex-col gap-1 relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-lg"
                    style={{ background: `hsl(${(i * 35) % 360}, 65%, 55%)`, opacity: 0.4 }} />
                  <span className="text-[7px] font-black uppercase tracking-[0.14em] text-white/25">{p.weeks}</span>
                  <span className="text-[9px] font-black text-white leading-tight">{p.title}</span>
                  <p className="text-[8px] text-white/35 leading-snug">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Incidents + Sprint table */}
          <div className="flex flex-col gap-3 min-h-0 overflow-hidden">

            {/* Incidents */}
            <div className="flex flex-col gap-1.5">
              <motion.p {...fadeUp(0.35)} className="text-[8px] font-black uppercase tracking-[0.2em] text-white/25 shrink-0">
                Incidencias resueltas
              </motion.p>
              <motion.div variants={staggerContainer(0.06, 0.35)} initial="initial" animate="animate"
                className="flex flex-col gap-1.5">
                {incidents.map((inc) => (
                  <motion.div key={inc.title} variants={staggerItem}
                    className="glass rounded-lg px-3 py-2 grid grid-cols-[auto_1fr_1fr] gap-x-3 items-start">
                    <span className="text-[7px] font-black uppercase tracking-[0.1em] text-white/20 pt-px shrink-0">{inc.week}</span>
                    <div>
                      <span className="text-[8px] font-black text-white/70 block leading-tight">{inc.title}</span>
                      <span className="text-[7px] text-white/30 leading-snug">{inc.problem}</span>
                    </div>
                    <div>
                      <span className="text-[7px] font-black uppercase tracking-[0.08em] text-cinema-red/50 block mb-0.5">Solución</span>
                      <span className="text-[7px] text-white/40 leading-snug">{inc.solution}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Sprint final table */}
            <div className="flex flex-col gap-1.5 flex-1">
              <motion.p {...fadeUp(0.5)} className="text-[8px] font-black uppercase tracking-[0.2em] text-white/25 shrink-0">
                Sprint final
              </motion.p>
              <motion.div {...fadeUp(0.55)} className="glass rounded-lg overflow-hidden">
                <table className="w-full text-[8px]">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/20">Tarea</th>
                      <th className="text-left px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/20">Descripción</th>
                      <th className="text-left px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/20">Responsable</th>
                      <th className="text-left px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/20">Fecha</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sprintTasks.map((t, i) => (
                      <tr key={t.id} className={i % 2 === 0 ? 'bg-white/[0.02]' : ''}>
                        <td className="px-3 py-1.5 font-black text-cinema-red/60 whitespace-nowrap">{t.id}</td>
                        <td className="px-3 py-1.5 text-white/45 leading-snug">{t.desc}</td>
                        <td className="px-3 py-1.5 font-black whitespace-nowrap"
                          style={{ color: whoColor[t.who] ?? 'white' }}>{t.who}</td>
                        <td className="px-3 py-1.5 text-white/30 whitespace-nowrap">{t.dates}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
