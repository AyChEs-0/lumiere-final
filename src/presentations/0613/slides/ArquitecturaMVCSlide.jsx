import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const tree = [
  { depth: 0, name: 'app/', type: 'dir' },
  { depth: 1, name: 'Http/', type: 'dir' },
  { depth: 2, name: 'Controllers/', type: 'dir', note: '← Lògica de flux' },
  { depth: 2, name: 'Middleware/', type: 'dir', note: '← Control d\'accés' },
  { depth: 1, name: 'Models/', type: 'dir', note: '← Entitats i relacions' },
  { depth: 1, name: 'Services/', type: 'dir', note: '← Lògica de negoci' },
]

const descriptions = [
  { name: 'Controllers/', color: '#d4183d', desc: 'Reben peticions, validen, coordinen Model i Vista. Mai contenen lògica de negoci complexa.' },
  { name: 'Middleware/', color: '#d97706', desc: 'Filtres que s\'executen abans del controlador. Aquí viuen IsAdmin i CanManage. Si el filtre falla, la petició no arriba mai al controlador.' },
  { name: 'Models/', color: '#0891b2', desc: 'Representen les taules: User, Pelicula, Sesion, Reserva, SeatLock. Contenen les relacions Eloquent i els accessors.' },
  { name: 'Services/', color: '#16a34a', desc: 'Lògica complexa separada del controlador: PurchaseService, CachedMovieService, SeatAvailabilityService, GuestCheckoutService.' },
]

export default function ArquitecturaMVCSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Estructura del projecte · Laravel 12</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Com Està Organitzat el Codi
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-5">
          {/* Tree */}
          <motion.div {...fadeUp(0.3)} className="glass rounded-xl p-6">
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-white/20 block mb-4">Estructura de carpetes</span>
            <div className="flex flex-col gap-1.5 font-mono">
              {tree.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.35 + i * 0.07, ease }}
                  className="flex items-center gap-1"
                  style={{ paddingLeft: `${item.depth * 20}px` }}>
                  {item.depth > 0 && <span className="text-white/15 text-[10px]">├── </span>}
                  <svg className="w-3 h-3 shrink-0" fill="none" stroke={item.depth === 0 ? '#d4183d' : item.depth === 1 ? '#0891b2' : '#9333ea'} strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                  </svg>
                  <span className="text-[10px] text-white/55">{item.name}</span>
                  {item.note && <span className="text-[9px] text-white/20 ml-1">{item.note}</span>}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Descriptions */}
          <motion.div variants={staggerContainer(0.08, 0.3)} initial="initial" animate="animate"
            className="flex flex-col gap-3">
            {descriptions.map((d) => (
              <motion.div key={d.name} variants={staggerItem}
                className="glass rounded-lg px-4 py-3 flex gap-3 items-start">
                <span className="text-[8px] font-black font-mono px-2 py-1 rounded whitespace-nowrap mt-0.5"
                  style={{ background: `${d.color}12`, color: d.color, border: `1px solid ${d.color}20` }}>
                  {d.name}
                </span>
                <p className="text-[9.5px] text-white/40 leading-snug">{d.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.75)} className="glass rounded-xl px-5 py-3">
          <p className="text-[10px] text-white/30 italic text-center">
            Separar en carpetes no és estètica — és que cada arxiu té una sola responsabilitat. Si falla alguna cosa, sabem exactament on buscar.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
