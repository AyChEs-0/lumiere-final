import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const rows = [
  { aspect: 'Routing', php: 'Router manual amb $_SERVER', laravel: 'Route::get() / Route::post()', winner: 'laravel' },
  { aspect: 'CSRF', php: 'Token manual a cada form', laravel: '@csrf Blade automàtic', winner: 'laravel' },
  { aspect: 'SQL', php: 'PDO + prepared statements', laravel: 'Eloquent ORM / Query Builder', winner: 'both' },
  { aspect: 'Validació', php: 'Validació al controlador', laravel: 'FormRequest + regles', winner: 'laravel' },
  { aspect: 'Contrasenyes', php: 'password_hash + BCRYPT', laravel: 'Hash::make() (mateixa crip.)', winner: 'both' },
  { aspect: 'Vistes', php: 'HTML + echo + include', laravel: 'Blade: @if, @foreach, @extends', winner: 'laravel' },
  { aspect: 'PRG Pattern', php: 'header(Location) + exit', laravel: 'return redirect()->route()', winner: 'both' },
]

export default function PHPvsLaravelSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" style={{ background: '#9333ea' }} />
          <motion.p {...fadeUp(0.05)} className="label mb-3">RA8 · Framework Laravel · Setmana 12</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              PHP Natiu vs Laravel
            </motion.h2>
          </div>
        </div>

        {/* Header */}
        <motion.div {...fadeUp(0.25)} className="grid grid-cols-[1fr_1fr_1fr] gap-3 mb-2 px-4">
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/20">Aspecte</span>
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#0891b2]/60">PHP Natiu</span>
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#9333ea]/60">Laravel</span>
        </motion.div>

        <motion.div variants={staggerContainer(0.06, 0.3)} initial="initial" animate="animate"
          className="flex flex-col gap-2">
          {rows.map((r) => (
            <motion.div key={r.aspect} variants={staggerItem}
              className="glass rounded-lg px-4 py-3 grid grid-cols-[1fr_1fr_1fr] gap-3 items-center">
              <span className="text-[10px] font-black text-white/60">{r.aspect}</span>
              <div className="flex items-center gap-2">
                {r.winner === 'both' && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0891b2]/60 shrink-0" />
                )}
                <span className="text-[9.5px] text-white/38 leading-snug font-mono">{r.php}</span>
              </div>
              <div className="flex items-center gap-2">
                {(r.winner === 'laravel' || r.winner === 'both') && (
                  <span className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: r.winner === 'both' ? '#16a34a80' : '#9333ea80' }} />
                )}
                <span className="text-[9.5px] leading-snug font-mono"
                  style={{ color: r.winner === 'laravel' ? 'rgba(147,51,234,0.7)' : 'rgba(255,255,255,0.38)' }}>
                  {r.laravel}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div {...fadeUp(0.8)} className="flex items-center gap-6 justify-center mt-5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#9333ea]/60" />
            <span className="text-[9px] text-white/30">Laravel millora</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#16a34a]/60" />
            <span className="text-[9px] text-white/30">Equivalent</span>
          </div>
          <span className="text-[9px] text-white/20 italic">La base en PHP feia que entenguessim que automatitzava Laravel</span>
        </motion.div>

      </div>
    </div>
  )
}
