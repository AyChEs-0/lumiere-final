import { motion } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../../../utils/motion'

const layers = [
  {
    color: '#0891b2',
    label: 'Model',
    sub: 'Dades i lògica de negoci',
    items: ['Connexió PDO', 'Queries preparades', 'Entitats: User, Movie, Room, Session, Booking'],
    size: 'small',
  },
  {
    color: '#d4183d',
    label: 'Controlador',
    sub: 'Orquestra la petició',
    items: ['Rep $_GET / $_POST', 'Valida i sanititza', 'Crida el Model', 'Redirigeix (PRG) o renderitza Vista'],
    size: 'large',
  },
  {
    color: '#9333ea',
    label: 'Vista',
    sub: 'Presentació HTML',
    items: ['PHP mínim (echo, foreach)', 'htmlspecialchars() obligatori', 'Layout include compartit'],
    size: 'small',
  },
]

const flow = [
  { step: '1', label: 'Navegador envia petició HTTP' },
  { step: '2', label: 'index.php enruta al Controlador' },
  { step: '3', label: 'Controlador consulta el Model' },
  { step: '4', label: 'Model retorna dades de MySQL via PDO' },
  { step: '5', label: 'Controlador passa dades a la Vista' },
  { step: '6', label: 'Vista renderitza HTML al navegador' },
]

export default function ArquitecturaMVCSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" style={{ background: '#0891b2' }} />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Patró arquitectural · Setmanes 10–11</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Arquitectura MVC Manual
            </motion.h2>
          </div>
        </div>

        {/* MVC columns */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {layers.map((l, i) => (
            <motion.div key={l.label}
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease }}
              className={`glass rounded-xl p-5 flex flex-col gap-3 ${l.size === 'large' ? 'border' : ''}`}
              style={l.size === 'large' ? { borderColor: `${l.color}30`, boxShadow: `0 0 24px ${l.color}12` } : {}}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full" style={{ background: l.color }} />
                  <span className="text-[11px] font-black text-white">{l.label}</span>
                  {l.size === 'large' && (
                    <span className="text-[7px] font-black uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-full"
                      style={{ background: `${l.color}15`, color: l.color }}>nucli</span>
                  )}
                </div>
                <span className="text-[9px] text-white/30">{l.sub}</span>
              </div>
              <div className="flex flex-col gap-1.5">
                {l.items.map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full mt-1.5 shrink-0" style={{ background: `${l.color}50` }} />
                    <span className="text-[9.5px] text-white/45 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Flow */}
        <motion.div {...fadeUp(0.6)} className="glass rounded-xl p-4">
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/20 block mb-3">Flux d'una petició</span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {flow.map((f, i) => (
              <div key={f.step} className="flex items-center gap-1.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black shrink-0"
                    style={{ background: '#0891b215', border: '1px solid #0891b230', color: '#0891b2' }}>{f.step}</span>
                  <span className="text-[9px] text-white/40">{f.label}</span>
                </div>
                {i < flow.length - 1 && (
                  <svg className="w-3 h-3 text-white/15 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
