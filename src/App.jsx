import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Cartelera from './components/Cartelera'
import FlujoPago from './components/FlujoPago'
import Cines from './components/Cines'
import Roles from './components/Roles'
import TechStack from './components/TechStack'
import CTAFinal from './components/CTAFinal'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Cartelera />
        <FlujoPago />
        <Cines />
        <Roles />
        <TechStack />
        <CTAFinal />
      </main>
    </>
  )
}
