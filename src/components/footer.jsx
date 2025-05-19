import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4 text-center sm:text-left">
        <p className="text-sm sm:text-base">&copy; 2025 Risk Mapping. Todos os direitos reservados.</p>
        
        <div className="mt-4 flex flex-col items-center sm:flex-row sm:justify-center sm:space-x-6 space-y-2 sm:space-y-0">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            Instagram
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition"
          >
            Linkedin
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
