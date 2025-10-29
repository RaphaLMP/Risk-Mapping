import React, { useEffect, useState } from "react";
import { Phone, Bell, Home, Droplet, Sun, Moon } from "lucide-react";
import Footer from "../componentes/Footer";


const InfoCard = ({ icon: Icon, title, color, children }) => (
  <div
    className="border-l-4 p-4 rounded-md transition-colors duration-300 bg-white text-[#0d1b2a] dark:bg-[#1b263b] dark:text-white"
    style={{ borderColor: color }}
  >
    <div className="flex items-center gap-2 mb-2">
      <Icon color={color} />
      <h2 className="font-semibold text-lg" style={{ color }}>
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
    <div className="min-h-screen bg-[#dceeff] text-[#0d1b2a] transition-colors duration-300 dark:bg-[#0d1b2a] dark:text-white">

      <main className="max-w-5xl mx-auto py-10 px-4 space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard icon={Droplet} title="O que fazer em casos de alagamento" color="#00b4d8">
            <ul className="list-disc pl-5 space-y-2">
              <li>Evite entrar em áreas alagadas;</li>
              <li>Desligue a energia se a água entrar em casa;</li>
              <li>Não arrisque sua vida para salvar objetos;</li>
              <li>Procure lugares altos e seguros;</li>
              <li>A água pode estar contaminada, evite contato.</li>
            </ul>
          </InfoCard>

          <InfoCard icon={Phone} title="Números de emergência" color="#c0ff00">
            <ul className="space-y-1">
              <li>Bombeiros: <strong>193</strong></li>
              <li>SAMU: <strong>192</strong></li>
              <li>Defesa Civil: <strong>199</strong></li>
              <li>Polícia Militar: <strong>190</strong></li>
            </ul>
          </InfoCard>

          <InfoCard icon={Home} title="Abrigos próximos à FIAP Paulista" color="#ffb703">
            <ul className="list-disc pl-5 space-y-2">
              <li>Paróquia São Luiz Gonzaga – Av. Paulista, 2378;</li>
              <li>Centro Cultural FIESP – Av. Paulista, 1313;</li>
              <li>Colégio São Luís – Rua Haddock Lobo, 400;</li>
              <li>Centro de Convenções Frei Caneca – Rua Frei Caneca, 569.</li>
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

        <div className="p-6 rounded-md text-center transition-colors duration-300 bg-white text-[#0d1b2a] dark:bg-[#1b263b] dark:text-white">
          <h2 className="text-lg font-semibold text-blue-400 mb-2">Como participar?</h2>
          <p className="text-sm leading-relaxed">
            Acesse o site da Defesa Civil da sua cidade ou estado.
            <br />
            Procure programas como “Comunidade Resiliente”.
            <br />
            Veja se sua universidade tem parceria com a Defesa Civil ou Bombeiros.
          </p>
        </div>
      </main>
    </div>
  );
};

export default GuiaAlagamento;
