import { motion } from 'framer-motion'
import { useState } from 'react'

const movies = [
  {
    id: 1,
    title: 'Película 1',
    genre: 'Acción',
    duration: '128 min',
    rating: '8.4',
    img: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80',
  },
  {
    id: 2,
    title: 'Película 2',
    genre: 'Drama',
    duration: '112 min',
    rating: '7.9',
    img: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=400&q=80',
  },
  {
    id: 3,
    title: 'Película 3',
    genre: 'Thriller',
    duration: '135 min',
    rating: '8.7',
    img: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80',
  },
  {
    id: 4,
    title: 'Película 4',
    genre: 'Sci-Fi',
    duration: '149 min',
    rating: '9.1',
    img: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80',
  },
  {
    id: 5,
    title: 'Película 5',
    genre: 'Romance',
    duration: '98 min',
    rating: '7.5',
    img: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&q=80',
  },
  {
    id: 6,
    title: 'Película 6',
    genre: 'Comedia',
    duration: '105 min',
    rating: '7.2',
    img: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&q=80',
  },
]

function MovieCard({ movie, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(212,24,61,0.35)' }}
      className="relative rounded-2xl overflow-hidden cursor-pointer group glass"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <motion.img
          src={movie.img}
          alt={movie.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

        {/* Rating badge */}
        <div className="absolute top-3 right-3 glass px-2.5 py-1 rounded-full flex items-center gap-1">
          <svg className="w-3 h-3 text-cinema-red fill-cinema-red" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs font-black text-white">{movie.rating}</span>
        </div>

        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass rounded-xl p-3 mb-2">
            <p className="text-xs text-cinema-muted mb-1 uppercase tracking-cinema">{movie.genre} · {movie.duration}</p>
            <button className="w-full btn-primary text-xs py-2">
              Comprar Entradas
            </button>
          </div>
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-4">
        <span className="text-xs font-black uppercase tracking-cinema text-cinema-red block mb-1">
          {movie.genre}
        </span>
        <h3 className="font-bold text-white text-base leading-tight">{movie.title}</h3>
        <p className="text-xs text-cinema-muted mt-1">{movie.duration}</p>
      </div>
    </motion.div>
  )
}

export default function Cartelera() {
  return (
    <section id="cartelera" className="relative py-32 px-6">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(212,24,61,0.04) 0%, transparent 70%)' }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div>
            <span className="red-line" />
            <h2 className="section-title mb-4">Cartelera</h2>
            <p className="text-cinema-muted max-w-lg leading-relaxed">
              Visualización de la cartelera en tiempo real con datos obtenidos desde la API externa.
              Cada película incluye sinopsis, géneros, duración y sesiones disponibles.
            </p>
          </div>
          <a href="#proceso" className="btn-ghost shrink-0 self-start sm:self-auto">
            Ver Proceso →
          </a>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {movies.map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
