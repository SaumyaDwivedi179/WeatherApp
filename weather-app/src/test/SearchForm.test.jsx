import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { SearchForm } from '../components/SearchForm.jsx'

describe('SearchForm', () => {
  it('renders input and calls onSearch', () => {
    const mockSearch = vi.fn()
    render(<SearchForm onSearch={mockSearch} />)
    
    const input = screen.getByPlaceholderText(/city name/i)
    fireEvent.change(input, { target: { value: 'Delhi' } })
    fireEvent.submit(input.closest('form'))
    
    expect(mockSearch).toHaveBeenCalledWith('Delhi')
  })
})
