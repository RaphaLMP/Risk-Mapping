import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from '../components/navbar';
import Footer from '../components/footer';
import Mapa from '../components/mapa';
import Sobre from '../pages/sobre';


const App = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen mt-4">
        <Mapa />

        <div className="container mx-auto p-4 flex-grow">
          <Routes>
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/mapa" element={<h1>Mapa</h1>} />
            <Route path="/services" element={<h1>Services Page</h1>} />
            <Route path="/contact" element={<h1>Contact Page</h1>} />
            <Route path="/sobre" element={<Sobre />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default App;
