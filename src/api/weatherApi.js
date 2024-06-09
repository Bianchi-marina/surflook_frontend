export const fetchWeather = async (city) => {
    const apiKey = import.meta.env.VITE_OPENWEATHERMAP_API_KEY;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Erro ao buscar o clima');
    }
    
    const data = await response.json();
    return data;
  };