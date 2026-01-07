import { describe, it, expect, vi } from 'vitest'
import { fetchWeatherByCoords, CITY_COORDS } from '../services/weatherApi.js'

global.fetch = vi.fn()

describe('Weather API Service', () => {
  beforeEach(() => vi.clearAllMocks())

  it('fetches weather for valid coordinates', async () => {
    const mockData = {
      current: {
        temperature_2m: 22.5,
        apparent_temperature: 21,
        relative_humidity_2m: 65,
        weather_code: 0
      }
    }
    
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => mockData
    })

    const result = await fetchWeatherByCoords(52.52, 13.41)
    
    expect(result).toEqual({
      city: 'Berlin',
      temperature: 23,
      feelsLike: 21,
      humidity: 65,
      condition: 'Clear'
    })
    
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('api.open-meteo.com')
    )
  })

  it('rejects invalid coordinates', async () => {
    await expect(fetchWeatherByCoords()).rejects.toThrow('Latitude and longitude required')
  })

  it('handles API error', async () => {
    global.fetch.mockResolvedValue({ ok: false })
    await expect(fetchWeatherByCoords(52.52, 13.41)).rejects.toThrow('Weather data unavailable')
  })

  it('provides city coordinates', () => {
    expect(CITY_COORDS.delhi).toEqual({ lat: 28.61, lon: 77.23 })
    expect(CITY_COORDS.london).toEqual({ lat: 51.51, lon: -0.13 })
  })
})
