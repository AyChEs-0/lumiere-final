import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const improvements = [
  {
    color: '#d4183d',
    title: 'Stripe — Pagament real',
    now: 'Simulació amb validació Luhn + E.164 per Bizum. Cap transacció real.',
    why: 'Stripe necessita Webhooks amb servidor públic. En local amb Docker no és trivial.',
  },
  {
    color: '#0891b2',
    title: 'PDF amb QR adjunt al correu',
    now: 'El QR es genera però no s\'arriba a mostrar correctament. La integració al correu va quedar pendent.',
    why: 'Un PDF ben maquettat requeria DomPDF + plantilla Blade addicional.',
  },
  {
    color: '#d97706',
    title: 'SMTP real en producció',
    now: 'Mailtrap en local. En producció a Railway els emails queden en log.',
    why: 'Mailgun/SendGrid requeria domini verificat + configuració DNS fora del temps.',
  },
  {
    color: '#9333ea',
    title: 'Interfície de taquilla (QR scanner)',
    now: 'Endpoint /ticket/{token}/validate funciona. No hi ha vista per al rol taquilla.',
    why: 'Depriorititzat a la tutoria del 19/02/2026. Tot el backend és funcional.',
  },
]

export default function MilloresFuturesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-5">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Millores pendents</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Que Voliem Fer i No Vam Poder
            </motion.h2>
          </div>
        </div>

        <motion.p {...fadeUp(0.25)} className="text-[16px] text-gray-400 italic mb-6">
          No per falta de ganes — per falta de temps.
        </motion.p>

        <motion.div variants={staggerContainer(0.08, 0.3)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-5">
          {improvements.map((imp) => (
            <motion.div key={imp.title} variants={staggerItem}
              className="glass rounded-xl p-7 flex flex-col gap-3"
              style={{ borderLeft: `4px solid ${imp.color}` }}>
              <span className="text-[19px] font-black text-gray-900">{imp.title}</span>
              <p className="text-[16px] text-gray-500 leading-snug">
                <span className="font-black text-gray-700">Ara: </span>{imp.now}
              </p>
              <p className="text-[15px] text-gray-400">
                <span className="font-black" style={{ color: imp.color }}>Per que no: </span>{imp.why}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
