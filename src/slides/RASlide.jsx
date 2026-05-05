import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const ras = [
  {
    badge: 'RA 1 · 49h',
    title: 'Identifica necessitats del sector',
    desc: "Vam analitzar OCine i Yelmo com a referents reals. Detectàrem: gestió fragmentada de programació i reserves, risc de doble reserva sense sistema de bloqueig, i experiència de compra pobra en mòbil. Aquests problemes van definir els 9 Requeriments Funcionals.",
    evidence: 'Benchmarking documentat · RF1–RF9 justificats',
    color: '#d4183d',
  },
  {
    badge: 'RA 2 · 49h',
    title: 'Dissenya el projecte amb totes les fases',
    desc: "Abans de programar: Diagrama Entitat-Relació (9 taules), 7 Casos d'Ús (CU1–CU7), wireframes agnòstics de 5 pantalles i decisió arquitectònica justificada de migrar de PHP natiu a Laravel.",
    evidence: 'MER · Casos d\'ús · Wireframes · Decisions tècniques documentades',
    color: '#9333ea',
  },
  {
    badge: 'RA 3 · 49h',
    title: "Planifica l'execució amb pla d'intervenció",
    desc: "Roadmap de 8 fases (set. 2025 – abr. 2026), tasques TK-001 a TK-038, assignació de responsables, WIP Limit de 2 tasques per persona al tauler Trello, Git Flow amb branques feature/TK-XXX.",
    evidence: 'Trello actiu · 82 commits · CONTRIBUTING.md documentat',
    color: '#0891b2',
  },
  {
    badge: 'RA 4 · 51h',
    title: 'Defineix procediments de seguiment i control',
    desc: "4 informes de seguiment setmanals, tutoria formal el 19/02/2026 amb pla de millora de 5 accions en 5 dies, 3 informes de validació i traçabilitat RF ↔ Issue ↔ Codi.",
    evidence: 'Informes I–IV · Validació II i III · Pla de millora immediat',
    color: '#16a34a',
  },
]

export default function RASlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-10">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Resultats d'Aprenentatge Oficials</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Què Avalua el Mòdul 0616?
              </motion.h2>
            </div>
          </div>
        </div>

        <motion.p {...fadeUp(0.25)} className="text-[11px] text-white/35 mb-8 max-w-2xl leading-relaxed">
          El mòdul 0616 no avalua si saps programar — avalua si saps gestionar un projecte real de principi a fi.
          Aquí com el nostre projecte cobreix cadascun dels 4 RAs oficials.
        </motion.p>

        <motion.div variants={staggerContainer(0.1, 0.25)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {ras.map((ra) => (
            <motion.div key={ra.badge} variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-6 flex flex-col gap-4 group relative overflow-hidden">
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${ra.color}08, transparent)` }} />

              <div className="flex items-start justify-between gap-4">
                <span className="text-[9px] font-black uppercase tracking-[0.18em] px-2.5 py-1 rounded-full"
                  style={{ background: `${ra.color}20`, color: ra.color, border: `1px solid ${ra.color}35` }}>
                  {ra.badge}
                </span>
              </div>

              <h3 className="text-sm font-black uppercase tracking-[0.06em] text-white leading-snug">{ra.title}</h3>
              <p className="text-[11px] text-white/42 leading-relaxed flex-1">{ra.desc}</p>

              <div className="flex items-center gap-2 mt-auto">
                <svg className="w-3 h-3 shrink-0" style={{ color: ra.color }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-[9px] text-white/35 leading-tight">{ra.evidence}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
