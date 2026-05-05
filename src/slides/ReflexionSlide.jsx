import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const encerts = [
  "Documentar les decisions en el moment en què es prenien va fer que la memòria reflectís el procés real, no una versió idealment reconstruïda",
  "La tutoria de seguiment, tot i ser incòmoda, va ser el punt d'inflexió que va millorar la qualitat del producte final",
  "Separar responsabilitats clares des del principi va evitar duplicació de feina i va facilitar la resolució de conflictes",
  "El tauler Trello com a eina de comunicació passiva va reduir la necessitat de reunions innecessàries",
]

const millores = [
  "Hauríem connectat cada commit de Git a una issue de Trello des del primer dia, no a partir de la setmana 21",
  "La seguretat s'hauria d'haver planificat com a requisit des del disseny, no com a correcció a mitja execució",
  "Hauríem fet retrospectives setmanals formals des de l'inici per detectar problemes de gestió més aviat",
  "La documentació final va ser molt extensa per acumular-se — amb metodologia incremental s'hauria distribuït millor",
]

export default function ReflexionSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-12">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-8">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">No de programar — de gestionar</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Aprenentatges de Gestió
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Encerts */}
          <motion.div {...fadeUp(0.25)} className="glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-green-500/40 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-green-500/80">Encerts</span>
            </div>
            <motion.ul variants={staggerContainer(0.08, 0.3)} initial="initial" animate="animate"
              className="flex flex-col gap-3">
              {encerts.map((e) => (
                <motion.li key={e} variants={staggerItem}
                  className="flex items-start gap-2.5 text-[11px] text-white/42 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-green-500/50 shrink-0 mt-1.5" />{e}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Milloraríem */}
          <motion.div {...fadeUp(0.35)} className="glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-orange-500/40 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500/80">Milloraríem</span>
            </div>
            <motion.ul variants={staggerContainer(0.08, 0.35)} initial="initial" animate="animate"
              className="flex flex-col gap-3">
              {millores.map((m) => (
                <motion.li key={m} variants={staggerItem}
                  className="flex items-start gap-2.5 text-[11px] text-white/42 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-orange-500/50 shrink-0 mt-1.5" />{m}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
