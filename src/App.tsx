import './App.css'
import DoorScene from './components/DoorScene'
import Hero from './components/Hero'
import FramedIdentity from './components/FramedIdentity'
import FeaturedWork from './components/FeaturedWork'
import Recommendations from './components/Recommendations'
import Contact from './components/Contact'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="app">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <DoorScene />
      <Hero />
      <FramedIdentity />
      <FeaturedWork />
      <Recommendations />
      <Contact />
    </div>
  )
}

export default App
