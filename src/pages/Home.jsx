// src/pages/Home.jsx (Nova página home com todo o conteúdo)
import React, { useMemo } from 'react';
import Mapa from '../components/mapa';

const Home = () => {
  const teamMembersData = useMemo(() => [
    {
      name: 'Beatriz Claudino',
      role: 'Front End, Melhorias',
      imageSrc: '/images/beatriz.jpg',
      linkedinUrl: 'linkedin.com/in/beatrizclaudino1',
      githubUrl: 'https://github.com/BeatrizClaudino',
    },
    {
      name: 'Daniel Costa',
      role: 'Front End, Configurações',
      imageSrc: '/images/daniel.jpg',
      linkedinUrl: 'linkedin.com/in/daniel-costa-1b3375232',
      githubUrl: 'https://github.com/Ciberbott',
    },
    {
      name: 'Raphael Martins',
      role: 'Front End, Video e Projeto',
      imageSrc: '/images/raphael.jpg',
      linkedinUrl: 'linkedin.com/in/raphael-martins-12761921b',
      githubUrl: 'https://github.com/RaphaLMP',
    },
    {
      name: 'Vinicius Vasconcelos',
      role: 'Front End',
      imageSrc: '/images/vinicius.jpg',
      linkedinUrl: '#',
      githubUrl: 'https://github.com/vnk1912',
    },
  ], []);

  return (
    <>
      {/* Componente do Mapa */}
      <Mapa />

    </>
  );
};

export default Home;