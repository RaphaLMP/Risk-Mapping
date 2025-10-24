import { useEffect, useState } from "react";
import { ArrowLongDownIcon } from "@heroicons/react/16/solid";

export default function WeatherCard({ Lat, Long }) {
  const [weather, setWeather] = useState(null);
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
    fetchWeather();
  }, []);

  if (loading)
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-gray-400 animate-pulse">Carregando dados...</p>
      </div>
    );

  if (!weather)
    return (
      <div className="text-center text-red-500">
        Não foi possível carregar os dados climáticos.
      </div>
    );

  // Define o alerta de risco
  const rain = weather.precipitation;
  let alertColor = "bg-green-600";
  let alertText = "Sem risco de enchente";

  if (rain > 5 && rain <= 20) {
    alertColor = "bg-yellow-500";
    alertText = "Chuva moderada — Atenção";
  } else if (rain > 20) {
    alertColor = "bg-red-600";
    alertText = "Risco alto de enchente ⚠️";
  }
  return (
    <div className="dark:bg-[#212e47] rounded-2xl p-8 text-white shadow-lg lg:w-[50%] h-[50%]">
      <h2 className="text-2xl font-semibold text-center mb-6 dark:text-white">
        🌦️ Painel de Monitoramento
      </h2>

      <div className="flex flex-col items-center mb-8">
        <p className="text-7xl font-bold drop-shadow-md">{weather.temperature_2m}°C</p>
        <p className="text-sm text-gray-200 mt-1">Temperatura atual</p>
      </div>

      <div className="flex justify-center gap-12 mb-8">
        <div className="text-center">
          <p className="text-gray-200 text-sm">Chuva</p>
          <p className="text-xl font-medium">{rain} mm</p>
        </div>
        <div className="text-center">
          <p className="text-gray-200 text-sm">Vento</p>
          <p className="text-xl font-medium">{weather.wind_speed_10m} km/h</p>
        </div>
      </div>

      <div className={`${alertColor} text-white text-center font-semibold py-2 rounded-xl`}>
        {alertText}
      </div>
    </div>

  );
}