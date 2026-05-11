import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const controllers = [
  {
    name: 'CompraController',
    color: '#d4183d',
    accent: true,
    desc: 'Flux de compra en 3 passos. Coordina SeatLock, PurchaseService i validació de concurrència.',
    methods: ['step1()', 'step2()', 'step3Store()'],
  },
  {
    name: 'PeliculaController',
    color: '#0891b2',
    desc: 'Cartellera pública i CRUD admin. Integra CachedMovieService amb fallback a BD local.',
    methods: ['index()', 'show()', 'syncTmdb()'],
  },
  {
    name: 'SeatLockController',
    color: '#9333ea',
    desc: 'API AJAX d\'estat de butaques en temps real. Retorna JSON: reserved · locked · mine.',
    methods: ['status()', 'lock()', 'release()'],
  },
  {
    name: 'AdminCineController',
    color: '#d97706',
    desc: 'CRUD de cines i sales. Valida amb FormRequest, relacions Eloquent cine → sala → sessió.',
    methods: ['index()', 'store()', 'update()', 'destroy()'],
  },
  {
    name: 'HomeController',
    color: '#16a34a',
    desc: 'Cartellera pública amb sessions futures. Sense problema N+1.',
    methods: ['index()'],
  },
  {
    name: 'Auth · Breeze',
    color: '#64748b',
    desc: 'Login, registre, recuperació de contrasenya. Redirecció per rol post-login.',
    methods: ['gestió nativa'],
  },
]

export default function FluxPeticioSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-7">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Capa de controladors</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Els Controladors Principals
            </motion.h2>
          </div>
        </div>

        <motion.div variants={staggerContainer(0.07, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {controllers.map((c) => (
            <motion.div key={c.name} variants={staggerItem}
              className="glass rounded-xl p-6 flex flex-col gap-3"
              style={c.accent ? { borderColor: `${c.color}30`, boxShadow: `0 0 20px ${c.color}06` } : {}}>
              <div className="flex items-center gap-3">
                <span className="text-[19px] font-black font-mono" style={{ color: c.color }}>{c.name}</span>
                {c.accent && (
                  <span className="text-[10px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded-full bg-cinema-red/10 text-cinema-red">principal</span>
                )}
              </div>
              <p className="text-[16px] text-gray-500 leading-snug">{c.desc}</p>
              <div className="flex flex-wrap gap-2">
                {c.methods.map((m) => (
                  <span key={m} className="text-[13px] font-mono font-black px-2.5 py-1 rounded-lg bg-gray-100 text-gray-500">{m}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
