import React, { useState, useEffect, useMemo } from 'react';
import NavBar from "./components/navbar";
import Footer from './components/footer';
import ScrollToTopButton from './components/voltarTopo';

const useDarkReaderMode = () => {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('darkMode');
      return storedMode === 'dark';
    }
    return false;
  });

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = document.documentElement;
      
      if (darkMode) {
        root.style.filter = 'invert(1) hue-rotate(180deg)';
        root.style.colorScheme = 'dark';
        
        const mediaElements = document.querySelectorAll('img, video, iframe, svg, canvas, embed, object');
        mediaElements.forEach(element => {
          element.style.filter = 'invert(1) hue-rotate(180deg)';
        });

        let darkModeStyles = document.getElementById('dark-reader-styles');
        if (!darkModeStyles) {
          darkModeStyles = document.createElement('style');
          darkModeStyles.id = 'dark-reader-styles';
          document.head.appendChild(darkModeStyles);
        }

        darkModeStyles.textContent = `
          /* Ajustes específicos para elementos que precisam de tratamento especial */
          [data-darkreader-inline-filter] {
            filter: invert(1) hue-rotate(180deg) !important;
          }
          
          /* Melhorar contraste para textos */
          body, html {
            background-color: #181a1b !important;
          }
          
          /* FORÇA BORDAS BRANCAS APENAS ONDE JÁ EXISTEM - usando cores escuras que ficam brancas após inversão */
          
          /* Bordas padrão do Tailwind - mantém espessura original */
          .border {
            border-color: #333333 !important;
          }
          
          .border-gray-100, .border-gray-200, .border-gray-300, 
          .border-gray-400, .border-gray-500, .border-gray-600,
          .border-white {
            border-color: #333333 !important;
          }
          
          /* Bordas específicas por direção - mantém espessura */
          .border-t, .border-r, .border-b, .border-l {
            border-color: #333333 !important;
          }
          
          /* Ajustar sombras para ter contorno sutil */
          .shadow-sm, .shadow, .shadow-md, .shadow-lg, .shadow-xl {
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px #444444 !important;
          }
          
          /* Inputs e formulários - mantém borda original */
          input[class*="border"], textarea[class*="border"], select[class*="border"] {
            border-color: #444444 !important;
          }
          
          input:focus, textarea:focus, select:focus {
            border-color: #555555 !important;
            box-shadow: 0 0 0 1px #333333 !important;
          }
          
          /* Botões que já têm borda */
          button[class*="border"] {
            border-color: #444444 !important;
          }
          
          button[class*="border"]:hover {
            border-color: #555555 !important;
          }
          
          /* Divisores */
          hr {
            border-color: #333333 !important;
          }
          
          .divide-y > :not([hidden]) ~ :not([hidden]) {
            border-top-color: #333333 !important;
          }
          
          /* Tabelas que já têm bordas */
          table[class*="border"], th[class*="border"], td[class*="border"] {
            border-color: #444444 !important;
          }
          
          /* Contornos para foco */
          *:focus-visible {
            outline-color: #555555 !important;
          }
          
          /* Rings do Tailwind - mantém tamanho original */
          .ring-1 {
            --tw-ring-color: #333333 !important;
          }
          
          .ring-2 {
            --tw-ring-color: #333333 !important;
          }
          
          .ring-4 {
            --tw-ring-color: #333333 !important;
          }
          
          /* Cards e containers que já têm bordas definidas */
          .bg-white[class*="border"], 
          .bg-gray-50[class*="border"], 
          .bg-gray-100[class*="border"], 
          .bg-gray-200[class*="border"] {
            border-color: #333333 !important;
          }
          
          /* Classes específicas do seu projeto - apenas se já tiverem borda */
          .chat-container[class*="border"], 
          .occurrence-card[class*="border"], 
          .simulation-card[class*="border"] {
            border-color: #333333 !important;
          }
          
          /* Elementos rounded que já têm borda */
          .rounded[class*="border"], 
          .rounded-sm[class*="border"], 
          .rounded-md[class*="border"], 
          .rounded-lg[class*="border"], 
          .rounded-xl[class*="border"], 
          .rounded-2xl[class*="border"], 
          .rounded-full[class*="border"] {
            border-color: #333333 !important;
          }
          
          /* Melhorar legibilidade de códigos */
          code, pre {
            background-color: rgba(255, 255, 255, 0.1) !important;
            border-color: #444444 !important;
          }
          
          /* Modals e dropdowns que já têm bordas */
          .modal[class*="border"], 
          .dropdown[class*="border"], 
          .popover[class*="border"],
          [role="dialog"][class*="border"], 
          [role="menu"][class*="border"], 
          [role="listbox"][class*="border"] {
            border-color: #333333 !important;
          }
        `;

        localStorage.setItem('darkMode', 'dark');
      } else {
        root.style.filter = '';
        root.style.colorScheme = '';
        
        const mediaElements = document.querySelectorAll('img, video, iframe, svg, canvas, embed, object');
        mediaElements.forEach(element => {
          element.style.filter = '';
        });

        const darkModeStyles = document.getElementById('dark-reader-styles');
        if (darkModeStyles) {
          darkModeStyles.remove();
        }

        localStorage.setItem('darkMode', 'light');
      }
    }
  }, [darkMode]);

  useEffect(() => {
    if (typeof window !== 'undefined' && darkMode) {
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              const mediaElements = node.querySelectorAll ? 
                node.querySelectorAll('img, video, iframe, svg, canvas, embed, object') : [];
              
              if (node.matches && node.matches('img, video, iframe, svg, canvas, embed, object')) {
                node.style.filter = 'invert(1) hue-rotate(180deg)';
              }
              
              mediaElements.forEach(element => {
                element.style.filter = 'invert(1) hue-rotate(180deg)';
              });
            }
          });
        });
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });

      return () => observer.disconnect();
    }
  }, [darkMode]);

  return { darkMode, toggleDarkMode };
};

const TeamMember = ({ name, role, imageSrc, linkedinUrl, githubUrl }) => (
  <div className="text-center">
    <div className="relative">
      <img 
        className="mx-auto mb-4 w-36 h-36 rounded-full object-cover ring-4 ring-white shadow-lg" 
        src={imageSrc} 
        alt={`${name} Avatar`}
        loading="lazy"
        data-darkreader-inline-filter=""
      />
    </div>
    <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900">
      {name}
    </h3>
    <p className="text-sm text-gray-600 mb-4">{role}</p>
    <div className="flex justify-center space-x-4">
      <a 
        href={linkedinUrl.startsWith('http') ? linkedinUrl : `https://${linkedinUrl}`}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all duration-200 hover:scale-110" 
        aria-label={`LinkedIn de ${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd"/>
        </svg>
      </a>
      <a 
        href={githubUrl}
        className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all duration-200 hover:scale-110" 
        aria-label={`GitHub de ${name}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
        </svg>
      </a>
    </div>
  </div>
);

const YouTubeVideo = ({ videoId, title = "YouTube video player" }) => (
  <div className="w-full max-w-4xl mx-auto px-4 mb-8">
    <div className="relative w-full aspect-video bg-gray-100 rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-200">
      <iframe
        className="absolute inset-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        loading="lazy"
        data-darkreader-inline-filter=""
      />
    </div>
  </div>
);

const TechnologyBadge = ({ name, colorClass }) => (
  <li className={`${colorClass} px-6 py-3 rounded-full shadow-sm transition-all duration-200 hover:scale-105 hover:shadow-md font-medium`}>
    {name}
  </li>
);

const TeamSection = ({ members }) => (
  <section className="bg-gradient-to-b from-gray-50 to-white py-20 px-4 mx-auto max-w-screen-xl">
    <div className="text-center mb-16">
      <h2 className="mb-4 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900">
        Nosso Time
      </h2>
      <p className="text-gray-600 text-xl max-w-2xl mx-auto">
        Conheça os desenvolvedores talentosos por trás do projeto Risk Mapping
      </p>
    </div>
    <div className="grid gap-12 lg:gap-16 sm:grid-cols-2 lg:grid-cols-4">
      {members.map((member, index) => (
        <TeamMember key={`${member.name}-${index}`} {...member} />
      ))}
    </div>
  </section>
);

const TechnologiesSection = ({ technologies }) => (
  <div className="mx-auto mb-20 max-w-screen-md text-center">
    <h2 className="mb-6 text-4xl font-bold text-gray-900">
      Tecnologias Utilizadas
    </h2>
    <p className="text-gray-600 font-light mb-10 text-xl">
      Este projeto foi desenvolvido com as seguintes tecnologias modernas:
    </p>
    <ul className="flex flex-wrap justify-center gap-4 text-sm">
      {technologies.map((tech, index) => (
        <TechnologyBadge key={index} {...tech} />
      ))}
    </ul>
  </div>
);

const ProjectDescription = () => (
  <div className="mx-auto mb-16 max-w-5xl">
    <h2 className="mb-8 text-5xl font-bold text-gray-900 text-center leading-tight">
      Um mapa vivo feito por todos
    </h2>
    <div className="prose prose-xl max-w-none text-gray-600">
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl mb-8 border border-blue-100">
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

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-100">
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
);

const LiveMapSection = ({ technologies, youtubeVideoId }) => (
  <section className="bg-white py-20 px-4 mx-auto max-w-screen-xl">
    <TechnologiesSection technologies={technologies} />
    <ProjectDescription />
    
    <div className="text-center">
      <h2 className="mb-8 text-4xl font-bold text-gray-900">
        Veja o projeto em ação
      </h2>
      <p className="text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
        Assista ao vídeo demonstrativo para entender como funciona nossa plataforma
      </p>
      <YouTubeVideo 
        videoId={youtubeVideoId} 
        title="Demonstração do Risk Mapping"
      />
    </div>
  </section>
);

const Layout = ({ children }) => {
  const { darkMode, toggleDarkMode } = useDarkReaderMode();

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

  const technologies = useMemo(() => [
    { name: 'React', colorClass: 'bg-blue-100 text-blue-700' },
    { name: 'Tailwind CSS', colorClass: 'bg-cyan-100 text-cyan-700' },
    { name: 'Flowbite', colorClass: 'bg-purple-100 text-purple-700' },
    { name: 'JavaScript', colorClass: 'bg-yellow-100 text-yellow-700' },
  ], []);

  const youtubeVideoId = "2l_Y9KzZIgU";

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow w-full px-4 md:px-6 lg:px-8 mt-[88px] sm:mt-[120px]">
        <div className="max-w-screen-xl mx-auto w-full py-4 sm:py-8">
          {children}
        </div>
      </main>
      <TeamSection members={teamMembersData}/>

      <LiveMapSection 
        technologies={technologies} 
        youtubeVideoId={youtubeVideoId} 
      />

      <ScrollToTopButton />

      <Footer />
    </div>
  );
};

export default Layout;