// NavBar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevenir scroll quando menu está aberto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleMenuToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/images/logo.png" className="h-12" alt="Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-900">
              Risk Mapping
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <ul className="flex items-center space-x-8 font-medium text-gray-900">
              <li>
                <Link
                  to="/contato"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Contato
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="hover:text-blue-600 transition-colors duration-200"
                >
                  Sobre
                </Link>
              </li>
              <li>
                <Link
                  to="/mapa"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Ver Mapa
                </Link>
              </li>
            </ul>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleDarkMode();
              }}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={darkMode ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              {!darkMode ? ( // Modo claro ativo, mostrar lua para ativar escuro
                <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : ( // Modo escuro ativo, mostrar sol para ativar claro
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden relative" ref={menuRef}>
              <button
                onClick={handleMenuToggle}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 relative z-50"
                aria-label="Toggle menu"
                type="button"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>

              {/* Mobile dropdown menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white shadow-2xl rounded-lg border border-gray-200 overflow-hidden z-50">
                  <div className="py-2">
                    <Link
                      to="/contato"
                      className="block px-6 py-3 text-gray-900 hover:bg-gray-50 transition-colors duration-200 font-medium"
                      onClick={handleLinkClick}
                    >
                      📧 Contato
                    </Link>
                    <Link
                      to="/sobre"
                      className="block px-6 py-3 text-gray-900 hover:bg-gray-50 transition-colors duration-200 font-medium"
                      onClick={handleLinkClick}
                    >
                      🧪 Sobre
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link
                      to="/mapa"
                      className="block px-6 py-3 text-blue-600 font-semibold hover:bg-blue-50 transition-colors duration-200"
                      onClick={handleLinkClick}
                    >
                      🗺️ Ver Mapa →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;