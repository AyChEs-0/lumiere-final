import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../utils/motion'

const decisions = [
  {
    num: '01',
    phase: 'Setmana 21 · Tutoria',
    title: 'La tutoria ens va frenar',
    problem: 'Avançàvem en funcionalitats noves sense tenir la seguretat bàsica implementada. El professorat ho va detectar a la tutoria del 19/02/2026.',
    decision: 'Parada total de noves funcionalitats. 5 issues crítiques (TK-015 a TK-019) creades i assignades en menys de 24 hores amb responsable i data.',
    result: 'Totes tancades en 5 dies. Lliçó: la velocitat sense control és deute de projecte.',
    color: '#d4183d',
  },
  {
    num: '02',
    phase: 'Setmanes 26–28 · Desplegament',
    title: 'Railway vs GitLab',
    problem: 'El nostre repositori estava a GitLab però Railway no permet integració directa amb GitLab per al desplegament automàtic.',
    decision: 'Migració del repositori complet a GitHub privat per desbloquejar el CI/CD automàtic. Decisió en equip: cost 2h vs benefici permanent.',
    result: 'Cada push a main desplegava automàticament a producció sense cap acció manual.',
    color: '#9333ea',
  },
  {
    num: '03',
    phase: 'Setmanes 16–19 · Paral·lelisme',
    title: 'Conflictes de Git en paral·lel',
    problem: 'Treballant els 3 membres en paral·lel, teníem col·lisions constants en arxius compartits com web.php i User.php.',
    decision: 'Formalitzar la política de Feature Branches (feature/TK-XXX) i comunicació obligatòria per missatgeria abans de tocar arxius compartits.',
    result: 'Els conflictes van desaparèixer gairebé completament les setmanes posteriors.',
    color: '#0891b2',
  },
  {
    num: '04',
    phase: 'Revisió final · Abril 2026',
    title: 'Deute tècnic documentat',
    problem: 'Les factories i els tests usaven noms de columna de la fase PHP natiu, incompatibles amb l\'esquema Laravel final. Detectat a la revisió de qualitat.',
    decision: 'Refactorització completa de totes les factories i migració dels tests de SQLite a MySQL real per garantir paritat amb producció.',
    result: 'Tots els tests passaven en l\'entorn idèntic a producció. Qualitat certificada.',
    color: '#f97316',
  },
]

export default function DecisionesSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-14">
      <div className="w-full max-w-6xl mx-auto">

        <div className="flex items-end justify-between mb-8">
          <div>
            <motion.span {...drawLine(0.05)} className="red-bar" />
            <motion.p {...fadeUp(0.05)} className="label mb-3">Resolució de problemes de gestió</motion.p>
            <div className="overflow-hidden">
              <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
                4 Decisions que van Canviar el Projecte
              </motion.h2>
            </div>
          </div>
          <motion.p {...fadeUp(0.3)} className="s-body text-right hidden md:block max-w-xs">
            No parlem de bugs de codi —<br />parlem de decisions de projecte
          </motion.p>
        </div>

        <motion.div variants={staggerContainer(0.09, 0.2)} initial="initial" animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {decisions.map((d) => (
            <motion.div key={d.num} variants={staggerItem}
              whileHover={{ y: -5, transition: { duration: 0.25 } }}
              className="glass rounded-2xl p-5 flex flex-col gap-4 group relative overflow-hidden">
              <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: `linear-gradient(135deg, ${d.color}08, transparent)` }} />

              <div className="flex items-center justify-between">
                <span className="text-[8px] font-black uppercase tracking-[0.14em] px-2 py-0.5 rounded"
                  style={{ color: d.color, background: `${d.color}15` }}>{d.phase}</span>
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color, boxShadow: `0 0 6px ${d.color}80` }} />
              </div>

              <h3 className="text-sm font-black uppercase tracking-[0.06em] text-white leading-snug">{d.title}</h3>

              <div className="flex flex-col gap-2.5 flex-1">
                <div>
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white/25 block mb-1">Problema</span>
                  <p className="text-[10px] text-white/40 leading-relaxed">{d.problem}</p>
                </div>
                <div>
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] text-white/25 block mb-1">Decisió</span>
                  <p className="text-[10px] text-white/40 leading-relaxed">{d.decision}</p>
                </div>
                <div className="glass rounded-lg p-2 mt-auto">
                  <span className="text-[8px] font-black uppercase tracking-[0.15em] block mb-1" style={{ color: d.color }}>Resultat</span>
                  <p className="text-[10px] text-white/50 leading-relaxed">{d.result}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
