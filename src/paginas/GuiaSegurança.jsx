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
  <div className="border-l-4 p-5 rounded-lg shadow-md hover:shadow-xl transition-all bg-white dark:bg-[#1b263b] dark:text-white" style={{ borderColor: color }}>
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <Icon size={24} color={color} />
      </div>
      <h2 className="font-bold text-lg" style={{ color }}>{title}</h2>
    </div>
    <div className="text-sm leading-relaxed">{children}</div>
  </div>
);

const GuiaAlagamento = () => {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tab, setTab] = useState("principais");
  const [shelters, setShelters] = useState({ all: [], hosp: [], pol: [], igr: [] });

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
                distancia: calcDistance(lat, lon, elLat, elLon),
                prioridade: PRIORITY[el.tags.amenity] || 5,
              };
            })
            .filter(Boolean)
            .sort((a, b) => a.prioridade - b.prioridade || a.distancia - b.distancia);

          setShelters({
            all: places.slice(0, 5),
            hosp: places.filter((p) => p.tipo === "hospital").slice(0, 5),
            pol: places.filter((p) => p.tipo === "police" || p.tipo === "fire_station").slice(0, 5),
            igr: places.filter((p) => p.tipo === "place_of_worship" || p.tipo === "school" || p.tipo === "kindergarten" || p.tipo === "university").slice(0, 5),
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

  const data = { principais: shelters.all, hospitais: shelters.hosp, policia: shelters.pol, igrejas: shelters.igr }[tab];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#0d1b2a] dark:to-[#1e293b] text-[#0d1b2a] dark:text-white p-6">
      <button onClick={() => { document.documentElement.classList.toggle("dark"); setIsDark(!isDark); }} className="mb-6 px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded">
        {isDark ? "Tema claro" : "Tema escuro"}
      </button>

      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
        <InfoCard icon={Droplet} title="O que fazer em casos de alagamento" color="#00b4d8">
          <ul className="list-disc pl-5 space-y-2">
            <li>Evite entrar em áreas alagadas;</li>
            <li>Desligue a energia se a água entrar em casa;</li>
            <li>Não arrisque sua vida para salvar objetos;</li>
            <li>Procure lugares altos e seguros;</li>
            <li>A água pode estar contaminada, evite contato.</li>
          </ul>
        </InfoCard>

        <InfoCard icon={Home} title="Locais seguros próximos" color="#ffb703">
          <div className="flex border-b border-gray-300 dark:border-gray-600 mb-4">
            {["principais", "hospitais", "policia", "igrejas"].map((t) => (
              <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 -mb-px border-b-2 ${tab === t ? "border-orange-500 font-bold" : "border-transparent"}`}>
                {t === "principais" ? "Top 5" : t === "hospitais" ? "Hospitais" : t === "policia" ? "Polícia/Bombeiro" : "Igrejas/Escolas"}
              </button>
            ))}
          </div>
          {loading ? <p>Buscando locais...</p> : error ? <p>{error}</p> : data.length > 0 ? (
            <ul className="space-y-2">
              {data.map((s) => {
                const Icon = getIcon(s.tipo);
                return (
                  <li key={s.id} className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded flex items-center gap-2">
                    <Icon size={20} /> <strong>{s.nome}</strong> – {s.tipo} ({s.distancia.toFixed(2)} km)
                  </li>
                );
              })}
            </ul>
          ) : <p>Nenhum local encontrado.</p>}
        </InfoCard>

        <InfoCard icon={Phone} title="Números de emergência" color="#22c55e">
          <ul className="space-y-2">
            {[["Bombeiros", "193"], ["SAMU", "192"], ["Defesa Civil", "199"]].map(([label, num]) => (
              <li key={num} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>{label}</span><strong className="text-lg">{num}</strong>
              </li>
            ))}
          </ul>
        </InfoCard>

        <InfoCard icon={Bell} title="Treinamentos disponíveis" color="#ef233c">
          <ul className="list-disc pl-5 space-y-2">
            <li>Primeiros socorros;</li>
            <li>Desastres naturais: alagamentos, incêndios, deslizamentos;</li>
            <li>Simulados de evacuação;</li>
            <li>Prevenção de acidentes em casa;</li>
            <li>Voluntariado.</li>
          </ul>
        </InfoCard>
      </div>
    </div>
  );
};

export default GuiaAlagamento;