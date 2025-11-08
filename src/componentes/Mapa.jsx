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

export default function MapComponent() {
  const [pos, setPos] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [tipo, setTipo] = useState("Tempestade");
  const [desc, setDesc] = useState("");
  const [zoom, setZoom] = useState(14);
  const [tempPos, setTempPos] = useState(null);
  const [modal, setModal] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState(null);
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

  const markersFiltrados = filtroTipo ? markers.filter(m => m.tipo === filtroTipo) : markers;
  const risks = findRiskClusters(markersFiltrados);
  const clustered = clusterMarkers(markersFiltrados, zoom, risks);

  return (
    <div className="relative w-full h-full">
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
                      <button onClick={() => remove(m.cluster[0])} className="mt-2 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm">Remover</button>
                    </div>
                  )}
                </Popup>
              </Marker>
            ))}

            <Marker position={pos} zIndexOffset={1000}><Popup>📍 Você está aqui!</Popup></Marker>
          </MapContainer>

          {/* Barra de filtros e eventos na parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 z-[1000] bg-gradient-to-t from-black/70 to-transparent pt-8 pb-4 px-4">
            <div className="max-w-6xl mx-auto space-y-3">
              {/* Filtros horizontais */}
              <div className="flex flex-wrap items-center justify-center gap-2 px-2">
                <button
                  onClick={() => setFiltroTipo(null)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-semibold shadow-lg ${
                    filtroTipo === null 
                      ? 'bg-blue-500 text-white scale-105' 
                      : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:scale-105'
                  }`}
                >
                  <span>🗺️</span>
                  <span>Todos</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    filtroTipo === null ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'
                  }`}>
                    {markers.length}
                  </span>
                </button>

                {Object.keys(CONFIG.icons).map((t) => {
                  const count = markers.filter(m => m.tipo === t).length;
                  return (
                    <button
                      key={t}
                      onClick={() => setFiltroTipo(t)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all text-sm font-semibold shadow-lg ${
                        filtroTipo === t 
                          ? 'scale-105 text-white' 
                          : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:scale-105'
                      }`}
                      style={filtroTipo === t ? { backgroundColor: CONFIG.colors[t] } : {}}
                    >
                      <span className="text-base">{CONFIG.icons[t]}</span>
                      <span>{t}</span>
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        filtroTipo === t ? 'bg-white/20' : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        {count}
                      </span>
                    </button>
                  );
                })}

                {risks.length > 0 && (
                  <div className="flex items-center gap-2 bg-amber-500/90 text-amber-950 px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    <span>⚠️</span>
                    <span>{risks.length} {risks.length === 1 ? "área de risco" : "áreas de risco"}</span>
                  </div>
                )}
              </div>


            </div>
          </div>

          {/* Modal de adicionar evento */}
          {modal && (
            <div className="absolute inset-0 flex items-center justify-center z-[1001] bg-black/40 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">Adicionar Evento</h3>
                  <button onClick={cancel} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-2xl transition-colors">×</button>
                </div>

                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Tipo de desastre:</label>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {Object.keys(CONFIG.icons).map((t) => (
                    <button 
                      key={t} 
                      onClick={() => setTipo(t)} 
                      className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all ${tipo === t ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-105 shadow-md' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 hover:scale-102'}`}
                    >
                      <span className="text-3xl">{CONFIG.icons[t]}</span>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t}</span>
                    </button>
                  ))}
                </div>

                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Descrição (opcional):</label>
                <textarea 
                  value={desc} 
                  onChange={(e) => setDesc(e.target.value)} 
                  placeholder="Ex: Rua alagada, poste caído..." 
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl resize-none mb-4 dark:bg-slate-700 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all" 
                  rows="3" 
                />

                <div className="flex gap-3">
                  <button onClick={confirm} className="flex-1 px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-all hover:shadow-lg">
                    ✓ Confirmar
                  </button>
                  <button onClick={cancel} className="flex-1 px-4 py-3 bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-800 dark:text-white rounded-xl font-semibold transition-all hover:shadow-lg">
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex items-center justify-center h-full bg-slate-100 dark:bg-slate-900">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg text-slate-700 dark:text-slate-300">Carregando localização...</p>
          </div>
        </div>
      )}
    </div>
  );
}