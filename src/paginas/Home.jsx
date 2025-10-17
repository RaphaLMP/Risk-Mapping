import MapComponent from "../componentes/Mapa";
import Chat from "../componentes/Chat";

export default function Home() {
  return (
    <div className="w-full">
      {/* Wrapper com rolagem vertical */}
      <div className="flex flex-col md:flex-row min-h-screen overflow-y-auto">
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