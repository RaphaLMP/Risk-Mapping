import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L, { map } from "leaflet";
import "leaflet/dist/leaflet.css";
import ConfirmPopup from "./Popup";
import WeatherCard from "./Tempeture";

// Corrige ícones padrão do Leaflet (importante no React)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function ClickCatcher({ onMapClick, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled) onMapClick(e.latlng);
    },
  });
  return null;
}

export default function Mapa() {
  // Opções exibidas no popup
  const tipoOptions = ["Tempestade", "Alagamento", "Enchente", "Incêndio"];

  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]); // [{ latlng: {lat, lng}, tipo: string }]
  const [pending, setPending] = useState(null); // latlng aguardando confirmação
  const [selectedTipo, setSelectedTipo] = useState(tipoOptions[0]); // inicial com a 1ª opção
  const [selectedInfo, setSelectedInfo] = useState(null); // { latlng, tipo, index }

  // (Opcional) proteção contra clique residual após fechar popup
  const ignoreNextClickRef = useRef(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setPosition({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      }),
      () => setPosition({
        lat: -23.5505,
        lng: -46.6333
      })
    );
  }, []);

  const handleMapClick = (latlng) => {
    if (ignoreNextClickRef.current) {
      ignoreNextClickRef.current = false;
      return;
    }
    setPending(latlng);
    setSelectedTipo(tipoOptions[0]); // ao abrir o popup, reseta para a 1ª opção
  };

  const confirmAddMarker = () => {
    if (!pending) return;

    const newMarker = { latlng: pending, tipo: selectedTipo };

    // adiciona o marcador e define o painel com o recém-adicionado
    setMarkers((prev) => {
      const next = [...prev, newMarker];
      setSelectedInfo({ ...newMarker, index: next.length - 1 });
      return next;
    });

    setPending(null);

    // (opcional) ignora um clique residual
    ignoreNextClickRef.current = true;
    setTimeout(() => (ignoreNextClickRef.current = false), 0);
  };

  const cancelAddMarker = () => setPending(null);

  const removeMarkerByIndex = (index) => {
    setMarkers((prev) => prev.filter((_, i) => i !== index));
    // limpa seleção para evitar índice desatualizado
    setSelectedInfo(null);
  };

  return (
    <div className="w-full">
      
      <div className="w-full h-[500px]">
        {position ? (
          <MapContainer center={[position.lat, position.lng]} zoom={14} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap contributors"
            />

            {/* Marcador da posição atual */}
            <Marker position={position}>
              <Popup>📍 Você está aqui!</Popup>
            </Marker>

            {/* Marcadores confirmados */}
            {markers.map((m, i) => (
              <Marker
                key={i}
                position={m.latlng}
                eventHandlers={{
                  click: () => setSelectedInfo({ ...m, index: i }), // seleciona ao clicar
                }}
              >
                <Popup>
                  <div className="min-w-[160px]">
                    <div className="font-semibold">{m.tipo}</div>
                    <button
                      onClick={() => removeMarkerByIndex(i)}
                      className="mt-2 px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Remover
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}

            {/* Captura cliques no mapa (desativa quando o popup está aberto) */}
            <ClickCatcher onMapClick={handleMapClick} disabled={!!pending} />

            {/* Popup de confirmação como componente */}
            <ConfirmPopup
              position={pending}
              value={selectedTipo}
              onChange={setSelectedTipo}
              onConfirm={confirmAddMarker}
              onCancel={cancelAddMarker}
              onClose={() => setPending(null)}
              options={tipoOptions}
            />
          </MapContainer>
        ) : (
          <p>Carregando localização...</p>
        )}
      </div>

      {/* Painel inferior com o evento selecionado/recém-adicionado */}
      <div className="mt-3">
        {selectedInfo ? (
          <div className="rounded-md border border-slate-200 bg-white shadow-sm p-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-slate-500">Evento selecionado</div>
              <div className="font-medium">{selectedInfo.tipo}</div>
              <div className="text-xs text-slate-500">
                Lat: {selectedInfo.latlng.lat.toFixed(5)} | Lng: {selectedInfo.latlng.lng.toFixed(5)}
              </div>
            </div>
            <button
              onClick={() => setSelectedInfo(null)}
              className="text-sm text-blue-600 hover:underline"
            >
              Limpar
            </button>
          </div>
        ) : (
          <div className="text-sm text-slate-500">Nenhum evento selecionado</div>
        )}
      </div>
      
        {position && <WeatherCard Lat={position.lat} Long={position.lng} />}
    

    </div>
  );
}
