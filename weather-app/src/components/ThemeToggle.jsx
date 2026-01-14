
import { useEffect } from 'react'  
import useThemeStore from '../stores/themeStore.js'

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore()

  
  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
