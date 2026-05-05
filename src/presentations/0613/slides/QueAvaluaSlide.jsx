import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const groups = [
  {
    color: '#0891b2',
    icon: 'M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z',
    label: 'Arquitectura',
    ras: ['RA1 · Arquitectura d\'aplicacions web en entorn servidor', 'RA2 · Integració amb sistemes de gestió de bases de dades'],
  },
  {
    color: '#d4183d',
    icon: 'M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5',
    label: 'Programació',
    ras: ['RA3 · Programació en PHP: funcions, arrays, formularis', 'RA4 · Programació orientada a objectes en PHP'],
  },
  {
    color: '#9333ea',
    icon: 'M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z',
    label: 'MVC + Seguretat',
    ras: ['RA5 · Desenvolupament d\'aplicacions web amb arquitectura MVC', 'RA6 · Autenticació, autorització i seguretat web (XSS, CSRF, SQL-i)'],
  },
  {
    color: '#16a34a',
    icon: 'M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5l10.5-5.25 10.5 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3',
    label: 'Serveis + Frameworks',
    ras: ['RA7 · Accés a serveis web externs (APIs REST)', 'RA8 · Utilització de frameworks PHP (Laravel)', 'RA9 · Proves, desplegament i manteniment d\'aplicacions'],
  },
]

export default function QueAvaluaSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-10">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" style={{ background: '#0891b2' }} />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Mòdul 0613 · 9 Resultats d'Aprenentatge</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Que Avalua el Mòdul?
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)}
            className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white/4 leading-none select-none">9 RA</motion.span>
        </div>

        <motion.div variants={staggerContainer(0.08, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {groups.map((g) => (
            <motion.div key={g.label} variants={staggerItem}
              className="glass rounded-xl p-5 flex gap-4"
              style={{ borderColor: `${g.color}20` }}>
              <div className="shrink-0 mt-0.5">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: `${g.color}15`, border: `1px solid ${g.color}25` }}>
                  <svg className="w-4 h-4" fill="none" stroke={g.color} strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={g.icon} />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[8px] font-black uppercase tracking-[0.18em] block mb-2" style={{ color: g.color }}>{g.label}</span>
                <div className="flex flex-col gap-1.5">
                  {g.ras.map((ra) => (
                    <div key={ra} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: `${g.color}60` }} />
                      <span className="text-[10px] text-white/45 leading-snug">{ra}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.75)} className="text-center text-[10px] text-white/25 italic mt-6">
          El projecte cobreix els 9 RAs des del codi PHP natiu fins al desplegament a producció amb Laravel
        </motion.p>

      </div>
    </div>
  )
}
