import React, { useState, useEffect } from 'react';
import axios from 'axios';
// JEEL PATEL 101410368
const App = () => {
    const [city, setCity] = useState('Toronto');
    const [weatherData, setWeatherData] = useState(null);
    const [search, setSearch] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState('');

    const API_KEY = '8a2421a074aa19952ca917cf237e0eb5';

    const fetchWeather = async (cityName) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    useEffect(() => {
        fetchWeather(city);

        // Update date and time every second
        const interval = setInterval(() => {
            const now = new Date();
            const options = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            };
            setCurrentDateTime(now.toLocaleDateString('en-US', options));
        }, 1000);

        return () => clearInterval(interval); // Clean up on component unmount
    }, [city]);

    const handleSearch = () => {
        if (search.trim()) {
            setCity(search.trim());
        }
    };

    return (
        <div className="app">
            <header>
                <h1>Weather Forecast</h1>
                <p>{currentDateTime}</p>
                <div className="search">
                    <input
                        type="text"
                        value={search}
                        placeholder="Search city..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
            </header>
            {weatherData ? (
                <div className="weather-container">
                    <div className="current-weather">
                        <h2>{weatherData.name}</h2>
                        <h3>{weatherData.weather[0].description}</h3>
                        <img
                            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`}
                            alt="Weather Icon"
                        />
                        <h1>{Math.round(weatherData.main.temp)}°C</h1>
                    </div>
                    <div className="details">
                        <h3>Details</h3>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>Feels Like: {Math.round(weatherData.main.feels_like)}°C</p>
                        <p>Pressure: {weatherData.main.pressure} hPa</p>
                    </div>
                </div>
            ) : (
                <p>Loading weather data...</p>
            )}
        </div>
    );
};

export default App;
