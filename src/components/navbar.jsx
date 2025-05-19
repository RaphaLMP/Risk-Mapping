import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ darkMode, toggleDarkMode }) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white border-gray-200 dark:bg-gray-900 dark:border-gray-700">
  <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
    <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
      <img src="/images/logo.png" className="h-12" alt="Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Risk Mapping</span>
    </Link>
    <ul className="flex flex-row items-center space-x-8 font-medium text-gray-900 dark:text-white">
      <li>
        <Link to="/" className="hover:text-blue-700 dark:hover:text-blue-400">Home</Link>
      </li>
      <li>
        <Link to="/contato" className="hover:text-blue-700 dark:hover:text-blue-400">Contato</Link>
      </li>
      <li>
        <Link to="/sobre" className="opacity-0 hover:text-blue-700 dark:hover:text-blue-400">Sobre o projeto</Link>
      </li>
    </ul>
    {/* Botão de alternância do modo noturno (já estilizado) */}
    <button onClick={toggleDarkMode} className="focus:outline-none">
      {darkMode ? (
        <svg className="h-6 w-6 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.03 9.03l-.707-.707M6.34 6.34l-.707-.707m12.728-6.34l-.707.707M6.34 17.66l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="h-6 w-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      )}
    </button>
    {/* Botão "Get started" (já com estilos dark:) */}
    <button
      type="button"
      className="opacity-0 pointer-events-none text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
    >
      Get started
    </button>
  </div>
</nav>
  );
};

export default NavBar;