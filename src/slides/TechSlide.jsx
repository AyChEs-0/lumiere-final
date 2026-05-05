import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const categories = [
  {
    label: 'Backend',
    items: [
      { name: 'Laravel',  role: 'Framework',  color: '#FF2D20' },
      { name: 'PHP 8',    role: 'Lenguaje',   color: '#777BB4' },
      { name: 'MySQL',    role: 'Base de datos', color: '#4479A1' },
    ],
  },
  {
    label: 'Frontend',
    items: [
      { name: 'Tailwind', role: 'Estilos',    color: '#06B6D4' },
      { name: 'Blade',    role: 'Templates',  color: '#FF2D20' },
      { name: 'Vite',     role: 'Build',      color: '#646CFF' },
    ],
  },
  {
    label: 'DevOps',
    items: [
      { name: 'Docker',   role: 'Contenedores', color: '#2496ED' },
      { name: 'GitLab',   role: 'Control de versiones', color: '#FC6D26' },
    ],
  },
]

export default function TechSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p   {...fadeUp(0.05)} className="label mb-3">Stack tecnológico</motion.p>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }}
                className="s-title"
              >
                Arquitectura
              </motion.h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          {categories.map((cat, ci) => (
            <div key={cat.label}>
              <motion.p
                {...fadeUp(0.2 + ci * 0.1)}
                className="text-[9px] font-black uppercase tracking-[0.22em] text-white/20 mb-3"
              >
                {cat.label}
              </motion.p>
              <motion.div
                variants={staggerContainer(0.07, 0.25 + ci * 0.1)}
                initial="initial"
                animate="animate"
                className="flex flex-wrap gap-3"
              >
                {cat.items.map((t) => (
                  <motion.div
                    key={t.name}
                    variants={staggerItem}
                    whileHover={{ y: -4, scale: 1.03, transition: { duration: 0.2 } }}
                    className="glass rounded-xl px-5 py-3.5 flex items-center gap-3 group"
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: t.color, boxShadow: `0 0 8px ${t.color}60` }}
                    />
                    <div>
                      <span className="text-sm font-black text-white">{t.name}</span>
                      <span className="text-[10px] text-white/30 ml-2">{t.role}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          {...fadeUp(0.9)}
          className="mt-8 flex flex-wrap gap-2"
        >
          {['MVC Pattern', 'Auth & Roles', 'Eloquent ORM', 'API Integration', 'Artisan CLI', 'Session & Middleware'].map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/18 border border-white/6 rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
