import { useState } from 'react';
import "./Weather.css";
import search from "../../../assets/dark/search.png";
import WeatherGrid from "../../../components/WeatherGrid/WeatherGrid";
import { fetchWeather } from '../../../api/weatherApi';

const Weather = () => {

  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  
  const handleFetchWeather = async () => {
    setError(null);
    try {
      const data = await fetchWeather(city);
      setWeatherData(data);
    } catch (error) {
      setError('Não foi possível obter informações. Por favor, tente novamente.');
      setWeatherData(null);
    }
  };

  return (
    <section className="weather-container">
      <div className="search-weather-content">
        <div className="intro-text">
          <p>Hoje precisa de roupa de borracha? Procure o climatempo por cidade.</p>
        </div>
        <div className="search-input">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite a cidade aqui..."
          />
          <button onClick={handleFetchWeather}>
            <img src={search} alt="Search" />
          </button>
        </div>
      </div>
      <div className='container-response'>
        {error && <p className="error-message">{error}</p>}
        {weatherData && <WeatherGrid weatherData={weatherData} />}
      </div>
    </section>
  );
};

export default Weather;
