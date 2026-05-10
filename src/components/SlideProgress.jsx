import { motion } from 'framer-motion'

export default function SlideProgress({ current, total, onGo, lightMode = false }) {
  const inactiveColor = lightMode ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.18)'
  const counterColor  = lightMode ? 'rgba(0,0,0,0.25)' : 'rgba(255,255,255,0.20)'
  const counterSub    = lightMode ? 'rgba(0,0,0,0.12)' : 'rgba(255,255,255,0.10)'

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
            backgroundColor: i === current ? '#d4183d' : inactiveColor,
            opacity:         i < current ? 0.45 : 1,
          }}
          transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="h-[5px] rounded-full cursor-pointer"
        />
      ))}
      <span className="ml-1 text-[9px] font-black tracking-[0.2em] tabular-nums"
        style={{ color: counterColor }}>
        {String(current + 1).padStart(2, '0')}
        <span style={{ color: counterSub }}>/{String(total).padStart(2, '0')}</span>
      </span>
    </div>
  )
}
