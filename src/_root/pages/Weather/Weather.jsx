import "./Weather.css";
import search from "../../../assets/dark/search.png";
import WeatherGrid from "../../../components/WeatherGrid/WeatherGrid";

const Weather = () => {
  return (
    <section className="weather-container">
      <div className="search-weather-content">
        <div className="intro-text">
          <p>Procure checks por cidade e praias</p>
        </div>
        <div className="search-input">
          <input type="text" placeholder="Digite a cidade e praia..." />
          <button>
            <img src={search} alt="Search" />
          </button>
        </div>
      </div>
      <div>
        <WeatherGrid />
      </div>
    </section>
  );
};

export default Weather;
