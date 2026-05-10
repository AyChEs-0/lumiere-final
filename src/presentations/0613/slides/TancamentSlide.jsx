import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const services = [
  {
    color: '#0891b2',
    name: 'TMDB',
    full: 'The Movie Database',
    desc: 'Cartelera en temps real: pòsters, sinopsis i gèneres de pel·lícules en cartellera a Espanya. Sincronització cada 6 hores.',
    why: 'Mantenir manualment el catàleg seria inviable. TMDB és professional i gratuït.',
  },
  {
    color: '#9333ea',
    name: 'Railway',
    full: 'Desplegament PaaS',
    desc: 'MySQL gestionat, HTTPS automàtic i CI/CD integrat. Cada push a main desplega automàticament.',
    why: 'Vam migrar de GitLab a GitHub perquè Railway no integra GitLab directament.',
  },
  {
    color: '#d97706',
    name: 'Mailtrap',
    full: 'Testing d\'Emails',
    desc: 'Intercepta tots els emails en entorn local. Confirmacions i recuperació de contrasenya arriben aquí, no al usuari real.',
    why: 'Proves de flux complet d\'emails sense enviar spam ni necessitar SMTP de producció.',
  },
  {
    color: '#16a34a',
    name: 'BaconQrCode',
    full: 'Tickets QR',
    desc: 'Genera QRs en SVG al servidor. El token és HMAC-SHA256(APP_KEY, "reserva:ID") — impossible de falsificar.',
    why: 'Un UUID simple seria predecible. HMAC-SHA256 garanteix autenticitat sense BD.',
  },
]

export default function TancamentSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-7">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Integracions externes</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Serveis Externs
            </motion.h2>
          </div>
        </div>

        <motion.div variants={staggerContainer(0.09, 0.25)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {services.map((s) => (
            <motion.div key={s.name} variants={staggerItem}
              className="glass rounded-xl p-6 flex flex-col gap-3"
              style={{ borderLeft: `3px solid ${s.color}` }}>
              <div>
                <span className="text-[14px] font-black" style={{ color: s.color }}>{s.name}</span>
                <span className="text-[11px] text-gray-400 ml-2">— {s.full}</span>
              </div>
              <p className="text-[12px] text-gray-600 leading-relaxed">{s.desc}</p>
              <p className="text-[10px] text-gray-400 italic">{s.why}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
