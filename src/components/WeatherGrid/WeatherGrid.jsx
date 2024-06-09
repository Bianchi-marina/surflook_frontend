import "./WeatherGrid.css";
import vento from "../../assets/light/vento.png";
import flag from "../../assets/light/flag.png";
import gota from "../../assets/light/gota.png";

const WeatherGrid = ({ weatherData }) => {
  const { name, main, wind } = weatherData;

  return (
    <div className="weather-response">
      <div className="top-infos">
        <div className="main-info">
          <p>{name}</p>
          <h1>{main.temp}°C</h1>
        </div>

        <p>
          {main.temp_max}°C / {main.temp_min}°C
        </p>
      </div>

      <div className="bottom-infos">
        <div className="icons-container">
          <img className="icon" src={vento} alt="Weather Icon" />
          <p>{wind.speed} km/h</p>
          <p>Vento</p>
        </div>
        <div className="icons-container">
          <img className="icon" src={flag} alt="Wind Direction Icon" />
          <p>{wind.deg}°</p>
          <p>Direção do Vento</p>
        </div>
        <div className="icons-container">
          <img className="icon" src={gota} alt="Humidity Icon" />
          <p>{main.humidity}%</p>
          <p>Humidade</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherGrid;
