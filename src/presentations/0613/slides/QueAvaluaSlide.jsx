import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const pills = [
  'Arquitectura MVC · PHP natiu + Laravel 12',
  'Sistema de rols amb middlewares personalitzats',
  'Flux de compra amb control de concurrència',
  'Integració TMDB + desplegament a Railway',
]

export default function QueAvaluaSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-10">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Mòdul 0613 · Estructura del codi</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Cine Lumière — Visió Tècnica
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <motion.div {...fadeUp(0.3)} className="glass rounded-2xl p-10 flex flex-col justify-center gap-4">
            <p className="text-[17px] text-gray-700 leading-relaxed font-medium">
              Plataforma de gestió de cinema construïda en{' '}
              <span className="text-gray-900 font-black">dues fases</span>:
              PHP natiu per aprendre els fonaments, després migrada a{' '}
              <span className="text-gray-900 font-black">Laravel 12</span>.
            </p>
            <p className="text-[14px] text-gray-400">
              Cartelera · Reserves · Butaques · Rols diferenciats
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.38)} className="glass rounded-2xl p-10 flex flex-col gap-5">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-cinema-red">Que hem implementat</span>
            <motion.div variants={staggerContainer(0.09, 0.4)} initial="initial" animate="animate"
              className="flex flex-col gap-4">
              {pills.map((p) => (
                <motion.div key={p} variants={staggerItem} className="flex items-start gap-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-cinema-red/50 mt-1 shrink-0" />
                  <span className="text-[15px] text-gray-700 leading-snug font-medium">{p}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
