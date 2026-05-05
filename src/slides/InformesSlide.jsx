import { motion } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../utils/motion'

const informes = [
  {
    badge: 'VERD',
    badgeColor: '#16a34a',
    week: 'Setmana 12 · Informe I',
    title: 'Tancament PHP natiu. Inici Laravel.',
    state: 'MVC manual complet amb PDO, patró PRG i seguretat XSS. Migració iniciada a Laravel amb primeres migracions Eloquent.',
    decision: 'Confirmar la migració a Laravel: Eloquent ORM elimina el SQL manual i les migracions versionen l\'esquema.',
    glow: false,
  },
  {
    badge: 'GROC',
    badgeColor: '#d97706',
    week: 'Setmanes 16–19 · Informe II',
    title: 'CRUDs operatius. Conflictes resolts.',
    state: 'Mòduls Pel·lícules, Sales i Sessions funcionant. Conflictes de merge en web.php i User.php resolts manualment.',
    decision: 'Unificació visual del tema fosc assignada a Ayman com a responsable únic de coherència UI per evitar dispersió d\'estils.',
    glow: false,
  },
  {
    badge: 'ALERTA',
    badgeColor: '#d4183d',
    week: 'Setmana 21 · Informe III + Tutoria',
    title: '⚠ Mancances crítiques detectades.',
    state: 'Tutoria 19/02/2026: absència de middleware de rols, reserves sense bloqueig temporal, validacions disperses.',
    decision: 'Pla de millora immediat: 5 accions en 5 dies. TK-015 a TK-019 creades i assignades en 24 hores.',
    glow: true,
  },
  {
    badge: 'BLAU',
    badgeColor: '#0891b2',
    week: 'Setmanes 26–28 · Informe IV',
    title: 'Arquitectura completada. Desplegament.',
    state: 'Sistema de reserves operatiu, integració TMDB completada, tests d\'integració passats, migració a Railway feta.',
    decision: 'Migració GitLab → GitHub privat per habilitar CI/CD automàtic amb Railway. Producte desplegat i verificat.',
    glow: false,
  },
]

export default function InformesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-10">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-6">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Evidències documentals</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                4 Informes. 1 Tutoria. Cap Sorpresa al Final.
              </motion.h2>
            </div>
          </div>
        </div>

        <motion.p {...fadeUp(0.25)} className="text-[11px] text-white/30 mb-8 italic">
          Escrits durant el procés, no al final
        </motion.p>

        <div className="flex flex-col gap-4">
          {informes.map((inf, i) => (
            <motion.div key={inf.week}
              initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12, ease }}
              className="relative"
              style={inf.glow ? { filter: 'drop-shadow(0 0 12px rgba(212,24,61,0.25))' } : {}}>
              <div className={`glass rounded-xl p-5 grid grid-cols-[auto_1fr_1fr] gap-x-6 items-start
                ${inf.glow ? 'border border-cinema-red/30' : ''}`}>

                {/* Badge */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] px-2.5 py-1 rounded-full whitespace-nowrap"
                    style={{ background: `${inf.badgeColor}20`, color: inf.badgeColor, border: `1px solid ${inf.badgeColor}35` }}>
                    {inf.badge}
                  </span>
                  {i < informes.length - 1 && (
                    <div className="w-px flex-1 min-h-[16px]" style={{ background: `${inf.badgeColor}30` }} />
                  )}
                </div>

                {/* State */}
                <div>
                  <span className="text-[8px] font-black uppercase tracking-[0.14em] text-white/20 block mb-1">{inf.week}</span>
                  <p className="text-[11px] font-black text-white mb-2">{inf.title}</p>
                  <p className="text-[10px] text-white/38 leading-relaxed">{inf.state}</p>
                </div>

                {/* Decision */}
                <div>
                  <span className="text-[8px] font-black uppercase tracking-[0.14em] text-cinema-red/50 block mb-1">Decisió clau</span>
                  <p className="text-[10px] text-white/42 leading-relaxed">{inf.decision}</p>
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
