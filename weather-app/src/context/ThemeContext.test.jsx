import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext.jsx'

// Mock localStorage
const localStorageMock = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value
    }),
    clear: vi.fn(() => {
      store = {}
    }),
  }
})()

Object.defineProperty(window, 'localStorage', { value: localStorageMock })

// Test component using context
const TestConsumer = () => {
  const { theme, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme} data-testid="toggle">Toggle</button>
    </div>
  )
}

describe('ThemeContext with localStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.documentElement.setAttribute('data-theme', 'light')
    localStorage.clear()
  })

  it('provides default theme if no localStorage', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )

    expect(screen.getByTestId('theme')).toHaveTextContent('light')
    expect(document.documentElement.getAttribute('data-theme')).toBe('light')
  })

  it('toggles theme from light to dark', async () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )

    const toggleBtn = screen.getByTestId('toggle')
    fireEvent.click(toggleBtn)

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('dark')
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'dark')
    })
  })

  it('toggles theme from dark to light', async () => {
    // Set initial theme to dark
    localStorage.setItem('theme', 'dark')
    document.documentElement.setAttribute('data-theme', 'dark')

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    )

    const toggleBtn = screen.getByTestId('toggle')
    fireEvent.click(toggleBtn)

    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('light')
      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
      expect(localStorage.setItem).toHaveBeenCalledWith('theme', 'light')
    })
  })
})
