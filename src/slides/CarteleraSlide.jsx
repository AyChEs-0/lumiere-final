import { motion } from 'framer-motion'
import { useState } from 'react'

const movies = [
  { id: 1, title: 'Película 1', genre: 'Acción',  rating: '8.4', img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80' },
  { id: 2, title: 'Película 2', genre: 'Drama',   rating: '7.9', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80' },
  { id: 3, title: 'Película 3', genre: 'Thriller',rating: '8.7', img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80' },
  { id: 4, title: 'Película 4', genre: 'Sci-Fi',  rating: '9.1', img: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80' },
  { id: 5, title: 'Película 5', genre: 'Romance', rating: '7.5', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80' },
]

const container = {
  animate: { transition: { staggerChildren: 0.09, delayChildren: 0.25 } },
}
const card = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  animate: { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
}

export default function CarteleraSlide() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="w-full h-full flex flex-col justify-center px-12 md:px-20 py-14">
      <div className="w-full max-w-6xl mx-auto">

        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="red-line" />
          <div className="flex items-end justify-between">
            <h2 className="slide-title">Cartelera</h2>
            <span className="slide-label hidden md:block">Sincronizada con API externa</span>
          </div>
        </motion.div>

        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="grid grid-cols-5 gap-4"
        >
          {movies.map((m) => (
            <motion.div
              key={m.id}
              variants={card}
              whileHover={{ y: -8, boxShadow: '0 16px 40px rgba(212,24,61,0.35)' }}
              onHoverStart={() => setHovered(m.id)}
              onHoverEnd={() => setHovered(null)}
              className="glass rounded-xl overflow-hidden cursor-default"
            >
              <div className="relative aspect-[2/3] overflow-hidden">
                <motion.img
                  src={m.img}
                  alt={m.title}
                  className="w-full h-full object-cover"
                  animate={{ scale: hovered === m.id ? 1.08 : 1 }}
                  transition={{ duration: 0.5 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute top-2 right-2 glass rounded-full px-2 py-0.5 flex items-center gap-1">
                  <span className="text-cinema-red text-xs">★</span>
                  <span className="text-white text-[10px] font-black">{m.rating}</span>
                </div>
              </div>
              <div className="p-3">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-cinema-red block">{m.genre}</span>
                <span className="text-xs font-bold text-white">{m.title}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-6 text-xs text-white/25 uppercase tracking-[0.18em]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          Datos obtenidos en tiempo real · Pósters, sinopsis y géneros incluidos
        </motion.p>
      </div>
    </div>
  )
}
