import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../../../utils/motion'

const steps = [
  {
    num: 1,
    color: '#0891b2',
    title: 'Navegador HTTP',
    action: 'L\'usuari clica "Reservar butaca"',
    detail: 'El navegador envia POST /bookings/store amb el form data. Les dades viatgen al servidor.',
    code: 'POST /bookings/store HTTP/1.1\nContent-Type: application/x-www-form-urlencoded\n\nsession_id=42&seat_id=7',
  },
  {
    num: 2,
    color: '#9333ea',
    title: 'index.php · Router Manual',
    action: 'Enruta la petició al controlador correcte',
    detail: 'Un fitxer central analitza $_SERVER["REQUEST_URI"] i $_SERVER["REQUEST_METHOD"] per decidir quin controlador i mètode invocar.',
    code: '$uri = $_SERVER["REQUEST_URI"];\nif ($uri === "/bookings/store"\n    && $method === "POST") {\n  (new BookingController)->store();\n}',
  },
  {
    num: 3,
    color: '#d4183d',
    title: 'BookingController::store()',
    action: 'Valida, processa i delega al Model',
    detail: 'El controlador valida les dades d\'entrada, comprova que la butaca estigui disponible i crida el Model per persisitir la reserva.',
    code: 'class BookingController {\n  public function store(): void {\n    $sessionId = (int)$_POST["session_id"];\n    $seatId    = (int)$_POST["seat_id"];\n    Booking::create($sessionId, $seatId);\n    header("Location: /bookings/confirm");\n    exit;\n  }\n}',
  },
  {
    num: 4,
    color: '#16a34a',
    title: 'Booking::create() · PDO',
    action: 'Executa la query amb prepared statement',
    detail: 'El Model fa la query a MySQL via PDO. Utilitza placeholders per evitar SQL injection. Retorna l\'ID de la nova reserva.',
    code: 'static function create(int $sid, int $seat): int {\n  $stmt = self::$pdo->prepare(\n    "INSERT INTO bookings\n     (session_id, seat_id, user_id)\n     VALUES (?, ?, ?)"\n  );\n  $stmt->execute([$sid, $seat, $_SESSION["user_id"]]);\n  return self::$pdo->lastInsertId();\n}',
  },
]

export default function FluxPeticioSlide() {
  const [active, setActive] = useState(0)
  const step = steps[active]

  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" style={{ background: '#0891b2' }} />
          <motion.p {...fadeUp(0.05)} className="label mb-3">RA5 · MVC Manual · Flux complet</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Flux d'una Peticio Real
            </motion.h2>
          </div>
        </div>

        {/* Step selector */}
        <motion.div {...fadeUp(0.3)} className="flex gap-3 mb-6">
          {steps.map((s, i) => (
            <button key={s.num} onClick={() => setActive(i)}
              className="flex-1 glass rounded-lg px-3 py-2.5 flex flex-col gap-1 transition-all duration-200 text-left"
              style={active === i ? { borderColor: `${s.color}40`, boxShadow: `0 0 16px ${s.color}12` } : {}}>
              <span className="text-[8px] font-black" style={{ color: active === i ? s.color : '#ffffff30' }}>Pas {s.num}</span>
              <span className="text-[10px] font-black" style={{ color: active === i ? '#ffffff' : '#ffffff40' }}>{s.title}</span>
            </button>
          ))}
        </motion.div>

        {/* Active step detail */}
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-xl p-6 grid grid-cols-[1fr_auto] gap-6 items-start"
            style={{ borderColor: `${step.color}20` }}>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0"
                  style={{ background: `${step.color}15`, border: `1px solid ${step.color}30`, color: step.color }}>
                  {step.num}
                </span>
                <div>
                  <p className="text-[13px] font-black text-white">{step.action}</p>
                  <span className="text-[9px] font-black uppercase tracking-[0.12em]" style={{ color: step.color }}>{step.title}</span>
                </div>
              </div>
              <p className="text-[11px] text-white/45 leading-relaxed">{step.detail}</p>

              {/* nav buttons */}
              <div className="flex gap-3 mt-2">
                <button onClick={() => setActive(Math.max(0, active - 1))}
                  disabled={active === 0}
                  className="text-[9px] font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full border transition-colors duration-200 disabled:opacity-25"
                  style={{ borderColor: `${step.color}30`, color: `${step.color}70` }}>
                  Anterior
                </button>
                <button onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                  disabled={active === steps.length - 1}
                  className="text-[9px] font-black uppercase tracking-[0.14em] px-4 py-1.5 rounded-full transition-colors duration-200 disabled:opacity-25"
                  style={{ background: `${step.color}20`, color: step.color, border: `1px solid ${step.color}30` }}>
                  Seguent
                </button>
              </div>
            </div>

            <pre className="text-[9px] font-mono leading-relaxed text-white/50 rounded-lg p-4 shrink-0 max-w-[340px]"
              style={{ background: `${step.color}06`, border: `1px solid ${step.color}15` }}>
              {step.code}
            </pre>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  )
}
