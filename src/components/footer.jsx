import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-4 sm:py-6 mt-auto">
      <div className="container mx-auto px-3 sm:px-4 text-center sm:text-left">
        <p className="text-xs sm:text-sm md:text-base">&copy; 2025 Risk Mapping. Todos os direitos reservados.</p>
        
        <div className="mt-3 sm:mt-4 flex flex-wrap justify-center sm:justify-center gap-4 sm:gap-6">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-sm sm:text-base"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-sm sm:text-base"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-sm sm:text-base"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-sm sm:text-base"
          >
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;