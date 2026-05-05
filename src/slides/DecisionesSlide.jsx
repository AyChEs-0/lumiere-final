import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const decisions = [
  {
    num: '01',
    title: 'Race Conditions',
    problem: 'Dos clientes seleccionan la misma butaca en el mismo milisegundo.',
    solution: 'Modelo SeatLock en BD + locking pesimista con lockForUpdate dentro de DB::transaction.',
    result: 'Cero dobles reservas · El segundo usuario recibe error contextual y vuelve al mapa.',
    color: '#d4183d',
  },
  {
    num: '02',
    title: 'Manipulación de Precios',
    problem: 'Un usuario modifica el HTML del formulario para enviar total = 0€.',
    solution: 'El controlador ignora el total del POST y recalcula desde cero: precio base × multiplicadores de tipo.',
    result: 'Imposible pagar menos del precio real · Regla de oro: nunca confíes en el frontend.',
    color: '#f97316',
  },
  {
    num: '03',
    title: 'Caída de TMDB',
    problem: 'La API externa cae y la cartelera deja de funcionar.',
    solution: 'CachedMovieService con Graceful Degradation · Si TMDB falla, fallback automático a datos locales.',
    result: 'La web sigue operativa aunque TMDB esté caído · Cero errores visibles al usuario.',
    color: '#0891b2',
  },
  {
    num: '04',
    title: 'GitLab → Railway',
    problem: 'Railway no permite integración directa con GitLab.',
    solution: 'Migración del repositorio completo a GitHub privado · Webhook de GitHub enlazado con Railway.',
    result: 'CI/CD automático · Cada push a main despliega en producción automáticamente.',
    color: '#9333ea',
  },
]

export default function DecisionesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Toma de Decisiones Técnicas</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Retos y Soluciones
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)}
            className="text-[clamp(3rem,6vw,5rem)] font-black text-white/4 leading-none select-none">04</motion.span>
        </div>

        <motion.div variants={staggerContainer(0.09, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {decisions.map((d) => (
            <motion.div key={d.num} variants={staggerItem}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-5 flex flex-col gap-4 group relative overflow-hidden">
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${d.color}08, transparent)` }} />

              <div className="flex items-center justify-between">
                <div className="w-7 h-7 rounded-full border flex items-center justify-center"
                  style={{ borderColor: `${d.color}40`, color: d.color }}>
                  <span className="text-[9px] font-black">{d.num}</span>
                </div>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color, boxShadow: `0 0 6px ${d.color}80` }} />
              </div>

              <h3 className="text-sm font-black uppercase tracking-[0.06em] text-white">{d.title}</h3>

              <div className="flex flex-col gap-2.5 flex-1">
                <div>
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white/25 block mb-1">Problema</span>
                  <p className="text-[10px] text-white/40 leading-relaxed">{d.problem}</p>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white/25 block mb-1">Solución</span>
                  <p className="text-[10px] text-white/40 leading-relaxed">{d.solution}</p>
                </div>
                <div className="glass rounded-lg p-2 mt-auto">
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] block mb-1" style={{ color: d.color }}>Resultado</span>
                  <p className="text-[10px] text-white/50 leading-relaxed">{d.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
