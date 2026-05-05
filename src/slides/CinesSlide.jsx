import { motion } from 'framer-motion'

const cines = [
  { name: 'Lumière Central',  location: 'Barcelona, Centro',  salas: 6, butacas: 840, img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80' },
  { name: 'Lumière Diagonal', location: 'Barcelona, Eixample', salas: 4, butacas: 560, img: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&q=80' },
  { name: 'Lumière Gràcia',   location: 'Barcelona, Gràcia',  salas: 3, butacas: 390, img: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=600&q=80' },
]

export default function CinesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 md:px-20 py-14">
      <div className="w-full max-w-6xl mx-auto">

        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="red-line" />
          <div className="flex items-end justify-between">
            <h2 className="slide-title">Nuestros Cines</h2>
            <span className="slide-label hidden md:block">Red gestionada</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {cines.map((cine, i) => (
            <motion.div
              key={cine.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.13, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(212,24,61,0.25)' }}
              className="glass rounded-2xl overflow-hidden group"
            >
              <div className="relative h-40 overflow-hidden">
                <motion.img
                  src={cine.img}
                  alt={cine.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.07 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a] to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-cinema-red text-xs">📍</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/35">{cine.location}</span>
                </div>
                <h3 className="font-black uppercase tracking-[0.08em] text-white text-base mb-4">{cine.name}</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-3xl font-black text-cinema-red">{cine.salas}</div>
                    <div className="text-[9px] uppercase tracking-[0.15em] text-white/35">Salas</div>
                  </div>
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-3xl font-black text-cinema-red">{cine.butacas}</div>
                    <div className="text-[9px] uppercase tracking-[0.15em] text-white/35">Butacas</div>
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
