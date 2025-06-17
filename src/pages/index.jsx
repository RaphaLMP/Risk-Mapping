import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from '../layout';
import Home from './Home';
import Mapa from '../components/mapa';
import Contato from '../components/Contato';
import Sobre from '../components/Sobre';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="mapa" element={<Mapa />} />
        <Route path="contato" element={<Contato />} />
        <Route path="sobre" element={<Sobre />} />
      </Route>
    </Routes>
  );
};

export default App;