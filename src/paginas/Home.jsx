import MapComponent from "../componentes/Mapa";
import Chat from "../componentes/Chat";
import Nubi from "../img/Nubi.png"
import Textura from "../img/test.jpg"
import { useEffect, useState } from "react";

export default function Home() {
  // const [darkMode, setDarkMode] = useState(false)
  // useEffect(() => {
  //   var theme = localStorage.getItem("theme")
  //   theme == "dark" ? setDarkMode(true) : setDarkMode(false)
  // }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center dark:bg-[#0e1e2e] bg-gray-600">
        <div
          className="w-full h-[400px] bg-cover bg-center bg-no-repeat relative"
          style={{
            backgroundImage: `linear-gradient(
            rgba(25, 50, 75, 0.8),
            rgba(18, 38, 58, 0.95),
            rgba(14, 30, 46, 1)
          ), url(${Textura})`,
          }}
        ></div>
        <div className="w-[90%] md:w-[60%] -mt-72 relative z-10 backdrop-blur-md bg-white/10 dark:bg-[#0e1e2e]/70 rounded-2xl shadow-xl p-6">
          <MapComponent />
        </div>
      </div>
    </>
  );
}