import { motion } from 'framer-motion'

export default function SlideProgress({ current, total, onGo }) {
  return (
    <div className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onGo(i)}
          animate={{
            width:            i === current ? 28 : 8,
            backgroundColor: i === current ? '#d4183d' : 'rgba(255,255,255,0.2)',
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="h-[6px] rounded-full cursor-pointer hover:opacity-80"
          aria-label={`Slide ${i + 1}`}
        />
      ))}

      <span className="ml-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/20">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  )
}
