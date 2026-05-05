import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const pills = [
  'Arquitectura MVC en PHP natiu + Laravel 12',
  'Sistema de rols amb middlewares personalitzats',
  'Flux de compra en 3 passos amb control de concurrència',
  'Integració API externa TMDB',
  'Desplegament en producció a Railway',
]

function ArchImage() {
  const [err, setErr] = useState(false)
  if (err) {
    return (
      <div className="w-full h-[200px] flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.02]">
        <span className="text-[10px] text-white/20 italic">Coloca arquitectura.png en public/images/0613/</span>
      </div>
    )
  }
  return (
    <img src="/images/0613/arquitectura.png" alt="Arquitectura del projecte"
      onError={() => setErr(true)}
      className="w-full rounded-xl object-contain"
      style={{ height: '200px', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }} />
  )
}

export default function QueAvaluaSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Mòdul 0613 · Estructura del codi</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Cine Lumière — Visió Tècnica
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-5">
          {/* Left */}
          <motion.div {...fadeUp(0.3)} className="glass rounded-xl p-6 flex flex-col gap-3">
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-cinema-red/70 block">Què és</span>
            <p className="text-[11px] text-white/50 leading-relaxed">
              Una plataforma web de gestió de cinema construïda en dues fases: primer en PHP natiu per entendre els fonaments,
              després migrada a Laravel 12. El sistema gestiona cartelera, reserves, butaques i usuaris amb rols diferenciats.
            </p>
          </motion.div>

          {/* Right */}
          <motion.div {...fadeUp(0.38)} className="glass rounded-xl p-6 flex flex-col gap-3">
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-cinema-red/70 block">Què hem implementat</span>
            <motion.div variants={staggerContainer(0.07, 0.4)} initial="initial" animate="animate"
              className="flex flex-col gap-2">
              {pills.map((p) => (
                <motion.div key={p} variants={staggerItem}
                  className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cinema-red/50 mt-1.5 shrink-0" />
                  <span className="text-[10px] text-white/55 leading-snug">{p}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.6)}>
          <ArchImage />
        </motion.div>

      </div>
    </div>
  )
}
