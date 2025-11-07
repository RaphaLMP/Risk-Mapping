import { useEffect, useState } from "react";
import ChatWidget from "../componentes/BolinhaChat";
import MapComponent from "../componentes/Mapa";

export default function Home() {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    const lat = localStorage.getItem("lat");
    const lng = localStorage.getItem("lng");

    if (lat && lng) {
      setPosition({ lat: parseFloat(lat), lng: parseFloat(lng) });
    }
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden relative">
      <div className="flex-1 w-full h-full overflow-hidden relative">
        <MapComponent />
      </div>
    </div>
  );
}