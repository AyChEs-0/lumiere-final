import { motion } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../../../utils/motion'

const phase1 = [
  'Front Controller: index.php',
  'Routing manual: ?action=afegir',
  'MVC manual: Model + Controlador + Vista',
  'PDO amb Prepared Statements',
  'Patró PRG manual',
  'htmlspecialchars() a cada vista',
]

const phase2 = [
  'Front Controller: public/index.php (automàtic)',
  'Routing declaratiu: web.php',
  'MVC amb Eloquent ORM',
  'PDO gestionat per Laravel',
  'redirect()->with() (PRG automàtic)',
  'Blade {{ }} (escapament automàtic)',
]

export default function PerQuePHPSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Evolució arquitectònica · Setmanes 10–12</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Dues Fases, Una Mateixa Lògica
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch mb-6">
          {/* Phase 1 */}
          <motion.div
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="glass rounded-xl p-6 flex flex-col gap-3"
            style={{ background: 'rgba(8,145,178,0.06)', borderColor: 'rgba(8,145,178,0.2)' }}>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#0891b2]">Fase 1 · PHP Natiu (M0613)</span>
            <div className="flex flex-col gap-2">
              {phase1.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#0891b2]/50 mt-1.5 shrink-0" />
                  <span className="text-[10px] text-white/45 leading-snug font-mono">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.5, ease }}
            className="flex flex-col items-center justify-center gap-2 px-2">
            <svg className="w-8 h-8 text-cinema-red/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-[8px] font-black uppercase tracking-[0.1em] text-cinema-red/50 whitespace-nowrap">MIGRACIÓ</span>
          </motion.div>

          {/* Phase 2 */}
          <motion.div
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="glass rounded-xl p-6 flex flex-col gap-3"
            style={{ background: 'rgba(147,51,234,0.06)', borderColor: 'rgba(147,51,234,0.2)' }}>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#9333ea]">Fase 2 · Laravel 12 (M0616)</span>
            <div className="flex flex-col gap-2">
              {phase2.map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-[#9333ea]/50 mt-1.5 shrink-0" />
                  <span className="text-[10px] text-white/45 leading-snug font-mono">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.p {...fadeUp(0.65)} className="text-center text-[11px] text-white/25 italic">
          El mateix patró, diferent nivell d'abstracció. Conèixer la Fase 1 explica per què existeix la Fase 2.
        </motion.p>

      </div>
    </div>
  )
}
