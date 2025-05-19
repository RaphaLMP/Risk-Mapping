import NavBar from "./components/navbar";
import Footer from './components/footer';
import ScrollToTopButton from './components/voltarTopo';
import React, { useState, useEffect } from 'react';

const Layout = ({ children }) => {

  const [darkMode, setDarkMode] = useState(() => {
    const storedMode = localStorage.getItem('darkMode');
    return storedMode === 'dark';
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'light');
    }
  }, [darkMode]);

  const teamMembersData = [
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
      name: 'Maikon Bryan',
      role: 'Front End',
      imageSrc: '/images/maikon.jpg',
      linkedinUrl: 'linkedin.com/in/maikonbryan',
      githubUrl: 'https://github.com/MaikonMagie',
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
  ];

  const youtubeVideoId = "0";

  const TeamMember = ({ name, role, imageSrc, linkedinUrl, githubUrl }) => (
    <div className="text-center text-gray-500">
      <img className="mx-auto mb-4 w-36 h-36 rounded-full" src={imageSrc} alt={`${name} Avatar`} />
      <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
        <a href="#">{name}</a>
      </h3>
      <p>{role}</p>
      <ul className="flex justify-center mt-4 space-x-4">
        <li>
          <a href={linkedinUrl} className="text-[#39569c] hover:text-gray-900" aria-label={`LinkedIn de ${name}`}>
            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className="w-6 h-6" viewBox="0 0 48 48">
              <path fill="#0078d4" d="M42,37c0,2.762-2.238,5-5,5H11c-2.761,0-5-2.238-5-5V11c0-2.762,2.239-5,5-5h26c2.762,0,5,2.238,5,5  V37z"></path><path d="M30,37V26.901c0-1.689-0.819-2.698-2.192-2.698c-0.815,0-1.414,0.459-1.779,1.364  c-0.017,0.064-0.041,0.325-0.031,1.114L26,37h-7V18h7v1.061C27.022,18.356,28.275,18,29.738,18c4.547,0,7.261,3.093,7.261,8.274 L37,37H30z M11,37V18h3.457C12.454,18,11,16.528,11,14.499C11,12.472,12.478,11,14.514,11c2.012,0,3.445,1.431,3.486,3.479  C18,16.523,16.521,18,14.485,18H18v19H11z" opacity=".05"></path><path d="M30.5,36.5v-9.599c0-1.973-1.031-3.198-2.692-3.198c-1.295,0-1.935,0.912-2.243,1.677  c-0.082,0.199-0.071,0.989-0.067,1.326L25.5,36.5h-6v-18h6v1.638c0.795-0.823,2.075-1.638,4.238-1.638  c4.233,0,6.761,2.906,6.761,7.774L36.5,36.5H30.5z M11.5,36.5v-18h6v18H11.5z M14.457,17.5c-1.713,0-2.957-1.262-2.957-3.001  c0-1.738,1.268-2.999,3.014-2.999c1.724,0,2.951,1.229,2.986,2.989c0,1.749-1.268,3.011-3.015,3.011H14.457z" opacity=".07"></path><path fill="#fff" d="M12,19h5v17h-5V19z M14.485,17h-0.028C12.965,17,12,15.888,12,14.499C12,13.08,12.995,12,14.514,12 c1.521,0,2.458,1.08,2.486,2.499C17,15.887,16.035,17,14.485,17z M36,36h-5v-9.099c0-2.198-1.225-3.698-3.192-3.698 c-1.501,0-2.313,1.012-2.707,1.99C24.957,25.543,25,26.511,25,27v9h-5V19h5v2.616C25.721,20.5,26.85,19,29.738,19 c3.578,0,6.261,2.25,6.261,7.274L36,36L36,36z"></path>
            </svg>
          </a>
        </li>
        <li>
          <a href={githubUrl} className="text-gray-900 hover:text-gray-900" aria-label={`GitHub de ${name}`}>
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
        </li>
      </ul>
    </div>
  );

  // Componente para o vídeo do YouTube (inline)
  const YouTubeVideo = ({ videoId }) => (
    <div className="w-full max-w-screen-xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 mb-4 flex justify-center">
      <div className="relative w-1/2" style={{ paddingTop: '28.125%' }}>
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/j5P9FHiBVNo?start=112"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

      </div>
    </div>
  );

  const TeamSection = ({ members }) => (
    <section className="bg-white py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
      <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900">
          Nosso Time
        </h2>
      </div>
      <div className="grid gap-8 lg:gap-16 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {members.map((member, index) => (
          <TeamMember key={index} {...member} />
        ))}
      </div>
    </section>
  );

  const LiveMapSection = () => (
    <section className="bg-white py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6 mb-8">

      {/* Seção de Tecnologias Utilizadas */}
      <div className="mx-auto mb-20 max-w-screen-md">
        <h2 className="mb-4 text-3xl font-bold text-gray-900">
          Tecnologias Utilizadas
        </h2>
        <p className="text-gray-600 font-light mb-6">
          Este projeto foi desenvolvido com as seguintes tecnologias:
        </p>
        <ul className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <li className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg shadow-sm">React</li>
          <li className="bg-cyan-100 text-cyan-700 px-4 py-2 rounded-lg shadow-sm">Tailwind CSS</li>
          <li className="bg-purple-100 text-purple-700 px-4 py-2 rounded-lg shadow-sm">Flowbite</li>
          <li className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg shadow-sm">JavaScript</li>
        </ul>
      </div>

      {/* Seção principal */}
      <div className="mx-auto mb-8 max-w-screen-sm lg:mb-16">
        <h2 className="mt-8 mb-4 text-3xl font-bold text-gray-900">
          Um mapa vivo feito por todos
        </h2>
        <p className="font-light text-gray-500 sm:text-xl text-justify">
          A Risk Mapping é uma plataforma colaborativa criada para mapear, em tempo real, áreas afetadas por alagamentos. Por meio de um mapa interativo e de fácil uso, qualquer pessoa pode registrar pontos de alagamento em sua região, ajudando a construir um banco de dados vivo, acessível e atualizado constantemente pela própria comunidade.
          <br />
          <br />Usuários poderão:
          <br /> - Selecionar no mapa locais onde há registros de alagamentos;
          <br /> - Adicionar fotos ou descrições para contextualizar a situação;
          <br /> - Visualizar em tempo real as ocorrências próximas ou em outras regiões;
          <br /> - Evitar áreas de risco, planejar rotas seguras e informar outras pessoas.
          <br />
          <br />
          Nosso objetivo é criar uma rede de alerta cidadã, onde a informação circula rapidamente e ajuda a prevenir transtornos, acidentes e prejuízos. Com a força da colaboração, queremos transformar o modo como lidamos com as chuvas e os impactos urbanos, promovendo segurança, consciência e solidariedade.
        </p>
        <div>
          <div>
            <img className="sm:w-24 md:w-40 lg:w-40" src="/images/fluxo.svg" alt="" />
          </div>
        </div>

        {/* Seção de Vídeo */}
        <section>
          <h2 className="mt-8 mb-4 text-3xl font-bold text-gray-900">
            Veja o vídeo
          </h2>
          <YouTubeVideo videoId={youtubeVideoId} />
        </section>
      </div>
    </section>
  );

  return (
    <div className={`flex flex-col min-h-screen ${darkMode ? 'bg-gray-900 text-gray-300' : 'bg-white text-gray-900'}`}>
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow w-full px-3 sm:px-4 md:px-6 lg:px-8 mt-[88px] sm:mt-[120px]">
        <div className="max-w-screen-xl mx-auto w-full py-2 sm:py-4">
          {children}
        </div>
      </main>

      <TeamSection members={teamMembersData} />

      {/* Botão de voltar ao topo */}
      <ScrollToTopButton />

      <LiveMapSection />

      <Footer />
    </div>
  );


};

export default Layout;