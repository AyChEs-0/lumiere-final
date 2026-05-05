import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const stack = [
  { name: 'Laravel 12',   role: 'Framework',    color: '#FF2D20', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg' },
  { name: 'PHP 8.4',      role: 'Lenguaje',     color: '#777BB4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'MySQL 8.4',    role: 'Base de datos',color: '#4479A1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'Tailwind CSS', role: 'Estilos',      color: '#06B6D4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Alpine.js',    role: 'Interactividad',color: '#8BC0D0', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/alpinejs/alpinejs-original.svg' },
  { name: 'Docker',       role: 'Contenedores', color: '#2496ED', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'GitHub',       role: 'Control vers.',color: '#ffffff', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'PHPUnit',      role: 'Testing',      color: '#366489', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/phpunit/phpunit-original.svg' },
  { name: 'TMDB API',     role: 'Cartelera',    color: '#01B4E4', logo: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg' },
  { name: 'Railway',      role: 'Despliegue',   color: '#ffffff', logo: 'https://railway.com/brand/logo-light.png' },
]

export default function TechSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Stack tecnológico</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Arquitectura Tech
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)}
            className="text-[clamp(3rem,6vw,5rem)] font-black text-white/4 leading-none select-none">10</motion.span>
        </div>

        <motion.div variants={staggerContainer(0.06, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {stack.map((tech) => (
            <motion.div key={tech.name} variants={staggerItem}
              whileHover={{ y: -6, scale: 1.08, transition: { duration: 0.2 } }}
              className="glass rounded-xl p-3 flex flex-col items-center gap-2.5 group cursor-default">
              <motion.img
                src={tech.logo}
                alt={tech.name}
                className="w-12 h-12 object-contain"
                style={{ filter: tech.color === '#ffffff' ? 'invert(1) brightness(0.7)' : 'none' }}
                whileHover={{ filter: tech.color === '#ffffff' ? 'invert(1)' : 'none', scale: 1.1 }}
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Fallback if logo fails */}
              <div className="w-12 h-12 rounded-lg hidden items-center justify-center text-sm font-black"
                style={{ backgroundColor: `${tech.color}20`, color: tech.color }}>
                {tech.name.slice(0, 2)}
              </div>
              <div className="text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.06em] text-white leading-tight">{tech.name}</div>
                <div className="text-[8px] text-white/30 mt-0.5 leading-tight">{tech.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.9)} className="mt-8 flex flex-wrap gap-2">
          {['MVC Pattern', 'ACID Transactions', 'Graceful Degradation', 'HMAC-SHA256', 'Luhn Validation', 'CI/CD Railway'].map(tag => (
            <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/18 border border-white/6 rounded-full px-3 py-1">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
