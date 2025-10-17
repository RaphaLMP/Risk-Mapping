import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
import L from "leaflet";

// Ícone padrão corrigido (Leaflet quebra no React se não ajustar isso)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function LocationMarker({ onAddMarker }) {
  useMapEvents({
    click(e) {
      onAddMarker(e.latlng);
    },
  });
  return null;
}

export default function MapComponent() {
  const [position, setPosition] = useState(null);
  const [markers, setMarkers] = useState([]);

  // Pega localização via GPS
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (err) => {
        console.error("Erro ao pegar localização:", err);
      }
    );
  }, []);

  const addMarker = (latlng) => {
    setMarkers((prev) => [...prev, latlng]);
  };

  const removeMarker = (latlng) => {
    setMarkers((prev) => [...prev, latlng]);
  };

  return (
    <div className="w-full h-full">
      {position ? (
        <MapContainer center={position} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <Marker position={position}>
            <Popup>📍 Você está aqui!</Popup>
          </Marker>
          {markers.map((m, i) => (
            <Marker key={i} position={m}>
              <Popup>Marcador {i + 1}</Popup>
            </Marker>
          ))}
          <LocationMarker onAddMarker={addMarker} />
        </MapContainer>
      ) : (
        <p>Carregando localização...</p>
      )}
    </div>
  );
}
