import React from 'react';
import NavBar from "./components/navbar";
import Footer from './components/footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* NavBar sempre no topo */}
      <NavBar />

      {/* Conteúdo central com responsividade */}
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 mt-4">
        <div className="max-w-screen-xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Footer sempre no final */}
      <Footer />
    </div>
  );
};

export default Layout;
