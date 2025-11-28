import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("Toronto");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "9145f8dde51c93417495a0aa38703adc";

  function getWeather() {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&appid=${API_KEY}&units=metric`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("City not found");
        }
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setError("");
      })
      .catch(() => {
        setWeather(null);
        setError("City not found");
      });
  }

  useEffect(() => {
    getWeather();
  }, []);

  const condition = weather?.weather[0]?.main?.toLowerCase();

  return (
    <div className={`container ${condition}`}>
      <h1 className="title">Weather App</h1>

      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search city..."
        />
        <button onClick={getWeather}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-layout">
          <div className="left-panel">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="icon"
            />
            <h2>{weather.name}</h2>
            <p className="temp">{weather.main.temp}°C</p>
            <span className="badge">
              {weather.weather[0].description}
            </span>
          </div>
          
          <div className="right-panel">
            <div className="info-row">
              <span>Feels Like</span>
              <span>{weather.main.feels_like}°C</span>
            </div>
            <div className="info-row">
              <span>Humidity</span>
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="info-row">
              <span>Wind Speed</span>
              <span>{weather.wind.speed} m/s</span>
            </div>
            <div className="info-row">
              <span>Pressure</span>
              <span>{weather.main.pressure} hPa</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
