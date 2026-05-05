import { motion } from 'framer-motion'

const stack = [
  { name: 'Laravel 11',    role: 'Backend',       color: '#FF2D20', emoji: '⚙️' },
  { name: 'PHP 8',         role: 'Lenguaje',      color: '#777BB4', emoji: '🐘' },
  { name: 'MySQL',         role: 'Base de Datos', color: '#4479A1', emoji: '🗄' },
  { name: 'Tailwind CSS',  role: 'Estilos',       color: '#06B6D4', emoji: '🎨' },
  { name: 'Blade',         role: 'Templates',     color: '#FF2D20', emoji: '📄' },
  { name: 'Docker',        role: 'Contenedores',  color: '#2496ED', emoji: '🐳' },
  { name: 'Vite',          role: 'Build Tool',    color: '#646CFF', emoji: '⚡' },
  { name: 'REST API',      role: 'Integración',   color: '#d4183d', emoji: '🔌' },
]

const container = {
  animate: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } },
}
const item = {
  initial: { opacity: 0, scale: 0.85, y: 16 },
  animate: { opacity: 1, scale: 1,    y: 0,  transition: { duration: 0.45, ease: [0.4, 0, 0.2, 1] } },
}

export default function TechSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 md:px-20 py-14">
      <div className="w-full max-w-5xl mx-auto">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="red-line" />
          <h2 className="slide-title">Tech Stack</h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="initial"
          animate="animate"
          className="grid grid-cols-4 md:grid-cols-8 gap-4"
        >
          {stack.map(tech => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{ y: -6, scale: 1.05 }}
              className="glass rounded-2xl p-4 flex flex-col items-center gap-3 cursor-default group"
            >
              <motion.span
                className="text-3xl"
                whileHover={{ scale: 1.2, rotate: [0, -8, 8, 0] }}
                transition={{ duration: 0.4 }}
              >
                {tech.emoji}
              </motion.span>
              <div className="text-center">
                <div className="text-[11px] font-black uppercase tracking-[0.08em] text-white leading-tight">{tech.name}</div>
                <div className="text-[9px] text-white/30 mt-0.5">{tech.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 flex gap-6 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          {['MVC Pattern', 'Auth & Middleware', 'Eloquent ORM', 'API Integration', 'Session Management'].map(tag => (
            <span key={tag} className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/20 border border-white/8 rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
