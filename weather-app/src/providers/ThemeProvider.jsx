
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../store/themeSlice'

export function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme)
  const dispatch = useDispatch()

  useEffect(() => {
    document.documentElement.className = theme
  }, [theme])

  return children
}
