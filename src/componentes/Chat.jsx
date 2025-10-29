export default function Chat() {
  return (
    <div className="h-full w-full lg:w-1/2 flex flex-col rounded-2xl shadow-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0F172A] transition-all duration-300 overflow-hidden">
      <div className="px-4 sm:px-5 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-[#1E293B] flex-shrink-0">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-100">💬 Chat</h1>
      </div>
      <div className="flex-1 overflow-y-auto px-3 sm:px-5 py-4 space-y-3 min-h-0">
        
        <div className="flex justify-end">
          <div className="max-w-[85%] sm:max-w-[75%] bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-2xl rounded-br-sm shadow text-sm sm:text-base break-words">
            <strong>Você:</strong> Olá!
          </div>
        </div>
        <div className="flex justify-start">
          <div className="max-w-[85%] sm:max-w-[75%] bg-gray-200 dark:bg-[#1B3950] text-gray-900 dark:text-white px-3 sm:px-4 py-2 rounded-2xl rounded-bl-sm shadow text-sm sm:text-base break-words">
            <strong>Bot:</strong> Oi! Como posso ajudar?
          </div>
        </div>
      </div>
      <form className="flex items-center gap-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#1E293B] p-3 sm:p-4 flex-shrink-0">
        <input
          type="text"
          placeholder="Digite..."
          className="flex-1 min-w-0 px-3 py-2 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none text-sm sm:text-base rounded-lg border border-gray-300 dark:border-gray-600"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 sm:px-5 py-2 rounded-xl transition-colors text-sm sm:text-base flex-shrink-0"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}