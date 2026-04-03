import './ThemeToggle.css'

type Theme = 'dark' | 'light'

interface ThemeToggleProps {
  theme: Theme
  onToggle: () => void
}

function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const label = theme === 'dark' ? 'Dark mode' : 'Light mode'

  return (
    <div className="theme-toggle-shell">
      <button
        className="theme-toggle"
        type="button"
        onClick={onToggle}
        aria-label="Toggle theme"
      >
        <span className="theme-toggle-track" aria-hidden="true">
          <span className={`theme-toggle-thumb ${theme}`} />
        </span>
        <span className="theme-toggle-label">{label}</span>
      </button>
    </div>
  )
}

export default ThemeToggle
