import { useInView } from 'react-intersection-observer'

export function useReveal(threshold = 0.15) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true })
  return { ref, inView }
}
