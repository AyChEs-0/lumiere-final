import { motion } from 'framer-motion'
import { fadeUp, drawLine, scaleIn, ease } from '../utils/motion'

const cines = [
  { name: 'Lumière Central',  loc: 'Barcelona, Centro',  salas: 6, butacas: 840, img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80' },
  { name: 'Lumière Diagonal', loc: 'Barcelona, Eixample', salas: 4, butacas: 560, img: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&q=80' },
  { name: 'Lumière Gràcia',   loc: 'Barcelona, Gràcia',   salas: 3, butacas: 390, img: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=600&q=80' },
]

export default function CinesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p   {...fadeUp(0.05)} className="label mb-3">Red gestionada</motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="s-title"
              >
                Nuestros Cines
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)} className="text-[clamp(2.5rem,5vw,4rem)] font-black text-white/4 leading-none select-none">
            03
          </motion.span>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {cines.map((c, i) => (
            <motion.div
              key={c.name}
              {...scaleIn(0.25 + i * 0.1)}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(212,24,61,0.28)', transition: { duration: 0.25 } }}
              className="glass rounded-2xl overflow-hidden group"
              style={{
                transition: 'box-shadow 0.3s ease',
              }}
            >
              <div className="relative h-36 overflow-hidden">
                <motion.img
                  src={c.img} alt={c.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-1">
                  <svg className="w-3.5 h-3.5 text-cinema-red shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-[9px] uppercase tracking-[0.14em] text-white/35">{c.loc}</span>
                </div>
                <h3 className="font-black uppercase tracking-[0.06em] text-white text-sm mb-4">{c.name}</h3>
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="glass rounded-lg px-3 py-2.5 text-center">
                    <span className="text-2xl font-black text-cinema-red">{c.salas}</span>
                    <span className="text-[8px] uppercase tracking-[0.12em] text-white/30 block mt-0.5">Salas</span>
                  </div>
                  <div className="glass rounded-lg px-3 py-2.5 text-center">
                    <span className="text-2xl font-black text-cinema-red">{c.butacas}</span>
                    <span className="text-[8px] uppercase tracking-[0.12em] text-white/30 block mt-0.5">Butacas</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
