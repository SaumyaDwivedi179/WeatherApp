
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../store/themeSlice'

export function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  useEffect(() => {
  document.documentElement.classList.toggle('dark', theme === 'dark')
  document.documentElement.classList.toggle('light', theme === 'light')
}, [theme])

  return children
}
