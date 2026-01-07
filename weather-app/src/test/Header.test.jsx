import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Header from '../components/Header.jsx'

describe('Header Component', () => {
  // Test 1: Title renders (Exact match)
  it('renders Weatherly title', () => {
    render(<Header />)
    expect(screen.getByText('Weatherly')).toBeInTheDocument()
  })

  // Test 2: Subtitle contains expected text (Partial match using Regex)
  it('renders subtitle with weather updates text', () => {
    render(<Header />)
    // The /i makes it case-insensitive and it will find the substring
    expect(screen.getByText(/get instant weather/i)).toBeInTheDocument()
  })
})