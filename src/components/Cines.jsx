import { motion } from 'framer-motion'

const cines = [
  {
    name: 'Cine Lumière Central',
    location: 'Barcelona, Centro',
    salas: 6,
    butacas: 840,
    img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=600&q=80',
  },
  {
    name: 'Lumière Diagonal',
    location: 'Barcelona, Eixample',
    salas: 4,
    butacas: 560,
    img: 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=600&q=80',
  },
  {
    name: 'Lumière Gràcia',
    location: 'Barcelona, Gràcia',
    salas: 3,
    butacas: 390,
    img: 'https://images.unsplash.com/photo-1512070679279-8988d32161be?w=600&q=80',
  },
]

export default function Cines() {
  return (
    <section id="cines" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="red-line" />
          <h2 className="section-title mb-4">Nuestros Cines</h2>
          <p className="text-cinema-muted leading-relaxed">
            Red de cines gestionados desde una única plataforma. Cada cine mantiene
            su propia configuración de salas, horarios y programación.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cines.map((cine, i) => (
            <motion.div
              key={cine.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(212,24,61,0.25)' }}
              className="glass rounded-2xl overflow-hidden group cursor-default"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <motion.img
                  src={cine.img}
                  alt={cine.name}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a0a0a] to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-2 mb-1">
                  <svg className="w-4 h-4 text-cinema-red mt-0.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <span className="text-xs text-cinema-muted uppercase tracking-cinema">{cine.location}</span>
                </div>
                <h3 className="font-black text-white text-lg uppercase tracking-cinema mb-4">
                  {cine.name}
                </h3>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-cinema-red">{cine.salas}</div>
                    <div className="text-xs text-cinema-muted uppercase tracking-cinema">Salas</div>
                  </div>
                  <div className="glass rounded-xl p-3 text-center">
                    <div className="text-2xl font-black text-cinema-red">{cine.butacas}</div>
                    <div className="text-xs text-cinema-muted uppercase tracking-cinema">Butacas</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
