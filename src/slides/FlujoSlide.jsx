import { motion } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../utils/motion'

const steps = [
  {
    num: '01',
    title: 'Selección de Entradas',
    desc: 'El usuario elige tipo de entrada y cantidad. El sistema calcula el total en tiempo real.',
    details: ['Adulto · Reducido · Familia · Jubilado', 'Cálculo de precio en tiempo real', 'Sin manipulación posible desde frontend'],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Mapa de Butacas',
    desc: 'Grid interactivo de filas y columnas. La butaca queda bloqueada en BD 8 minutos vía SeatLock.',
    details: ['Rojo: reservada · Naranja: bloqueada', 'Verde: seleccionada por ti', 'Estado actualizado vía AJAX en tiempo real'],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Pago y Confirmación',
    desc: 'Validación Luhn (tarjeta) o E.164 (Bizum). Precio recalculado en servidor. Ticket QR firmado.',
    details: ['DB::transaction con lockForUpdate', 'Si butaca tomada → SeatAlreadyReservedException', 'Ticket QR firmado HMAC-SHA256'],
    icon: (
      <svg className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
]

export default function FlujoSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-10">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Experiencia de usuario</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Flujo de Compra
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 relative">
          {/* Connector */}
          <motion.div className="hidden md:block absolute h-px origin-left"
            style={{ top: '4.2rem', left: 'calc(33.33% + 12px)', right: 'calc(33.33% + 12px)',
              background: 'linear-gradient(to right, rgba(212,24,61,0.5), rgba(212,24,61,0.8), rgba(212,24,61,0.5))' }}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.65, ease }} />

          {steps.map((step, i) => (
            <motion.div key={step.num}
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.14, ease }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group">
              <span className="absolute top-4 right-4 text-[4rem] font-black text-white/[0.03] leading-none select-none">{step.num}</span>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-cinema-red/30 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-cinema-red">{step.num}</span>
                </div>
                <motion.div className="flex-1 h-px bg-cinema-red/15 origin-left"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.14 }} />
              </div>

              <div className="text-cinema-red/70 group-hover:text-cinema-red transition-colors duration-300">{step.icon}</div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.07em] text-white mb-2">{step.title}</h3>
                <p className="text-[11px] text-white/40 leading-relaxed mb-3">{step.desc}</p>
                <ul className="space-y-1">
                  {step.details.map(d => (
                    <li key={d} className="flex items-start gap-2 text-[10px] text-white/25">
                      <span className="w-1 h-1 rounded-full bg-cinema-red/50 shrink-0 mt-1" />{d}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
