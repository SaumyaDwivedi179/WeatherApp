import axios from 'axios'


const API_BASE = 'https://api.open-meteo.com/v1/forecast'

export const fetchWeatherByCoords = async (lat, lon) => {
  
  
  if (lat == null || lon == null) {
    throw new Error('Latitude and longitude required')
  }

  try {
    const { data } = await axios.get(API_BASE, {
      params: {
        latitude: lat,
        longitude: lon,
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature',
        timezone: 'auto',
        forecast_days: 1
      }
    })

    const current = data.current

    return {
      city: 'Demo City', 
      temperature: Math.round(current.temperature_2m),
      feelsLike: Math.round(current.apparent_temperature),
      humidity: current.relative_humidity_2m,
      condition: 'Clear Sky' 
    }
  } catch (error) {
    if (error.response?.status === 400) {
      throw new Error('Invalid coordinates')
    }
    throw new Error('Weather service unavailable')
  }
}

// Popular cities coords
export const CITY_COORDS = {
  delhi: { lat: 28.61, lon: 77.23 },
  mumbai: { lat: 19.07, lon: 72.88 },
  london: { lat: 51.51, lon: -0.13 },
  berlin: { lat: 52.52, lon: 13.41 },
  tokyo: { lat: 35.68, lon: 139.77 }
}
