import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const improvements = [
  {
    color: '#d4183d',
    iconPath: 'M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z',
    title: 'Passerela de Pagament Real (Stripe)',
    current: 'El pagament actual és una simulació. Validem el número de targeta amb l\'algoritme de Luhn i el telèfon de Bizum amb regex E.164, però no processem cap transacció real.',
    why: 'Integrar Stripe amb Webhooks requereix un servidor públic accessible durant el desenvolupament per rebre les notificacions de pagament. En entorn local amb Docker no és trivial.',
    needs: 'Compte Stripe · Webhook endpoint a /stripe/webhook · Gestió d\'esdeveniments payment_intent.succeeded i payment_intent.failed · Variables d\'entorn STRIPE_KEY i STRIPE_SECRET',
  },
  {
    color: '#0891b2',
    iconPath: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z',
    title: 'Generació de PDF amb Ticket QR Adjunt',
    current: 'El QR es genera correctament amb BaconQrCode i la firma HMAC-SHA256 funciona. Però el ticket s\'envia per correu com a imatge SVG independent, no integrat en un PDF formatat.',
    why: 'Generar un PDF ben maquettat amb el QR, les dades de la reserva, el logo i el disseny del cinema requeria integrar una llibreria com DomPDF o Browsershot i dissenyar la plantilla.',
    needs: 'Llibreria barryvdh/laravel-dompdf · Plantilla Blade específica per al PDF · Adjuntar el PDF al correu de confirmació via Mail::attach()',
  },
  {
    color: '#d97706',
    iconPath: 'M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75',
    title: 'Servidor de Correu Real en Producció',
    current: 'En local usem Mailtrap per interceptar els emails. En producció a Railway els emails de confirmació de reserva i recuperació de contrasenya no s\'envien realment — queden en log.',
    why: 'Configurar un servei SMTP de producció (Mailgun, SendGrid o similar) requeria un domini verificat i configuració DNS que anava més enllà del temps disponible.',
    needs: 'Compte Mailgun o SendGrid · Variables MAIL_HOST, MAIL_USERNAME, MAIL_PASSWORD a Railway · Verificació del domini per evitar que els emails vagin a spam',
  },
  {
    color: '#9333ea',
    iconPath: 'M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z M6.75 9.375v5.25 M13.5 14.625v4.5 M13.5 19.125h4.5',
    title: 'Validació de Tickets en Taquilla',
    current: 'El sistema de QR amb HMAC-SHA256 és completament funcional i els tokens es generen correctament. L\'endpoint de validació /ticket/{token}/validate existeix i funciona. Però no hi ha interfície de taquilla per usar-lo.',
    why: 'El rol de taquilla es va definir al document però no es va implementar la interfície operativa. Va ser una de les funcionalitats depriorititzades a la tutoria del 19/02/2026.',
    needs: 'Interfície simple per al rol taquilla · Lector QR via càmera del mòbil usant la API del navegador · Petició POST a l\'endpoint de validació existent · Resposta visual: verd (vàlid) / vermell (invàlid o ja usat)',
  },
]

export default function MilloresFuturesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-4">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Millores pendents</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Que Voliem Fer i No Vam Poder
            </motion.h2>
          </div>
        </div>

        <motion.p {...fadeUp(0.25)} className="text-center text-[10px] text-white/25 italic mb-5">
          No per falta de ganes — per falta de temps. Aquí les funcionalitats que teníem dissenyades però que no van arribar a la versió final.
        </motion.p>

        <motion.div variants={staggerContainer(0.08, 0.3)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {improvements.map((imp) => (
            <motion.div key={imp.title} variants={staggerItem}
              className="glass rounded-xl p-5 flex flex-col gap-3"
              style={{ borderColor: `${imp.color}18` }}>
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: `${imp.color}12`, border: `1px solid ${imp.color}20` }}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke={imp.color} strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={imp.iconPath} />
                  </svg>
                </div>
                <span className="text-[10.5px] font-black text-white leading-tight">{imp.title}</span>
              </div>

              <div className="flex flex-col gap-1.5">
                <p className="text-[9px] text-white/38 leading-snug">
                  <span className="font-black text-white/50">Estat actual: </span>{imp.current}
                </p>
                <p className="text-[9px] text-white/30 leading-snug">
                  <span className="font-black" style={{ color: `${imp.color}70` }}>Per que no vam arribar: </span>{imp.why}
                </p>
                <p className="text-[8.5px] text-white/25 leading-snug pt-1 border-t border-white/5">
                  <span className="font-black text-white/35">Caldria: </span>{imp.needs}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
