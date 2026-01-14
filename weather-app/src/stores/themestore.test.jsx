import { describe, it, expect, beforeEach } from 'vitest'
import useThemeStore from './themeStore.js'

// Reset Zustand store + localStorage before each test
beforeEach(() => {
  useThemeStore.setState({ theme: 'light' })
  localStorage.clear()
})

describe('useThemeStore', () => {
  it('should have light theme as default', () => {
    const { theme } = useThemeStore.getState()
    expect(theme).toBe('light')
  })

  it('should toggle theme from light to dark', () => {
    const { toggleTheme } = useThemeStore.getState()
    toggleTheme()

    const { theme } = useThemeStore.getState()
    expect(theme).toBe('dark')
  })

  it('should toggle theme back from dark to light', () => {
    useThemeStore.setState({ theme: 'dark' })

    const { toggleTheme } = useThemeStore.getState()
    toggleTheme()

    const { theme } = useThemeStore.getState()
    expect(theme).toBe('light')
  })

  it('should persist theme to localStorage', () => {
    const { toggleTheme } = useThemeStore.getState()
    toggleTheme() // light → dark

    const storedValue = localStorage.getItem('theme-storage')
    expect(storedValue).toContain('dark')
  })
})
