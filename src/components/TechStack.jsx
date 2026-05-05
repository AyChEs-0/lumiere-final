import { motion } from 'framer-motion'

const stack = [
  {
    name: 'Laravel',
    role: 'Backend Framework',
    color: '#FF2D20',
    logo: (
      <svg viewBox="0 0 50 52" className="w-10 h-10" fill="currentColor">
        <path d="M49.626 11.564a.809.809 0 0 1 .028.209v10.972a.8.8 0 0 1-.402.694l-9.209 5.302V39.25c0 .286-.152.55-.4.694L20.42 51.01a.823.823 0 0 1-.09.048.783.783 0 0 1-.624 0 .83.83 0 0 1-.09-.048L.892 39.944A.801.801 0 0 1 .49 39.25V6.334a.801.801 0 0 1 .402-.694L19.8.082a.83.83 0 0 1 .823 0l9.218 5.308h.023l9.217 5.311a.832.832 0 0 1 .624.171zM10.918 7.28L19.8 2.082l8.883 5.198L19.8 12.478 10.918 7.28zm8.057 26.24L10.918 28.322v10.397L19.8 43.917V33.52zm10.74-26.24l-8.883 5.198L29.716 17.676l8.883-5.198-8.883-5.198zM19.8 38.713V28.316l-8.882 5.197v10.397L19.8 38.713zm10.74-12.91L21.658 20.605v10.397l8.882 5.197V25.803zm8.882-5.197V10.209L30.54 15.406v10.397l8.882-5.197z" />
      </svg>
    ),
  },
  {
    name: 'MySQL',
    role: 'Base de Datos',
    color: '#4479A1',
    logo: (
      <svg viewBox="0 0 128 128" className="w-10 h-10" fill="currentColor">
        <path d="M84.319 18.522c-2.049.037-3.6.228-4.887.618C75.61 7.68 68.689 1.8 62.8 1.8c-3.312 0-6.33 1.638-8.556 4.617-1.759 2.352-2.883 5.5-3.393 9.294A48.875 48.875 0 0 0 47 24.8c-3.867 1.716-6.567 3.857-8.138 6.43-2.592 4.179-2.088 9.607 1.326 14.91l.384.608v.71c0 3.567.765 6.547 2.245 8.675 1.38 2 3.33 3.186 5.677 3.466.444.053.893.079 1.342.079 3.078 0 6.16-.97 8.756-1.79.808-.254 1.58-.496 2.3-.699 2.127-.597 4.218-1.182 6.21-1.182 1.872 0 3.828.544 6.278 1.713.87.415 1.754.895 2.666 1.391 2.596 1.428 5.54 3.047 9.122 3.047.635 0 1.272-.05 1.894-.148 5.008-.782 8.62-4.384 10.046-9.9 1.1-4.247.697-9.118-1.14-13.796a30.11 30.11 0 0 0-1.28-2.856c1.12-1.16 2.12-2.607 2.87-4.323.965-2.217 1.447-4.762 1.447-7.574 0-2.637-.44-5.19-1.271-7.396-.934-2.492-2.339-4.503-4.077-5.82-1.698-1.284-3.642-1.923-5.72-1.923z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    role: 'Estilos',
    color: '#06B6D4',
    logo: (
      <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M9 13.7q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1zm-7 8.4q1.4-5.6 7-5.6c5.6 0 6.3 4.2 9.1 4.9q2.8.7 4.9-2.1-1.4 5.6-7 5.6c-5.6 0-6.3-4.2-9.1-4.9q-2.8-.7-4.9 2.1z" />
      </svg>
    ),
  },
  {
    name: 'Blade',
    role: 'Vistas / Templates',
    color: '#FF2D20',
    logo: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    role: 'Contenedores',
    color: '#2496ED',
    logo: (
      <svg viewBox="0 0 32 32" className="w-10 h-10" fill="currentColor">
        <path d="M28.687 12.901c-.097-.068-1.054-.618-3.073-.618-.532 0-1.063.048-1.59.143-.385-2.653-2.561-3.958-2.657-4.017l-.533-.311-.338.506c-.43.661-.723 1.402-.855 2.173-.259 1.073-.097 2.11.484 2.977-.719.386-1.873.483-2.113.497H2.034c-.518 0-.937.42-.937.937-.006 1.742.275 3.48.831 5.135 1.063 3.024 2.639 5.249 4.679 6.609 2.275 1.52 5.984 2.387 10.19 2.387 1.907.002 3.81-.165 5.686-.499 2.601-.474 5.091-1.483 7.293-2.964a20.397 20.397 0 0 0 4.956-5.154c2.37-3.507 3.77-7.397 4.258-11.401-.007 0-2.843 1.4-10.303 0zM6.375 18.024H4.299a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311zm3.507 0H7.806a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311zm3.507 0h-2.076a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311zm3.507 0h-2.076a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311zm-6.992-3.436H7.828a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311zm3.507 0h-2.076a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311zm3.507 0h-2.076a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311zm0-3.457H13.36a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311zm3.507 3.457h-2.076a.31.31 0 0 1-.311-.311v-1.857c0-.172.14-.311.311-.311h2.076c.172 0 .311.14.311.311v1.857a.31.31 0 0 1-.311.311z" />
      </svg>
    ),
  },
  {
    name: 'PHP 8',
    role: 'Lenguaje',
    color: '#777BB4',
    logo: (
      <svg viewBox="0 0 128 128" className="w-10 h-10" fill="currentColor">
        <path d="M64 33.039c-33.74 0-61.094 13.862-61.094 30.961S30.26 94.961 64 94.961 125.094 81.1 125.094 64 97.74 33.039 64 33.039zm0 54.711c-27.691 0-50.14-10.646-50.14-23.75S36.309 40.25 64 40.25s50.14 10.646 50.14 23.75S91.691 87.75 64 87.75z" />
      </svg>
    ),
  },
]

export default function TechStack() {
  return (
    <section id="tech" className="relative py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cinema-red/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span className="block w-12 h-1 bg-cinema-red rounded-full mx-auto mb-4" />
          <h2 className="section-title mb-4">Tech Stack</h2>
          <p className="text-cinema-muted max-w-lg mx-auto leading-relaxed">
            Tecnologías seleccionadas por su robustez, rendimiento y ecosistema maduro
            para el desarrollo de aplicaciones web de producción.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stack.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, scale: 1.04 }}
              className="glass rounded-2xl p-6 flex flex-col items-center gap-3 group cursor-default"
            >
              <div
                className="transition-all duration-300 group-hover:drop-shadow-[0_0_12px_currentColor]"
                style={{ color: tech.color }}
              >
                {tech.logo}
              </div>
              <div className="text-center">
                <div className="font-black uppercase tracking-cinema text-white text-sm">{tech.name}</div>
                <div className="text-xs text-cinema-muted mt-0.5">{tech.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
