import SlideEngine from '../../components/shared/SlideEngine'
import TitleSlide0613           from './slides/TitleSlide0613'
import QueAvaluaSlide           from './slides/QueAvaluaSlide'
import ArquitecturaMVCSlide     from './slides/ArquitecturaMVCSlide'
import DecisionsSeguretatSlide  from './slides/DecisionsSeguretatSlide'
import FluxPeticioSlide         from './slides/FluxPeticioSlide'
import PHPvsLaravelSlide        from './slides/PHPvsLaravelSlide'
import EquipG3Slide             from './slides/EquipG3Slide'
import UMLSlide                 from './slides/UMLSlide'
import TancamentSlide           from './slides/TancamentSlide'
import ReflexioCriticaSlide     from './slides/ReflexioCriticaSlide'
import MilloresFuturesSlide     from './slides/MilloresFuturesSlide'
import DemoVideoSlide           from './slides/DemoVideoSlide'
import QRSlide                  from './slides/QRSlide'
import TancamentFinalSlide      from './slides/TancamentFinalSlide'

const SLIDES = [
  TitleSlide0613,          // 1  Portada
  QueAvaluaSlide,          // 2  Visió Tècnica
  ArquitecturaMVCSlide,    // 3  Estructura Carpetes
  DecisionsSeguretatSlide, // 4  Rols i Middlewares
  FluxPeticioSlide,        // 5  Controladors
  PHPvsLaravelSlide,       // 6  Serveis
  EquipG3Slide,            // 7  Butaques i Concurrència
  UMLSlide,                // 8  Esquema BD (UML)
  TancamentSlide,          // 9  Serveis Externs
  ReflexioCriticaSlide,    // 10 Reflexió Crítica
  MilloresFuturesSlide,    // 11 Millores Futures
  DemoVideoSlide,          // 12 Demo Video
  QRSlide,                 // 13 QR App
  TancamentFinalSlide,     // 14 Tancament
]

export default function Presentation0613() {
  return <SlideEngine slides={SLIDES} lightMode />
}
