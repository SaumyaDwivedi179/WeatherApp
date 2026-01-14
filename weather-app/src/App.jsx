// src/App.jsx
import { useState } from 'react'
import Header from './components/Header.jsx'
import { SearchForm } from './components/SearchForm.jsx'
import WeatherCard from './components/WeatherCard.jsx'
import { fetchWeatherInfoByCoordinates, CITY_COORDS } from './services/weatherApi'
import styles from './App.module.css'

function App() {
  const [currentWeather, setCurrentWeather] = useState(null)
  const [weatherReports, setWeatherReports] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [theme, setTheme] = useState('dark')

  const handleSearch = async (cityNameInput) => {
    const cityName = cityNameInput.toLowerCase().trim()
    const coordinates = CITY_COORDS[cityName]

    if (!coordinates) {
      setErrorMessage(`City "${cityNameInput}" not found. Try London, Delhi, or Tokyo.`)
      setCurrentWeather(null)
      setWeatherReports(null)
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const weatherData = await fetchWeatherInfoByCoordinates(coordinates.lat, coordinates.lon)
      const formattedWeather = {
        ...weatherData,
        city: cityNameInput.charAt(0).toUpperCase() + cityNameInput.slice(1)
      }
      setCurrentWeather(formattedWeather)
      setWeatherReports(formattedWeather)
    } catch (fetchError) {
      setErrorMessage(fetchError.message || 'Failed to fetch weather data.')
      setCurrentWeather(null)
      setWeatherReports(null)
    } finally {
      setIsLoading(false)
    }
  }

  const handleThemeToggle = () => {
    setTheme((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={`${styles.appContainer} ${styles[theme]}`}>
      <div className={styles.mainWrapper}>
        <Header theme={theme} onThemeToggle={handleThemeToggle} />
        <main className={styles.mainSection}>
          <SearchForm onSearch={handleSearch} theme={theme} />
          {isLoading && <p className={styles.statusText}>Searching the skies...</p>}
          {errorMessage && <div className={styles.errorBox}>{errorMessage}</div>}
          {currentWeather && !isLoading && <WeatherCard data={currentWeather} theme={theme} />}
        </main>
        <footer className={`${styles.footer} ${styles[theme]}`}>
          Powered by Open-Meteo API
        </footer>
      </div>
    </div>
  )
}

export default App
