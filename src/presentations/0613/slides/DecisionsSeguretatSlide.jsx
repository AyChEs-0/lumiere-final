import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const roles = [
  { rol: 'admin',    access: 'Tot el sistema',                  how: 'Manualment per l\'administrador' },
  { rol: 'cliente',  access: 'Cartelera + reserves pròpies',    how: 'Per defecte en el registre' },
  { rol: 'guest',    access: 'Compra sense registre',           how: 'Flux especial sense compte' },
]

const middlewares = [
  {
    name: 'IsAdmin',
    color: '#d4183d',
    desc: 'Protegeix totes les rutes /admin/*. Si l\'usuari no té rol = admin, retorna error 403 Forbidden. S\'aplica com a grup de rutes a web.php.',
    code: "Route::middleware(['auth', 'isAdmin'])->group(...)",
  },
  {
    name: 'CanManage',
    color: '#9333ea',
    desc: 'Permet accés a funcions de gestió operativa. Comprova el camp rol del model User en cada petició entrant.',
    code: "public function isAdmin(): bool\n{\n    return $this->rol === 'admin';\n}",
  },
]

export default function DecisionsSeguretatSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Control d'accés · Middlewares</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Qui Pot Fer Que i Per Que
            </motion.h2>
          </div>
        </div>

        {/* Roles table */}
        <motion.div {...fadeUp(0.28)} className="glass rounded-xl mb-5 overflow-hidden">
          <div className="grid grid-cols-3 px-5 py-2.5 border-b border-white/5">
            {['Rol', 'Accés', 'Com s\'assigna'].map((h) => (
              <span key={h} className="text-[8px] font-black uppercase tracking-[0.18em] text-white/20">{h}</span>
            ))}
          </div>
          <motion.div variants={staggerContainer(0.07, 0.3)} initial="initial" animate="animate">
            {roles.map((r, i) => (
              <motion.div key={r.rol} variants={staggerItem}
                className={`grid grid-cols-3 px-5 py-3 ${i < roles.length - 1 ? 'border-b border-white/[0.04]' : ''}`}>
                <span className="text-[10px] font-black text-white font-mono">{r.rol}</span>
                <span className="text-[10px] text-white/45">{r.access}</span>
                <span className="text-[10px] text-white/30">{r.how}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Middleware cards */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          {middlewares.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease }}
              className="glass rounded-xl p-5 flex flex-col gap-3"
              style={{ borderColor: `${m.color}20` }}>
              <span className="text-[10px] font-black font-mono" style={{ color: m.color }}>{m.name}</span>
              <p className="text-[10px] text-white/40 leading-relaxed">{m.desc}</p>
              <pre className="text-[8.5px] font-mono text-white/40 rounded-lg p-3"
                style={{ background: `${m.color}08`, border: `1px solid ${m.color}15` }}>
                {m.code}
              </pre>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp(0.75)} className="text-center text-[10px] text-cinema-red/50 italic">
          Per que ENUM i no una taula de permisos? El projecte té 3 rols fixos que no canvien en execució. Una taula dinàmica afegiria complexitat sense cap benefici real.
        </motion.p>

      </div>
    </div>
  )
}
