export default function Chat() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto border border-cyan-800 rounded-lg p-4 mb-4">
        <div className="mb-2">
          <p className="bg-[#1B3950] text-sm text-white"><strong>Usuário:</strong> Olá!</p>
          
        </div>
        <div className="mb-2">
         <p className="bg-[#1B3950] text-sm text-white"><strong>Bot:</strong> Oi! Como posso ajudar?</p>
          
        </div>
      </div>

      {/* Input do chat */}
      <form className="flex">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-1 border rounded-l-lg px-4 py-2 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}