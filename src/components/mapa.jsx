import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer, TileLayer, Marker, Popup, useMap, Circle
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Ícones do Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Atualiza o centro do mapa
const LocationUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.setView(position, 15);
  }, [position, map]);
  return null;
};

const Mapa = () => {
  const [position, setPosition] = useState([-23.5505, -46.6333]); // São Paulo padrão
  const [hasLocation, setHasLocation] = useState(false);
  const [chatRoom, setChatRoom] = useState('geral');
  const [messages, setMessages] = useState({ geral: [], local: [] });
  const [input, setInput] = useState('');
  const bottomRef = useRef();

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const { latitude, longitude } = coords;
          const newPosition = [latitude, longitude];
          setPosition(newPosition);
          setHasLocation(true);

          // Cria "sala" baseada na localização arredondada
          const roundedLat = latitude.toFixed(3);
          const roundedLng = longitude.toFixed(3);
          setChatRoom(`local-${roundedLat}-${roundedLng}`);
        },
        (error) => alert("Erro ao obter localização: " + error.message)
      );
    } else {
      alert("Geolocalização não é suportada.");
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    const novaMensagem = { texto: input, hora: new Date().toLocaleTimeString() };

    setMessages((prev) => ({
      ...prev,
      [chatRoom]: [...(prev[chatRoom] || []), novaMensagem]
    }));
    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatRoom]);

  return (
    <div className="px-4 py-6">
  <div className="flex items-start gap-4">
    {/* Mapa - 70% */}
    <div className="w-[70%] h-[70vh] rounded shadow overflow-hidden">
      <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationUpdater position={position} />
        <Marker position={position}>
          <Popup>{hasLocation ? 'Você está aqui!' : 'Aguardando localização...'}</Popup>
        </Marker>
        {hasLocation && (
          <Circle
            center={position}
            radius={300}
            pathOptions={{ color: 'blue', fillColor: 'blue', fillOpacity: 0.2 }}
          />
        )}
      </MapContainer>
    </div>

    {/* Chat - 30% */}
    <div className="w-[30%] bg-white border rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-2">
        Chat {chatRoom === 'geral' ? 'Geral' : `Local (${chatRoom.replace('local-', '')})`}
      </h2>
      <div className="h-[50vh] overflow-y-auto border p-2 rounded mb-2 bg-gray-50">
        {(messages[chatRoom] || []).map((msg, idx) => (
          <div key={idx} className="mb-1">
            <span className="text-sm text-gray-600">{msg.hora}:</span> {msg.texto}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow border px-3 py-1 rounded"
          placeholder="Digite sua mensagem..."
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Enviar
        </button>
      </div>
    </div>
  </div>

  {/* Botão centralizado em relação ao mapa */}
  <div className="mt-4 w-[70%] flex justify-center">
    <button
      onClick={handleGeolocation}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      Obter Localização
    </button>
  </div>
</div>

  );
};

export default Mapa;
