import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const decisions = [
  {
    color: '#0891b2',
    icon: 'M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.25v2.25m0 0v2.25m0-2.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125',
    q: 'Per que reserva_seats en lloc de CSV?',
    context: 'Inicialment les butaques es guardaven com a CSV en un camp de text.',
    a: 'El CSV necessitava FIND_IN_SET, no usava índexs i era impossible de mantenir amb JOINs. La taula normalitzada permet queries netes, integritat referencial i escalabilitat real.',
    tag: 'Deute tècnic resolt',
  },
  {
    color: '#9333ea',
    icon: 'M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33',
    q: 'Per que índex únic (nombre, ciudad) a cines?',
    context: 'El sync amb TMDB s\'executa automàticament cada 6 hores via Scheduler.',
    a: 'Sense l\'índex únic, el sync podia crear el mateix cine dues vegades si fallava a meitat d\'execució. L\'índex és la garantia d\'idempotència: el sync pot executar-se 100 vegades amb el mateix resultat.',
    tag: 'Idempotència garantida',
  },
  {
    color: '#16a34a',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    q: 'Per que fk_usuario_id nullable a reserves?',
    context: 'Volem permetre la compra sense obligar a crear un compte.',
    a: 'La reserva existeix amb butaques i pagament, però sense usuari registrat. Nom i email es guarden directament a la reserva. Un guest pot comprar i rebre el QR per email sense registrar-se mai.',
    tag: 'Guest Checkout',
  },
]

export default function ReflexioFAQSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-8">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Decisions de disseny · Base de dades</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Per Que Cada Decisió
            </motion.h2>
          </div>
        </div>

        <motion.div variants={staggerContainer(0.1, 0.25)} initial="initial" animate="animate"
          className="flex flex-col gap-5">
          {decisions.map((d) => (
            <motion.div key={d.q} variants={staggerItem}
              className="glass rounded-2xl p-7 grid grid-cols-[auto_1fr] gap-6 items-start"
              style={{ borderLeft: `5px solid ${d.color}` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${d.color}12` }}>
                <svg className="w-5 h-5" fill="none" stroke={d.color} strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={d.icon} />
                </svg>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <p className="text-[15px] font-black text-gray-900">{d.q}</p>
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded-full shrink-0"
                    style={{ background: `${d.color}12`, color: d.color }}>{d.tag}</span>
                </div>
                <p className="text-[12px] text-gray-400 italic">{d.context}</p>
                <p className="text-[13px] text-gray-600 leading-relaxed">{d.a}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
