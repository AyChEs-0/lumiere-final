import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const decisions = [
  {
    color: '#0891b2',
    q: 'Per que reserva_seats en lloc de CSV?',
    a: 'El CSV necessitava FIND_IN_SET, no usava índexs i era difícil de mantenir. La taula normalitzada permet queries netes i integritat referencial.',
  },
  {
    color: '#9333ea',
    q: 'Per que índex únic (nombre, ciudad) a cines?',
    a: 'El sync TMDB s\'executa cada 6 hores. Sense l\'índex únic podia crear el mateix cine dues vegades si fallava a meitat.',
  },
  {
    color: '#16a34a',
    q: 'Per que fk_usuario_id nullable a reserves?',
    a: 'Per permetre la compra sense registre. La reserva existeix amb butaques i pagament, però sense usuari associat.',
  },
]

const diagram = `User ──< Reserva ──< ReservaSeat
             │
           Sesion ──< SeatLock (TTL 8 min)
             │
Sala ──────< Sesion
 │
Cine`

export default function ReflexioFAQSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-7">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Models Eloquent · Base de dades</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Els Models i les Relacions
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-[auto_1fr] gap-6 items-start">
          <motion.div {...fadeUp(0.3)} className="glass rounded-xl p-7 shrink-0">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-gray-400 block mb-4">Relacions</span>
            <pre className="text-[13px] font-mono text-gray-700 leading-loose whitespace-pre">{diagram}</pre>
          </motion.div>

          <motion.div variants={staggerContainer(0.09, 0.3)} initial="initial" animate="animate"
            className="flex flex-col gap-4">
            {decisions.map((d) => (
              <motion.div key={d.q} variants={staggerItem}
                className="glass rounded-xl p-6 flex flex-col gap-2"
                style={{ borderLeft: `4px solid ${d.color}` }}>
                <p className="text-[14px] font-black text-gray-800">{d.q}</p>
                <p className="text-[13px] text-gray-500 leading-relaxed">{d.a}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </div>
  )
}
