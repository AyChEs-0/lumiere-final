import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const problems = [
  {
    num: '01',
    title: 'Gestió fragmentada',
    desc: 'Els cinemes tradicionals gestionen la programació, les reserves i la taquilla amb sistemes separats que no es comuniquen. El resultat és descontrol operatiu i errors humans evitables.',
  },
  {
    num: '02',
    title: "Experiència d'usuari pobra",
    desc: "Webs com Yelmo i OCine tenen fluxos de compra complexos i poc intuïtius en mòbil. L'usuari perd temps i abandona el procés. Vam dissenyar pensant primer en el mòbil.",
  },
  {
    num: '03',
    title: 'Risc de doble reserva',
    desc: "Cap dels referents analitzats explica clarament com gestionen la concurrència de butaques. Nosaltres vam fer-ho el nucli tècnic: el sistema SeatLock garanteix cero overbooking.",
  },
]

const levels = [
  {
    color: '#d4183d',
    label: 'Administrador',
    desc: 'Control global de cines, sales, pel·lícules i sessions',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
  },
  {
    color: '#0891b2',
    label: 'Client',
    desc: "Compra d'entrades, selecció de butaques, historial de reserves",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
  {
    color: '#6b7280',
    label: 'Guest',
    desc: 'Compra sense registre — decisió tècnica per reduir fricció',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
      </svg>
    ),
  },
]

const steps = [
  {
    num: '01',
    title: 'Benchmarking real',
    desc: "Vam analitzar OCine i Yelmo: fortaleses en catàleg de contingut, febleses en el flux de compra mòbil i en la claredat de la informació. Vam documentar tot en una presentació de Canva.",
  },
  {
    num: '02',
    title: 'Requisits funcionals i no funcionals',
    desc: "Vam traduir les observacions en 9 RF i 5 RNF. RF4 (bloqueig de butaques) i RF6 (confirmació per QR) van ser els més complexos tècnicament.",
  },
  {
    num: '03',
    title: 'Modelat de dades (MER)',
    desc: "Diagrama entitat-relació abans de crear cap migració. 9 taules, relació N:M Pel·lícules-Categories, índex únic (nom, ciutat) per a Cines. Les decisions al paper, no al codi.",
  },
  {
    num: '04',
    title: 'Planificació àgil amb Trello',
    desc: "Backlog → To Do → Doing → Review → Done. WIP Limit 2 tasques/persona. 8 fases des de setmana 10 fins a l'entrega. Tasques TK-001 a TK-038.",
  },
]

const palette = [
  { hex: '#111111' },
  { hex: '#1a0a0a' },
  { hex: '#800000' },
  { hex: '#d4183d' },
  { hex: '#9ca3af' },
]

const designBadges = [
  { label: 'Fons #111111',    desc: "Redueix fatiga visual · Emfatitza els pòsters de les pel·lícules" },
  { label: 'Vermell #d4183d', desc: "Color d'acció · Botó de compra sempre visible" },
  { label: 'Mobile First',    desc: "70% de compres des del mòbil · Checkout dissenyat per a 390px" },
]

function InViewSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className={className}>
      {typeof children === 'function' ? children(inView) : children}
    </div>
  )
}

export default function PropositSlide() {
  return (
    <div className="w-full h-full flex flex-col overflow-hidden">

      {/* Header — fixed top */}
      <div className="px-[8vw] pt-10 pb-5 shrink-0">
        <div className="w-full max-w-6xl mx-auto">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Propòsit i Visió</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              D'una Idea a un Producte Real
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Scrollable blocks */}
      <div className="flex-1 overflow-y-auto px-[8vw] pb-14"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-14">

          {/* ── Bloc 1 — El problema detectat ───────────────────────────── */}
          <InViewSection>
            {(inView) => (
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, ease }} className="mb-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cinema-red mb-1">Per Què un Cinema Online?</p>
                  <p className="text-[11px] text-white/35 tracking-wide">El problema que vam identificar</p>
                  <p className="text-sm text-white/50 leading-relaxed mt-3 max-w-2xl">
                    Durant la fase d'ideació, vam analitzar referents reals del sector com OCine i Yelmo. No per copiar-los,
                    sinó per entendre on fallaven i on podíem aportar valor real.
                  </p>
                </motion.div>

                <motion.div
                  variants={staggerContainer(0.15, inView ? 0 : 9999)}
                  initial="initial" animate={inView ? 'animate' : 'initial'}
                  className="grid grid-cols-3 gap-4">
                  {problems.map((p) => (
                    <motion.div key={p.num} variants={staggerItem}
                      whileHover={{ y: -5, transition: { duration: 0.22 } }}
                      className="glass rounded-2xl p-6 flex flex-col gap-4 group relative overflow-hidden">
                      <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{ background: 'linear-gradient(135deg, rgba(212,24,61,0.06), transparent)' }} />
                      <span className="text-[4rem] font-black leading-none text-cinema-red/15 select-none -mb-2">{p.num}</span>
                      <h3 className="text-sm font-black uppercase tracking-[0.07em] text-white">{p.title}</h3>
                      <p className="text-[11px] text-white/40 leading-relaxed">{p.desc}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}
          </InViewSection>

          {/* ── Bloc 2 — La solució centralitzada ───────────────────────── */}
          <InViewSection>
            {(inView) => (
              <div className="grid grid-cols-[1fr_auto] gap-10 items-center">
                {/* Left */}
                <motion.div initial={{ opacity: 0, x: -60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, ease }}>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cinema-red mb-1">La Solució Centralitzada</p>
                  <h3 className="text-xl font-black uppercase tracking-[0.05em] text-white mb-5 leading-tight">
                    La Solució:<br />Una Sola Plataforma
                  </h3>
                  <p className="text-[13px] text-white/45 leading-relaxed max-w-lg">
                    Cine Lumière no és una eina d'administració amb una pàgina pública afegida. Està dissenyada des de zero
                    com un producte amb dos tipus d'usuari que han de coexistir sense friccions: l'administrador que programa
                    el contingut i el client que el consumeix.
                  </p>
                </motion.div>

                {/* Right — 3 levels */}
                <motion.div initial={{ opacity: 0, x: 60 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.65, delay: 0.1, ease }}
                  className="flex flex-col gap-0 w-72">
                  {levels.map((lv, i) => (
                    <div key={lv.label} className="flex flex-col">
                      <div className="glass rounded-xl px-5 py-4 flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                          style={{ background: `${lv.color}20`, border: `1px solid ${lv.color}35`, color: lv.color }}>
                          {lv.icon}
                        </div>
                        <div>
                          <p className="text-[11px] font-black text-white">{lv.label}</p>
                          <p className="text-[9px] text-white/35 leading-snug mt-0.5">{lv.desc}</p>
                        </div>
                      </div>
                      {i < levels.length - 1 && (
                        <motion.div
                          className="w-px h-5 bg-cinema-red/30 mx-auto"
                          initial={{ scaleY: 0, originY: 0 }}
                          animate={inView ? { scaleY: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.15, ease }}
                        />
                      )}
                    </div>
                  ))}
                </motion.div>
              </div>
            )}
          </InViewSection>

          {/* ── Bloc 3 — Procés: de la idea a l'arquitectura ────────────── */}
          <InViewSection>
            {(inView) => (
              <div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.55, ease }} className="mb-7">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cinema-red mb-1">Abans del Primer Commit</p>
                  <p className="text-[11px] text-white/35 tracking-wide mb-3">El codi és la conseqüència d'una bona planificació</p>
                  <p className="text-sm text-white/50 leading-relaxed max-w-2xl">
                    Vam tenir clar des del principi que calia entendre el problema abans de pensar en la solució tècnica.
                    Aquí el procés que vam seguir abans de configurar Docker o escriure una sola migració.
                  </p>
                </motion.div>

                {/* Timeline horizontal */}
                <div className="relative">
                  {/* Connecting line */}
                  <div className="absolute top-5 left-5 right-5 h-px bg-white/5 hidden md:block" />
                  <motion.div
                    className="absolute top-5 left-5 h-px bg-cinema-red/40 hidden md:block origin-left"
                    style={{ right: '20px' }}
                    initial={{ scaleX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 1.1, delay: 0.2, ease }}
                  />

                  <div className="grid grid-cols-4 gap-5">
                    {steps.map((s, i) => (
                      <motion.div key={s.num}
                        initial={{ opacity: 0, y: 30 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.55, delay: 0.25 + i * 0.18, ease }}
                        className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full border flex items-center justify-center shrink-0 relative z-10 bg-[#0e0e0e]"
                            style={{ borderColor: 'rgba(212,24,61,0.45)' }}>
                            <span className="text-[11px] font-black text-cinema-red">{s.num}</span>
                          </div>
                        </div>
                        <div className="glass rounded-xl p-4">
                          <h4 className="text-[11px] font-black uppercase tracking-[0.07em] text-white mb-2">{s.title}</h4>
                          <p className="text-[10px] text-white/38 leading-relaxed">{s.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </InViewSection>

          {/* ── Bloc 4 — Identitat visual ────────────────────────────────── */}
          <InViewSection>
            {(inView) => (
              <div className="grid grid-cols-[1fr_auto] gap-10 items-start">
                {/* Left */}
                <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease }}>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cinema-red mb-1">El Disseny com a Decisió Tècnica</p>
                  <p className="text-[11px] text-white/35 tracking-wide mb-4">Per què tema fosc i vermell carmesí?</p>
                  <p className="text-[13px] text-white/45 leading-relaxed mb-6 max-w-lg">
                    El disseny no va ser una decisió estètica, sinó funcional. Vam estudiar la psicologia de color aplicada a
                    experiències de cinema: el fons fosc redueix la fatiga visual en entorns amb poca llum, i el vermell #d4183d
                    és el color que el cervell associa a 'acció' i 'urgència' — perfecte per als CTAs de compra.
                  </p>
                  <div className="flex flex-col gap-2.5">
                    {designBadges.map((b, i) => (
                      <motion.div key={b.label}
                        initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.45, delay: 0.15 + i * 0.1, ease }}
                        className="glass rounded-xl px-4 py-3 flex items-start gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white/80 whitespace-nowrap">{b.label}</span>
                        <span className="text-[10px] text-white/35 leading-relaxed">{b.desc}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Right — color palette */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.2, ease }}
                  className="flex flex-col items-center gap-4 w-48">
                  <p className="text-[8px] font-black uppercase tracking-[0.18em] text-white/25">Paleta del projecte</p>
                  <div className="flex flex-col gap-3 w-full">
                    {palette.map((c, i) => (
                      <motion.div key={c.hex}
                        initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.25 + i * 0.08, ease }}
                        className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full shrink-0 border border-white/10"
                          style={{ backgroundColor: c.hex, boxShadow: c.hex === '#d4183d' ? '0 0 12px rgba(212,24,61,0.5)' : 'none' }} />
                        <span className="text-[9px] font-black tracking-[0.08em] text-white/40">{c.hex}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </InViewSection>

        </div>
      </div>
    </div>
  )
}
