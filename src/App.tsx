import './App.css'
import Hero from './components/Hero'
import FeaturedWork from './components/FeaturedWork'
import Recommendations from './components/Recommendations'
import Contact from './components/Contact'

function App() {
  return (
    <div className="app">
      <Hero />
      <FeaturedWork />
      <Recommendations />
      <Contact />
    </div>
  )
}

export default App
