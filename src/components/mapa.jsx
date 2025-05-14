import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Corrige ícones do Leaflet no React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Função que atualiza a localização do mapa
const LocationUpdater = ({ position }) => {
  const map = useMap();

  React.useEffect(() => {
    if (position) {
      map.setView(position, 13);
    }
  }, [position, map]);

  return null;
};

const Mapa = () => {
  const [position, setPosition] = useState([-23.5505, -46.6333]); // Posição inicial (São Paulo)
  const [hasLocation, setHasLocation] = useState(false);

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPosition([latitude, longitude]);
          setHasLocation(true);
        },
        (error) => {
          alert("Erro ao obter localização: " + error.message);
        }
      );
    } else {
      alert("Geolocalização não é suportada pelo seu navegador.");
    }
  };

  return (
    <div className="flex flex-col items-center px-6 py-10 flex-grow">
      {/* Mapa */}
      <div className="w-full max-w-6xl h-[60vh] rounded shadow-lg overflow-hidden">
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(map) => map.setView(position, 13)}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationUpdater position={position} /> {/* Atualiza a posição do mapa */}
          <Marker position={position}>
            <Popup>
              {hasLocation ? 'Você está aqui!' : 'Aguardando localização...'}
            </Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Botão abaixo do mapa */}
      <div className="flex justify-center py-4 relative z-20">
  <button
    onClick={handleGeolocation}
    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded z-20 cursor-pointer"
  >
    Obter Localização
  </button>
</div>

    </div>
  );
};

export default Mapa;
