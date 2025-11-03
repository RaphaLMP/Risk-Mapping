import { Headset, Phone, Instagram, Facebook } from 'lucide-react'

export default function Footer() {
    return (
        <footer 
            className="py-6 text-sm transition-colors duration-500 bg-[#259add] dark:bg-gray-900 dark:text-gray-300 text-gray-900"
        >
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between gap-6 text-center md:text-left">
                <div>
                    <h3 className="font-semibold flex items-center gap-2 justify-center md:justify-start">
                        <Headset size={18} className="text-black dark:text-gray-300" />
                        Suporte
                    </h3>
                    <p className="dark:text-gray-300">Atendimento 24h</p>
                </div>
                <div>
                    <h3 className="font-semibold flex items-center gap-2 justify-center md:justify-start">
                        <Phone size={18} className="text-black dark:text-gray-300" />
                        Contato
                    </h3>
                    <p className="dark:text-gray-300">(xx) 97777-7777</p>
                </div>
                <div>
                    <h3 className="font-semibold dark:text-gray-300">Redes Sociais</h3>
                    <p className="flex items-center gap-2 justify-center md:justify-start">
                        <Instagram size={16} className="text-black dark:text-gray-300" />
                        <span className="dark:text-gray-300">Instagram</span>
                    </p>
                    <p className="flex items-center gap-2 justify-center md:justify-start">
                        <Facebook size={16} className="text-black dark:text-gray-300" />
                        <span className="dark:text-gray-300">Facebook</span>
                    </p>
                </div>
            </div>
            <p className="text-center text-xs mt-4 dark:text-gray-400 text-gray-700">
                © 2025 Emergência+. Todos os direitos reservados.
            </p>
        </footer>
    )
}
