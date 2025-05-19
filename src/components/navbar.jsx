// NavBar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">

        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/images/logo.png" className="h-12" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Risk Mapping
          </span>
        </Link>

        {/* Links desktop */}
        <ul className="menu-links flex flex-row items-center space-x-8 font-medium text-gray-900 dark:text-white">
          <li>
            <Link to="/contato" className="hover:text-blue-700 dark:hover:text-blue-400">Contato</Link>
          </li>
          <li>
            <Link to="/teste" className="hover:text-blue-700 dark:hover:text-blue-400">Teste</Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">

          {/* Dropdown mobile */}
          <div className="menu-dropdown relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round"
                  d={isMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
              </svg>
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-md rounded">
                <Link
                  to="/contato"
                  className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contato
                </Link>
                <Link
                  to="/teste"
                  className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Teste
                </Link>
              </div>
            )}
          </div>

          {/* Dark mode toggle */}
          <button className="focus:outline-none" disabled>
            {darkMode ? (
              <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.03 9.03l-.707-.707M6.34 6.34l-.707-.707M12 16a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            ) : (
              <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>         
        </div>
      </div>
    </nav>
    
  );
};

export default NavBar;
