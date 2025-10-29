import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ConfirmPopup from "./Popup";
import WeatherCard from "./Tempeture";
import Chat from "./Chat";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const eventColors = {
  Tempestade: "#2563eb",
  Alagamento: "#0891b2", 
  Enchente: "#3b82f6",
  Incêndio: "#dc2626",
};

const eventIcons = {
  Tempestade: "🌩️",
  Alagamento: "💧",
  Enchente: "🌊",
  Incêndio: "🔥",
};

function ClickCatcher({ onMapClick, disabled }) {
  useMapEvents({
    click(e) {
      if (!disabled) onMapClick(e.latlng);
    },
  });
  return null;
}

export default function Mapa() {
  const tipoOptions = ["Tempestade", "Alagamento", "Enchente", "Incêndio"];
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]); // [{ latlng, tipo }]
  const [pending, setPending] = useState(null);
  const [selectedTipo, setSelectedTipo] = useState(tipoOptions[0]);
  const [selectedInfo, setSelectedInfo] = useState(null);

  const ignoreNextClickRef = useRef(false);
  const mapRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        }),
      () =>
        setPosition({
          lat: -23.5505,
          lng: -46.6333,
        })
    );
  }, []);

  // 🖱️ Clique no mapa
  const handleMapClick = (latlng) => {
    if (ignoreNextClickRef.current) {
      ignoreNextClickRef.current = false;
      return;
    }
    setPending(latlng);
    setSelectedTipo(tipoOptions[0]);
  };

  // ✅ Confirma marcador
  const confirmAddMarker = () => {
    if (!pending) return;

    const newMarker = { latlng: pending, tipo: selectedTipo };

    setMarkers((prev) => {
      const next = [...prev, newMarker];
      setSelectedInfo({ ...newMarker, index: next.length - 1 });
      return next;
    });

    setPending(null);
    ignoreNextClickRef.current = true;
    setTimeout(() => (ignoreNextClickRef.current = false), 0);
  };

  const cancelAddMarker = () => setPending(null);

  const removeMarkerByIndex = (index) => {
    setMarkers((prev) => prev.filter((_, i) => i !== index));
    setSelectedInfo(null);
  };

  const flyToMarker = (latlng) => {
    if (mapRef.current) {
      mapRef.current.flyTo(latlng, 16, {
        duration: 1.5
      });
    }
  };

  const createColoredIcon = (tipo) => {
    const color = eventColors[tipo] || "#2563eb";
    const emoji = eventIcons[tipo] || "📍";

    return L.divIcon({
      className: "custom-pin",
      html: `
        <div style="
          background-color: ${color};
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          color: white;
          box-shadow: 0 0 4px rgba(0,0,0,0.3);
        ">
          ${emoji}
        </div>
      `,
      iconSize: [28, 28],
      iconAnchor: [14, 14],
    });
  };

  return (
    <div className="w-full h-full flex flex-col gap-y-6">
      <div className="w-full">
        {position && <WeatherCard Lat={position.lat} Long={position.lng} />}
      </div>

      <div>
        <div className="flex flex-col lg:flex-row h-[600px] w-full gap-y-6">
          <div className="w-full h-full pr-4">
            {position ? (
              <MapContainer
                center={[position.lat, position.lng]}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
                ref={mapRef}
              >
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
                    icon={createColoredIcon(m.tipo)}
                    eventHandlers={{
                      click: () => setSelectedInfo({ ...m, index: i }),
                    }}
                  >
                    <Popup>
                      <div className="min-w-[160px]">
                        <div
                          className="font-semibold"
                          style={{ color: eventColors[m.tipo] }}
                        >
                          {eventIcons[m.tipo]} {m.tipo}
                        </div>
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

                <ClickCatcher onMapClick={handleMapClick} disabled={!!pending} />

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

          <Chat />
        </div>

        {/* Lista de todos os eventos abaixo do mapa */}
        <div className="mt-4">
          <h2 className="text-sm font-semibold text-slate-600 mb-2">
            Eventos no mapa:
          </h2>

          {markers.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {markers.map((m, i) => (
                <div
                  key={i}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm cursor-pointer transition hover:opacity-80"
                  style={{
                    backgroundColor: eventColors[m.tipo],
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                  onClick={() => {
                    setSelectedInfo({ ...m, index: i });
                    flyToMarker(m.latlng);
                  }}
                >
                  <span>{eventIcons[m.tipo]}</span> {m.tipo}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">Nenhum evento adicionado ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}