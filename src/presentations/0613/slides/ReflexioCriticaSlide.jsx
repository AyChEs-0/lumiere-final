import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const encerts = [
  'Serveis separats del controlador → codi llegible i testejable',
  'Docker des del primer dia → entorn idèntic pels 3 membres',
  'Fallback TMDB → BD local → cap punt únic de fallada',
  'Eloquent ORM → zero SQL manual, relacions explícites',
]

const millores = [
  'Middleware de rols a la setmana 13, no a la 21 — la seguretat no és opcional',
  'Tests des del principi, no al final — els tests van descobrir inconsistències',
  'CSV de butaques va ser deute tècnic — dissenyar bé des del principi',
  'Factories amb noms de columna incorrectes des de la fase PHP',
]

export default function ReflexioCriticaSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-10">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-8">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Reflexió crítica</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Que hem Après
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <motion.div {...fadeUp(0.3)} className="glass rounded-2xl p-8 flex flex-col gap-5"
            style={{ borderTop: '4px solid #16a34a' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#16a34a]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[#16a34a]">Que va funcionar</span>
            </div>
            <motion.ul variants={staggerContainer(0.1, 0.35)} initial="initial" animate="animate"
              className="flex flex-col gap-4">
              {encerts.map((e) => (
                <motion.li key={e} variants={staggerItem}
                  className="flex items-start gap-3 text-[14px] text-gray-600 leading-relaxed">
                  <svg className="w-4 h-4 text-[#16a34a]/70 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {e}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div {...fadeUp(0.38)} className="glass rounded-2xl p-8 flex flex-col gap-5"
            style={{ borderTop: '4px solid #d97706' }}>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#d97706]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
              <span className="text-[12px] font-black uppercase tracking-[0.18em] text-[#d97706]">Que millorariem</span>
            </div>
            <motion.ul variants={staggerContainer(0.1, 0.4)} initial="initial" animate="animate"
              className="flex flex-col gap-4">
              {millores.map((m) => (
                <motion.li key={m} variants={staggerItem}
                  className="flex items-start gap-3 text-[14px] text-gray-600 leading-relaxed">
                  <svg className="w-4 h-4 text-[#d97706]/70 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                  {m}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
