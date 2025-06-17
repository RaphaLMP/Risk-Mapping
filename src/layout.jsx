
import React, { useState, useEffect, useMemo } from 'react';
import NavBar from "./components/navbar";
import Footer from './components/footer';
import ScrollToTopButton from './components/voltarTopo';
import { Outlet } from 'react-router-dom';

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
          
          /* Navbar específica - garantir visibilidade */
          nav {
            background-color: #1a1a1a !important;
            border-color: #333333 !important;
          }
          
          /* Menu mobile específico */
          .mobile-menu {
            background-color: #1a1a1a !important;
            border-color: #333333 !important;
            box-shadow: 0 10px 25px -3px rgba(0, 0, 0, 0.4) !important;
          }
          
          /* Links do menu mobile */
          .mobile-menu a {
            color: #ffffff !important;
          }
          
          .mobile-menu a:hover {
            background-color: #2a2a2a !important;
          }
          
          /* Overlay do menu mobile */
          .mobile-overlay {
            background-color: rgba(0, 0, 0, 0.7) !important;
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
          .shadow-sm, .shadow, .shadow-md, .shadow-lg, .shadow-xl, .shadow-2xl {
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

const Layout = ({ children }) => {
  const { darkMode, toggleDarkMode } = useDarkReaderMode();

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow w-full px-4 md:px-6 lg:px-8 mt-[88px] sm:mt-[120px]">
        <div className="max-w-screen-xl mx-auto w-full py-4 sm:py-8">
          {children}
          <Outlet />
        </div>
      </main>

      <ScrollToTopButton />
      <Footer />
    </div>
  );
};

export default Layout;