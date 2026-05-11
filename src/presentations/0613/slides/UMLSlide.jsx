import { motion } from 'framer-motion'
import { fadeUp, ease } from '../../../utils/motion'

const T = ({ name, color, fields, style, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4, delay, ease }}
    className="absolute rounded-lg overflow-hidden shadow-md"
    style={{ fontSize: '9px', minWidth: '130px', ...style }}>
    <div className="px-2 py-1.5 font-black tracking-wide text-white text-center"
      style={{ background: color, fontSize: '8.5px', letterSpacing: '0.1em' }}>
      {name}
    </div>
    <div className="bg-white border border-t-0" style={{ borderColor: `${color}40` }}>
      {fields.map(([type, field], i) => (
        <div key={field} className="flex gap-1.5 px-2 py-[3px]"
          style={{ borderTop: i > 0 ? '1px solid #f0f0f0' : undefined }}>
          <span className="text-gray-400 font-mono shrink-0" style={{ fontSize: '7.5px', minWidth: '30px' }}>{type}</span>
          <span className="text-gray-700 font-mono font-medium">{field}</span>
        </div>
      ))}
    </div>
  </motion.div>
)

const Arrow = ({ style, label, dir = 'h' }) => (
  <div className="absolute flex items-center justify-center" style={style}>
    <div className="relative flex items-center" style={{ flexDirection: dir === 'h' ? 'row' : 'column' }}>
      <div style={{
        background: '#d1d5db',
        width: dir === 'h' ? '100%' : '1px',
        height: dir === 'h' ? '1px' : '100%',
        minWidth: dir === 'h' ? '20px' : undefined,
        minHeight: dir === 'v' ? '20px' : undefined,
      }} />
      {label && (
        <span className="absolute text-gray-400 font-black whitespace-nowrap bg-white px-0.5"
          style={{ fontSize: '7px', top: dir === 'h' ? '-8px' : undefined, left: dir === 'v' ? '2px' : undefined }}>
          {label}
        </span>
      )}
    </div>
  </div>
)

export default function UMLSlide() {
  return (
    <div className="w-full h-full flex flex-col px-[6vw] py-6">
      <motion.div {...fadeUp(0.05)} className="mb-3 shrink-0">
        <span className="label">Models Eloquent · Base de dades · 9 taules</span>
      </motion.div>
      <div className="overflow-hidden shrink-0">
        <motion.h2 initial={{ y: '110%' }} animate={{ y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease }} className="s-title mb-4">
          Esquema de la Base de Dades
        </motion.h2>
      </div>

      {/* Diagram container */}
      <div className="flex-1 relative w-full" style={{ minHeight: 0 }}>
        <div className="absolute inset-0" style={{ transform: 'scale(0.88)', transformOrigin: 'top left',
          width: '113%', height: '113%' }}>

          {/* CINE */}
          <T delay={0.1} name="CINE" color="#ec4899"
            style={{ left: 0, top: 90 }}
            fields={[['int','id'],['string','nombre'],['string','ciudad'],['string','provincia']]} />

          {/* SALA */}
          <T delay={0.15} name="SALA" color="#06b6d4"
            style={{ left: 165, top: 60 }}
            fields={[['int','id'],['string','nombre'],['int','capacidad'],['int','fk_cine_id']]} />

          {/* SEATLOCK */}
          <T delay={0.2} name="SEATLOCK" color="#6366f1"
            style={{ left: 165, top: 300 }}
            fields={[['int','id'],['int','sesion_id'],['string','butaca'],['int','user_id'],['datetime','expires_at']]} />

          {/* PELICULA */}
          <T delay={0.12} name="PELICULA" color="#0ea5e9"
            style={{ left: 370, top: 0 }}
            fields={[['int','id'],['string','titulo'],['int','tmdb_id'],['decimal','rating'],['string','poster_path']]} />

          {/* SESION */}
          <T delay={0.18} name="SESION" color="#f97316"
            style={{ left: 370, top: 240 }}
            fields={[['int','id'],['int','fk_sala_id'],['int','fk_pelicula_id'],['datetime','fecha_hora'],['decimal','preu_base']]} />

          {/* CATEGORIA */}
          <T delay={0.13} name="CATEGORIA" color="#eab308"
            style={{ left: 610, top: 0 }}
            fields={[['int','id'],['string','nombre']]} />

          {/* USER */}
          <T delay={0.14} name="USER" color="#8b5cf6"
            style={{ left: 760, top: 60 }}
            fields={[['int','id'],['string','name'],['string','email'],['string','rol'],['string','telefono']]} />

          {/* RESERVA */}
          <T delay={0.22} name="RESERVA" color="#22c55e"
            style={{ left: 590, top: 240 }}
            fields={[['int','id'],['int','fk_usuario_id'],['int','fk_sesion_id'],['string','ticket_token'],['string','estat']]} />

          {/* RESERVA_SEAT */}
          <T delay={0.25} name="RESERVA_SEAT" color="#ef4444"
            style={{ left: 760, top: 360 }}
            fields={[['int','id'],['int','reserva_id'],['int','sesion_id'],['string','butaca']]} />

          {/* Relationship labels — simple text overlays */}
          {/* CINE → SALA */}
          <motion.div {...fadeUp(0.4)} className="absolute text-[7px] font-black text-gray-400"
            style={{ left: 132, top: 108 }}>tiene →</motion.div>

          {/* SALA → SESION */}
          <motion.div {...fadeUp(0.42)} className="absolute text-[7px] font-black text-gray-400"
            style={{ left: 295, top: 248 }}>contiene ↓</motion.div>

          {/* PELICULA → SESION */}
          <motion.div {...fadeUp(0.44)} className="absolute text-[7px] font-black text-gray-400"
            style={{ left: 390, top: 215 }}>proyecta ↓</motion.div>

          {/* PELICULA → CATEGORIA */}
          <motion.div {...fadeUp(0.46)} className="absolute text-[7px] font-black text-gray-400"
            style={{ left: 550, top: 35 }}>→ cat.</motion.div>

          {/* SESION → RESERVA */}
          <motion.div {...fadeUp(0.48)} className="absolute text-[7px] font-black text-gray-400"
            style={{ left: 520, top: 270 }}>genera →</motion.div>

          {/* SESION → SEATLOCK */}
          <motion.div {...fadeUp(0.5)} className="absolute text-[7px] font-black text-gray-400"
            style={{ left: 290, top: 310 }}>bloquea ↓</motion.div>

          {/* USER → RESERVA */}
          <motion.div {...fadeUp(0.52)} className="absolute text-[7px] font-black text-gray-400"
            style={{ left: 735, top: 270 }}>← realizada por</motion.div>

          {/* RESERVA → RESERVA_SEAT */}
          <motion.div {...fadeUp(0.54)} className="absolute text-[7px] font-black text-gray-400"
            style={{ left: 695, top: 370 }}>contiene →</motion.div>

        </div>
      </div>
    </div>
  )
}
