import React, { useEffect, useState } from "react";
import { Phone, Bell, Home, Droplet } from "lucide-react";

const InfoCard = ({ icon: Icon, title, color, children }) => (
  <div
    className="border-l-4 p-5 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 bg-white text-[#0d1b2a] dark:bg-[#1b263b] dark:text-white"
    style={{ borderColor: color }}
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="p-2 rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <Icon size={24} color={color} />
      </div>
      <h2 className="font-bold text-lg" style={{ color }}>
        {title}
      </h2>
    </div>
    <div className="text-sm leading-relaxed">{children}</div>
  </div>
);

const GuiaAlagamento = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    localStorage.theme = isDark ? "dark" : "light";
  }, [isDark]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 text-[#0d1b2a] transition-colors duration-300 dark:from-[#0d1b2a] dark:to-[#1e293b] dark:text-white">

      <main className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
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

          <InfoCard icon={Phone} title="Números de emergência" color="#22c55e">
            <ul className="space-y-2">
              <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>Bombeiros</span>
                <strong className="text-lg">193</strong>
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>SAMU</span>
                <strong className="text-lg">192</strong>
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>Defesa Civil</span>
                <strong className="text-lg">199</strong>
              </li>
              <li className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800 rounded">
                <span>Polícia Militar</span>
                <strong className="text-lg">190</strong>
              </li>
            </ul>
          </InfoCard>

          <InfoCard icon={Home} title="Abrigos próximos à FIAP Paulista" color="#ffb703">
            <ul className="space-y-2">
              <li className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                <strong>Paróquia São Luiz Gonzaga</strong> – Av. Paulista, 2378
              </li>
              <li className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                <strong>Centro Cultural FIESP</strong> – Av. Paulista, 1313
              </li>
              <li className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                <strong>Colégio São Luís</strong> – Rua Haddock Lobo, 400
              </li>
              <li className="p-2 bg-orange-50 dark:bg-orange-900/20 rounded">
                <strong>Centro de Convenções Frei Caneca</strong> – Rua Frei Caneca, 569
              </li>
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

        <div className="mt-8 p-8 rounded-lg shadow-lg text-center transition-colors duration-300 bg-gradient-to-r from-blue-500 to-indigo-600 text-white dark:from-blue-700 dark:to-indigo-800">
          <h2 className="text-2xl font-bold mb-4">Como participar?</h2>
          <div className="space-y-2 text-base leading-relaxed max-w-3xl mx-auto">
            <p>📍 Acesse o site da Defesa Civil da sua cidade ou estado.</p>
            <p>🤝 Procure programas como "Comunidade Resiliente".</p>
            <p>🎓 Veja se sua universidade tem parceria com a Defesa Civil ou Bombeiros.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GuiaAlagamento;