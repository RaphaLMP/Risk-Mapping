export default function Chat() {
  return (
    <div className="h-full flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Chat</h1>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto border rounded-lg p-4 mb-4 bg-gray-50">
        <div className="mb-2">
          <p className="text-sm text-gray-700"><strong>Usuário:</strong> Olá!</p>
          <p className="text-sm text-gray-700"><strong>Bot:</strong> Oi! Como posso ajudar?</p>
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