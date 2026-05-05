import SlideEngine from '../../components/shared/SlideEngine'
import TitleSlide0613           from './slides/TitleSlide0613'
import QueAvaluaSlide           from './slides/QueAvaluaSlide'
import PerQuePHPSlide           from './slides/PerQuePHPSlide'
import ArquitecturaMVCSlide     from './slides/ArquitecturaMVCSlide'
import DecisionsSeguretatSlide  from './slides/DecisionsSeguretatSlide'
import FluxPeticioSlide         from './slides/FluxPeticioSlide'
import PHPvsLaravelSlide        from './slides/PHPvsLaravelSlide'
import EquipG3Slide             from './slides/EquipG3Slide'
import ReflexioFAQSlide         from './slides/ReflexioFAQSlide'
import TancamentSlide           from './slides/TancamentSlide'
import ReflexioCriticaSlide     from './slides/ReflexioCriticaSlide'
import MilloresFuturesSlide     from './slides/MilloresFuturesSlide'
import TancamentFinalSlide      from './slides/TancamentFinalSlide'

const SLIDES = [
  TitleSlide0613,          // 1  Portada
  QueAvaluaSlide,          // 2  Visió Tècnica
  PerQuePHPSlide,          // 3  Dues Fases
  ArquitecturaMVCSlide,    // 4  Estructura Carpetes
  DecisionsSeguretatSlide, // 5  Rols i Middlewares
  FluxPeticioSlide,        // 6  Controladors
  PHPvsLaravelSlide,       // 7  Serveis
  EquipG3Slide,            // 8  Butaques i Concurrència
  ReflexioFAQSlide,        // 9  Models i Relacions
  TancamentSlide,          // 10 Serveis Externs
  ReflexioCriticaSlide,    // 11 Reflexió Crítica
  MilloresFuturesSlide,    // 12 Millores Futures
  TancamentFinalSlide,     // 13 Tancament
]

export default function Presentation0613() {
  return <SlideEngine slides={SLIDES} />
}
