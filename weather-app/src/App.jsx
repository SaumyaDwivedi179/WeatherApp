import { useState } from 'react';
import Header from './components/Header.jsx';
import SearchForm from './components/SearchForm.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import { fetchWeatherByCoords, CITY_COORDS } from './services/weatherApi';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        city: city.charAt(0).toUpperCase() + city.slice(1)
      });
    } catch (err) {
      setError(err.message || "Failed to fetch weather data.");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ width: '100%', maxWidth: '500px' }}>
        {/* Header Component */}
        <Header />
        
        {/* Main Interaction Area */}
        <main style={{
          background: 'rgba(255, 255, 255, 0.05)',
          padding: '24px',
          borderRadius: '0 0 24px 24px',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 25px 45px rgba(0,0,0,0.2)'
        }}>
          <SearchForm onSearch={handleSearch} />

          {/* Status Indicators */}
          {loading && (
            <p style={{ textAlign: 'center', opacity: 0.7 }}>Searching the skies...</p>
          )}
          
          {error && (
            <div style={{
              padding: '12px',
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              color: '#fca5a5',
              textAlign: 'center',
              marginTop: '10px'
            }}>
              {error}
            </div>
          )}
          
          {/* Display weather results */}
          {weather && !loading && (
            <WeatherCard data={weather} />
          )}
        </main>

        <footer style={{ marginTop: '20px', textAlign: 'center', opacity: 0.5, fontSize: '0.8rem' }}>
          Powered by Open-Meteo API
        </footer>
      </div>
    </div>
  );
}

export default App;