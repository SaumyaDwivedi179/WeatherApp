import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App'; 
import * as weatherApi from '../services/weatherApi';


vi.mock('../services/weatherApi', async () => {
  const actual = await vi.importActual('../services/weatherApi');
  return {
    ...actual,
    fetchWeatherInfoByCoordinates: vi.fn(),
  };
});

describe('App Integration Test', () => {
  it('searches for a city and displays weather data', async () => {
    const mockWeatherData = {
      city: 'London',
      temperature: 22,
      feelsLike: 24,
      humidity: 50,
      condition: 'Clear Sky'
    };
    
    weatherApi.fetchWeatherInfoByCoordinates.mockResolvedValue(mockWeatherData);

    render(<App />);

    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole('button', { name: /get weather/i });

    fireEvent.change(input, { target: { value: 'london' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText('22°C')).toBeInTheDocument();
      expect(screen.getByText(/London/i)).toBeInTheDocument();
    });
  });

  it('shows error message for invalid cities', async () => {
    render(<App />);
    
    const input = screen.getByPlaceholderText(/enter city name/i);
    const button = screen.getByRole('button', { name: /get weather/i });

    fireEvent.change(input, { target: { value: 'Mars' } });
    fireEvent.click(button);

    expect(screen.getByText(/not found in our list/i)).toBeInTheDocument();
  });
});