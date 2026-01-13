import { useState, useEffect } from 'react';


import { fetchWeatherInfoByCoordinates, CITY_COORDS } from '../services/weatherApi';

export function useWeather(cityName) {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (!cityName) return;

    let ignore = false;

    const startFetching = async () => {
      
      const coordinates = CITY_COORDS[cityName.toLowerCase().trim()];

      if (!coordinates) {
        setErrorMessage(`City "${cityName}" not found. Try London, Delhi, or Tokyo.`);
        setCurrentWeather(null);
        return;
      }

      setIsLoading(true);
      setErrorMessage(null);

      try {
        const weatherData = await fetchWeatherInfoByCoordinates(coordinates.lat, coordinates.lon);

        if (!ignore) {
          setCurrentWeather({
            ...weatherData,
            city: cityName.charAt(0).toUpperCase() + cityName.slice(1)
          });
        }
      } catch (err) {
        if (!ignore) {
          setErrorMessage(err.message || 'Failed to fetch weather data.');
          setCurrentWeather(null);
        }
      } finally {
        if (!ignore) setIsLoading(false);
      }
    };

    startFetching();

    return () => { ignore = true; };
  }, [cityName]);

  return { currentWeather, isLoading, errorMessage };
}