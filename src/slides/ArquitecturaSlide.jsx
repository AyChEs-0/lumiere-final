import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp, drawLine, scaleIn, ease } from '../utils/motion'

const pills = [
  'Laravel 12 · PHP 8.4',
  'MySQL 8.4 · Docker',
  'Railway PaaS · HTTPS automàtic',
]

export default function ArquitecturaSlide() {
  const [mediaError, setMediaError] = useState(false)

  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-12">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Visió global del producte</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                El Producte Desplegat
              </motion.h2>
            </div>
          </div>
        </div>

        <motion.div {...scaleIn(0.25)} className="relative group mb-6">
          {mediaError ? (
            <div className="w-full h-[380px] glass rounded-2xl flex flex-col items-center justify-center gap-4
                            border-2 border-dashed border-cinema-red/20">
              <svg className="w-12 h-12 text-cinema-red/30" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5" />
              </svg>
              <p className="text-white/25 text-sm font-mono text-center">[ Coloca arquitectura.mp4 en public/videos/ ]</p>
              <p className="text-white/15 text-[11px] font-mono">public/videos/arquitectura.mp4</p>
            </div>
          ) : (
            <motion.video
              src="/videos/arquitectura.mp4"
              aria-label="Vídeo d'arquitectura Cine Lumière"
              className="w-full rounded-2xl border border-cinema-red/15 object-contain max-h-[400px]"
              controls
              playsInline
              preload="metadata"
              onError={() => setMediaError(true)}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.4 }}
            />
          )}
        </motion.div>

        <motion.div {...fadeUp(0.5)} className="flex items-center justify-center gap-3 mb-5">
          {pills.map((pill) => (
            <span key={pill} className="text-[9px] font-black uppercase tracking-[0.12em] text-white/50
                                        border border-white/10 rounded-full px-4 py-1.5">
              {pill}
            </span>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.65)} className="text-center text-[10px] text-white/20 italic">
          Els detalls tècnics d'implementació s'exposen al mòdul 0613
        </motion.p>

      </div>
    </div>
  )
}
