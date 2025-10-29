// src/pages/contato.jsx
import React, { useState, useMemo } from 'react';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nome.trim()) {
      newErrors.nome = 'Nome é obrigatório';
    } else if (formData.nome.trim().length < 2) {
      newErrors.nome = 'Nome deve ter pelo menos 2 caracteres';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }

    if (!formData.assunto.trim()) {
      newErrors.assunto = 'Assunto é obrigatório';
    } else if (formData.assunto.trim().length < 3) {
      newErrors.assunto = 'Assunto deve ter pelo menos 3 caracteres';
    }

    if (!formData.mensagem.trim()) {
      newErrors.mensagem = 'Mensagem é obrigatória';
    } else if (formData.mensagem.trim().length < 10) {
      newErrors.mensagem = 'Mensagem deve ter pelo menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setShowSuccessAnimation(true);
      setSubmitMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      setFormData({
        nome: '',
        email: '',
        assunto: '',
        mensagem: ''
      });
      setErrors({});

      setTimeout(() => setShowSuccessAnimation(false), 3000);
    } catch (error) {
      setSubmitMessage('Erro ao enviar mensagem. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(e.target.alt.replace(' Avatar', ''))}&background=e5e7eb&color=374151&size=144`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0d1b2a] transition-colors duration-300">
      {/* Cabeçalho da Página */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#1e293b] dark:to-[#0f172a] py-20 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 text-center">
        </div>
      </div>

      {/* Seção do Time */}
      <section className="bg-gradient-to-b from-gray-50 to-white dark:from-[#1e293b] dark:to-[#0d1b2a] py-24 px-4 mx-auto max-w-screen-xl transition-colors duration-300">
        <div className="text-center mb-20">
          <h2 className="mb-8 text-4xl lg:text-5xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Nosso Time
          </h2>
        </div>
        
        <div className="grid gap-16 lg:gap-20 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembersData.map((member, index) => (
            <div key={`${member.name}-${index}`} className="text-center">
              <div className="relative mb-6">
                <img
                  className="mx-auto w-36 h-36 rounded-full object-cover ring-4 ring-white dark:ring-gray-700 shadow-lg"
                  src={member.imageSrc}
                  alt={`${member.name} Avatar`}
                  loading="lazy"
                  onError={handleImageError}
                />
              </div>
              <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">{member.role}</p>
              <div className="flex justify-center space-x-4">
                {member.linkedinUrl !== '#' && (
                  <a
                    href={member.linkedinUrl.startsWith('http') ? member.linkedinUrl : `https://${member.linkedinUrl}`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800 transition-all duration-200 hover:scale-110"
                    aria-label={`LinkedIn de ${member.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                    </svg>
                  </a>
                )}
                <a
                  href={member.githubUrl}
                  className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 hover:scale-110"
                  aria-label={`GitHub de ${member.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Formulário de Contato */}
      <section className="bg-white dark:bg-[#0d1b2a] py-24 px-4 transition-colors duration-300">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Envie sua Mensagem
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              Tem alguma dúvida, sugestão ou quer colaborar conosco? Entre em contato!
            </p>
          </div>

          <div className="bg-white dark:bg-[#1b263b] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 md:p-12 mb-16 relative overflow-hidden transition-colors duration-300">
            {/* Animação de sucesso */}
            {showSuccessAnimation && (
              <div className="absolute inset-0 bg-green-50 dark:bg-green-900/90 bg-opacity-95 flex items-center justify-center z-10 rounded-2xl">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">Enviado com sucesso!</h3>
                  <p className="text-green-600 dark:text-green-300">Entraremos em contato em breve.</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Nome Completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.nome ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="Seu nome completo"
                    aria-describedby={errors.nome ? "nome-error" : undefined}
                  />
                  {errors.nome && (
                    <p id="nome-error" className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.nome}
                    </p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    maxLength={100}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                      errors.email ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                    }`}
                    placeholder="seuemail@exemplo.com"
                    aria-describedby={errors.email ? "email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="assunto" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Assunto <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="assunto"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  required
                  maxLength={200}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.assunto ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Sobre o que você gostaria de falar?"
                  aria-describedby={errors.assunto ? "assunto-error" : undefined}
                />
                {errors.assunto && (
                  <p id="assunto-error" className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.assunto}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Mensagem <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="mensagem"
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  maxLength={1000}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 ${
                    errors.mensagem ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' : 'border-gray-300 dark:border-gray-600'
                  }`}
                  placeholder="Escreva sua mensagem aqui..."
                  aria-describedby={errors.mensagem ? "mensagem-error" : undefined}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.mensagem && (
                    <p id="mensagem-error" className="text-sm text-red-600 dark:text-red-400 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.mensagem}
                    </p>
                  )}
                  <span className={`text-sm ml-auto ${
                    formData.mensagem.length > 800 ? 'text-red-500 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {formData.mensagem.length}/1000
                  </span>
                </div>
              </div>

              {submitMessage && !showSuccessAnimation && (
                <div className={`p-4 rounded-lg flex items-center ${submitMessage.includes('sucesso') 
                  ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700' 
                  : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700'
                }`}>
                  <svg className="w-5 h-5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    {submitMessage.includes('sucesso') ? (
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    ) : (
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    )}
                  </svg>
                  {submitMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 disabled:bg-blue-400 dark:disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    <span>Enviar Mensagem</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Informações Adicionais */}
          <div className="grid md:grid-cols-3 gap-8 text-center mt-6">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-8 rounded-xl transition-colors duration-300">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">E-mail</h3>
              <p className="text-gray-600 dark:text-gray-400">contato@riskmapping.com</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/30 p-8 rounded-xl transition-colors duration-300">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-800 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Tempo de Resposta</h3>
              <p className="text-gray-600 dark:text-gray-400">Até 24 horas</p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/30 p-8 rounded-xl transition-colors duration-300">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 text-purple-600 dark:text-purple-300 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3 text-lg">Localização</h3>
              <p className="text-gray-600 dark:text-gray-400">São Paulo, Brasil</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contato;