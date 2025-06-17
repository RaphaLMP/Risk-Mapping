// src/pages/Home.jsx (Nova página home com todo o conteúdo)
import React, { useMemo } from 'react';
import Mapa from '../components/mapa';

const Home = () => {
  const teamMembersData = useMemo(() => [
    {
      name: 'Beatriz Claudino',
      role: 'Front End, Melhorias',
      imageSrc: '/images/beatriz.jpg',
      linkedinUrl: 'linkedin.com/in/beatrizclaudino1',
      githubUrl: 'https://github.com/BeatrizClaudino',
    },
    {
      name: 'Daniel Costa',
      role: 'Front End, Configurações',
      imageSrc: '/images/daniel.jpg',
      linkedinUrl: 'linkedin.com/in/daniel-costa-1b3375232',
      githubUrl: 'https://github.com/Ciberbott',
    },
    {
      name: 'Raphael Martins',
      role: 'Front End, Video e Projeto',
      imageSrc: '/images/raphael.jpg',
      linkedinUrl: 'linkedin.com/in/raphael-martins-12761921b',
      githubUrl: 'https://github.com/RaphaLMP',
    },
    {
      name: 'Vinicius Vasconcelos',
      role: 'Front End',
      imageSrc: '/images/vinicius.jpg',
      linkedinUrl: '#',
      githubUrl: 'https://github.com/vnk1912',
    },
  ], []);

  const technologies = [
    { name: 'React', colorClass: 'bg-blue-100 text-blue-700' },
    { name: 'Tailwind CSS', colorClass: 'bg-cyan-100 text-cyan-700' },
    { name: 'Flowbite', colorClass: 'bg-purple-100 text-purple-700' },
    { name: 'JavaScript', colorClass: 'bg-yellow-100 text-yellow-700' },
  ];

  return (
    <>
      {/* Componente do Mapa */}
      <Mapa />

      {/* Seção do Time */}

      {/* Seção do Mapa Vivo */}
      <section className="bg-white py-20 px-4 mx-auto max-w-screen-xl">
        {/* Tecnologias */}
        <div className="mx-auto mb-20 max-w-screen-md text-center">
          <h2 className="mb-6 text-4xl font-bold text-gray-900 mt-5">
            Tecnologias Utilizadas
          </h2>
          <ul className="flex flex-wrap justify-center gap-4 text-sm">
            {technologies.map((tech, index) => (
              <li key={index} className={`${tech.colorClass} px-6 py-3 rounded-full shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md font-medium`}>
                {tech.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Descrição do Projeto */}
        <div className="mx-auto mb-16 max-w-5xl mt-5">
          <h2 className="mb-8 text-5xl font-bold text-gray-900 text-center leading-tight">
            Um mapa vivo feito por todos
          </h2>
          <div className="prose prose-xl max-w-none text-gray-600">
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 mb-8">
              <p className="text-xl leading-relaxed mb-0">
                A <strong className="text-blue-700">Risk Mapping</strong> é uma plataforma colaborativa criada para mapear,
                em tempo real, áreas afetadas por alagamentos. Por meio de um mapa interativo
                e de fácil uso, qualquer pessoa pode registrar pontos de alagamento em sua região,
                ajudando a construir um banco de dados vivo, acessível e atualizado constantemente
                pela própria comunidade.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">📍</span>
                  Funcionalidades principais
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">▸</span>
                    Selecionar no mapa locais onde há registros de alagamentos
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">▸</span>
                    Adicionar fotos ou descrições para contextualizar a situação
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">▸</span>
                    Visualizar em tempo real as ocorrências próximas
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3 mt-1">▸</span>
                    Evitar áreas de risco e planejar rotas seguras
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-600 p-2 rounded-lg mr-3">🎯</span>
                  Nosso Objetivo
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Criar uma rede de alerta cidadã, onde a informação circula
                  rapidamente e ajuda a prevenir transtornos, acidentes e prejuízos.
                  Transformar o modo como lidamos com as chuvas e os
                  impactos urbanos, promovendo segurança e solidariedade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Vídeo do YouTube */}
        <div className="text-center">
          <div className="mb-8">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">
              Entenda o nosso Projeto
            </h2>
          </div>
          <div className="w-full px-4 mb-8">
            <div className="relative max-w-[620px] w-full mx-auto rounded-xl overflow-hidden shadow-xl bg-gray-100">
              <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/cLgv4rRqayE?list=PL-yVNSi1ijYBfIjn7vkyU_nkAHU1nPbgF"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;