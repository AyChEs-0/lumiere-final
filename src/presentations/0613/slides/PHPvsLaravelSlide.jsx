import { motion } from 'framer-motion'
import { fadeUp, drawLine, staggerContainer, staggerItem, ease } from '../../../utils/motion'

const services = [
  {
    color: '#d4183d',
    icon: 'M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
    name: 'PurchaseService',
    why: 'El controlador tenia 80 línies de lògica inline. Movent-ho al servei, el controlador va quedar en 10 línies.',
    desc: 'Conté tota la lògica de confirmació de compra dins d\'un DB::transaction. Crea la reserva, associa les butaques a reserva_seats i elimina els SeatLocks — tot o res. Si falla a la meitat, la BD queda intacta.',
  },
  {
    color: '#0891b2',
    icon: 'M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125',
    name: 'CachedMovieService',
    why: 'Graceful Degradation — la web funciona encara que TMDB caigui.',
    desc: 'Gestiona la integració amb TMDB. Si l\'API respon, usa les dades externes. Si hi ha timeout o error, fa fallback automàtic a la BD local. El controlador mai sap d\'on venen les dades.',
  },
  {
    color: '#9333ea',
    icon: 'M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z',
    name: 'SeatAvailabilityService',
    why: 'La mateixa lògica s\'usava en 3 llocs. Centralitzant-la, canviar-la afecta tots alhora.',
    desc: 'Calcula en temps real quines butaques estan lliures, reservades o bloquejades per altres usuaris. L\'usa el SeatLockController per construir la resposta JSON de l\'API AJAX.',
  },
  {
    color: '#16a34a',
    icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z',
    name: 'GuestCheckoutService',
    why: 'Reduir la fricció de compra — no obligar a registrar-se augmenta les conversions.',
    desc: 'Gestiona el flux de compra sense registre. Crea una reserva amb fk_usuario_id = null i guarda nom + email directament a la reserva.',
  },
]

export default function PHPvsLaravelSlide() {
  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-5">
          <motion.span {...drawLine(0.05)} className="red-bar" />
          <motion.p {...fadeUp(0.05)} className="label mb-3">Service Layer Pattern</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              Per Que Tenim una Capa de Serveis?
            </motion.h2>
          </div>
        </div>

        <motion.p {...fadeUp(0.28)} className="text-[11px] text-white/35 mb-5 leading-relaxed">
          Quan la lògica d'un mètode del controlador creix massa, la movem a un Servei. El controlador delega — el Servei executa. Resultat: controladors llegibles, lògica testejable.
        </motion.p>

        <motion.div variants={staggerContainer(0.08, 0.3)} initial="initial" animate="animate"
          className="grid grid-cols-2 gap-4">
          {services.map((s) => (
            <motion.div key={s.name} variants={staggerItem}
              className="glass rounded-xl p-5 flex gap-4"
              style={{ borderColor: `${s.color}18` }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                style={{ background: `${s.color}12`, border: `1px solid ${s.color}20` }}>
                <svg className="w-4 h-4" fill="none" stroke={s.color} strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
                </svg>
              </div>
              <div className="flex flex-col gap-2 min-w-0">
                <span className="text-[11px] font-black font-mono" style={{ color: s.color }}>{s.name}</span>
                <p className="text-[9.5px] text-white/38 leading-snug">{s.desc}</p>
                <p className="text-[9px] italic" style={{ color: `${s.color}70` }}>Per que existeix: {s.why}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </div>
  )
}
