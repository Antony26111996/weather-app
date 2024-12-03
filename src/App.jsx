import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY = 'your api ';
  const BASE_URL = 'your url';

  const fetchWeather = async () => {
    if (!city) {
      setError('Please enter a city name');
      return;
    }
    try {
      setError('');
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',
        },
      });
      setWeather(response.data);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
    }
  };

  const getTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <img src={`your image`} alt={weather.weather[0].description} />
          <h3>{weather.main.temp}°C</h3>
          <p>{weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
          <p>Sunrise: {getTime(weather.sys.sunrise)}</p>
          <p>Sunset: {getTime(weather.sys.sunset)}</p>
        </div>
      )}
    </div>
  );
};

export default App;
