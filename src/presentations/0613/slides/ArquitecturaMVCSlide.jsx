import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const layers = [
  {
    color: '#d4183d',
    label: 'Controllers/',
    sub: 'Lògica de flux',
    desc: 'Reben la petició, validen les dades i coordinen Model i Vista. Mai contenen lògica de negoci complexa.',
    example: 'CompraController · PeliculaController · SeatLockController',
  },
  {
    color: '#d97706',
    label: 'Middleware/',
    sub: 'Control d\'accés',
    desc: 'S\'executen ABANS del controlador. Si fallen, la petició no arriba mai al codi. Aquí viuen IsAdmin i CanManage.',
    example: 'IsAdmin · CanManage',
  },
  {
    color: '#0891b2',
    label: 'Models/',
    sub: 'Entitats i relacions',
    desc: 'Representen les taules de la BD amb les seves relacions Eloquent i els camps que es poden omplir.',
    example: 'User · Pelicula · Sesion · Reserva · SeatLock',
  },
  {
    color: '#16a34a',
    label: 'Services/',
    sub: 'Lògica de negoci',
    desc: 'Quan un mètode del controlador creix massa, la lògica es mou aquí. Controladors més petits, codi testejable.',
    example: 'PurchaseService · CachedMovieService · SeatAvailabilityService',
  },
]

export default function ArquitecturaMVCSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-7">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Estructura del projecte · Laravel 12</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Com Està Organitzat el Codi
            </motion.h2>
          </div>
        </div>

        <motion.div variants={staggerContainer(0.09, 0.25)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {layers.map((l) => (
            <motion.div key={l.label} variants={staggerItem}
              className="glass rounded-xl p-6 flex gap-5 items-start"
              style={{ borderLeft: `3px solid ${l.color}` }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${l.color}12` }}>
                <span className="text-[11px] font-black" style={{ color: l.color }}>app/</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-black text-gray-900 font-mono">{l.label}</span>
                  <span className="text-[8px] font-black uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
                    style={{ background: `${l.color}12`, color: l.color }}>{l.sub}</span>
                </div>
                <p className="text-[11px] text-gray-500 leading-snug mb-2">{l.desc}</p>
                <p className="text-[10px] font-mono text-gray-400">{l.example}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.p {...fadeUp(0.75)} className="text-center text-[11px] text-gray-400 italic mt-5">
          Cada carpeta té una sola responsabilitat. Si falla alguna cosa, sabem exactament on buscar.
        </motion.p>

      </div>
    </div>
  )
}
