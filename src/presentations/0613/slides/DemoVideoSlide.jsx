import { motion } from 'framer-motion'
import { fadeUp, ease } from '../../../utils/motion'

export default function DemoVideoSlide() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-[8vw] py-8 bg-white">
      <motion.p {...fadeUp(0.05)} className="label mb-3">Resultat final · Producte en producció</motion.p>
      <div className="overflow-hidden mb-6">
        <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="s-title text-center">
          El Producte Final
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease }}
        className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
        style={{ border: '1px solid rgba(0,0,0,0.08)' }}>
        <video
          className="w-full block"
          style={{ maxHeight: '62vh', objectFit: 'cover' }}
          autoPlay
          muted
          loop
          playsInline
          controls>
          <source src="/videos/demovideo.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <motion.p {...fadeUp(0.6)}
        className="mt-4 text-[14px] text-gray-400 italic">
        Desplegat a Railway · PHP 8.4 + Laravel 12 + MySQL 8.4
      </motion.p>
    </div>
  )
}
