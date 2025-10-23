export default function Footer() {
    return (
        <footer
            className={`border-t py-6 text-sm transition-colors duration-300 ${isLightMode
                ? "bg-[#dceeff] border-blue-300 text-[#0d1b2a]"
                : "bg-[#0d1b2a] border-blue-800 text-gray-300"
                }`}
        >
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 text-center md:text-left">
                <div>
                    <h3 className="font-semibold">Suporte</h3>
                    <p>Atendimento 24h</p>
                </div>
                <div>
                    <h3 className="font-semibold">Contato</h3>
                    <p>(xx) 97777-7777</p>
                </div>
                <div>
                    <h3 className="font-semibold">Redes Sociais</h3>
                    <p>Instagram</p>
                    <p>Facebook</p>
                </div>
            </div>
            <p className="text-center text-xs mt-4">
                © 2025 Emergência+. Todos os direitos reservados.
            </p>
        </footer>
    )
}

