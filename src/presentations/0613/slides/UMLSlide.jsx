import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, wipeUp, ease } from '../../../utils/motion'

function UMLImage() {
  const [err, setErr] = useState(false)

  if (err) {
    return (
      <div className="flex-1 flex items-center justify-center rounded-2xl border-2 border-dashed border-gray-200">
        <div className="text-center">
          <p className="text-[13px] font-black text-gray-400">Coloca la imatge aquí:</p>
          <p className="text-[12px] font-mono text-cinema-red mt-1">public/images/0613/uml.png</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease }}
      className="flex-1 flex items-center justify-center min-h-0">
      <img
        src="/images/0613/uml.png"
        alt="Esquema de la base de dades"
        onError={() => setErr(true)}
        className="max-w-full max-h-full object-contain rounded-xl"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
      />
    </motion.div>
  )
}

export default function UMLSlide() {
  return (
    <div className="w-full h-full flex flex-col px-[8vw] py-8">

      {/* Centered title block */}
      <div className="text-center mb-6 shrink-0">
        <motion.p {...fadeUp(0.05)} className="label mb-3">
          Models Eloquent · 9 taules · Relacions
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '110%' }} animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="s-title">
            Esquema de la Base de Dades
          </motion.h2>
        </div>
      </div>

      {/* Image — centered, fills remaining height */}
      <UMLImage />

    </div>
  )
}
