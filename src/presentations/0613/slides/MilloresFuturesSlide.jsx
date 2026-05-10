import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const improvements = [
  {
    color: '#d4183d',
    title: 'Passerela de Pagament Real (Stripe)',
    current: 'Simulació amb validació Luhn + regex E.164 per Bizum. No es processen transaccions reals.',
    why: 'Stripe necessita Webhooks amb un servidor públic accessible durant el dev. En local amb Docker no és trivial.',
    needs: 'Compte Stripe · Webhook /stripe/webhook · Events payment_intent.succeeded / failed · STRIPE_KEY i STRIPE_SECRET',
  },
  {
    color: '#0891b2',
    title: 'Ticket QR en PDF Adjunt al Correu',
    current: 'El QR amb HMAC-SHA256 es genera correctament en SVG. El correu l\'envia com a imatge independent, no en PDF formatat.',
    why: 'Un PDF ben maquettat amb logo, dades de reserva i QR requeria DomPDF + dissenyar la plantilla Blade.',
    needs: 'barryvdh/laravel-dompdf · Plantilla Blade de ticket · Mail::attach() al correu de confirmació',
  },
  {
    color: '#d97706',
    title: 'SMTP Real en Producció',
    current: 'Mailtrap en local. En producció a Railway els emails queden en log — no s\'envien realment.',
    why: 'Configurar Mailgun/SendGrid requeria un domini verificat i configuració DNS fora del temps disponible.',
    needs: 'Compte Mailgun o SendGrid · MAIL_HOST / MAIL_USERNAME / MAIL_PASSWORD a Railway · Verificació del domini',
  },
  {
    color: '#9333ea',
    title: 'Interfície de Validació en Taquilla',
    current: 'El QR HMAC-SHA256 funciona i l\'endpoint /ticket/{token}/validate existeix. No hi ha interfície de taquilla.',
    why: 'El rol taquilla es va definir però la interfície va ser depriorititzada a la tutoria del 19/02/2026.',
    needs: 'Vista per al rol taquilla · Lector QR via càmera del mòbil (API del navegador) · Resposta visual verd/vermell',
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

        <motion.p {...fadeUp(0.25)} className="text-[12px] text-gray-400 italic mb-5">
          No per falta de ganes — per falta de temps. Funcionalitats dissenyades que no van arribar a la versió final.
        </motion.p>

        <motion.div variants={staggerContainer(0.08, 0.3)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {improvements.map((imp) => (
            <motion.div key={imp.title} variants={staggerItem}
              className="glass rounded-xl p-5 flex flex-col gap-3"
              style={{ borderLeft: `3px solid ${imp.color}` }}>
              <span className="text-[12px] font-black text-gray-900">{imp.title}</span>
              <p className="text-[10.5px] text-gray-500 leading-snug">
                <span className="font-black text-gray-700">Ara: </span>{imp.current}
              </p>
              <p className="text-[10px] text-gray-400 leading-snug">
                <span className="font-black" style={{ color: imp.color }}>Per que no: </span>{imp.why}
              </p>
              <p className="text-[9.5px] text-gray-400 pt-2 border-t border-gray-100">
                <span className="font-black text-gray-500">Caldria: </span>{imp.needs}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
