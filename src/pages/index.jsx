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
        path="/mapa"
        element={
          <Layout>
            <h1>Mapa</h1>
          </Layout>
        }
      />
      <Route
        path="/services"
        element={
          <Layout>
            <h1>Services Page</h1>
          </Layout>
        }
      />
      <Route
        path="/contact"
        element={
          <Layout>
            <h1>Contact Page</h1>
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
