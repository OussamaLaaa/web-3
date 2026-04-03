import { useEffect, useState } from 'react'

type Theme = 'dark' | 'light'

const STORAGE_KEY = 'theme-preference'

const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.setAttribute('data-theme', theme)
  root.style.colorScheme = theme
}

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'light' || stored === 'dark') {
    applyTheme(stored)
    return stored
  }
  applyTheme('dark')
  return 'dark'
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)

  useEffect(() => {
    applyTheme(theme)
    window.localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))

  return { theme, toggleTheme }
}
