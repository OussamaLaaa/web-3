import './App.css'
import DoorScene from './components/DoorScene'
import Hero from './components/Hero'
import FramedIdentity from './components/FramedIdentity'
import FeaturedWork from './components/FeaturedWork'
import Recommendations from './components/Recommendations'
import Contact from './components/Contact'
import ThemeToggle from './components/ThemeToggle'
import { useTheme } from './hooks/useTheme'
import { useRef } from 'react'

function App() {
  const { theme, toggleTheme } = useTheme()
  const featuredSectionRef = useRef<HTMLElement | null>(null)
  const featuredFirstItemRef = useRef<HTMLDivElement | null>(null)
  const featuredFirstVisualRef = useRef<HTMLDivElement | null>(null)

  return (
    <div className="app">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <DoorScene />
      <Hero />
      <FramedIdentity />
      <FeaturedWork
        sharedSectionRef={featuredSectionRef}
        sharedFirstItemRef={featuredFirstItemRef}
        sharedFirstVisualRef={featuredFirstVisualRef}
      />
      <Recommendations />
      <Contact />
    </div>
  )
}

export default App
