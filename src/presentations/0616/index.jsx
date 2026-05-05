import SlideEngine from '../../components/shared/SlideEngine'
import TitleSlide         from '../../slides/TitleSlide'
import RASlide            from '../../slides/RASlide'
import PropositSlide      from '../../slides/PropositSlide'
import AboutSlide         from '../../slides/AboutSlide'
import PlanificacionSlide from '../../slides/PlanificacionSlide'
import MetodologiaSlide   from '../../slides/MetodologiaSlide'
import InformesSlide      from '../../slides/InformesSlide'
import TutoriaSlide       from '../../slides/TutoriaSlide'
import DecisionesSlide    from '../../slides/DecisionesSlide'
import ArquitecturaSlide  from '../../slides/ArquitecturaSlide'
import ReflexionSlide     from '../../slides/ReflexionSlide'
import FinalSlide         from '../../slides/FinalSlide'

const SLIDES = [
  TitleSlide, RASlide, PropositSlide, AboutSlide,
  PlanificacionSlide, MetodologiaSlide, InformesSlide, TutoriaSlide,
  DecisionesSlide, ArquitecturaSlide, ReflexionSlide, FinalSlide,
]

export default function Presentation0616() {
  return <SlideEngine slides={SLIDES} />
}
