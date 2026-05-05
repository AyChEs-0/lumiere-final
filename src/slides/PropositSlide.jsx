import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const problems = [
  {
    num: '01',
    title: 'Gestió fragmentada',
    desc: 'Els cinemes tradicionals gestionen programació, reserves i taquilla amb sistemes separats. El resultat és descontrol operatiu i errors humans evitables.',
  },
  {
    num: '02',
    title: "Experiència d'usuari pobra",
    desc: "Yelmo i OCine tenen fluxos de compra poc intuïtius en mòbil. L'usuari perd temps i abandona el procés. Vam dissenyar pensant primer en el mòbil.",
  },
  {
    num: '03',
    title: 'Risc de doble reserva',
    desc: "Cap referent explica com gestiona la concurrència de butaques. Nosaltres vam fer-ho el nucli tècnic: SeatLock garanteix cero overbooking.",
  },
]

const levels = [
  {
    color: '#d4183d', label: 'Administrador', desc: 'Control global de cines, sales, pel·lícules i sessions',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
  },
  {
    color: '#0891b2', label: 'Client', desc: "Compra d'entrades, selecció de butaques, historial de reserves",
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" /></svg>,
  },
  {
    color: '#6b7280', label: 'Guest', desc: 'Compra sense registre — decisió tècnica per reduir fricció',
    icon: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" /></svg>,
  },
]

const steps = [
  { num: '01', title: 'Benchmarking real',                  desc: "OCine i Yelmo: fortaleses en catàleg, febleses en flux de compra mòbil. Tot documentat en Canva." },
  { num: '02', title: 'Requisits (RF i RNF)',               desc: "9 RF + 5 RNF. RF4 (bloqueig butaques) i RF6 (QR) van ser els més complexos tècnicament." },
  { num: '03', title: 'Modelat de dades (MER)',             desc: "9 taules, N:M Pel·lícules-Categories, índex únic (nom, ciutat) per a Cines. Decisions al paper." },
  { num: '04', title: 'Planificació àgil amb Trello',       desc: "Kanban WIP-2. 8 fases setmana 10→entrega. Tasques TK-001 a TK-038." },
]

const palette = ['#111111', '#1a0a0a', '#800000', '#d4183d', '#9ca3af']

const designBadges = [
  { label: 'Fons #111111',    desc: "Redueix fatiga visual · Emfatitza pòsters" },
  { label: 'Vermell #d4183d', desc: "Color d'acció · CTA de compra sempre visible" },
  { label: 'Mobile First',    desc: "70% compres des del mòbil · Checkout per a 390px" },
]

export default function PropositSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-5 h-full justify-center">

        {/* Header */}
        <div className="shrink-0">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <div className="flex items-end justify-between">
            <div>
              <motion.p {...fadeUp(0.05)} className="label mb-2">Propòsit i Visió</motion.p>
              <div className="overflow-hidden">
                <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                  D'una Idea a un Producte Real
                </motion.h2>
              </div>
            </div>
            <motion.p {...fadeUp(0.25)} className="text-[10px] text-white/25 max-w-xs text-right leading-relaxed hidden md:block">
              Vam analitzar OCine i Yelmo per entendre<br />on fallaven i on podíem aportar valor real.
            </motion.p>
          </div>
        </div>

        {/* Row 1 — 3 problem cards */}
        <motion.div variants={staggerContainer(0.1, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-3 gap-4 shrink-0">
          {problems.map((p) => (
            <motion.div key={p.num} variants={staggerItem}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass rounded-xl p-5 flex gap-4 group relative overflow-hidden">
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(212,24,61,0.06), transparent)' }} />
              <span className="text-[2.8rem] font-black leading-none text-cinema-red/12 select-none shrink-0 -mt-1">{p.num}</span>
              <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.07em] text-white mb-1.5">{p.title}</h3>
                <p className="text-[10px] text-white/38 leading-relaxed">{p.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Row 2 — 3 columns: Solució | Timeline | Disseny */}
        <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">

          {/* Col 1 — La Solució: 3 nivells */}
          <motion.div {...fadeUp(0.3)} className="glass rounded-xl p-5 flex flex-col gap-4">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-cinema-red/70 mb-1">La Solució</p>
              <h4 className="text-[11px] font-black uppercase tracking-[0.06em] text-white">Una Sola Plataforma</h4>
              <p className="text-[9px] text-white/35 leading-relaxed mt-2">
                Dissenyada des de zero perquè l'administrador que programa el contingut i el client que el consumeix coexisteixin sense friccions.
              </p>
            </div>
            <div className="flex flex-col gap-0 flex-1 justify-center">
              {levels.map((lv, i) => (
                <div key={lv.label}>
                  <div className="glass rounded-lg px-3 py-2.5 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${lv.color}20`, border: `1px solid ${lv.color}35`, color: lv.color }}>
                      {lv.icon}
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-white">{lv.label}</p>
                      <p className="text-[8px] text-white/30 leading-snug">{lv.desc}</p>
                    </div>
                  </div>
                  {i < levels.length - 1 && (
                    <motion.div className="w-px h-3 bg-cinema-red/30 mx-auto"
                      initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + i * 0.15, ease }} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Timeline 4 pasos */}
          <motion.div {...fadeUp(0.38)} className="glass rounded-xl p-5 flex flex-col gap-4">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-cinema-red/70 mb-1">Abans del Primer Commit</p>
              <h4 className="text-[11px] font-black uppercase tracking-[0.06em] text-white">El Procés Previ</h4>
            </div>
            <div className="flex flex-col gap-0 flex-1 justify-between relative">
              {/* Vertical line */}
              <motion.div className="absolute left-[11px] top-3 w-px bg-cinema-red/20 origin-top"
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
                transition={{ duration: 0.9, delay: 0.5, ease }}
                style={{ bottom: '12px' }} />
              {steps.map((s, i) => (
                <motion.div key={s.num}
                  initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.45 + i * 0.12, ease }}
                  className="flex items-start gap-3">
                  <div className="w-[22px] h-[22px] rounded-full border border-cinema-red/40 bg-[#0e0e0e] flex items-center justify-center shrink-0 relative z-10">
                    <span className="text-[8px] font-black text-cinema-red">{s.num}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-white leading-tight">{s.title}</p>
                    <p className="text-[9px] text-white/33 leading-snug mt-0.5">{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Col 3 — Disseny + paleta */}
          <motion.div {...fadeUp(0.46)} className="glass rounded-xl p-5 flex flex-col gap-4">
            <div>
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-cinema-red/70 mb-1">El Disseny com a Decisió</p>
              <h4 className="text-[11px] font-black uppercase tracking-[0.06em] text-white">Per Què Fosc i Vermell?</h4>
              <p className="text-[9px] text-white/35 leading-relaxed mt-2">
                El fons fosc redueix la fatiga visual en entorns amb poca llum. El vermell #d4183d associa 'acció' i 'urgència' — perfecte per als CTAs de compra.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              {designBadges.map((b) => (
                <div key={b.label} className="glass rounded-lg px-3 py-2 flex items-start gap-2.5">
                  <span className="text-[9px] font-black text-white/70 whitespace-nowrap shrink-0">{b.label}</span>
                  <span className="text-[8px] text-white/30 leading-snug">{b.desc}</span>
                </div>
              ))}
            </div>
            {/* Palette */}
            <div className="mt-auto">
              <p className="text-[7px] font-black uppercase tracking-[0.18em] text-white/20 mb-2">Paleta del projecte</p>
              <div className="flex items-end gap-2">
                {palette.map((hex) => (
                  <div key={hex} className="flex flex-col items-center gap-1.5">
                    <div className="w-7 h-7 rounded-full border border-white/10"
                      style={{ backgroundColor: hex, boxShadow: hex === '#d4183d' ? '0 0 10px rgba(212,24,61,0.5)' : 'none' }} />
                    <span className="text-[6px] font-bold tracking-tight text-white/30">{hex}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}
