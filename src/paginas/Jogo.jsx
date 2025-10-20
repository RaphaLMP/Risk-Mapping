import React from "react";

function Section({ title, items }) {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
const sections = [
  {
    title: "O que fazer em casos de alagamento",
    items: [
      "Evite entrar em áreas alagadas.",
      "Desligue a energia se a água entrar em casa.",
      "Não arrisque sua vida para salvar objetos.",
      "Procure lugares altos e seguros.",
      "A água pode estar contaminada, evite contato.",
    ],
  },
  {
    title: "Números de emergência",
    items: [
      "Bombeiros: 193",
      "SAMU: 192",
      "Defesa Civil: 199",
      "Polícia Militar: 190",
      "Energia elétrica: verificar no site da companhia local",
      "Abrigos/assistência: consultar a prefeitura",
    ],
  },
  {
    title: "Abrigos próximos à FIAP Paulista",
    items: [
      "Paróquia São Luiz Gonzaga – Av. Paulista, 2378",
      "Centro Cultural FIESP – Av. Paulista, 1313",
      "Colégio São Luís – Rua Haddock Lobo, 400",
      "Centro de Convenções Frei Caneca – Rua Frei Caneca, 569",
    ],
  },
  {
    title: "Treinamentos disponíveis",
    items: [
      "Primeiros socorros",
      "Desastres naturais: alagamentos, incêndios, deslizamentos",
      "Simulados de evacuação",
      "Prevenção de acidentes em casa",
      "Voluntariado",
    ],
  },
  {
    title: "Como participar",
    items: [
      "Acesse o site da Defesa Civil da sua cidade ou estado.",
      'Procure programas como "Comunidade Resiliente".',
      "Veja se sua universidade tem parceria com a Defesa Civil ou Bombeiros.",
    ],
  },
];
export default function App() {
  return (
    <main>
      <h1>Informações de Emergência - Alagamentos</h1>
      {sections.map((section, index) => (
        <Section key={index} title={section.title} items={section.items} />
      ))}
    </main>
  );
}