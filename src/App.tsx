import './App.css'
import DoorScene from './components/DoorScene'
import Hero from './components/Hero'
import WorkGateway from './components/WorkGateway'
import FeaturedWork from './components/FeaturedWork'
import Contact from './components/Contact'

function App() {
  return (
    <div className="app">
      <DoorScene />
      <Hero />
      <WorkGateway />
      <FeaturedWork />
      <Contact />
    </div>
  )
}

export default App
