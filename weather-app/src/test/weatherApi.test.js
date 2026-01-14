import { describe, it, expect, vi, beforeEach } from 'vitest'
import axios from 'axios'
import { fetchWeatherInfoByCoordinates, CITY_COORDS } from '../services/weatherApi.js'

vi.mock('axios')

describe('Weather API Service', () => {
  beforeEach(() => vi.clearAllMocks())

  it('fetches weather data successfully', async () => {
    const mockResponse = {
      data: {
        current: {
          temperature_2m: 22.5,
          apparent_temperature: 21.0,
          relative_humidity_2m: 65
        }
      }
    }
    
    axios.get.mockResolvedValue(mockResponse)

    const result = await fetchWeatherInfoByCoordinates(52.52, 13.41)
    
    expect(result).toEqual({
      city: 'Demo City',
      temperature: 23,  // Math.round(22.5)
      feelsLike: 21,    // Math.round(21.0)
      humidity: 65,
      condition: 'Clear Sky'
    })
    
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast',
      expect.objectContaining({
        params: expect.objectContaining({
          latitude: 52.52,
          longitude: 13.41,
          current: 'temperature_2m,relative_humidity_2m,apparent_temperature',
          timezone: 'auto',
          forecast_days: 1
        })
      })
    )
  })

  it('rejects null coordinates', async () => {
    await expect(fetchWeatherInfoByCoordinates(null, null)).rejects.toThrow('Latitude and longitude required')
    await expect(fetchWeatherInfoByCoordinates(52.52, null)).rejects.toThrow('Latitude and longitude required')
  })

  it('handles 400 error (invalid coordinates)', async () => {
    axios.get.mockRejectedValue({ response: { status: 400 } })
    await expect(fetchWeatherInfoByCoordinates(999, 999)).rejects.toThrow('Invalid coordinates')
  })

  it('handles network/service errors', async () => {
    axios.get.mockRejectedValue(new Error('Network timeout'))
    await expect(fetchWeatherInfoByCoordinates(52.52, 13.41)).rejects.toThrow('Weather service unavailable')
  })

  it('uses CITY_COORDS correctly', () => {
    expect(CITY_COORDS.delhi).toEqual({ lat: 28.61, lon: 77.23 })
    expect(CITY_COORDS.berlin).toEqual({ lat: 52.52, lon: 13.41 })
  })
})
