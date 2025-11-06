import { useState } from "react";

export default function ChatPopup() {
  const [open, setOpen] = useState(false);

  const [messages, setMessages] = useState([
    { sender: "bot", text: "👋 Olá! Como posso ajudar hoje?" }
  ]);

  // Mensagens rápidas (agora em estado para permitir remover após clique)
  const [quickMessages, setQuickMessages] = useState([
    { text: "Como funciona o mapa?", response: "Nosso mapa mostra áreas com risco de enchentes, incêndios e tempestades, utilizando dados oficiais e alertas da Defesa Civil." },
    { text: "Tem alerta na minha região?", response: "Use a busca ou aproxime o mapa para sua cidade. Se houver alerta ativo, ele aparecerá destacado." },
    { text: "O que fazer em caso de enchente?", response: "Evite áreas alagadas, desligue energia, vá para um local alto e, em emergência, ligue 193 ou 199." },
    { text: "O que fazer em caso de incêndio?", response: "Afaste-se da área, evite fumaça e contate o Corpo de Bombeiros pelo número 193." },
    { text: "Como reportar um incidente?", response: "Clique no mapa e registre o evento. Nossa equipe irá validar e notificar outros usuários." }
  ]);

  const sendMessage = (msg, autoResponse) => {
    // Adiciona a mensagem do usuário
    setMessages(prev => [...prev, { sender: "user", text: msg }]);

    // Remove a opção clicada da lista
    setQuickMessages(prev => prev.filter(q => q.text !== msg));

    // Resposta automática
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: "bot", text: autoResponse }]);
    }, 500);
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full shadow-lg text-2xl flex items-center justify-center"
      >
        💬
      </button>

      {/* Popup */}
      {open && (
        <div className="fixed bottom-6 right-6 w-80 sm:w-96 h-[420px] flex flex-col rounded-2xl shadow-2xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F172A] overflow-hidden">

          {/* Header */}
          <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#1E293B] flex justify-between items-center">
            <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">💬 Chat regional</h1>
            <button onClick={() => setOpen(false)} className="text-gray-600 hover:text-red-500 text-xl">×</button>
          </div>

          {/* Mensagens */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl shadow text-sm
                  ${msg.sender === "user" 
                  ? "bg-blue-500 text-white rounded-br-sm"
                  : "bg-gray-200 dark:bg-[#1B3950] text-gray-900 dark:text-white rounded-bl-sm"}
                `}>
                  <strong>{msg.sender === "user" ? "Você: " : "Bot: "}</strong>
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Botões de mensagens rápidas */}
          {quickMessages.length > 0 && (
            <div className="flex gap-2 flex-wrap p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E293B]">
              {quickMessages.map((q, i) => (
                <button
                  key={i}
                  className="px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm rounded-xl transition"
                  onClick={() => sendMessage(q.text, q.response)}
                >
                  {q.text}
                </button>
              ))}
            </div>
          )}

        </div>
      )}
    </>
  );
}
