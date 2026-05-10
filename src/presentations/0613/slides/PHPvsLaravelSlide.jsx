import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const services = [
  {
    color: '#d4183d',
    name: 'PurchaseService',
    desc: 'Tota la lògica de confirmació dins d\'un DB::transaction. Crea la reserva, associa butaques i elimina els SeatLocks — tot o res.',
    why: 'El controlador tenia 80 línies. Movent-ho al servei va quedar en 10.',
  },
  {
    color: '#0891b2',
    name: 'CachedMovieService',
    desc: 'Si TMDB respon, usa les dades externes. Si hi ha timeout o error, fa fallback automàtic a la BD local.',
    why: 'Graceful Degradation — la web funciona encara que TMDB caigui.',
  },
  {
    color: '#9333ea',
    name: 'SeatAvailabilityService',
    desc: 'Calcula en temps real quines butaques estan lliures, reservades o bloquejades. Construeix la resposta JSON de l\'API AJAX.',
    why: 'La mateixa lògica s\'usava en 3 llocs. Centralitzant-la, canviar-la afecta tots alhora.',
  },
  {
    color: '#16a34a',
    name: 'GuestCheckoutService',
    desc: 'Gestiona la compra sense registre. Crea una reserva amb fk_usuario_id = null i guarda nom + email a la reserva.',
    why: 'No obligar a registrar-se redueix la fricció i augmenta les conversions.',
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

        <motion.p {...fadeUp(0.28)} className="text-[13px] text-gray-500 mb-6 leading-relaxed max-w-2xl">
          Quan la lògica d'un controlador creix massa, la movem a un Servei.
          El controlador delega — el Servei executa. Resultat: controladors llegibles, lògica testejable.
        </motion.p>

        <motion.div variants={staggerContainer(0.08, 0.3)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {services.map((s) => (
            <motion.div key={s.name} variants={staggerItem}
              className="glass rounded-xl p-6 flex flex-col gap-3"
              style={{ borderLeft: `3px solid ${s.color}` }}>
              <span className="text-[14px] font-black font-mono" style={{ color: s.color }}>{s.name}</span>
              <p className="text-[12px] text-gray-600 leading-relaxed">{s.desc}</p>
              <p className="text-[10px] text-gray-400 italic">{s.why}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
