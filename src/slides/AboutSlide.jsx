import { motion } from 'framer-motion'
import { fadeUp, drawLine, scaleIn, ease } from '../utils/motion'

const team = [
  {
    initials: 'AC',
    name: 'Ayman Charoui',
    role: 'Product Owner + Scrum Master',
    desc: 'Defineix objectius, supervisa tasques i facilita comunicació',
    color: '#d4183d',
  },
  {
    initials: 'DG',
    name: 'Danna Guevara',
    role: 'Tech Lead + Documentació',
    desc: 'Desenvolupa l\'arquitectura, redacta documentació tècnica i assegura codi net',
    color: '#9333ea',
  },
  {
    initials: 'IA',
    name: 'Ismael Achamrouk',
    role: 'QA + Frontend',
    desc: 'Revisa bones pràctiques, proves funcionals i supervisa usabilitat',
    color: '#0891b2',
  },
]

export default function AboutSlide() {
  return (
    <div className="w-full h-full flex items-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-[1fr_1px_1fr] gap-0 items-center">

        {/* Left */}
        <div className="pr-14">
          <motion.span {...drawLine(0.1)} className="red-bar" />
          <motion.p {...fadeUp(0.1)} className="label mb-4">¿Qué es?</motion.p>
          <div className="overflow-hidden mb-1">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.72, delay: 0.2, ease }} className="s-title">
              Gestión cinematográfica
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.72, delay: 0.3, ease }} className="s-title text-cinema-red">
              de extremo a extremo.
            </motion.h2>
          </div>
          <motion.p {...fadeUp(0.45)} className="s-body mb-4">
            Cine Lumière es una plataforma web full-stack para la gestión integral de cines: cartelera sincronizada con TMDB, sistema de reservas con control de concurrencia ACID y checkout en 3 pasos con validación real de pagos.
          </motion.p>
          <motion.p {...fadeUp(0.55)} className="s-body">
            Construida sobre Laravel 12, MySQL 8.4 y Tailwind CSS, con Docker para el entorno de desarrollo y Railway para el despliegue en producción.
          </motion.p>
        </div>

        {/* Divider */}
        <motion.div className="hidden md:block h-64 w-px bg-gradient-to-b from-transparent via-cinema-red/25 to-transparent origin-top"
          initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease }} />

        {/* Right — team */}
        <div className="pl-14 flex flex-col gap-3">
          <motion.p {...fadeUp(0.3)} className="label mb-2">Equipo — Grupo 3</motion.p>
          {team.map((m, i) => (
            <motion.div key={m.name} {...scaleIn(0.35 + i * 0.1)}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="glass rounded-xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-white font-black text-sm"
                style={{ background: `${m.color}25`, border: `1px solid ${m.color}40`, color: m.color }}>
                {m.initials}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-black text-white truncate">{m.name}</p>
                <p className="text-[10px] text-white/40 leading-snug mt-0.5">{m.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
