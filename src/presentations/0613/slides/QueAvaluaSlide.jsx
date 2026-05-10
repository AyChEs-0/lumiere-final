import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const pills = [
  'Arquitectura MVC en PHP natiu + Laravel 12',
  'Sistema de rols amb middlewares personalitzats',
  'Flux de compra en 3 passos amb control de concurrència',
  'Integració API externa TMDB amb fallback local',
  'Desplegament en producció a Railway',
]

export default function QueAvaluaSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-8">
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
          <motion.div {...fadeUp(0.3)} className="glass rounded-2xl p-8 flex flex-col justify-center">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-cinema-red block mb-4">Que és</span>
            <p className="text-[14px] text-gray-700 leading-relaxed font-medium">
              Una plataforma web de gestió de cinema construïda en dues fases: primer en{' '}
              <span className="text-gray-900 font-black">PHP natiu</span> per entendre els fonaments,
              després migrada a <span className="text-gray-900 font-black">Laravel 12</span>.
            </p>
            <p className="text-[13px] text-gray-500 leading-relaxed mt-3">
              Gestiona cartelera, reserves, butaques i usuaris amb rols diferenciats.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.38)} className="glass rounded-2xl p-8 flex flex-col gap-4">
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-cinema-red block">Que hem implementat</span>
            <motion.div variants={staggerContainer(0.08, 0.4)} initial="initial" animate="animate"
              className="flex flex-col gap-3">
              {pills.map((p) => (
                <motion.div key={p} variants={staggerItem} className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-cinema-red/50 mt-1.5 shrink-0" />
                  <span className="text-[12px] text-gray-600 leading-snug">{p}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
