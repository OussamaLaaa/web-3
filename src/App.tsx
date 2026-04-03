import { useRef } from 'react'
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
  const featuredSectionRef = useRef<HTMLElement>(null)
  const firstWorkItemRef = useRef<HTMLDivElement>(null)
  const firstWorkVisualRef = useRef<HTMLDivElement>(null)

  return (
    <div className="app">
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <DoorScene />
      <Hero />
      <FramedIdentity
        sharedSectionRef={featuredSectionRef}
        sharedFirstItemRef={firstWorkItemRef}
        sharedFirstVisualRef={firstWorkVisualRef}
      />
      <FeaturedWork
        sharedSectionRef={featuredSectionRef}
        sharedFirstItemRef={firstWorkItemRef}
        sharedFirstVisualRef={firstWorkVisualRef}
      />
      <Recommendations />
      <Contact />
    </div>
  )
}

export default App
