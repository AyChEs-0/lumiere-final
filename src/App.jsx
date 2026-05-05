import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Selector        from './Selector'
import Presentation0616 from './presentations/0616/index'
import Presentation0613 from './presentations/0613/index'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"     element={<Selector />} />
        <Route path="/0616" element={<Presentation0616 />} />
        <Route path="/0613" element={<Presentation0613 />} />
      </Routes>
    </BrowserRouter>
  )
}
