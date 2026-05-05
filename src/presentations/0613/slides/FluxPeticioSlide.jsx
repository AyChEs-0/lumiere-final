import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const controllers = [
  {
    name: 'CompraController',
    color: '#d4183d',
    desc: 'Gestiona el flux de compra en 3 passos: selecció d\'entrades, mapa de butaques i pagament. Coordina SeatLock, PurchaseService i la validació de concurrència.',
    methods: ['step1()', 'step2()', 'step3Store()'],
    accent: true,
  },
  {
    name: 'PeliculaController',
    color: '#0891b2',
    desc: 'Gestiona la cartelera pública i el CRUD d\'administració. Integra CachedMovieService per obtenir dades de TMDB amb fallback local.',
    methods: ['index()', 'show()', 'store()', 'syncTmdb()'],
  },
  {
    name: 'SeatLockController',
    color: '#9333ea',
    desc: 'Exposa l\'API AJAX que el frontend consulta per saber l\'estat de cada butaca en temps real. Retorna JSON amb estats: reserved, locked, mine.',
    methods: ['status()', 'lock()', 'release()'],
  },
  {
    name: 'AdminCineController',
    color: '#d97706',
    desc: 'CRUD complet de cines i sales per als administradors. Valida amb FormRequest i gestiona les relacions Eloquent cine → sala → sessió.',
    methods: ['index()', 'store()', 'update()', 'destroy()'],
  },
  {
    name: 'HomeController',
    color: '#16a34a',
    desc: 'Construeix la cartelera pública filtrant només pel·lícules amb sessions futures reals. Aplica filtres per dia, franja horaria, cine i gènere sense problema N+1.',
    methods: ['index()'],
  },
  {
    name: 'Auth · Breeze',
    color: '#64748b',
    desc: 'Autenticació completa: login, registre, recuperació de contrasenya. Redirecció post-login per rol: admin→/admin/dashboard, cliente→/client/dashboard.',
    methods: ['gestió nativa Breeze'],
  },
]

export default function FluxPeticioSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Capa de controladors · Laravel 12</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Els Controladors: Qui Fa Que
            </motion.h2>
          </div>
        </div>

        <motion.div variants={staggerContainer(0.07, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-3">
          {controllers.map((c) => (
            <motion.div key={c.name} variants={staggerItem}
              className="glass rounded-xl p-5 flex flex-col gap-3"
              style={c.accent ? { borderColor: `${c.color}30`, boxShadow: `0 0 20px ${c.color}10` } : {}}>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-black font-mono" style={{ color: c.color }}>{c.name}</span>
                {c.accent && (
                  <span className="text-[7px] font-black uppercase tracking-[0.12em] px-2 py-0.5 rounded-full"
                    style={{ background: `${c.color}15`, color: c.color, border: `1px solid ${c.color}25` }}>
                    principal
                  </span>
                )}
              </div>
              <p className="text-[9.5px] text-white/38 leading-snug">{c.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {c.methods.map((m) => (
                  <span key={m} className="text-[8px] font-black font-mono px-2 py-0.5 rounded"
                    style={{ background: `${c.color}10`, color: `${c.color}80`, border: `1px solid ${c.color}18` }}>
                    {m}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
