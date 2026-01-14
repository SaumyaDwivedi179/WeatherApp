import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { fetchWeatherByCoords, CITY_COORDS } from '../services/weatherApi.js'

vi.mock('axios')

describe('Weather API (Axios)', () => {
  beforeEach(() => vi.clearAllMocks())

  it('fetches weather data', async () => {
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

    const result = await fetchWeatherByCoords(52.52, 13.41)
    
    expect(result.temperature).toBe(23)
    expect(result.feelsLike).toBe(21)
    expect(result.humidity).toBe(65)
    expect(axios.get).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast',
      expect.objectContaining({
        params: expect.objectContaining({
          latitude: 52.52,
          longitude: 13.41
        })
      })
    )
  })

  it('rejects invalid coordinates', async () => {
    await expect(fetchWeatherByCoords()).rejects.toThrow('Latitude and longitude required')
  })

  it('handles 400 error', async () => {
    axios.get.mockRejectedValue({ response: { status: 400 } })
    await expect(fetchWeatherByCoords(0, 0)).rejects.toThrow('Invalid coordinates')
  })
})
