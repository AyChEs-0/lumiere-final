import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const pros = [
  'Centralizar lógica en servicios (TMDB, SeatLock, PurchaseService) limpió los controladores enormemente.',
  'Docker homogeneizó PHP 8.4 y MySQL 8.4 entre los 3 miembros · Cero problemas de compatibilidad.',
  'Inspirarse en OCine y Yelmo marcó el rumbo del UX desde el principio.',
]

const cons = [
  'Implementar Stripe real con Webhooks en lugar del simulador actual de validación de tarjeta.',
  'Automatizar la ejecución de PHPUnit en el pipeline de Railway antes de cada deploy.',
  'Políticas RGPD: automatizar retención y borrado de datos físicos e históricos.',
  'Asincronía completa: Queues de Laravel para emails transaccionales en producción.',
]

const future = [
  { text: 'Pasarela de pago real con Stripe y Webhooks' },
  { text: 'SMTP real en producción para emails transaccionales' },
  { text: 'Generación de PDF con ticket QR adjunto descargable' },
  { text: 'Pipeline CI/CD con PHPUnit antes de cada deploy a Railway' },
]

export default function ReflexionSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-12">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-8">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Auditoría y Aprendizaje</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Reflexión del Equipo
            </motion.h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {/* Qué funcionó */}
          <motion.div {...fadeUp(0.25)} className="glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-green-500/40 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-green-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-green-500/80">Qué funcionó bien</span>
            </div>
            <ul className="flex flex-col gap-3">
              {pros.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-[11px] text-white/42 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-green-500/50 shrink-0 mt-1.5" />{p}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Qué mejoraríamos */}
          <motion.div {...fadeUp(0.35)} className="glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-orange-500/40 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-orange-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500/80">Qué mejoraríamos</span>
            </div>
            <ul className="flex flex-col gap-3">
              {cons.map((c) => (
                <li key={c} className="flex items-start gap-2.5 text-[11px] text-white/42 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-orange-500/50 shrink-0 mt-1.5" />{c}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Mejoras futuras */}
          <motion.div {...fadeUp(0.45)} className="glass rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border border-cinema-red/40 flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-cinema-red" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-cinema-red/80">Mejoras futuras</span>
            </div>
            <ul className="flex flex-col gap-3">
              {future.map((f) => (
                <li key={f.text} className="flex items-start gap-2.5 text-[11px] text-white/42 leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-cinema-red/50 shrink-0 mt-1.5" />{f.text}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
