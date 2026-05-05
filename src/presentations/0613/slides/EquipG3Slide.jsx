import { motion } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../../../utils/motion'

const states = [
  { color: '#6b7280', label: 'Lliure',      desc: 'disponible per seleccionar' },
  { color: '#16a34a', label: 'Seleccionada', desc: 'bloquejada per tu (8 min)' },
  { color: '#d97706', label: 'Bloquejada',   desc: 'un altre usuari la té reservada temporalment' },
  { color: '#d4183d', label: 'Reservada',    desc: 'compra confirmada, no disponible' },
]

export default function EquipG3Slide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Concurrència · SeatLock</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              El Problema Mes Complex: Les Butaques
            </motion.h2>
          </div>
        </div>

        {/* Problem + solution */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="glass rounded-xl p-6 flex flex-col gap-3"
            style={{ borderColor: 'rgba(212,24,61,0.2)' }}>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-cinema-red/70">El problema</span>
            <p className="text-[11px] text-white/45 leading-relaxed">
              Dos usuaris poden seleccionar la mateixa butaca al mateix moment. Sense control, ambdós confirmarien la compra
              i tindríem overbooking. Això és un problema de concurrència — no de codi, de timing.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="glass rounded-xl p-6 flex flex-col gap-3"
            style={{ borderColor: 'rgba(22,163,74,0.2)' }}>
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-[#16a34a]">La solució: SeatLock</span>
            <p className="text-[11px] text-white/45 leading-relaxed">
              Quan un usuari toca una butaca, es crea un registre a la taula <span className="font-mono text-white/65">seat_locks</span> amb
              un <span className="font-mono text-white/65">expires_at</span> de 8 minuts. Mentre el lock existeix, cap altre usuari pot seleccionar-la.
              Si abandona la compra, un Scheduler la allibera automàticament.
            </p>
          </motion.div>
        </div>

        {/* States */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.5, ease }}
          className="glass rounded-xl p-5 mb-4">
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/20 block mb-3">Estats del mapa de butaques</span>
          <div className="flex gap-3 flex-wrap">
            {states.map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                style={{ background: `${s.color}15`, border: `1px solid ${s.color}30` }}>
                <span className="w-2 h-2 rounded-sm shrink-0" style={{ background: s.color }} />
                <span className="text-[9px] font-black" style={{ color: s.color }}>{s.label}</span>
                <span className="text-[9px] text-white/30">— {s.desc}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Scheduler */}
        <motion.div
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.65, ease }}
          className="glass rounded-xl px-5 py-4 flex items-center gap-5"
          style={{ background: 'rgba(255,255,255,0.02)' }}>
          <div className="flex flex-col gap-1 shrink-0">
            <span className="text-[9px] font-black font-mono text-cinema-red/70">CleanupExpiredSeatLocks</span>
            <span className="text-[8px] text-white/25">Execució: cada minut</span>
          </div>
          <span className="w-px h-8 bg-white/10 shrink-0" />
          <p className="text-[10px] text-white/35">
            Allibera butaques amb <span className="font-mono text-white/55">expires_at</span> anterior a <span className="font-mono text-white/55">now()</span>.
            Sense aquest comando, les butaques abandonades mai es tornarien a alliberar.
          </p>
        </motion.div>

      </div>
    </div>
  )
}
