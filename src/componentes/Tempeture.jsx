import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLongDownIcon } from "@heroicons/react/16/solid";

export default function WeatherCard({Lat, Long}) {
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
    <motion.div
      className="max-w-sm mx-auto bg-gradient-to-br from-blue-900 to-blue-600 text-white rounded-2xl shadow-xl p-6 mt-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-semibold text-center mb-4">
        🌦️ Painel de Monitoramento
      </h2>

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-200">Temperatura</p>
          <p className="text-3xl font-bold">{weather.temperature_2m}°C</p>
        </div>
        <div>
          <p className="text-sm text-gray-200">Chuva</p>
          <p className="text-3xl font-bold">{rain} mm</p>
        </div>
        <div>
          <p className="text-sm text-gray-200">Vento</p>
          <p className="text-3xl font-bold">{weather.wind_speed_10m} km/h</p>
        </div>
      </div>

      <div
        className={`${alertColor} text-white text-center font-semibold py-2 rounded-xl`}
      >
        {alertText}
      </div>
    </motion.div>
  );
}
