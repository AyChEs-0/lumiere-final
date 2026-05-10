import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const services = [
  {
    color: '#d4183d',
    name: 'PurchaseService',
    desc: 'Confirma la compra dins d\'un DB::transaction. Crea la reserva, associa butaques i elimina SeatLocks — tot o res.',
    why: 'El controlador tenia 80 línies. Al servei va quedar en 10.',
  },
  {
    color: '#0891b2',
    name: 'CachedMovieService',
    desc: 'Si TMDB falla, fa fallback automàtic a la BD local. El controlador mai sap d\'on venen les dades.',
    why: 'La web funciona encara que TMDB caigui.',
  },
  {
    color: '#9333ea',
    name: 'SeatAvailabilityService',
    desc: 'Calcula en temps real l\'estat de cada butaca. Construeix la resposta JSON de l\'API AJAX.',
    why: 'La mateixa lògica s\'usava en 3 llocs — centralitzada aquí.',
  },
  {
    color: '#16a34a',
    name: 'GuestCheckoutService',
    desc: 'Compra sense registre. Reserva amb fk_usuario_id = null, nom i email directament a la taula.',
    why: 'No obligar a registrar-se redueix la fricció de compra.',
  },
]

export default function PHPvsLaravelSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Service Layer Pattern</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              La Capa de Serveis
            </motion.h2>
          </div>
        </div>

        <motion.p {...fadeUp(0.28)} className="text-[15px] text-gray-500 mb-7 leading-relaxed max-w-2xl">
          Quan la lògica d'un controlador creix massa, la movem a un Servei.
          Controladors llegibles, lògica testejable.
        </motion.p>

        <motion.div variants={staggerContainer(0.08, 0.3)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-5">
          {services.map((s) => (
            <motion.div key={s.name} variants={staggerItem}
              className="glass rounded-xl p-7 flex flex-col gap-3"
              style={{ borderLeft: `4px solid ${s.color}` }}>
              <span className="text-[16px] font-black font-mono" style={{ color: s.color }}>{s.name}</span>
              <p className="text-[13px] text-gray-600 leading-relaxed">{s.desc}</p>
              <p className="text-[11px] text-gray-400 italic">{s.why}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
