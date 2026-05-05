import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const features = [
  {
    num: '01',
    title: 'Concurrencia ACID',
    tag: 'Sistema de Bloqueo de Butacas',
    desc: 'Bloqueo temporal con SeatLock TTL 8 minutos · lockForUpdate pesimista en DB::transaction · Comando CleanupExpiredSeatLocks cada minuto · Cero overbooking garantizado matemáticamente.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Integración TMDB',
    tag: 'Cartelera Híbrida en Tiempo Real',
    desc: 'Sincronización automática cada 6h con taquilla española · Parámetro region=ES · CachedMovieService con Graceful Degradation: si TMDB cae, sirve datos locales sin romper la web.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75.125v-3.375c0-.621.504-1.125 1.125-1.125h3.75m3.75 0V6a2.25 2.25 0 012.25-2.25h1.5A2.25 2.25 0 0118 6v7.5" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Checkout 3 Pasos',
    tag: 'Compra Segura y Validada',
    desc: 'Flujo guiado: Entradas → Butacas → Pago · Validación Luhn de tarjeta y regex E.164 para Bizum · Precio recalculado siempre en servidor · Ticket QR firmado HMAC-SHA256.',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
]

export default function FeaturesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-16">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-10">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Pilares del Sistema</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                Funcionalidades Clave
              </motion.h2>
            </div>
          </div>
          <motion.span {...fadeUp(0.3)}
            className="text-[clamp(3rem,6vw,5rem)] font-black text-white/4 leading-none select-none">
            03
          </motion.span>
        </div>

        <motion.div variants={staggerContainer(0.12, 0.2)} initial="initial" animate="animate"
          className="grid md:grid-cols-3 gap-5">
          {features.map((f) => (
            <motion.div key={f.num} variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-7 flex flex-col gap-5 group relative overflow-hidden">
              <motion.div className="absolute inset-0 bg-gradient-to-br from-cinema-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full border border-cinema-red/30 flex items-center justify-center text-cinema-red">
                  {f.icon}
                </div>
                <span className="text-[10px] font-black text-cinema-red/30 tracking-[0.15em]">{f.num}</span>
              </div>

              <div>
                <p className="label mb-1">{f.tag}</p>
                <h3 className="text-base font-black uppercase tracking-[0.06em] text-white mb-3">{f.title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
