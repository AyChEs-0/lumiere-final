import { motion } from 'framer-motion'
import { useState } from 'react'
import { fadeUp, drawLine, ease } from '../utils/motion'

const movies = [
  { id: 1, title: 'Película ES 1', genre: 'Acción',   rating: '8.4', img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80' },
  { id: 2, title: 'Película ES 2', genre: 'Drama',    rating: '7.9', img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80' },
  { id: 3, title: 'Película ES 3', genre: 'Thriller', rating: '8.7', img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80' },
  { id: 4, title: 'Película ES 4', genre: 'Sci-Fi',   rating: '9.1', img: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80' },
  { id: 5, title: 'Película ES 5', genre: 'Comedia',  rating: '7.5', img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80' },
]

export default function CarteleraSlide() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">TMDB · region=ES · Sync cada 6h</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Cartelera Dinámica
              </motion.h2>
            </div>
          </div>
          <motion.p {...fadeUp(0.3)} className="s-body text-right hidden md:block max-w-xs">
            Graceful Degradation:<br />si TMDB cae, sirve datos locales
          </motion.p>
        </div>

        <div className="grid grid-cols-5 gap-4">
          {movies.map((m, i) => (
            <motion.div key={m.id}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.09, ease }}
              whileHover={{ y: -10, transition: { duration: 0.28 } }}
              onHoverStart={() => setHovered(m.id)}
              onHoverEnd={() => setHovered(null)}
              className="glass rounded-xl overflow-hidden cursor-default"
              style={{ boxShadow: hovered === m.id ? '0 16px 40px rgba(212,24,61,0.32)' : 'none', transition: 'box-shadow 0.3s ease' }}>
              <div className="relative overflow-hidden" style={{ aspectRatio: '2/3' }}>
                <motion.img src={m.img} alt={m.title} className="w-full h-full object-cover"
                  animate={{ scale: hovered === m.id ? 1.1 : 1 }} transition={{ duration: 0.5, ease: 'easeOut' }} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 flex items-center gap-1 glass rounded-full px-2 py-0.5">
                  <svg className="w-2.5 h-2.5 fill-cinema-red" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></svg>
                  <span className="text-[10px] font-black text-white">{m.rating}</span>
                </div>
              </div>
              <div className="p-3">
                <span className="text-[9px] font-black uppercase tracking-[0.15em] text-cinema-red block mb-0.5">{m.genre}</span>
                <span className="text-[11px] font-bold text-white">{m.title}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp(1)} className="text-[10px] uppercase tracking-[0.18em] text-white/18 mt-5">
          CachedMovieService · Fallback automático a BD local · Cero errores visibles al usuario
        </motion.p>
      </div>
    </div>
  )
}
