import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const services = [
  {
    color: '#0891b2',
    name: 'TMDB — The Movie Database',
    why: 'Mantenir manualment un catàleg de pel·lícules seria inviable. TMDB ens dona dades professionals sense cost de manteniment.',
    desc: 'Proporciona la cartelera en temps real: pòsters, sinopsis, puntuacions i gèneres de les pel·lícules en cartellera a Espanya (region=ES). Sincronització automàtica cada 6 hores via Scheduler.',
    extra: 'Si l\'API cau → fallback automàtic a BD local. La web no es trenca mai.',
    extraLabel: 'Gestió d\'errors',
  },
  {
    color: '#9333ea',
    name: 'Railway — Desplegament PaaS',
    why: 'VPS requeria gestió manual de servidor, certificats SSL i configuració de xarxa. Railway ho automatitza tot.',
    desc: 'Allotja l\'aplicació en producció amb MySQL gestionat, HTTPS automàtic i CI/CD integrat. Cada push a main desplega automàticament.',
    extra: 'Vam migrar de GitLab a GitHub privat perquè Railway no integra GitLab directament.',
    extraLabel: 'Decisió clau',
  },
  {
    color: '#d97706',
    name: 'Mailtrap — Testing d\'Emails',
    why: 'Permet provar el flux complet d\'emails sense enviar spam real ni necessitar un servidor SMTP de producció durant el desenvolupament.',
    desc: 'Intercepta tots els emails enviats en entorn local. Confirmacions de reserva i recuperació de contrasenya arriben a Mailtrap en lloc de a l\'usuari real durant el desenvolupament.',
    extra: null,
    extraLabel: null,
  },
  {
    color: '#16a34a',
    name: 'BaconQrCode — Tickets QR',
    why: 'Un UUID simple seria predecible. HMAC-SHA256 garanteix que el QR és únic i verificable sense base de dades.',
    desc: 'Genera els codis QR dels tickets de reserva en format SVG al servidor. El QR conté un token HMAC-SHA256 que és impossible de falsificar sense la APP_KEY del servidor.',
    extra: null,
    extraLabel: null,
  },
]

export default function TancamentSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Integracions · APIs externes</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Serveis Externs: Per Que Cadascun
            </motion.h2>
          </div>
        </div>

        <motion.div variants={staggerContainer(0.09, 0.25)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {services.map((s) => (
            <motion.div key={s.name} variants={staggerItem}
              className="glass rounded-xl p-5 flex flex-col gap-3"
              style={{ borderColor: `${s.color}18` }}>
              <span className="text-[11px] font-black text-white">{s.name}</span>
              <p className="text-[9.5px] text-white/40 leading-relaxed">{s.desc}</p>
              <p className="text-[9px] italic" style={{ color: `${s.color}80` }}>
                Per que: {s.why}
              </p>
              {s.extra && (
                <div className="flex items-start gap-2 pt-1 border-t border-white/5">
                  <span className="text-[8px] font-black uppercase tracking-[0.12em] whitespace-nowrap mt-0.5"
                    style={{ color: `${s.color}60` }}>{s.extraLabel}:</span>
                  <span className="text-[9px] text-white/30 leading-snug">{s.extra}</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
