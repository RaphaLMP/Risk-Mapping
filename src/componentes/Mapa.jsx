import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polygon, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const CONFIG = {
  colors: { Tempestade: "#2563eb", Alagamento: "#0891b2", Enchente: "#3b82f6", Incêndio: "#dc2626" },
  icons: { Tempestade: "🌩️", Alagamento: "💧", Enchente: "🌊", Incêndio: "🔥" },
  radius: { Tempestade: 500, Alagamento: 300, Enchente: 800, Incêndio: 400 },
};

const ZoomTracker = ({ setZoom }) => {
  const map = useMap();
  useEffect(() => {
    const handler = () => setZoom(map.getZoom());
    map.on('zoomend', handler);
    setZoom(map.getZoom());
    return () => map.off('zoomend', handler);
  }, [map, setZoom]);
  return null;
};

const MapClickHandler = ({ onClick }) => {
  useMapEvents({ click: (e) => onClick(e.latlng) });
  return null;
};

const metersToLatLng = (m) => m / 111320;

const getCirclePoints = (center, radius, n = 16) => {
  const r = metersToLatLng(radius);
  return Array.from({ length: n }, (_, i) => {
    const angle = (i / n) * 2 * Math.PI;
    return [
      center.lat + r * Math.cos(angle),
      center.lng + r * Math.sin(angle) / Math.cos(center.lat * Math.PI / 180)
    ];
  });
};

const convexHull = (pts) => {
  if (pts.length < 3) return pts;
  const sorted = [...pts].sort((a, b) => a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]);
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);

  const build = (pts) => {
    const hull = [];
    for (const p of pts) {
      while (hull.length >= 2 && cross(hull[hull.length - 2], hull[hull.length - 1], p) <= 0) hull.pop();
      hull.push(p);
    }
    return hull;
  };

  return [...build(sorted), ...build(sorted.reverse())].slice(0, -2);
};

const findRiskClusters = (markers) => {
  const clusters = [];
  const used = new Set();

  Object.keys(CONFIG.icons).forEach(tipo => {
    const typed = markers.map((m, i) => ({ ...m, i })).filter(m => m.tipo === tipo);

    typed.forEach((m) => {
      if (used.has(m.i)) return;
      const cluster = [m.i];
      used.add(m.i);

      typed.forEach(o => {
        if (!used.has(o.i) && Math.hypot(m.latlng.lat - o.latlng.lat, m.latlng.lng - o.latlng.lng) < 0.015) {
          cluster.push(o.i);
          used.add(o.i);
        }
      });

      if (cluster.length >= 5) {
        const cms = cluster.map(i => markers[i]);
        const pts = cms.flatMap(m => getCirclePoints(m.latlng, CONFIG.radius[m.tipo]));
        clusters.push({
          tipo,
          indices: cluster,
          center: {
            lat: cms.reduce((s, m) => s + m.latlng.lat, 0) / cms.length,
            lng: cms.reduce((s, m) => s + m.latlng.lng, 0) / cms.length
          },
          count: cluster.length,
          area: convexHull(pts)
        });
      }
    });
  });

  return clusters;
};

const clusterMarkers = (markers, zoom, risks) => {
  const inRisk = new Set(risks.flatMap(r => r.indices));
  if (zoom >= 14) return markers.map((m, i) => ({ ...m, cluster: [i], isCluster: false }));

  const clustered = [];
  const used = new Set();
  const thresh = zoom < 12 ? 0.02 : 0.01;

  markers.forEach((m, i) => {
    if (used.has(i) || inRisk.has(i)) return;
    const cluster = [i];
    used.add(i);

    markers.forEach((o, j) => {
      if (!used.has(j) && !inRisk.has(j) && Math.hypot(m.latlng.lat - o.latlng.lat, m.latlng.lng - o.latlng.lng) < thresh) {
        cluster.push(j);
        used.add(j);
      }
    });

    clustered.push({
      latlng: {
        lat: cluster.reduce((s, idx) => s + markers[idx].latlng.lat, 0) / cluster.length,
        lng: cluster.reduce((s, idx) => s + markers[idx].latlng.lng, 0) / cluster.length
      },
      tipo: m.tipo,
      cluster,
      isCluster: cluster.length > 1,
      count: cluster.length
    });
  });

  return clustered;
};

const createIcon = (tipo, count, isCluster, isRisk) => {
  const color = CONFIG.colors[tipo];
  const emoji = CONFIG.icons[tipo];
  const size = isRisk ? 64 : isCluster ? 48 : 36;

  return L.divIcon({
    className: "custom-pin",
    html: `
      <div style="background:${color};width:${size}px;height:${size}px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${isRisk ? 32 : isCluster ? 24 : 20}px;color:white;box-shadow:0 4px 12px rgba(0,0,0,0.6);border:${isRisk ? 5 : 3}px solid ${isRisk ? '#fbbf24' : 'white'};${isRisk ? 'animation:pulse 2s infinite;' : ''}">
        ${emoji}
        ${isCluster || isRisk ? `<span style="position:absolute;top:-8px;right:-8px;background:${isRisk ? '#fbbf24' : 'white'};color:${isRisk ? '#000' : color};font-size:${isRisk ? 14 : 12}px;font-weight:bold;width:${isRisk ? 28 : 24}px;height:${isRisk ? 28 : 24}px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.3)">${count}</span>` : ''} 
      </div>
      <style>@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}</style>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

export default function Mapa() {
  const [pos, setPos] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [tipo, setTipo] = useState("Tempestade");
  const [desc, setDesc] = useState("");
  const [zoom, setZoom] = useState(14);
  const [tempPos, setTempPos] = useState(null);
  const [modal, setModal] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => setPos({ lat: -23.5505, lng: -46.6333 })
    );
  }, []);

  const handleClick = (latlng) => {
    setTempPos(latlng);
    setModal(true);
    setTipo("Tempestade");
    setDesc("");
  };

  const confirm = () => {
    if (!tempPos) return;
    setMarkers(prev => [...prev, { latlng: tempPos, tipo, description: desc }]);
    setModal(false);
    setTempPos(null);
  };

  const cancel = () => {
    setModal(false);
    setTempPos(null);
  };

  const remove = (idx) => setMarkers(prev => prev.filter((_, i) => i !== idx));
  const flyTo = (latlng) => mapRef.current?.flyTo(latlng, 16, { duration: 1.5 });

  const risks = findRiskClusters(markers);
  const clustered = clusterMarkers(markers, zoom, risks);

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
        {pos ? (
          <>
            <MapContainer center={[pos.lat, pos.lng]} zoom={14} style={{ height: "100%", width: "100%" }} ref={mapRef}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <ZoomTracker setZoom={setZoom} />
              <MapClickHandler onClick={handleClick} />

              {risks.map((r, i) => (
                <Polygon key={`risk-${i}`} positions={r.area} pathOptions={{ color: '#fbbf24', fillColor: CONFIG.colors[r.tipo], fillOpacity: 0.25, weight: 3, dashArray: '10, 10' }} />
              ))}

              {risks.map((r, i) => (
                <Marker key={`rm-${i}`} position={r.center} icon={createIcon(r.tipo, r.count, true, true)} zIndexOffset={200}>
                  <Popup>
                    <div className="min-w-[220px]">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">⚠️</span>
                        <div className="font-bold text-lg" style={{ color: CONFIG.colors[r.tipo] }}>ÁREA DE RISCO</div>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{r.count} eventos de <strong>{r.tipo}</strong> próximos</p>
                      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-2 text-xs">Esta região apresenta alto risco. Evite circular pela área.</div>
                    </div>
                  </Popup>
                </Marker>
              ))}

              {clustered.map((m, i) => (
                <Marker key={`m-${i}`} position={m.latlng} icon={createIcon(m.tipo, m.count, m.isCluster, false)}
                  eventHandlers={{ click: () => m.isCluster && mapRef.current?.flyTo(m.latlng, Math.min(zoom + 2, 18), { duration: 0.5 }) }}
                  zIndexOffset={m.isCluster ? 100 : 0}>
                  <Popup>
                    {m.isCluster ? (
                      <div><div className="font-semibold text-lg mb-2">{m.count} eventos agrupados</div><p className="text-sm text-gray-600">Aproxime o zoom</p></div>
                    ) : (
                      <div>
                        <div className="font-semibold text-lg mb-2" style={{ color: CONFIG.colors[m.tipo] }}>{CONFIG.icons[m.tipo]} {m.tipo}</div>
                        {markers[m.cluster[0]].description && <p className="text-sm text-gray-700 mb-3">{markers[m.cluster[0]].description}</p>}
                        <button onClick={() => remove(m.cluster[0])} className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded">Remover</button>
                      </div>
                    )}
                  </Popup>
                </Marker>
              ))}

              <Marker position={pos} zIndexOffset={1000}><Popup>📍 Você está aqui!</Popup></Marker>
            </MapContainer>

            {modal && (
              <div className="absolute inset-0 flex items-center justify-center z-[1001] rounded-2xl pointer-events-none">
                <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg p-6 shadow-2xl max-w-sm w-full mx-4 pointer-events-auto">
                  <button onClick={cancel} className="absolute top-3 right-3 text-gray-500 text-2xl">×</button>
                  <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-white">Adicionar Evento</h3>

                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Tipo de desastre:</label>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {Object.keys(CONFIG.icons).map((t) => (
                      <button key={t} onClick={() => setTipo(t)} className={`p-4 rounded-lg border-2 flex flex-col items-center gap-2 ${tipo === t ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30' : 'border-gray-300 dark:border-gray-600'}`}>
                        <span className="text-3xl">{CONFIG.icons[t]}</span>
                        <span className="text-sm font-medium">{t}</span>
                      </button>
                    ))}
                  </div>

                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descrição:</label>
                  <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Descreva o evento..." className="w-full px-3 py-2 border rounded-lg resize-none mb-4 dark:bg-slate-700 dark:text-white" rows="3" />

                  <div className="flex gap-3">
                    <button onClick={confirm} className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">✓ Confirmar</button>
                    <button onClick={cancel} className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium">Cancelar</button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full"><p className="text-lg">Carregando localização...</p></div>
        )}
      </div>

      <div>
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
          Eventos no mapa:
        </h2>

        {markers.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {markers.map((m, i) => (
              <div
                key={i}
                className="rounded-full px-4 py-2 text-sm font-medium text-white shadow-sm cursor-pointer hover:opacity-80 hover:scale-105 transition-transform"
                style={{ backgroundColor: CONFIG.colors[m.tipo] }}
                onClick={() => flyTo(m.latlng)}
              >
                <span>{CONFIG.icons[m.tipo]}</span> {m.tipo}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-700 dark:text-slate-400">
            Nenhum evento. Clique no mapa para adicionar.
          </p>
        )}

        {risks.length > 0 && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-400 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">⚠️</span>
              <h3 className="font-bold text-yellow-800 dark:text-yellow-300">
                Áreas de Risco Identificadas
              </h3>
            </div>
            <p className="text-sm text-yellow-700 dark:text-yellow-200">
              {risks.length}{" "}
              {risks.length === 1
                ? "região apresenta"
                : "regiões apresentam"}{" "}
              concentração crítica de eventos.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}