// src/pages/index.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from "../layout";
import Mapa from '../components/mapa';
import Sobre from './sobre';


const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Mapa />
          </Layout>
        }
      />
          
      <Route
        path="/sobre"
        element={
          <Layout>
            <Sobre />
          </Layout>
        }
      />
    </Routes>
  );
};

export default App;
