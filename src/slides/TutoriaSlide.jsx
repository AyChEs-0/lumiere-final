import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const problems = [
  "Absència de middleware de rols — un client podia accedir a rutes d'admin",
  'Reserves sense bloqueig temporal — risc de doble reserva no controlat',
  'Validacions disperses entre controlador i Blade — inconsistència',
  'Falta de traçabilitat RF ↔ Issue ↔ Codi — sense evidència de cobertura',
]

const actions = [
  { id: 'TK-015', desc: 'Middleware de rols',       who: 'Danna', date: '19/02' },
  { id: 'TK-016', desc: 'Bloqueig de butaques',     who: 'Ismael', date: '19/02' },
  { id: 'TK-017', desc: 'FormRequests centralitzats', who: 'Ayman', date: '20/02' },
  { id: 'TK-018', desc: 'SMTP recuperació contrasenya', who: 'Danna', date: '20/02' },
  { id: 'TK-019', desc: 'Traçabilitat RF ↔ Codi',   who: 'Ayman', date: '22/02' },
]

const whoColor = { Ayman: '#d4183d', Ismael: '#0891b2', Danna: '#9333ea' }

export default function TutoriaSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-10">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-8">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.div {...fadeUp(0.05)} className="flex items-center gap-3 mb-3">
            <span className="label">El punt d'inflexió del projecte</span>
            <span className="text-[9px] font-black uppercase tracking-[0.16em] px-3 py-1 rounded-full bg-cinema-red/15 text-cinema-red border border-cinema-red/30">
              Tutoria · 19 Febrer 2026
            </span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              El Dia que ens van Frenar
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">

          {/* Left — Problems */}
          <motion.div {...fadeUp(0.3)} className="glass rounded-2xl p-6 flex flex-col gap-5"
            style={{ borderColor: 'rgba(212,24,61,0.2)', boxShadow: '0 0 30px rgba(212,24,61,0.08)' }}>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-cinema-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-cinema-red">Problemes detectats</span>
            </div>
            <motion.ul variants={staggerContainer(0.1, 0.35)} initial="initial" animate="animate"
              className="flex flex-col gap-3">
              {problems.map((p) => (
                <motion.li key={p} variants={staggerItem}
                  className="flex items-start gap-3 text-[11px] text-white/45 leading-relaxed">
                  <svg className="w-3.5 h-3.5 text-cinema-red/60 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  {p}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right — Action plan */}
          <motion.div {...fadeUp(0.38)} className="glass rounded-2xl p-6 flex flex-col gap-5">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-green-500">Pla de millora: 5 accions en 5 dies</span>
            </div>
            <motion.div variants={staggerContainer(0.08, 0.4)} initial="initial" animate="animate"
              className="flex flex-col gap-2.5">
              {actions.map((a) => (
                <motion.div key={a.id} variants={staggerItem}
                  className="glass rounded-lg px-4 py-2.5 flex items-center gap-4">
                  <span className="text-[9px] font-black text-cinema-red/70 whitespace-nowrap">{a.id}</span>
                  <span className="text-[10px] text-white/60 flex-1">{a.desc}</span>
                  <span className="text-[9px] font-black whitespace-nowrap" style={{ color: whoColor[a.who] }}>{a.who}</span>
                  <span className="text-[8px] text-white/25 whitespace-nowrap">{a.date}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>

        <motion.p {...fadeUp(0.7)}
          className="text-center text-[11px] text-white/30 italic mt-8">
          Totes tancades en 5 dies.
          <span className="text-white/50 not-italic font-black ml-2">Detectar problemes a temps és part de la gestió.</span>
        </motion.p>

      </div>
    </div>
  )
}
