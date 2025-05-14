import React from "react";

const Footer = () => {
  return (
    <footer className="py-5 mt-16 mb-5 border-t">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-center">
          {/* Logo e Copyright */}
          <div className="w-full md:w-1/4 flex flex-col items-center mb-6 md:mb-0">
            <a href="/" className="flex items-center mb-3">
              <img src="images/campos.png" alt="Logo" className="w-10 h-10 mr-2" />
              <p className="text-gray-500 text-center">&copy; 2024 Agromarket, Inc</p>
            </a>
          </div>

          {/* Colunas lado a lado */}
          <div className="flex flex-wrap md:flex-nowrap justify-center w-full md:w-3/4">
            {/* Suporte */}
            <div className="w-full sm:w-1/3 text-center mb-6 md:mb-0">
              <h5 className="font-semibold">Suporte</h5>
              <ul className="flex flex-col items-center">
                <li><a href="https://www.exemplo.com/faqs" className="text-gray-500">FAQs</a></li>
                <li><a href="https://www.exemplo.com/contato" className="text-gray-500">Fale Conosco</a></li>
              </ul>
            </div>

            {/* Contato */}
            <div className="w-full sm:w-1/3 text-center mb-6 md:mb-0">
              <h5 className="font-semibold">Contato</h5>
              <ul className="flex flex-col items-center">
                <li><a href="mailto:agromarket@gmail.com" className="text-gray-500">agromarket@gmail.com</a></li>
                <li><a href="tel:+5511999999999" className="text-gray-500">+55 11 99999-9999</a></li>
              </ul>
            </div>

            {/* Redes Sociais */}
            <div className="w-full sm:w-1/3 text-center">
              <h5 className="font-semibold">Redes Sociais</h5>
              <div className="flex justify-center gap-3">
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                  <img src="images/facebook.png" alt="Facebook" className="w-12 h-auto" />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                  <img src="images/instagram.png" alt="Instagram" className="w-12 h-auto" />
                </a>
                <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                  <img src="images/youtube.png" alt="YouTube" className="w-12 h-auto" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;