import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home'
import Safaris from './pages/Safaris'
import Gallery from './pages/Gallery'
import Rooms from './pages/Rooms'
import Rates from './pages/Rates'
import Contact from './pages/Contact'
import About from './pages/About'
import Events from './pages/Events'
import FAQs from './pages/FAQs'
import NotFound from './pages/NotFound'

function App() {
  const location = useLocation()

  // Treat all /safaris/* and /events/* routes as the same page for AnimatePresence
  const pageKey = location.pathname.startsWith('/safaris')
    ? '/safaris'
    : location.pathname.startsWith('/events')
    ? '/events'
    : location.pathname

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={pageKey}>
          <Route path="/" element={<Home />} />
          <Route path="/safaris" element={<Safaris />} />
          <Route path="/safaris/:category" element={<Safaris />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:category" element={<Events />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}

export default App
