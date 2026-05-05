import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeUp, drawLine, ease } from '../../../utils/motion'

const decisions = [
  {
    id: 'PDO',
    color: '#0891b2',
    title: 'PDO + Prepared Statements',
    threat: 'SQL Injection',
    why: 'Les queries concatenades amb variables d\'usuari permeten injectar SQL arbitrari. PDO amb placeholders separa el codi de les dades.',
    code: `$stmt = $pdo->prepare(
  "SELECT * FROM users WHERE email = ?"
);
$stmt->execute([$email]);`,
  },
  {
    id: 'BCRYPT',
    color: '#9333ea',
    title: 'password_hash + BCRYPT',
    threat: 'Robatori de contrasenyes',
    why: 'Mai emmagatzemar text pla. BCRYPT inclou salt automàtic i és lent per disseny, dificultant ataques de força bruta.',
    code: `// Registre
$hash = password_hash($plain, PASSWORD_BCRYPT);

// Login
password_verify($plain, $hash);`,
  },
  {
    id: 'XSS',
    color: '#d4183d',
    title: 'htmlspecialchars()',
    threat: 'Cross-Site Scripting (XSS)',
    why: 'Qualsevol dada que s\'imprimeixi al HTML ha d\'escapar-se. Un <script> injectat a un camp de text pot robar sessions.',
    code: `// INCORRECTE
echo $_GET['name'];

// CORRECTE
echo htmlspecialchars(
  $_GET['name'], ENT_QUOTES, 'UTF-8'
);`,
  },
  {
    id: 'PRG',
    color: '#16a34a',
    title: 'Patró Post/Redirect/Get',
    threat: 'Submissions duplicades',
    why: 'Sense PRG, un F5 torna a enviar el formulari. El controlador processa, guarda a BD i redirigeix a GET per evitar duplicats.',
    code: `// Controlador: processa POST
if ($_SERVER['METHOD'] === 'POST') {
  $controller->store($_POST);
  header('Location: /success');
  exit;
}`,
  },
]

export default function DecisionsSeguretatSlide() {
  const [open, setOpen] = useState(null)

  return (
    <div className="w-full h-full flex flex-col justify-center px-[8vw] py-8">
      <div className="w-full max-w-6xl mx-auto">

        <div className="mb-6">
          <motion.span {...drawLine(0.05)} className="red-bar" style={{ background: '#d4183d' }} />
          <motion.p {...fadeUp(0.05)} className="label mb-3">RA6 · Seguretat web</motion.p>
          <div className="overflow-hidden">
            <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease }} className="s-title">
              4 Decisions de Seguretat
            </motion.h2>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {decisions.map((d, i) => (
            <motion.div key={d.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.08, ease }}
              className="glass rounded-xl overflow-hidden">
              <button
                onClick={() => setOpen(open === d.id ? null : d.id)}
                className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-white/[0.02] transition-colors">
                <span className="text-[9px] font-black px-2.5 py-1 rounded-full whitespace-nowrap"
                  style={{ background: `${d.color}15`, color: d.color, border: `1px solid ${d.color}25` }}>{d.id}</span>
                <span className="text-[11px] font-black text-white flex-1">{d.title}</span>
                <span className="text-[9px] text-white/25 whitespace-nowrap">Amenaca: {d.threat}</span>
                <svg className={`w-3.5 h-3.5 text-white/20 transition-transform duration-200 ${open === d.id ? 'rotate-180' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>

              <AnimatePresence>
                {open === d.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                    className="overflow-hidden">
                    <div className="px-5 pb-4 grid grid-cols-[1fr_auto] gap-6 items-start"
                      style={{ borderTop: `1px solid ${d.color}15` }}>
                      <p className="text-[10px] text-white/40 leading-relaxed pt-4">{d.why}</p>
                      <pre className="text-[9px] text-white/55 leading-relaxed pt-4 font-mono"
                        style={{ background: `${d.color}08`, border: `1px solid ${d.color}15`, borderRadius: '0.5rem', padding: '0.75rem', minWidth: '260px' }}>
                        {d.code}
                      </pre>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.p {...fadeUp(0.7)} className="text-center text-[10px] text-white/20 italic mt-5">
          Fes clic a cada decisió per veure el codi
        </motion.p>

      </div>
    </div>
  )
}
