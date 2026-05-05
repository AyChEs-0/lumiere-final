import { motion } from 'framer-motion'
import { useState } from 'react'

const steps = [
  {
    num: '01',
    title: 'Selecciona la Sesión',
    desc: 'Elige la película, el cine, la fecha y el horario que mejor se adapte a ti.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    num: '02',
    title: 'Elige tus Butacas',
    desc: 'Visualiza el mapa de sala en tiempo real y selecciona los asientos disponibles.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    ),
  },
  {
    num: '03',
    title: 'Confirma y Paga',
    desc: 'Revisa el resumen de tu pedido y completa el pago de forma rápida y segura.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
      </svg>
    ),
  },
]

export default function FlujoPago() {
  const [active, setActive] = useState(0)

  return (
    <section id="proceso" className="relative py-32 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 max-w-2xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="red-line" />
          <h2 className="section-title mb-4">Flujo de Compra</h2>
          <p className="text-cinema-muted leading-relaxed">
            Proceso de compra optimizado en tres pasos guiados, con confirmación visual
            y bloqueo temporal de butacas para evitar conflictos de reserva.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Steps list */}
          <div className="flex flex-col gap-4">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                onClick={() => setActive(i)}
                className={`relative glass rounded-2xl p-6 cursor-pointer transition-all duration-300 group ${
                  active === i
                    ? 'border-cinema-red/50 shadow-red-glow'
                    : 'hover:border-cinema-red/25'
                }`}
              >
                <div className="flex items-start gap-5">
                  {/* Step number */}
                  <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-sm font-black border-2 transition-all duration-300 ${
                    active === i
                      ? 'border-cinema-red bg-cinema-red/10 text-cinema-red'
                      : 'border-white/10 text-white/30 group-hover:border-cinema-red/40'
                  }`}>
                    {step.num}
                  </div>

                  <div className="flex-1">
                    <div className={`flex items-center gap-3 mb-2 transition-colors duration-300 ${
                      active === i ? 'text-cinema-red' : 'text-white/40 group-hover:text-cinema-red/60'
                    }`}>
                      {step.icon}
                    </div>
                    <h3 className="font-black uppercase tracking-cinema text-white mb-2">
                      {step.title}
                    </h3>
                    <p className="text-cinema-muted text-sm leading-relaxed">{step.desc}</p>
                  </div>
                </div>

                {/* Active indicator */}
                {active === i && (
                  <motion.div
                    layoutId="step-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-cinema-red rounded-r-full"
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* Visual preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="glass rounded-3xl p-8 min-h-[340px] flex flex-col justify-between"
          >
            {/* Step header */}
            <div className="flex items-center gap-3 mb-6">
              {steps.map((_, i) => (
                <motion.div
                  key={i}
                  className="h-1 rounded-full cursor-pointer"
                  animate={{
                    backgroundColor: i === active ? '#d4183d' : 'rgba(255,255,255,0.1)',
                    flex: i === active ? 3 : 1,
                  }}
                  transition={{ duration: 0.4 }}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>

            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col justify-center"
            >
              <div className="text-cinema-red mb-4">
                {steps[active].icon}
              </div>
              <div className="text-6xl font-black text-white/5 mb-2 leading-none">
                {steps[active].num}
              </div>
              <h4 className="text-2xl font-black uppercase tracking-cinema text-white mb-3">
                {steps[active].title}
              </h4>
              <p className="text-cinema-muted leading-relaxed">
                {steps[active].desc}
              </p>
            </motion.div>

            {/* Navigation */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/5">
              <button
                onClick={() => setActive(Math.max(0, active - 1))}
                disabled={active === 0}
                className="text-xs font-bold uppercase tracking-cinema text-white/30 hover:text-white disabled:opacity-20 transition-colors duration-200"
              >
                ← Anterior
              </button>
              <span className="text-xs text-cinema-muted">{active + 1} / {steps.length}</span>
              <button
                onClick={() => setActive(Math.min(steps.length - 1, active + 1))}
                disabled={active === steps.length - 1}
                className="text-xs font-bold uppercase tracking-cinema text-white/30 hover:text-white disabled:opacity-20 transition-colors duration-200"
              >
                Siguiente →
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
