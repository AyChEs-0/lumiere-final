import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, ease } from '../../../utils/motion'

function QRImage() {
  const [err, setErr] = useState(false)

  if (err) {
    return (
      <div className="flex items-center justify-center w-64 h-64 rounded-2xl border-2 border-dashed border-gray-200">
        <div className="text-center">
          <p className="text-[13px] font-black text-gray-400">Coloca la imatge aquí:</p>
          <p className="text-[12px] font-mono text-cinema-red mt-1">public/images/0613/qr.png</p>
        </div>
      </div>
    )
  }

  return (
    <motion.img
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease }}
      src="/images/0613/qr.png"
      alt="QR de la app"
      onError={() => setErr(true)}
      className="w-72 h-72 object-contain rounded-2xl"
      style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.10)' }}
    />
  )
}

export default function QRSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-[8vw] py-8 gap-8">

      <div className="text-center">
        <motion.p {...fadeUp(0.05)} className="label mb-3">
          Cine Lumière · En producció
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: '110%' }} animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="s-title">
            Prova la App
          </motion.h2>
        </div>
      </div>

      <QRImage />

      <motion.p {...fadeUp(0.5)} className="text-[16px] text-gray-400 italic">
        Escaneja per accedir a la versió desplegada a Railway
      </motion.p>

    </div>
  )
}
