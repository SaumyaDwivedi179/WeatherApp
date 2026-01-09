
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../store/themeSlice'

export function ThemeToggle() {
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  return (
    <button 
      className="theme-toggle"
      onClick={() => dispatch(toggleTheme())}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
