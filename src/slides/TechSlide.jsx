import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const stack = [
  { name: 'Laravel 12',   color: '#FF2D20', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',   desc: 'Framework MVC · Breeze Auth · Eloquent ORM · Middlewares de roles' },
  { name: 'PHP 8.4',      color: '#777BB4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',            desc: 'Lenguaje base · Servicios desacoplados · Validación Luhn · HMAC-SHA256' },
  { name: 'MySQL 8.4',    color: '#4479A1', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',        desc: 'Base de datos · Transacciones ACID · SeatLock TTL · lockForUpdate' },
  { name: 'Tailwind CSS', color: '#06B6D4', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', desc: 'Diseño dark mode · Responsive mobile-first · Tema cinematográfico' },
  { name: 'Docker',       color: '#2496ED', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',      desc: 'Entorno reproducible · PHP 8.4 + MySQL idéntico para todo el equipo' },
  { name: 'TMDB API',     color: '#01B4E4', logo: 'https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg', desc: 'Cartelera española en tiempo real · Sync cada 6h · Fallback local automático' },
  { name: 'Railway',      color: '#ffffff', logo: 'https://railway.com/brand/logo-light.png',                                          desc: 'Despliegue PaaS · MySQL gestionado · CI/CD desde GitHub privado' },
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
            className="text-[clamp(3rem,6vw,5rem)] font-black text-white/4 leading-none select-none">07</motion.span>
        </div>

        <motion.div variants={staggerContainer(0.07, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-7 gap-3">
          {stack.map((tech) => (
            <motion.div key={tech.name} variants={staggerItem}
              whileHover={{ y: -6, scale: 1.04, transition: { duration: 0.2 } }}
              className="glass rounded-xl p-4 flex flex-col items-center gap-3 group cursor-default relative overflow-hidden">
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `radial-gradient(circle at 50% 0%, ${tech.color}10 0%, transparent 70%)` }}
              />
              <div className="relative">
                <motion.img
                  src={tech.logo}
                  alt={tech.name}
                  className="w-10 h-10 object-contain"
                  style={{ filter: tech.color === '#ffffff' ? 'invert(1) brightness(0.6)' : 'none' }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                <div className="w-10 h-10 rounded-lg hidden items-center justify-center text-sm font-black"
                  style={{ backgroundColor: `${tech.color}20`, color: tech.color }}>
                  {tech.name.slice(0, 2)}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[9px] font-black uppercase tracking-[0.06em] text-white leading-tight mb-1.5"
                  style={{ color: tech.color === '#ffffff' ? 'white' : tech.color }}>
                  {tech.name}
                </div>
                <div className="text-[8px] text-white/35 leading-snug">{tech.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
