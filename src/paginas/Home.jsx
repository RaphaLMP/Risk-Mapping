import MapComponent from "../componentes/Mapa";
import Chat from "../componentes/Chat";
import Nubi from "../img/Nubi.png"

export default function Home() {
  return (
    <div className="w-full h-max flex justify-center dark:bg-[#112738]">
      <div className="w-[80%] flex flex-col md:flex-row min-h-screen overflow-y-auto">
        {/* Mapa */}
        <div className="w-full md:w-1/2 p-4">
          <div className="w-full h-[500px]">
            <MapComponent />
          </div>
        </div>

        {/* Chat */}
        <div className="w-full md:w-1/2 p-4">
          <div className="w-full h-[500px]">
            <Chat />
          </div>
        </div>
      </div>
    </div>
  );
}