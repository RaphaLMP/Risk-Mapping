import { useEffect, useState } from "react";

export default function WeatherCard({ Lat, Long }) {
  const [weather, setWeather] = useState(null);
  const [cityName, setCityName] = useState("Carregando...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${Lat}&longitude=${Long}&current=temperature_2m,precipitation,wind_speed_10m`
        );
        const data = await res.json();
        setWeather(data.current);
      } catch (error) {
        console.error("Erro ao buscar dados climáticos:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchCityName() {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${Lat}&lon=${Long}&format=json`
        );
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village || data.address.state || "Localização";
        setCityName(city);
      } catch (error) {
        console.error("Erro ao buscar nome da cidade:", error);
        setCityName("Localização");
      }
    }

    fetchWeather();
    fetchCityName();
  }, [Lat, Long]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-400 dark:text-gray-300 animate-pulse">Carregando dados...</p>
      </div>
    );

  if (!weather)
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        Não foi possível carregar os dados climáticos.
      </div>
    );

  const rain = weather.precipitation;

  let alertBg = "bg-green-600";
  let alertTextColor = "text-white";
  let alertText = "Sem risco de enchente";

  if (rain > 5 && rain <= 20) {
    alertBg = "bg-yellow-500";
    alertTextColor = "text-white";
    alertText = "Chuva moderada — Atenção";
  } else if (rain > 20) {
    alertBg = "bg-red-600";
    alertTextColor = "text-white";
    alertText = "Risco alto de enchente ⚠️";
  }

  return (
    <div className="rounded-2xl p-4 shadow-lg bg-white/20 bg-gradient-to-bl from-cyan-500  to-blue-400 backdrop-blur-md transition-colors duration-300 grid grid-row-3 gap-3">
      <h2 className="text-2xl md:text-3xl text-center text-amber-50">
        {cityName}
      </h2>

      <div className="flex flex-col items-center">
        <p className="text-6xl md:text-6xl drop-shadow-md text-amber-50">
          {weather.temperature_2m}°
        </p>
      </div>

      <div className="flex justify-center gap-12">
        <div className="text-center">
          <p className="text-sm text-amber-50">Chuva</p>
          <p className="text-xl font-medium text-amber-50">{rain} mm</p>
        </div>
        <div className="text-center">
          <p className=" text-amber-50 text-sm">Vento</p>
          <p className="text-xl font-medium text-amber-50">
            {weather.wind_speed_10m} km/h
          </p>
        </div>
      </div>

      {/* <div className={`${alertBg} ${alertTextColor} text-center font-semibold py-2 rounded-xl`}>
        {alertText}
      </div> */}
    </div>
  );
}