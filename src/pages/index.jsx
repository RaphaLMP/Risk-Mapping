import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from '../components/navbar';
import Footer from '../components/footer';

const App = () => {
  return (
    <>
      <NavBar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/services" element={<h1>Services Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
