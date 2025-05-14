import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from '../components/navbar';
import Footer from '../components/footer';
import Mapa from '../components/mapa';

const App = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen">
        {/* Mapa com distanciamento da Navbar */}
        <div className="mt-7">
          <Mapa />
        </div>

        {/* Conteúdo adicional das rotas */}
        <div className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/mapa" element={<h1>Mapa</h1>} />
            <Route path="/services" element={<h1>Services Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default App;
