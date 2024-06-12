export const fetchWeather = async (city) => {
  const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
  );
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
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return arr[val % 16];
  };
  data.wind.direction = degToCompass(data.wind.deg);

  return data;
};
