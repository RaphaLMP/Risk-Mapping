import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Risk Mapping</span>
        </Link>

        {/* Menu */}
        <ul className="flex flex-row items-center space-x-8 font-medium text-gray-900 dark:text-white">
          <li>
            <Link to="/" className="hover:text-blue-700 dark:hover:text-blue-400">Home</Link>
          </li>
          <li>
            <Link to="/contato" className="hover:text-blue-700 dark:hover:text-blue-400">Contato</Link>
          </li>
          <li>
            <Link to="/sobre" className="hover:text-blue-700 dark:hover:text-blue-400">Sobre o projeto</Link>
          </li>
        </ul>

        {/* Botão */}
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Get started
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
