import { motion } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../utils/motion'

const steps = [
  {
    num: '01',
    title: 'Selecciona la sesión',
    desc: 'Elige película, cine, fecha y horario desde la cartelera actualizada en tiempo real.',
    detail: ['Filtro por fecha', 'Selección de cine', 'Horarios disponibles'],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Elige tus butacas',
    desc: 'Mapa de sala interactivo con bloqueo temporal — las butacas se reservan mientras decides.',
    detail: ['Mapa en tiempo real', 'Bloqueo de 10 min', 'Multi-selección'],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Confirma y paga',
    desc: 'Resumen lateral con desglose de precio. Confirma el pedido y recibe tu entrada.',
    detail: ['Resumen de pedido', 'Desglose de precio', 'Confirmación visual'],
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
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
          <motion.p   {...fadeUp(0.05)} className="label mb-3">Experiencia de usuario</motion.p>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }}
              className="s-title"
            >
              Flujo de Compra
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 relative">

          {/* Animated connector line */}
          <motion.div
            className="hidden md:block absolute top-[4.5rem] left-[calc(33.33%+10px)] right-[calc(33.33%+10px)] h-px"
            style={{ background: 'linear-gradient(to right, rgba(212,24,61,0.5), rgba(212,24,61,0.8), rgba(212,24,61,0.5))' }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.65, ease }}
            // origin-left
          />
          {/* Connector dots */}
          {[0, 1].map(i => (
            <motion.div
              key={i}
              className="hidden md:block absolute top-[4.5rem] w-1.5 h-1.5 rounded-full bg-cinema-red -translate-y-0.5"
              style={{ left: i === 0 ? 'calc(33.33% + 8px)' : 'calc(66.66% - 8px)' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.65 + i * 0.2 }}
            />
          ))}

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.14, ease }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-7 flex flex-col gap-4 group relative overflow-hidden"
            >
              {/* Background number */}
              <span className="absolute top-4 right-5 text-[5rem] font-black text-white/[0.03] leading-none select-none">
                {step.num}
              </span>

              {/* Step number badge */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full border border-cinema-red/30 flex items-center justify-center">
                  <span className="text-[10px] font-black text-cinema-red">{step.num}</span>
                </div>
                <motion.div
                  className="flex-1 h-px bg-cinema-red/20 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.14 }}
                />
              </div>

              <div className="text-cinema-red/70 group-hover:text-cinema-red transition-colors duration-300">
                {step.icon}
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.08em] text-white mb-2">{step.title}</h3>
                <p  className="text-[11px] text-white/42 leading-relaxed mb-4">{step.desc}</p>
                <ul className="space-y-1">
                  {step.detail.map(d => (
                    <li key={d} className="flex items-center gap-2 text-[10px] text-white/28">
                      <span className="w-1 h-1 rounded-full bg-cinema-red/50 shrink-0" />
                      {d}
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
