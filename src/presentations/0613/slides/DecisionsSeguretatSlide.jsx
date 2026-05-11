import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const roles = [
  { rol: 'admin',   color: '#d4183d', access: 'Tot el sistema',              how: 'Manualment per l\'admin' },
  { rol: 'cliente', color: '#0891b2', access: 'Cartelera + reserves pròpies', how: 'Per defecte en registrar-se' },
  { rol: 'guest',   color: '#16a34a', access: 'Compra sense registre',        how: 'Flux especial sense compte' },
]

const middlewares = [
  {
    name: 'IsAdmin',
    color: '#d4183d',
    desc: 'Protegeix totes les rutes /admin/*. Si rol ≠ admin → 403 Forbidden.',
    code: "Route::middleware(['auth', 'isAdmin'])\n  ->group(fn() => [\n    Route::resource('peliculas',\n      AdminPeliculaController::class),\n  ]);",
  },
  {
    name: 'CanManage',
    color: '#9333ea',
    desc: 'Comprova el camp rol del model User en cada petició entrant.',
    code: "// User.php\npublic function isAdmin(): bool\n{\n    return $this->rol === 'admin';\n}",
  },
]

export default function DecisionsSeguretatSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-7">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Control d'accés · Middlewares</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Qui Pot Fer Què i Per Què
            </motion.h2>
          </div>
        </div>

        <motion.div {...fadeUp(0.28)} className="glass rounded-xl overflow-hidden mb-6">
          <div className="grid grid-cols-3 px-7 py-3 bg-gray-50/80 border-b border-gray-100">
            {['Rol', 'Accés', 'Com s\'assigna'].map((h) => (
              <span key={h} className="text-[13px] font-black uppercase tracking-[0.18em] text-gray-400">{h}</span>
            ))}
          </div>
          <motion.div variants={staggerContainer(0.07, 0.3)} initial="initial" animate="animate">
            {roles.map((r, i) => (
              <motion.div key={r.rol} variants={staggerItem}
                className={`grid grid-cols-3 px-7 py-4 ${i < roles.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <span className="text-[19px] font-black font-mono" style={{ color: r.color }}>{r.rol}</span>
                <span className="text-[17px] text-gray-700">{r.access}</span>
                <span className="text-[16px] text-gray-400">{r.how}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-2 gap-5">
          {middlewares.map((m, i) => (
            <motion.div key={m.name}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease }}
              className="glass rounded-xl p-6 flex flex-col gap-3">
              <span className="text-[19px] font-black font-mono" style={{ color: m.color }}>{m.name}</span>
              <p className="text-[16px] text-gray-500 leading-relaxed">{m.desc}</p>
              <pre className="text-[13px] font-mono text-gray-500 rounded-xl p-4 leading-relaxed"
                style={{ background: '#f3f4f6' }}>{m.code}</pre>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  )
}
