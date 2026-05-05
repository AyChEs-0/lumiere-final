import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../../../utils/motion'

const encerts = [
  { text: 'PDO des del primer dia — zero SQL injection al llarg del projecte', color: '#16a34a' },
  { text: 'PRG implementat en tots els formularis — cap enviament duplicat', color: '#16a34a' },
]
const millores = [
  { text: 'Router manual molt verbós — un mini-framework hauria estalviat temps', color: '#d97706' },
  { text: 'Falta de tests unitaris — detecció manual de regressions era lenta', color: '#d97706' },
]

const faqs = [
  {
    q: 'Per que no vareu usar un micro-framework com Slim des de l\'inici?',
    a: 'El mòdul 0613 requereix demostrar que saps construir l\'arquitectura sense ajuda. Slim o Silex amagarien el routing i el lifecycle de la petició. Un cop entenem el que automatitzen, la migració a Laravel és molt més ràpida i amb criteri.',
  },
  {
    q: 'Com haveu gestionat les sessions i l\'autenticació?',
    a: 'session_start() a cada pàgina, $_SESSION["user_id"] com a font de veritat. El logout destrueix la sessió completament. Per a Laravel usem Breeze però el flux és idèntic conceptualment.',
  },
  {
    q: 'Quin era el risc de seguretat mes gran que haveu identificat?',
    a: 'El bloqueig de butaques sense transacció atòmica. Dues reserves simultànies podien confirmar el mateix seient. A PHP natiu ho resolem amb SELECT FOR UPDATE; a Laravel amb DB::transaction().',
  },
  {
    q: 'L\'ORM de Laravel reemplaça PDO completament?',
    a: 'No del tot. Eloquent usa PDO internament. Per a queries complexes (JOINs de múltiples taules) seguim usant Query Builder amb mètodes com join() i whereRaw(), que acaben generant prepared statements iguals.',
  },
  {
    q: 'Com vareu versionar l\'esquema de la base de dades?',
    a: 'A PHP natiu, fitxers SQL numerats (001_create_users.sql) commitejats al repo. A Laravel, migracions Eloquent (php artisan migrate). El concepte és el mateix, Laravel ho automatitza i afegeix rollback.',
  },
]

export default function ReflexioFAQSlide() {
  const [open, setOpen] = useState(null)

  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-6">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-5">
          <motion.span {...drawLine(0.05)} className="red-bar" style={{ background: '#0891b2' }} />
          <motion.p {...fadeUp(0.05)} className="label mb-2">RA9 · Reflexio i preguntes</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Aprenentatges i Preguntes
            </motion.h2>
          </div>
        </div>

        {/* Reflexion — compact */}
        <motion.div {...fadeUp(0.25)} className="grid grid-cols-2 gap-3 mb-5">
          <div className="glass rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#16a34a]">Encerts</span>
            {encerts.map((e) => (
              <div key={e.text} className="flex items-start gap-2">
                <svg className="w-3 h-3 text-[#16a34a] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <span className="text-[10px] text-white/45 leading-snug">{e.text}</span>
              </div>
            ))}
          </div>
          <div className="glass rounded-xl p-4 flex flex-col gap-2">
            <span className="text-[8px] font-black uppercase tracking-[0.18em] text-[#d97706]">Millorariem</span>
            {millores.map((m) => (
              <div key={m.text} className="flex items-start gap-2">
                <svg className="w-3 h-3 text-[#d97706] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span className="text-[10px] text-white/45 leading-snug">{m.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ */}
        <motion.div {...fadeUp(0.4)}>
          <span className="text-[8px] font-black uppercase tracking-[0.18em] text-white/20 block mb-2">Preguntes freqüents</span>
          <div className="flex flex-col gap-1.5">
            {faqs.map((f, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.45 + i * 0.06, ease }}
                className="glass rounded-lg overflow-hidden">
                <button onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left hover:bg-white/[0.02] transition-colors">
                  <span className="text-[8px] font-black text-[#0891b2]/50 shrink-0">Q{i + 1}</span>
                  <span className="text-[10px] text-white/55 flex-1 leading-snug">{f.q}</span>
                  <svg className={`w-3 h-3 text-white/15 transition-transform duration-200 shrink-0 ${open === i ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                      className="overflow-hidden">
                      <p className="px-4 pb-3 pt-1 text-[9.5px] text-white/38 leading-relaxed border-t border-white/5">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  )
}
