import { motion } from 'framer-motion'

export default function SlideProgress({ current, total, onGo }) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                    flex items-center gap-2.5 glass-strong px-5 py-2.5 rounded-full">
      {Array.from({ length: total }).map((_, i) => (
        <motion.button
          key={i}
          onClick={() => onGo(i)}
          title={`Slide ${i + 1}`}
          animate={{
            width:           i === current ? 24 : 6,
            backgroundColor: i === current ? '#d4183d' : 'rgba(255,255,255,0.18)',
            opacity:         i < current ? 0.45 : 1,
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="h-[5px] rounded-full cursor-pointer"
        />
      ))}
      <span className="ml-1 text-[9px] font-black tracking-[0.2em] text-white/20 tabular-nums">
        {String(current + 1).padStart(2, '0')}<span className="text-white/10">/{String(total).padStart(2, '0')}</span>
      </span>
    </div>
  )
}
