import { useState } from 'react';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import ThemeToggleButton from './components/AppContext.jsx';
import { fetchWeatherByCoords, CITY_COORDS } from './services/weatherApi';

function WeatherAppContent() {
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const { theme } = useTheme();

  const handleCitySearch = async (cityName) => {
    const normalizedCityName = cityName.toLowerCase().trim();
    const cityCoordinates = CITY_COORDS[normalizedCityName];

    if (!cityCoordinates) {
      setErrorMessage(`City "${cityName}" not found in our list. Try London, Delhi, or Tokyo.`);
      setWeatherData(null);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const weatherResponse = await fetchWeatherByCoords(
        cityCoordinates.lat, 
        cityCoordinates.lon
      );
      const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1);
      setWeatherData({
        ...weatherResponse,
        city: formattedCityName,
      });
    } catch (error) {
      setErrorMessage(error.message || "Failed to fetch weather data.");
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container" data-theme={theme}>
      <div className="app-wrapper">
        <Header />
        <ThemeToggleButton />

        <main className="main-content">
          <SearchForm onSearch={handleCitySearch} />

          {isLoading && (
            <p className="loading-text">Searching the skies...</p>
          )}

          {errorMessage && (
            <div className="error-message">
              {errorMessage}
            </div>
          )}

          {weatherData && !isLoading && <WeatherCard data={weatherData} />}
        </main>

        <footer className="footer">
          Powered by Open-Meteo API
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <WeatherAppContent />
    </ThemeProvider>
  );
}

export default App;
