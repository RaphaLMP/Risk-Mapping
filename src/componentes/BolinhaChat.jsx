import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [location, setLocation] = useState({ lat: null, lng: null });

    useEffect(() => {
        const lat = parseFloat(localStorage.getItem("lat"));
        const lng = parseFloat(localStorage.getItem("lng"));
        
        if (lat && lng) {
            setLocation({ lat, lng });
        } else {
            console.warn("Localização não encontrada no localStorage.");
        }
    }, []);

    return (
        <div className="fixed bottom-6 right-6 z-[9999]">
            {/* Botão flutuante */}
            <button
                onClick={() => setOpen(!open)}
                className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all duration-300 border-2 border-white"
                style={{
                    boxShadow:
                        "0 0 20px rgba(59,130,246,0.6), 0 0 40px rgba(59,130,246,0.3)",
                }}
            >
                {open ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            {/* Janela do chat */}
            {open && (
                <div
                    className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl border border-gray-400 flex flex-col overflow-hidden animate-fadeIn"
                    style={{
                        zIndex: 9999,
                        boxShadow:
                            "0 0 40px rgba(0,0,0,0.2), 0 0 80px rgba(59,130,246,0.2)",
                    }}
                >
                    <div className="bg-blue-600 text-white p-4 font-semibold text-lg flex justify-between items-center">
                        <span>Chat regional</span>
                        <button onClick={() => setOpen(false)}>
                            <X size={22} />
                        </button>
                    </div>

                    {/* Corpo do chat */}
                    <div className="flex-1 p-4 overflow-y-auto text-sm text-gray-700 bg-gray-50">
                        <p className="text-gray-500 text-center mt-10">
                            👋 Olá! Como posso te ajudar hoje?
                        </p>

                        {location.lat && location.lng ? (
                            <div className="mt-6 text-center text-xs text-gray-500">
                                📍 Sua localização atual: <br />
                                <span className="font-medium">
                                    Lat: {location.lat.toFixed(4)} | Lng: {location.lng.toFixed(4)}
                                </span>
                            </div>
                        ) : (
                            <p className="text-center text-xs text-gray-400 mt-6">
                                Localização não disponível.
                            </p>
                        )}
                    </div>

                    {/* Campo de digitação */}
                    <div className="p-3 border-t flex gap-2 bg-white">
                        <input
                            type="text"
                            placeholder="Digite sua mensagem..."
                            className="flex-1 border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <button className="bg-blue-600 text-white px-4 rounded-xl hover:bg-blue-700 transition">
                            Enviar
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
