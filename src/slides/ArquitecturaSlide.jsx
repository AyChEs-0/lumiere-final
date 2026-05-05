import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp, drawLine, scaleIn, ease } from '../utils/motion'

export default function ArquitecturaSlide() {
  const [imgError, setImgError] = useState(false)

  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-12">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Visión global del sistema</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Arquitectura General
              </motion.h2>
            </div>
          </div>
          <motion.p {...fadeUp(0.3)} className="s-body text-right hidden md:block max-w-xs">
            Laravel MVC · Docker · Railway<br />MySQL · TMDB · BaconQrCode
          </motion.p>
        </div>

        <motion.div {...scaleIn(0.25)} className="relative group">
          {imgError ? (
            <div className="w-full h-[400px] glass rounded-2xl flex flex-col items-center justify-center gap-4
                            border-2 border-dashed border-cinema-red/20">
              <svg className="w-12 h-12 text-cinema-red/30" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              <p className="text-white/25 text-sm font-mono text-center">
                [ Coloca arquitectura.png en public/images/ ]
              </p>
              <p className="text-white/15 text-[11px] font-mono">public/images/arquitectura.png</p>
            </div>
          ) : (
            <>
              <motion.img
                src="/images/arquitectura.png"
                alt="Diagrama de arquitectura Cine Lumière"
                className="w-full rounded-2xl border border-cinema-red/15 object-contain max-h-[420px]"
                onError={() => setImgError(true)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.4 }}
              />
              {/* Zoom overlay hint */}
              <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/10
                              transition-colors duration-300 flex items-center justify-center">
                <motion.div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                                        glass px-4 py-2 rounded-full flex items-center gap-2">
                  <svg className="w-4 h-4 text-white/60" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                  </svg>
                  <span className="text-[10px] text-white/50 uppercase tracking-[0.15em]">Diagrama de Arquitectura</span>
                </motion.div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
