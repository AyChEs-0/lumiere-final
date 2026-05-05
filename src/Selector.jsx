import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const modules = [
  {
    path: '/0616',
    code: '0616',
    color: '#d4183d',
    title: 'Projecte Intermodular',
    sub: 'Gestió · Scrum · Planificació',
    desc: '12 diapositives · 4 RAs · Informes de seguiment, tutoria i decisions de gestió',
    num: '12',
    numLabel: 'slides',
  },
  {
    path: '/0613',
    code: '0613',
    color: '#0891b2',
    title: 'Programació Servidor',
    sub: 'PHP Natiu · MVC · PDO · Laravel',
    desc: '10 diapositives · 9 RAs · Arquitectura MVC, seguretat web i migració a Laravel',
    num: '10',
    numLabel: 'slides',
  },
]

export default function Selector() {
  return (
    <div className="film-grain relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] via-[#0d0808] to-[#080808]" />

      <motion.div className="absolute w-[900px] h-[900px] rounded-full pointer-events-none opacity-40"
        style={{ background: 'radial-gradient(circle, rgba(212,24,61,0.05) 0%, transparent 65%)' }}
        animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }} />

      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

      <div className="relative z-10 w-full max-w-5xl px-[8vw]">

        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="label mb-4">
            Cine Lumiere · CFGS DAW · Institut F. Vidal i Barraquer · 2025–2026
          </motion.p>
          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="text-[clamp(2.5rem,6vw,5rem)] font-black uppercase leading-none text-white">
              Selecciona la presentació
            </motion.h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {modules.map((m, i) => (
            <motion.div key={m.code}
              initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.35 + i * 0.12, ease: [0.4, 0, 0.2, 1] }}>
              <Link to={m.path} className="block group">
                <div className="glass rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300
                                group-hover:border-opacity-50 group-hover:scale-[1.015]"
                  style={{ border: `1px solid ${m.color}20` }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 0 40px ${m.color}12`}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = ''}>

                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] block mb-2"
                        style={{ color: `${m.color}80` }}>Mòdul {m.code}</span>
                      <h2 className="text-[1.6rem] font-black text-white leading-tight">{m.title}</h2>
                      <p className="text-[11px] font-black mt-1" style={{ color: `${m.color}70` }}>{m.sub}</p>
                    </div>
                    <div className="text-right shrink-0 ml-4">
                      <span className="text-[3rem] font-black leading-none" style={{ color: `${m.color}15` }}>{m.num}</span>
                      <p className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 -mt-1">{m.numLabel}</p>
                    </div>
                  </div>

                  <p className="text-[11px] text-white/35 leading-relaxed">{m.desc}</p>

                  <div className="flex items-center gap-2" style={{ color: `${m.color}60` }}>
                    <span className="text-[9px] font-black uppercase tracking-[0.18em]">Obrir presentació</span>
                    <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1"
                      fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>

                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center text-[9px] text-white/15 uppercase tracking-[0.2em] mt-10">
          Equip G3 · Ayman Charoui · Danna Guevara · Ismael Achamrouk
        </motion.p>
      </div>
    </div>
  )
}
