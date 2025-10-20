import MapComponent from "../componentes/Mapa";
import Chat from "../componentes/Chat";
import Nubi from "../img/Nubi.png"

export default function Home() {
  return (
    <div className="w-full flex justify-center dark:bg-[#112738]">
      {/* Wrapper com rolagem vertical */}
      {/* <div className="flex">
        <div>
          <img
            alt=""
            src={Nubi}
            className="w-20 lg:w-16"
          />
        </div>
        <div>
          <p>Oi! Sou o Nubi! </p>
          <p>Veja aqui os alertas e áreas de risco da sua cidade. </p>
        </div>
      </div> */}
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