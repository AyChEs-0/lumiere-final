import { motion } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../../../utils/motion'

const states = [
  { color: '#6b7280', label: 'Lliure' },
  { color: '#16a34a', label: 'Seleccionada (tu, 8 min)' },
  { color: '#d97706', label: 'Bloquejada (altre usuari)' },
  { color: '#d4183d', label: 'Reservada (confirmada)' },
]

const codeTransaction = `DB::transaction(function () use ($data) {
    // 1. Crear la reserva
    $reserva = Reserva::create([
        'session_id' => $data->sessionId,
        'user_id'    => auth()->id(),
        'total'      => $data->total,
    ]);

    // 2. Associar cada butaca
    foreach ($data->seats as $seatId) {
        ReservaSeat::create([
            'reserva_id' => $reserva->id,
            'seat_id'    => $seatId,
        ]);
        // 3. Alliberar el lock
        SeatLock::where('seat_id', $seatId)->delete();
    }
});`

export default function EquipG3Slide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Concurrència · SeatLock · PurchaseService</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              El Sistema de Butaques
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {/* Left: problem + states */}
          <div className="flex flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease }}
              className="glass rounded-xl p-5 flex flex-col gap-3">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-cinema-red">El problema</span>
              <p className="text-[12px] text-gray-600 leading-relaxed">
                Dos usuaris poden clicar la mateixa butaca al mateix moment. Sense control, ambdós confirmarien
                la compra i tindríem <span className="font-black text-gray-900">overbooking</span>.
              </p>
              <p className="text-[11px] text-gray-400 italic">
                Solució: <span className="font-black text-gray-600">seat_locks</span> amb TTL de 8 minuts + DB::transaction al confirmar.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.42, ease }}
              className="glass rounded-xl p-5 flex flex-col gap-3">
              <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">Estats del mapa</span>
              <div className="grid grid-cols-2 gap-2">
                {states.map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: s.color }} />
                    <span className="text-[10px] text-gray-600">{s.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: code */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease }}
            className="glass rounded-xl p-5 flex flex-col gap-3">
            <span className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400">
              PurchaseService · confirmPurchase()
            </span>
            <pre className="text-[9.5px] font-mono text-gray-600 leading-relaxed flex-1 overflow-hidden"
              style={{ background: '#f8f9fa', borderRadius: '0.75rem', padding: '1rem' }}>
              {codeTransaction}
            </pre>
            <p className="text-[9px] text-gray-400 italic">
              Si falla qualsevol pas, la BD queda intacta. Tot o res.
            </p>
          </motion.div>
        </div>

      </div>
    </div>
  )
}
