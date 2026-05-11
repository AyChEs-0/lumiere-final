import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const services = [
  {
    color: '#0891b2',
    name: 'TMDB',
    desc: 'Cartellera en temps real amb pòsters i sinopsis. Sync cada 6h. Si cau → fallback a BD local.',
    why: 'Mantenir manualment el catàleg seria inviable.',
  },
  {
    color: '#9333ea',
    name: 'Railway',
    desc: 'MySQL gestionat, HTTPS automàtic, CI/CD integrat. Cada push a main desplega automàticament.',
    why: 'Vam migrar de GitLab a GitHub perquè Railway no integra GitLab.',
  },
  {
    color: '#d97706',
    name: 'Mailtrap',
    desc: 'Intercepta emails en local. Confirmacions i recuperació de contrasenya no arriben a usuaris reals.',
    why: 'Proves de flux d\'emails sense spam ni SMTP de producció.',
  },
  {
    color: '#16a34a',
    name: 'Tailwind CSS',
    desc: 'Framework CSS utility-first. Tot l\'estil de la interfície: cartellera, formularis, mapa de butaques i panell admin.',
    why: 'Disseny consistent i ràpid sense CSS personalitzat. Cap conflicte entre estils.',
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
          className="grid grid-cols-2 gap-5">
          {services.map((s) => (
            <motion.div key={s.name} variants={staggerItem}
              className="glass rounded-xl p-7 flex flex-col gap-3"
              style={{ borderLeft: `4px solid ${s.color}` }}>
              <span className="text-[21px] font-black" style={{ color: s.color }}>{s.name}</span>
              <p className="text-[16px] text-gray-600 leading-relaxed">{s.desc}</p>
              <p className="text-[14px] text-gray-400 italic">{s.why}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
