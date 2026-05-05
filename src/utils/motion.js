export const ease = [0.4, 0, 0.2, 1]
export const easeOut = [0, 0, 0.2, 1]

export const fadeUp = (delay = 0, duration = 0.65) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration, delay, ease },
})

export const wipeUp = (delay = 0, duration = 0.75) => ({
  initial:    { y: '110%' },
  animate:    { y: 0 },
  transition: { duration, delay, ease },
})

export const drawLine = (delay = 0) => ({
  initial:    { scaleX: 0 },
  animate:    { scaleX: 1 },
  transition: { duration: 0.55, delay, ease },
  style:      { transformOrigin: 'left' },
})

export const staggerContainer = (stagger = 0.1, delayChildren = 0.25) => ({
  animate: { transition: { staggerChildren: stagger, delayChildren } },
})

export const staggerItem = {
  initial:  { opacity: 0, y: 22 },
  animate:  { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

export const scaleIn = (delay = 0) => ({
  initial:    { opacity: 0, scale: 0.9 },
  animate:    { opacity: 1, scale: 1 },
  transition: { duration: 0.6, delay, ease },
})
