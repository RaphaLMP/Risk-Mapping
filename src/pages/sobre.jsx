import React from 'react';

const integrantes = [
  {
    nome: 'Ana Paula Costa',
    funcao: 'Frontend Developer',
    foto: '/images/ana.jpg',
  },
  {
    nome: 'Bruno Lima',
    funcao: 'Backend Developer',
    foto: '/images/bruno.jpg',
  },
  {
    nome: 'Carla Mendes',
    funcao: 'UI/UX Designer',
    foto: '/images/carla.jpg',
  },
  {
    nome: 'Diego Silva',
    funcao: 'DevOps Engineer',
    foto: '/images/diego.jpg',
  },
  {
    nome: 'Eduarda Rocha',
    funcao: 'Gerente de Projeto',
    foto: '/images/eduarda.jpg',
  },
];

const Sobre = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Sobre o Projeto</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {integrantes.map((aluno, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <img
              src={aluno.foto}
              alt={aluno.nome}
              className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-center text-gray-900 dark:text-white">
              {aluno.nome}
            </h2>
            <p className="text-center text-gray-500 dark:text-gray-400">{aluno.funcao}</p>
          </div>
        ))}
      </div>

      <div className="prose dark:prose-invert max-w-none">
        <h2>Tecnologias Utilizadas</h2>
        <p>
          O projeto utilizou tecnologias aprendidas até a <strong>Fase 7</strong> do curso, como:
        </p>
        <ul>
          <li><strong>HTML, CSS e JavaScript:</strong> estrutura base das páginas.</li>
          <li><strong>ReactJS:</strong> biblioteca principal da interface.</li>
          <li><strong>Tailwind CSS:</strong> para estilização rápida e responsiva.</li>
          <li><strong>PHP e MySQL:</strong> backend e banco de dados.</li>
          <li><strong>Docker:</strong> para containerização do ambiente.</li>
          <li><strong>Git/GitHub:</strong> versionamento e trabalho em equipe.</li>
        </ul>
      </div>
    </div>
  );
};

export default Sobre;
