import React, { useEffect, useState } from "react";
import { Home, Droplet, Phone, Bell, Cross, ShieldCheck, Activity } from "lucide-react";

const PRIORITY = { hospital: 1, police: 2, fire_station: 2, place_of_worship: 3 };

const calcDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (d) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const getIcon = (tipo) => ({
  hospital: Cross, police: ShieldCheck, fire_station: ShieldCheck,
  sports_hall: Activity, community_centre: Activity, place_of_worship: Home,
  school: Home, university: Home, kindergarten: Home
}[tipo] || Home);

const InfoCard = ({ icon: Icon, title, color, children }) => (
  <div className="border-l-4 h-full p-4 sm:p-5 rounded-lg shadow-md hover:shadow-xl transition-all bg-white dark:bg-[#1b263b] dark:text-white" style={{ borderColor: color }}>
    <div className="flex items-center gap-2 sm:gap-3 mb-3">
      <div className="p-1.5 sm:p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <Icon size={20} className="sm:w-6 sm:h-6" color={color} />
      </div>
      <h2 className="font-bold text-base sm:text-lg" style={{ color }}>{title}</h2>
    </div>
    <div className="text-xs sm:text-sm leading-relaxed">{children}</div>
  </div>
);

const GuiaAlagamento = () => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("hospitais");
  const [shelters, setShelters] = useState({ hosp: [], pol: [], igr: [], esc: [] });
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  useEffect(() => { localStorage.theme = isDark ? "dark" : "light"; }, [isDark]);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocalização não suportada.");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude: lat, longitude: lon } = pos.coords;
        setUserLocation({ lat, lon });
        try {
          const query = `[out:json][timeout:25];(node["amenity"~"hospital|police|fire_station|place_of_worship|school|kindergarten|university"]["access"!="private"](around:10000,${lat},${lon});way["amenity"~"hospital|police|fire_station|place_of_worship|school|kindergarten|university"]["access"!="private"](around:10000,${lat},${lon});relation["amenity"~"hospital|police|fire_station|place_of_worship|school|kindergarten|university"]["access"!="private"](around:10000,${lat},${lon}););out center;`;
          const res = await fetch(`https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`);
          const data = await res.json();

          const places = data.elements
            .map((el) => {
              const elLat = el.lat || el.center?.lat;
              const elLon = el.lon || el.center?.lon;
              if (!elLat || !elLon) return null;
              return {
                id: el.id,
                nome: el.tags.name || el.tags.amenity,
                tipo: el.tags.amenity,
                lat: elLat,
                lon: elLon,
                distancia: calcDistance(lat, lon, elLat, elLon),
                prioridade: PRIORITY[el.tags.amenity] || 5,
              };
            })
            .filter(Boolean)
            .sort((a, b) => a.prioridade - b.prioridade || a.distancia - b.distancia);

          setShelters({
            hosp: places.filter((p) => p.tipo === "hospital").slice(0, 5),
            pol: places.filter((p) => p.tipo === "police" || p.tipo === "fire_station").slice(0, 5),
            igr: places.filter((p) => p.tipo === "place_of_worship").slice(0, 5),
            esc: places.filter((p) => p.tipo === "school" || p.tipo === "kindergarten" || p.tipo === "university").slice(0, 5),
          });
        } catch (err) {
          setError("Erro ao buscar locais seguros.");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Erro ao obter localização.");
        setLoading(false);
      }
    );
  }, []);

  const data = { hospitais: shelters.hosp, policia: shelters.pol, igrejas: shelters.igr, escolas: shelters.esc }[tab];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0d1b2a] dark:to-[#1e293b] text-[#0d1b2a] dark:text-white p-4 sm:p-8 md:p-12">
      <div className="w-[90%] lg:w-[70%] xl:w-[70%]">
        <div className="flex flex-col xl:flex-row grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 lg:mt-8">
          <div className="w-full">
            <InfoCard icon={Home} title="Locais seguros próximos" color="#ffb703">
              <div className="flex flex-wrap border-b border-gray-300 dark:border-gray-600 mb-3 text-xs">
                {["hospitais", "policia", "igrejas", "escolas"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={`px-2 sm:px-3 py-1.5 -mb-px border-b-2 text-[10px] sm:text-xs ${tab === t ? "border-orange-500 font-bold" : "border-transparent"}`}
                  >
                    {t === "hospitais" ? "Hospitais" : t === "policia" ? "Polícia" : t === "igrejas" ? "Igrejas" : "Escolas"}
                  </button>
                ))}
              </div>
              <div className="max-h-48 sm:max-h-64 overflow-y-auto">
                {loading ? <p className="text-xs sm:text-sm">Buscando locais...</p> : error ? <p className="text-xs sm:text-sm">{error}</p> : data.length > 0 ? (
                  <ul className="space-y-2">
                    {data.map((s) => {
                      const Icon = getIcon(s.tipo);
                      const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation?.lat},${userLocation?.lon}&destination=${s.lat},${s.lon}`;
                      return (
                        <li key={s.id} className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Icon size={14} className="flex-shrink-0 sm:w-4 sm:h-4" />
                            <div className="min-w-0 flex-1">
                              <div className="text-xs sm:text-sm font-semibold truncate">{s.nome}</div>
                              <div className="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{s.distancia.toFixed(1)} km</div>
                            </div>
                          </div>
                          <a
                            href={mapsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-[10px] sm:text-xs rounded transition-colors whitespace-nowrap flex-shrink-0"
                          >
                            Rota
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : <p className="text-xs sm:text-sm">Nenhum local encontrado.</p>}
              </div>
            </InfoCard>
          </div>
          <div className="w-full xl:w-1/3">
            <InfoCard icon={Phone} title="Números de emergência" color="#22c55e">
              <ul className="space-y-2 h-full">
                {[["Bombeiros", "193"], ["SAMU", "192"], ["Defesa Civil", "199"]].map(([label, num]) => (
                  <li key={num} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                    <span className="text-xs sm:text-sm">{label}</span>
                    <strong className="text-base sm:text-lg">{num}</strong>
                  </li>
                ))}
              </ul>
            </InfoCard>
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mt-4 sm:mt-6 lg:mt-8">
          <InfoCard icon={Droplet} title="O que fazer em casos de alagamento" color="#00b4d8">
            <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2">
              <li>Evite entrar em áreas alagadas;</li>
              <li>Desligue a energia se a água entrar em casa;</li>
              <li>Não arrisque sua vida para salvar objetos;</li>
              <li>Procure lugares altos e seguros;</li>
              <li>A água pode estar contaminada, evite contato.</li>
            </ul>
          </InfoCard>

          <InfoCard icon={Bell} title="Treinamentos disponíveis" color="#ef233c">
            <ul className="list-disc pl-4 sm:pl-5 space-y-1.5 sm:space-y-2">
              <li>Primeiros socorros;</li>
              <li>Desastres naturais: alagamentos, incêndios, deslizamentos;</li>
              <li>Simulados de evacuação;</li>
              <li>Prevenção de acidentes em casa;</li>
              <li>Voluntariado.</li>
            </ul>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default GuiaAlagamento;