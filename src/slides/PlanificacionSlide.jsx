import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const kanban = ['Backlog', 'To Do', 'Doing', 'Review / Testing', 'Done']

const phases = [
  { weeks: 'Sem. 10–11', title: 'Prototip PHP natiu', desc: 'MVC manual amb PDO, patró PRG, XSS amb htmlspecialchars. Prova pilot mòdul usuaris.' },
  { weeks: 'Sem. 12',    title: 'Migració Laravel + Docker', desc: 'Docker Compose, Eloquent, Breeze Auth. Fix DB_CONNECTION hardcoded a sqlite.' },
  { weeks: 'Sem. 13–15', title: 'CRUDs i panell admin', desc: 'CRUD usuaris/pel·lícules/sales/sessions. Vistes Blade. Fix conflictes merge web.php.' },
  { weeks: 'Sem. 16–19', title: 'Frontend i integració', desc: 'Tema cinema fosc. TMDB. Grid visual butaques. Seeders cines i sales.' },
  { weeks: 'Sem. 20',    title: 'Tutoria de seguiment', desc: 'Detectats: absència middleware rols + reserves sense bloqueig. Issues TK-015–019.' },
  { weeks: 'Sem. 22–25', title: 'Checkout, rols i seguretat', desc: 'Dashboard per rol. Preu recalculat al servidor. IsAdmin/CanManage. Fix 404 routes.' },
  { weeks: 'Sem. 26–28', title: 'Arquitectura de serveis', desc: 'PurchaseService, SeatAvailabilityService, CachedMovieService. SeatLock TTL, 4 rols.' },
  { weeks: 'Sem. 29 · Entrega', title: 'Hardening i desplegament', desc: 'QR HMAC-SHA256. Luhn + E.164. CSV→taula normalitzada. GitLab→GitHub→Railway.' },
]

const incidents = [
  { week: 'Sem. 12',    title: 'DB_CONNECTION sqlite', problem: 'config/database.php tenia el driver fixat a sqlite ignorant el .env.', solution: "env('DB_CONNECTION', 'mysql') com a valor per defecte." },
  { week: 'Sem. 21',    title: 'Middleware de rols absent', problem: 'Un client podia accedir a rutes d\'admin forçant la URL.', solution: 'IsAdmin i CanManage als grups de rutes. Verificació ENUM rol.' },
  { week: 'Sem. 22–25', title: 'Conflicte rutes wildcard', problem: '/peliculas/create interpretada com show({id}), retornava 404.', solution: 'Reordenar web.php: isAdmin abans auth, específiques abans Resource.' },
  { week: 'Sem. 26–28', title: 'Race conditions butaques', problem: 'Dos usuaris podien seleccionar la mateixa butaca simultàniament.', solution: 'SeatLock expires_at + lockForUpdate dins DB::transaction. AJAX real-time.' },
  { week: 'Sem. 26–28', title: 'Dades duplicades d\'esquema', problem: 'Canvis al model generaven registres duplicats i dades òrfenes.', solution: 'Migracions neteja. Índexs únics (nombre, ciudad). Excepcions personalitzades.' },
]

const sprintTasks = [
  { id: 'TK-033', desc: 'PurchaseService, SeatAvailabilityService, CachedMovieService',     who: 'Ayman',    dates: '07–10/04' },
  { id: 'TK-034', desc: 'SeatLock amb bloqueig temporal i ReservaSeat normalitzada',         who: 'Ismael',   dates: '08–12/04' },
  { id: 'TK-035', desc: 'Integració avançada TMDB · sync automàtica · gestió pòsters',      who: 'Danna',    dates: '09–11/04' },
  { id: 'TK-036', desc: 'Guest checkout i sistema de 4 rols d\'usuari',                      who: 'En equip', dates: '10–14/04' },
  { id: 'TK-037', desc: 'Tests d\'integració flux de compra i concurrència',                 who: 'Ismael',   dates: '13–16/04' },
  { id: 'TK-038', desc: 'Documentació i informes finals',                                    who: 'Danna',    dates: '15–18/04' },
]

const whoColor = { Ayman: '#d4183d', Ismael: '#0891b2', Danna: '#9333ea', 'En equip': '#f97316' }

export default function PlanificacionSlide() {
  return (
    <div className="w-full h-full flex flex-col px-[8vw] py-10 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto flex flex-col h-full gap-5">

        {/* Header */}
        <div className="flex items-end justify-between shrink-0">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Metodologia Scrum · Trello</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Planificació i Seguiment
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)}
            className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white/4 leading-none select-none">08</motion.span>
        </div>

        {/* Row 1: Kanban columns + Trello link */}
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
            <span className="text-[8px] text-white/25 uppercase tracking-[0.12em]">WIP limit · 2 tasques/persona</span>
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

        {/* Row 2: Timeline 2×4 + Incidents */}
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
                  className="glass rounded-lg p-3 flex flex-col gap-1 group relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] rounded-l-lg"
                    style={{ background: `hsl(${(i * 35) % 360}, 65%, 55%)`, opacity: 0.4 }} />
                  <span className="text-[7px] font-black uppercase tracking-[0.14em] text-white/25">{p.weeks}</span>
                  <span className="text-[9px] font-black text-white leading-tight">{p.title}</span>
                  <p className="text-[8px] text-white/35 leading-snug">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right col: Incidents + Sprint table */}
          <div className="flex flex-col gap-3 min-h-0 overflow-hidden">

            {/* Incidents */}
            <div className="flex flex-col gap-1.5">
              <motion.p {...fadeUp(0.35)} className="text-[8px] font-black uppercase tracking-[0.2em] text-white/25 shrink-0">
                Incidències resoltes
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
                      <span className="text-[7px] font-black uppercase tracking-[0.08em] text-cinema-red/50 block mb-0.5">Solució</span>
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
                      <th className="text-left px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/20">Tasca</th>
                      <th className="text-left px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/20">Descripció</th>
                      <th className="text-left px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/20">Responsable</th>
                      <th className="text-left px-3 py-1.5 text-[7px] font-black uppercase tracking-[0.14em] text-white/20">Data</th>
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
