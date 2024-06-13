const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

const weatherConditionsMap = {
  "Clear": "Céu limpo",
  "Clouds": "Nuvens",
  "Rain": "Chuva",
  "Drizzle": "Garoa",
  "Thunderstorm": "Trovoada",
  "Snow": "Neve",
  "Mist": "Névoa",
  "Smoke": "Fumaça",
  "Haze": "Neblina",
  "Dust": "Poeira",
  "Fog": "Nevoeiro",
  "Sand": "Areia",
  "Ash": "Cinzas",
  "Squall": "Rajada",
  "Tornado": "Tornado"
};

const translateCondition = (condition) => {
  return weatherConditionsMap[condition] || condition;
};

export const fetchCoordinates = async (city, state, country = 'BR') => {
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=1&appid=${apiKey}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar coordenadas");
  }

  const data = await response.json();
  if (data.length === 0) {
    throw new Error("Nenhuma coordenada encontrada para a localização fornecida");
  }

  return { lat: data[0].lat, lon: data[0].lon, name: data[0].name };
};

export const fetchWeather = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erro ao buscar o clima");
  }

  const data = await response.json();

  data.main.temp = Math.round(data.main.temp);
  data.main.feels_like = Math.round(data.main.feels_like);
  data.main.temp_min = Math.round(data.main.temp_min);
  data.main.temp_max = Math.round(data.main.temp_max);
  data.wind.speed = Math.round(data.wind.speed);

  const degToCompass = (num) => {
    const val = Math.floor(num / 22.5 + 0.5);
    const arr = [
      "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
    ];
    return arr[val % 16];
  };
  data.wind.direction = degToCompass(data.wind.deg);

  data.weather = data.weather.map(condition => ({
    ...condition,
    main: translateCondition(condition.main)
  }));

  return data;
};
