export default function Chat() {
  return (
    <div className="h-full w-full md:w-1/2 flex flex-col rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F172A] transition-all duration-300">
      <div className="px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#1E293B] rounded-t-2xl">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-100">💬 Chat</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        
        <div className="flex justify-end">
          <div className="max-w-[75%] bg-blue-500 text-white px-4 py-2 rounded-2xl rounded-br-sm shadow">
            <strong>Você:</strong> Olá!
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[75%] bg-gray-200 dark:bg-[#1B3950] text-gray-900 dark:text-white px-4 py-2 rounded-2xl rounded-bl-sm shadow">
            <strong>Bot:</strong> Oi! Como posso ajudar?
          </div>
        </div>
      </div>
      <form className="flex items-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E293B] rounded-b-2xl">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          className="flex-1 px-4 py-3 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 m-2 rounded-xl transition-colors"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
