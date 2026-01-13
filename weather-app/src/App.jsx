import { useState } from 'react'; 
import Header from './components/Header.jsx';
import { SearchForm } from './components/SearchForm.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import styles from './App.module.css';
import { useWeather } from "./hooks/useWeather"; 

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  
  const { currentWeather, isLoading, errorMessage } = useWeather(searchQuery);

  const handleSearch = (cityNameInput) => {
    setSearchQuery(cityNameInput.toLowerCase().trim());
  };

  return (
    <div className={styles.appContainer}>
      <div className={styles.mainWrapper}>
        <Header />

        <main className={styles.mainSection}>
          <SearchForm onSearch={handleSearch} />
          
          {isLoading && <p className={styles.statusText}>Searching the skies...</p>}
          
          {errorMessage && <div className={styles.errorBox}>{errorMessage}</div>}
          
          {}
          {currentWeather && !isLoading && !errorMessage && (
            <WeatherCard data={currentWeather} />
          )}
        </main>

        <footer className={styles.footer}>Powered by Open-Meteo API</footer>
      </div>
    </div>
  );
}

export default App;