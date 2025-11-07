import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import WeatherCard from "./Tempeture";
import Nubi from "../img/Nubi.png";
import NubiBranco from "../img/Nubi_Branco.png";

export default function NubiInfo() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [position, setPosition] = useState(null);
  const [animateCard, setAnimateCard] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(() => {
    const isHome = location.pathname === "/" || location.pathname === "/home";
    const isDesktop = window.innerWidth >= 1024;
    return isHome && isDesktop;
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");

    setDarkMode(theme === "dark");

    if (lat && lng) {
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }

    setTimeout(() => setAnimateCard(true), 300);
  }, []);

  const cardClasses = "bg-[#5e90bbab] dark:bg-[#22415A]/90 backdrop-blur-md rounded-3xl shadow-2xl p-6 transform transition-all duration-1000";
  const animationClasses = animateCard ? "opacity-100 translate-x-0 scale-100" : "opacity-0 translate-x-20 scale-90";
  const nubiImage = darkMode ? NubiBranco : Nubi;

  return (
    <>
      {!isCardOpen && (
        <button
          onClick={() => setIsCardOpen(true)}
          className="hidden lg:flex fixed top-40 right-6 z-[1050] items-center gap-2 bg-[#5e90bbab] dark:bg-[#22415A]/90 backdrop-blur-md rounded-full shadow-2xl px-4 py-3 text-white font-semibold hover:scale-105 transition-all duration-300"
        >
          <img className="h-[40px] w-[40px]" src={nubiImage} alt="Nubi" />
          <span className="text-sm">Nubi Alerta</span>
        </button>
      )}

      {!isCardOpen && (
        <button
          onClick={() => setIsCardOpen(true)}
          className="lg:hidden fixed top-40 right-4 z-[1050] flex items-center gap-2 bg-[#5e90bbab] dark:bg-[#22415A]/90 backdrop-blur-md rounded-full shadow-2xl px-4 py-2 text-white font-semibold"
        >
          <img className="h-[30px] w-[30px]" src={nubiImage} alt="Nubi" />
          <span className="text-xs">Info</span>
        </button>
      )}

      {isCardOpen && (
        <div className="hidden lg:block fixed top-40 right-6 z-[1050]">
          <div className={`${cardClasses} max-w-sm ${animationClasses}`}>
            <button
              onClick={() => setIsCardOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200 hover:scale-110"
              aria-label="Fechar"
            >
              ×
            </button>

            <div className={`flex items-center gap-3 mb-4 transform transition-all duration-700 delay-300 ${
              animateCard ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-5"
            }`}>
              <img
                className="h-[70px] w-[70px] flex-shrink-0 drop-shadow-lg"
                src={nubiImage}
                alt="Nubi"
                style={{ animation: animateCard ? 'bounce 1.5s ease-in-out 1' : 'none' }}
              />
              <div className="text-white">
                <p className="text-xl font-bold mb-1 drop-shadow">Oi, eu sou o Nubi!</p>
                <p className="text-sm drop-shadow">Veja os alertas e áreas de risco da sua cidade.</p>
              </div>
            </div>

            {position && (
              <div className={`transform transition-all duration-700 delay-600 ${
                animateCard ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                <WeatherCard Lat={position.lat} Long={position.lng} />
              </div>
            )}
          </div>
        </div>
      )}

      {isCardOpen && (
        <div className="lg:hidden fixed top-24 right-4 z-[1050] max-w-[calc(100vw-2rem)]">
          <div className={`${cardClasses} rounded-2xl p-4 ${animateCard ? "opacity-100 translate-y-0 scale-100" : "opacity-0 -translate-y-10 scale-90"}`}>
            <button
              onClick={() => setIsCardOpen(false)}
              className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-200"
              aria-label="Fechar"
            >
              ×
            </button>

            <div className="flex items-center gap-3 mb-3">
              <img
                className="h-[50px] w-[50px] flex-shrink-0 drop-shadow-lg"
                src={nubiImage}
                alt="Nubi"
                style={{ animation: animateCard ? 'bounce 1.5s ease-in-out 1' : 'none' }}
              />
              <div className="text-white flex-1 pr-6">
                <p className="text-base font-bold drop-shadow">Oi, eu sou o Nubi!</p>
                <p className="text-xs drop-shadow">Veja os alertas e áreas de risco.</p>
              </div>
            </div>

            {position && (
              <div className={`transform transition-all duration-700 delay-400 ${animateCard ? "opacity-100" : "opacity-0"}`}>
                <WeatherCard Lat={position.lat} Long={position.lng} />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}