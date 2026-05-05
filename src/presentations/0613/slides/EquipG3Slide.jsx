import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const members = [
  {
    initials: 'AC',
    name: 'Ayman Charoui',
    color: '#d4183d',
    role: 'Backend Lead · Seguretat',
    contribs: [
      'Router manual + index.php',
      'FormRequests i validació centralitzada',
      'Middleware de rols (TK-017, TK-019)',
      'Tema visual fosc unificat',
    ],
    pills: ['PHP 8.4', 'PDO', 'MVC Manual', 'BCRYPT'],
  },
  {
    initials: 'DG',
    name: 'Danna Guevara',
    color: '#9333ea',
    role: 'Auth · Middleware',
    contribs: [
      'Sistema d\'autenticació sessions',
      'Middleware de rols (TK-015)',
      'SMTP recuperació contrasenya (TK-018)',
      'CRUDs Pel·lícules i Sales',
    ],
    pills: ['Auth PHP', 'Sessions', 'SMTP', 'Docker'],
  },
  {
    initials: 'IA',
    name: 'Ismael Achamrouk',
    color: '#0891b2',
    role: 'Base de dades · Reserves',
    contribs: [
      'Esquema MySQL: 8 taules normalitzades',
      'Bloqueig temporal de butaques (TK-016)',
      'Grid visual de seients interactiu',
      'Seeders de cines, sales i sessions',
    ],
    pills: ['MySQL 8.4', 'PDO', 'Joins', 'Apache'],
  },
]

const stack = ['PHP 8.4', 'MySQL 8.4', 'PDO', 'MVC Manual', 'Docker', 'Apache']

export default function EquipG3Slide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-6">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" style={{ background: '#0891b2' }} />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Equip G3 · Contribucions tècniques</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Qui ha fet que
              </motion.h2>
            </div>
          </div>
        </div>

        <motion.div variants={staggerContainer(0.08, 0.25)} initial="initial" animate="animate"
          className="grid grid-cols-3 gap-4 mb-6">
          {members.map((m) => (
            <motion.div key={m.name} variants={staggerItem}
              className="glass rounded-xl p-5 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                  style={{ background: `${m.color}20`, border: `1px solid ${m.color}35`, color: m.color }}>
                  {m.initials}
                </div>
                <div>
                  <p className="text-[11px] font-black text-white">{m.name}</p>
                  <span className="text-[8px] font-black uppercase tracking-[0.12em]" style={{ color: `${m.color}80` }}>{m.role}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                {m.contribs.map((c) => (
                  <div key={c} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: `${m.color}50` }} />
                    <span className="text-[9.5px] text-white/40 leading-snug">{c}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {m.pills.map((p) => (
                  <span key={p} className="text-[7.5px] font-black uppercase tracking-[0.1em] px-2 py-0.5 rounded-full"
                    style={{ background: `${m.color}12`, color: `${m.color}80`, border: `1px solid ${m.color}20` }}>
                    {p}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.65)} className="glass rounded-xl px-6 py-3 flex items-center justify-between">
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/20">Stack 0613</span>
          <div className="flex gap-2 flex-wrap justify-end">
            {stack.map((t) => (
              <span key={t} className="text-[8px] font-black uppercase tracking-[0.1em] px-2.5 py-1 rounded-full bg-white/5 text-white/35 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
