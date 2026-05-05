import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Selecciona la sesión',
    desc: 'Elige película, cine, fecha y horario desde la cartelera actualizada.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Elige tus butacas',
    desc: 'Mapa de sala en tiempo real con bloqueo temporal de asientos seleccionados.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Confirma y paga',
    desc: 'Revisa el resumen de tu pedido y completa el pago de forma segura.',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth={1.2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
]

export default function FlujoSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-12 md:px-20 py-14">
      <div className="w-full max-w-6xl mx-auto">

        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="red-line" />
          <h2 className="slide-title">Flujo de Compra</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 relative">
          {/* Connecting line */}
          <motion.div
            className="hidden md:block absolute top-16 left-[calc(33%+16px)] right-[calc(33%+16px)] h-px bg-gradient-to-r from-cinema-red/40 via-cinema-red/60 to-cinema-red/40"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'left' }}
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.4, 0, 0.2, 1] }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-8 flex flex-col gap-5 relative"
            >
              {/* Step number circle */}
              <div className="w-12 h-12 rounded-full border-2 border-cinema-red/40 flex items-center justify-center">
                <span className="text-cinema-red font-black text-sm">{step.num}</span>
              </div>

              <div className="text-cinema-red">{step.icon}</div>

              <div>
                <h3 className="font-black uppercase tracking-[0.08em] text-white text-base mb-2">{step.title}</h3>
                <p className="text-xs text-white/45 leading-relaxed">{step.desc}</p>
              </div>

              {/* Arrow connector (mobile) */}
              {i < steps.length - 1 && (
                <motion.div
                  className="md:hidden flex justify-center mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.15 }}
                >
                  <svg className="w-5 h-5 text-cinema-red/40 rotate-90" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
