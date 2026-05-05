import SlideEngine from '../../components/shared/SlideEngine'
import TitleSlide0613        from './slides/TitleSlide0613'
import QueAvaluaSlide        from './slides/QueAvaluaSlide'
import PerQuePHPSlide        from './slides/PerQuePHPSlide'
import ArquitecturaMVCSlide  from './slides/ArquitecturaMVCSlide'
import DecisionsSeguretatSlide from './slides/DecisionsSeguretatSlide'
import FluxPeticioSlide      from './slides/FluxPeticioSlide'
import PHPvsLaravelSlide     from './slides/PHPvsLaravelSlide'
import EquipG3Slide          from './slides/EquipG3Slide'
import ReflexioFAQSlide      from './slides/ReflexioFAQSlide'
import TancamentSlide        from './slides/TancamentSlide'

const SLIDES = [
  TitleSlide0613, QueAvaluaSlide, PerQuePHPSlide,
  ArquitecturaMVCSlide, DecisionsSeguretatSlide, FluxPeticioSlide,
  PHPvsLaravelSlide, EquipG3Slide, ReflexioFAQSlide, TancamentSlide,
]

export default function Presentation0613() {
  return <SlideEngine slides={SLIDES} />
}
