import { useEffect, useState } from "react";
import ChatWidget from "../componentes/BolinhaChat";
import MapComponent from "../componentes/Mapa";
import WeatherCard from "../componentes/Tempeture";
import Nubi from "../img/Nubi.png";
import NubiBranco from "../img/Nubi_Branco.png";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");

    setDarkMode(theme === "dark");

    if (lat && lng) {
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, []);

  return (
    <>
      <div
        className="w-full flex flex-col items-center h-full bg-white dark:bg-gradient-to-br 
          dark:from-[#132235] dark:via-[#1a2f46] dark:to-[#233b56] transition-all duration-500 grid-rows-2 gap-6"
      >
        <div className="grid-row-3 gap-3 flex justify-center h-[400px] bg-[#5e90bbab] dark:bg-[#22415A] w-full">
          <div className="h-full flex flex-col xl:flex-row items-center justify-center w-[90%] sm:w-[70%] md:w-[60%] xl:w-[50%] grid-rows-2 gap-5">
            <div className="flex items-center">
              <img className="h-[120px] w-[120px] xl:h-[250px] xl:w-[250px]" src={Nubi} />
              <div className="text-blue-950 dark:text-amber-50 lg:w-[50%]">
                <p className="text-2xl xl:text-3xl font-semibold">Oi, eu sou o Nubi!</p>
                <p className="text-lg xl:text-lg">Veja aqui os alertas e áreas de risco da sua cidade.</p>
              </div>
            </div>
            <div className="h-[200px] w-full xl:w-1/3">
              {position && <WeatherCard Lat={position.lat} Long={position.lng} />}
            </div>
          </div>

        </div>

        <div className="w-[90%] md:w-[60%] xl:w-[70%] backdrop-blur-md bg-[#259add] dark:bg-[#0e1e2e]/70 rounded-2xl shadow-xl p-6 mb-12 transition-colors duration-500">
          <MapComponent />
        </div>

        <ChatWidget />
      </div>
    </>
  );
}
