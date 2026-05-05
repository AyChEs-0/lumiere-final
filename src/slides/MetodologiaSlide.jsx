import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const cols = ['Backlog', 'To Do', 'Doing', 'Review', 'Done']

const cards = [
  {
    num: '01',
    title: 'Git Flow + Trello Kanban',
    color: '#d4183d',
    items: [
      'Branques feature/TK-XXX per cada tasca',
      'Pull Request obligatori per a main',
      'Tauler Kanban: Backlog → Done',
      'WIP Limit de 2 tasques per persona',
    ],
    link: { label: 'Tauler Trello →', url: 'https://trello.com/b/GlRe98Tz/projecte-0616-cine' },
  },
  {
    num: '02',
    title: 'Entorn Docker Compartit',
    color: '#2496ED',
    items: [
      'PHP 8.4 + MySQL 8.4 idèntic pels 3 membres',
      'docker-compose.yml al repositori',
      'Cero problemes de compatibilitat entre equips',
      'Paritat total amb l\'entorn de producció',
    ],
  },
  {
    num: '03',
    title: '82 Commits Traçables',
    color: '#9333ea',
    items: [
      'Cada commit vinculat a una issue TK-XXX',
      'CONTRIBUTING.md documentat al repositori',
      'Missatges de commit seguint Conventional Commits',
      'Historial complet del procés de desenvolupament',
    ],
  },
]

export default function MetodologiaSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-10">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Scrum · Git · Docker</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Com ens Vam Organitzar
              </motion.h2>
            </div>
          </div>
        </div>

        {/* Kanban visual */}
        <motion.div {...fadeUp(0.25)} className="glass rounded-xl px-5 py-3 flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {cols.map((col, i) => (
              <div key={col} className="flex items-center gap-2">
                <span className={`text-[9px] font-black uppercase tracking-[0.12em] px-3 py-1 rounded-full
                  ${col === 'Done' ? 'bg-cinema-red/20 text-cinema-red' : 'bg-white/5 text-white/40'}`}>
                  {col}
                </span>
                {i < cols.length - 1 && (
                  <svg className="w-3 h-3 text-white/15" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <span className="text-[8px] text-white/25 uppercase tracking-[0.14em]">WIP Limit · 2 tasques/persona</span>
        </motion.div>

        <motion.div variants={staggerContainer(0.1, 0.3)} initial="initial" animate="animate"
          className="grid grid-cols-3 gap-5">
          {cards.map((c) => (
            <motion.div key={c.num} variants={staggerItem}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="glass rounded-2xl p-6 flex flex-col gap-5 group relative overflow-hidden">
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${c.color}08, transparent)` }} />

              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-full border flex items-center justify-center"
                  style={{ borderColor: `${c.color}40`, color: c.color }}>
                  <span className="text-[9px] font-black">{c.num}</span>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c.color, boxShadow: `0 0 6px ${c.color}80` }} />
              </div>

              <h3 className="text-sm font-black uppercase tracking-[0.06em] text-white">{c.title}</h3>

              <ul className="flex flex-col gap-2 flex-1">
                {c.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[10px] text-white/40 leading-relaxed">
                    <span className="w-1 h-1 rounded-full shrink-0 mt-1.5" style={{ backgroundColor: c.color }} />
                    {item}
                  </li>
                ))}
              </ul>

              {c.link && (
                <a href={c.link.url} target="_blank" rel="noreferrer"
                  className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.1em] mt-auto"
                  style={{ color: c.color }}>
                  {c.link.label}
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
