import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '88269e24cfbc2219773bb3ae2aec34d2';
const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${API_KEY}`;

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}&q=${city}`);
        setWeather(response.data);
    
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setWeather(null);
    setCity(e.target.elements.city.value);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover text-center">
      <div className="bg-white rounded-lg shadow p-8">
        <h1 className="rounded-full text-2xl font-bold mb-4">What's Weather Like TODAY?</h1>
        <h2 className="rounded-full text-2xl font-bold mb-1">Weather Forecaster</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="city"
              placeholder="Enter Name Of The City"
              className="w-full px-8 py-4 border border-gray-800 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-ls"
          >
            Get Weather
          </button>
          </div>
        </form>
        {weather && (
          <div className="mt-8 border border-gray-300 p-4 rounded-lg">
            <h2 className="rounded-full text-xl font-bold">
              Name Of The City: {weather.name}
              
            </h2>

            <p className="">Condition: {weather.weather[0].description}</p>
            <p className="text-lg mt-2">
              Temperature: {Math.round(weather.main.temp)}°C
            </p>
            <p className="text-lg mt-2">
              Wind Speed: {weather.wind.speed} m/s
            </p>
            <p className="text-lg mt-2">
              Humidity: {weather.main.humidity}%
            </p>
            <p className="text-lg mt-2">
              Current Location: {weather.coord.lat}°, {weather.coord.lon}°
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
