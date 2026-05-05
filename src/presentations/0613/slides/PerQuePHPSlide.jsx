import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const cards = [
  {
    color: '#0891b2',
    num: '01',
    title: 'Fonaments sense màgia',
    desc: 'PHP natiu obliga a entendre com funciona realment el web: el cicle request/response, la gestió de sessions, la construcció manual de queries. Sense abstracció, sense framework.',
    detail: 'Cada línia de codi té un perquè visible.',
  },
  {
    color: '#9333ea',
    num: '02',
    title: 'Aprendre a depurar de debò',
    desc: 'Sense ORM ni Router automàtic, els errors apareixen exactament on son. Llegir un stack trace de PDO o un error de SQL és una habilitat que els frameworks amaguen.',
    detail: 'Errarem més, aprendrem més ràpid.',
  },
  {
    color: '#16a34a',
    num: '03',
    title: 'Requisit del mòdul 0613',
    desc: 'El currículum del CFGS DAW exigeix demostrar competència en programació servidor sense frameworks. La migració posterior a Laravel valida que entenem allò que automatitza.',
    detail: 'Base → Framework, no a l\'inrevés.',
  },
]

export default function PerQuePHPSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-10">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-8">
          <motion.span {...drawLine(0.05)} className="red-bar" style={{ background: '#0891b2' }} />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Decisió de partida · Setmana 10</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Per que PHP Natiu?
            </motion.h2>
          </div>
        </div>

        <motion.div variants={staggerContainer(0.1, 0.25)} initial="initial" animate="animate"
          className="grid grid-cols-3 gap-5 mb-8">
          {cards.map((c) => (
            <motion.div key={c.num} variants={staggerItem}
              className="glass rounded-xl p-6 flex flex-col gap-4 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-[2.5rem] font-black leading-none select-none"
                style={{ color: `${c.color}08` }}>{c.num}</div>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                style={{ background: `${c.color}15`, border: `1px solid ${c.color}25` }}>
                <span className="text-[10px] font-black" style={{ color: c.color }}>{c.num}</span>
              </div>
              <div>
                <h3 className="text-[12px] font-black text-white mb-2">{c.title}</h3>
                <p className="text-[10px] text-white/40 leading-relaxed mb-3">{c.desc}</p>
                <p className="text-[9px] font-black italic" style={{ color: `${c.color}80` }}>{c.detail}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.65)} className="flex items-center gap-4 justify-center">
          <span className="h-px w-16 bg-white/10" />
          <p className="text-[11px] text-white/30 italic text-center">
            Setmana 12 vam migrar a Laravel — però amb tota la base construida manualment
          </p>
          <span className="h-px w-16 bg-white/10" />
        </motion.div>

      </div>
    </div>
  )
}
