import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import App from '../App.jsx'  
import * as weatherApi from '../services/weatherApi.js'  

vi.mock('../services/weatherApi.js', async () => {  
  const actual = await vi.importActual('../services/weatherApi.js')
  return {
    ...actual,
    fetchWeatherInfoByCoordinates: vi.fn(),
  }
})

describe('App Integration Test', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('searches for a city and displays weather data', async () => {
    const mockWeatherData = {
      city: 'London',
      temperature: 22,
      feelsLike: 24,
      humidity: 50,
      condition: 'Clear Sky'
    }
    
    weatherApi.fetchWeatherInfoByCoordinates.mockResolvedValue(mockWeatherData)
    render(<App />)

    const input = screen.getByPlaceholderText(/enter city name/i)
    
    fireEvent.change(input, { target: { value: 'london' } })
    fireEvent.click(screen.getByRole('button', { name: /get weather/i }))  // Button OK

    await waitFor(() => {
      expect(screen.getByText('22°C')).toBeInTheDocument()
      expect(screen.getByText(/London/i)).toBeInTheDocument()
      expect(weatherApi.fetchWeatherInfoByCoordinates).toHaveBeenCalledWith(
        weatherApi.CITY_COORDS.london.lat,
        weatherApi.CITY_COORDS.london.lon
      )
    })
  })

  it('shows error message for invalid cities', async () => {
    render(<App />)
    
    const input = screen.getByPlaceholderText(/enter city name/i)
    fireEvent.change(input, { target: { value: 'Mars' } })
    fireEvent.click(screen.getByRole('button', { name: /get weather/i }))

    // Fixed: Match EXACT error text from App.jsx
    await waitFor(() => {
      expect(screen.getByText(/City "Mars" not found\. Try London, Delhi, or Tokyo\./i)).toBeInTheDocument()
    })
  })
})
