import { useState } from 'react';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import { ThemeProvider, useTheme } from './context/ThemeContext.jsx';
import AppContext from './components/AppContext.jsx';
import { fetchWeatherByCoords, CITY_COORDS } from './services/weatherApi';

function AppContent() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { theme } = useTheme();

  const handleSearch = async (city) => {
    const cityName = city.toLowerCase().trim();
    const coords = CITY_COORDS[cityName];

    if (!coords) {
      setError(`City "${city}" not found in our list. Try London, Delhi, or Tokyo.`);
      setWeather(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchWeatherByCoords(coords.lat, coords.lon);
      setWeather({
        ...data,
        city: city.charAt(0).toUpperCase() + city.slice(1),
      });
    } catch (err) {
      setError(err.message || "Failed to fetch weather data.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container" data-theme={theme}>
      <div className="app-wrapper">
        <Header />
        <AppContext />

        <main className="main-content">
          <SearchForm onSearch={handleSearch} />

          {loading && (
            <p className="loading-text">Searching the skies...</p>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {weather && !loading && <WeatherCard data={weather} />}
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
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
