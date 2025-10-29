export default function Footer() {
    return (
        <footer 
            className="py-6 text-sm transition-all duration-500 bg-gradient-to-br from-blue-100 to-indigo-200 
                        dark:from-[#0b1724] dark:to-[#142435] 
                        border-t border-blue-300 dark:border-blue-800 
                        text-[#0d1b2a] dark:text-gray-300"
            >

            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left">
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