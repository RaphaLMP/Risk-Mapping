import React from 'react';
import NavBar from "./components/navbar";
import Footer from './components/footer';

const Layout = ({ children }) => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen mt-4">
        <div className="container mx-auto p-4 flex-grow">
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
