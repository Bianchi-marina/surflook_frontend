import { useState } from 'react';
import "./Weather.css";
import search from "../../../assets/dark/search.png";
import WeatherGrid from "../../../components/WeatherGrid/WeatherGrid";
import { fetchCoordinates, fetchWeather } from '../../../api/weatherApi';
import { OverlayLogo } from '../../../components/OverlayLogo/OverlayLogo'

const Weather = () => {
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchWeather = async () => {
    setError(null);
    setWeatherData(null);
    
    if (!city || !state) {
      setError('Por favor, preencha ambos os campos: cidade e estado.');
      return;
    }

    setLoading(true);
    try {
      const { lat, lon, name } = await fetchCoordinates(city, state);
      if (name.toLowerCase() !== city.toLowerCase()) {
        throw new Error(`A cidade retornada (${name}) não corresponde à cidade pesquisada (${city}).`);
      }
      const data = await fetchWeather(lat, lon);
      setWeatherData(data);
    } catch (error) {
      setError('Não foi possível obter informações. Por favor, tente novamente.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="weather-container">
      <div className="search-weather-content">
        <div className="intro-text">
          <p>Hoje precisa de roupa de borracha? Procure o climatempo por cidade e estado.</p>
        </div>
        <div className="search-input">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Digite a cidade aqui..."
          />
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="Digite o estado aqui..."
          />
          <button onClick={handleFetchWeather}>
            <img src={search} alt="Search" />
          </button>
        </div>
      </div>
      <div className='container-response'>
      {error && <p className="error-message">{error}</p>}
        {loading && (
         <OverlayLogo />
        )}
        {!loading && !weatherData && (
           <OverlayLogo />
        )}
        {weatherData && !loading && <WeatherGrid weatherData={weatherData} />}
      </div>
    </section>
  );
};

export default Weather;
