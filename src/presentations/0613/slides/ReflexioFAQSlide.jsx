import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const diagram = [
  'Cine ──< Sala ──< Sesion ──< Reserva ──< ReservaSeat',
  '                   │',
  '             Pelicula ──>< Categoria',
  '                   ',
  'Sesion ──< SeatLock  (temporal, TTL 8 min)',
  'User   ──< Reserva   (nullable per guest)',
]

const decisions = [
  {
    color: '#0891b2',
    q: 'Per que seat_locks és una taula separada?',
    a: 'Inicialment guardàvem les butaques com a CSV en reservas.butaques_seleccionades. Vam migrar a una taula normalitzada reserva_seats perquè el CSV no usa índexs reals i necessitava SQL raw amb FIND_IN_SET. La taula normalitzada permet queries netes i integritat referencial.',
  },
  {
    color: '#9333ea',
    q: 'Per que índex únic (nombre, ciudad) a cines?',
    a: 'El comando de sync TMDB s\'executa cada 6 hores. Sense l\'índex únic, podia crear el mateix cine dues vegades si fallava a meitat. L\'índex únic garanteix que no hi hagi duplicats independentment de quantes vegades s\'executi.',
  },
  {
    color: '#16a34a',
    q: 'Per que fk_usuario_id nullable a reserves?',
    a: 'Per permetre la compra sense registre (guest checkout). La reserva existeix, té les butaques i el pagament, però no té usuari associat. Nom i email es guarden directament a la reserva.',
  },
]

export default function ReflexioFAQSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-5">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Models Eloquent · Base de dades</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Com Estan Relacionades les Dades
            </motion.h2>
          </div>
        </div>

        {/* Diagram */}
        <motion.div {...fadeUp(0.28)} className="glass rounded-xl px-6 py-4 mb-5 font-mono">
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/20 block mb-3">Diagrama de relacions</span>
          <div className="flex flex-col gap-1">
            {diagram.map((line, i) => (
              <motion.p key={i}
                initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.35 + i * 0.06, ease }}
                className="text-[10px] text-white/45 leading-relaxed">
                {line || ' '}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Decision cards */}
        <motion.div variants={staggerContainer(0.09, 0.5)} initial="initial" animate="animate"
          className="flex flex-col gap-3">
          {decisions.map((d) => (
            <motion.div key={d.q} variants={staggerItem}
              className="glass rounded-xl px-5 py-4 grid grid-cols-[auto_1fr] gap-4 items-start">
              <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: d.color }} />
              <div className="flex flex-col gap-1.5">
                <p className="text-[10px] font-black text-white/70">{d.q}</p>
                <p className="text-[9.5px] text-white/35 leading-relaxed">{d.a}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
