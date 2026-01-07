import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import Header from '../components/Header.jsx'

describe('Header Component', () => {
 
  it('renders Weatherly title', () => {
    render(<Header />)
    expect(screen.getByText('Weatherly')).toBeInTheDocument()
  })

 
  it('renders subtitle with weather updates text', () => {
    render(<Header />)
    
    expect(screen.getByText(/get instant weather/i)).toBeInTheDocument()
  })
})