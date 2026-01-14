import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'
import { SearchForm } from '../components/SearchForm.jsx'  // ← NAMED IMPORT

describe('SearchForm', () => {
  it('renders input and calls onSearch', async () => {
    const mockSearch = vi.fn()
    render(<SearchForm onSearch={mockSearch} />)
    
    const input = screen.getByPlaceholderText(/city name/i)
    fireEvent.change(input, { target: { value: 'Delhi' } })
    fireEvent.submit(input.closest('form'))
    
    await waitFor(() => {
      expect(mockSearch).toHaveBeenCalledWith('Delhi')
    })
  })
})
