import { useEffect, useState } from "react"
import img from "../img/alerta_celular.png"
import img1 from "../img/coferir_chuva.png"
import img2 from "../img/pegar_doc.png"
import img3 from "../img/local_seguro.png"
import img4 from "../img/nubi_professor.png"
import img5 from "../img/familia_reunida.png"
import jogo from "../img/jogo_educativo.mp4"

export default function EducaCidade() {
    const [animateNubi, setAnimateNubi] = useState(false);

    const frases = [
        "Evite atravessar ruas alagadas, mesmo com água rasa.",
        "A correnteza pode te derrubar com apenas 15 cm de água.",
        "Desligue a energia elétrica se a água começar a subir.",
        "Procure locais altos e seguros ao primeiro sinal de enchente.",
        "Não jogue lixo nas ruas, ele entope bueiros e causa alagamentos.",
        "Evite contato direto com a água da enchente — pode conter doenças.",
        "Tenha sempre uma lanterna e pilhas em casa para emergências.",
        "Guarde documentos e objetos importantes em sacos plásticos.",
        "Mantenha uma mochila de emergência pronta.",
        "Jamais tente dirigir em áreas alagadas — a força da água é perigosa.",
        "Após a enchente, limpe e desinfete bem a casa.",
        "Use botas e luvas ao limpar áreas afetadas por enchentes.",
        "Fique atento a alertas da Defesa Civil e aplicativos de risco.",
        "Apenas 30 cm de água podem arrastar um carro.",
        "Ajude vizinhos idosos ou com dificuldade de locomoção.",
        "Evite áreas com fios elétricos caídos.",
        "Não deixe crianças brincarem em áreas alagadas.",
        "Aprenda rotas alternativas para sair de casa em caso de emergência.",
        "Tenha sempre um contato de emergência salvo no celular.",
        "Mantenha a calma e siga as orientações oficiais."
    ];

    const alertasInundacao = [
        {
            titulo: "Leia atentamente a mensagem de alerta gerada pelo Risk Mapping.",
            imagemSrc: img,
            dicas: [
                "Mantenha a calma. A informação é poder!",
                'O alerta de "Alto Risco de Inundação" indica que sua área pode ser afetada em breve.',
                "Confirme sua localização e verifique no mapa do Risk Mapping os **abrigos e rotas de fuga seguros** mais próximos."
            ]
        },
        {
            titulo: "Não espere a água subir!",
            imagemSrc: img1,
            dicas: [
                "Observe o nível da água na rua. O sinal de perigo indica que o risco é real e imediato.",
                "Não se arrisque atravessando áreas já alagadas. A água pode esconder buracos, objetos perigosos e a força da correnteza pode derrubar uma pessoa.",
                "Desligue a energia elétrica (o disjuntor principal) da sua casa se a água começar a invadir o imóvel. Isso evita curtos-circuitos e choques elétricos fatais.",
                "Feche todas as portas, janelas e frestas da sua casa com panos ou fitas adesivas."
            ]
        },
        {
            titulo: "Prepare-se para Deixar o Local (Caso necessário)",
            imagemSrc: img2,
            dicas: [
                "Pegue o seu 'Kit de Emergência': Este kit deve estar em um local alto e de fácil acesso (como a parte superior de um armário).",
                "Documentos são prioridade: Guarde em um saco plástico à prova d'água seus documentos pessoais (identidade, certidões, carteira de vacinação, etc.).",
                "Itens Essenciais: Inclua água potável, alimentos não perecíveis (enlatados), lanterna, rádio à pilha e medicamentos de uso contínuo."
            ]
        },
        {
            titulo: "Busque Abrigo em um Local Alto e Seguro",
            imagemSrc: img3,
            dicas: [
                "Use o Risk Mapping para seguir as rotas seguras até os pontos de abrigo indicados.",
                "Caminhe em áreas mais altas e evite margens de rios, canais e encostas(risco de deslizamento).",
                "Comunique-se: Se for possível, avise familiares ou vizinhos para onde você está indo.",
                "Lembre-se: A sua vida e a de sua família são o bem mais importante.Os bens materiais podem ser recuperados, a vida não!"
            ]
        },
        {
            titulo: "Juntos Somos Mais Fortes!",
            imagemSrc: img5,
            dicas: [
                "Ajude sua comunidade: Ofereça apoio a vizinhos, especialmente idosos, crianças e pessoas com mobilidade reduzida, que podem precisar de ajuda extra para se preparar ou se deslocar.",
                "Mantenha contato: Troque informações com seus vizinhos sobre a situação e as rotas de segurança.",
                "Prepare-se em grupo: Discutam em família e com a comunidade um plano de emergência, definindo pontos de encontro e formas de comunicação.",
                "O Nubi está aqui para lembrar: Em momentos de desafio, a solidariedade e a colaboração fazem toda a diferença.Cuidar uns dos outros é a melhor forma de proteger a todos!"
            ]
        }
    ];

    const [frase, setFrase] = useState("");

    useEffect(() => {
        setTimeout(() => setAnimateNubi(true), 100);
        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        setFrase(fraseAleatoria);
    }, []);

    return (
        <div className="flex items-center flex-col bg-center w-full bg-blue-50 dark:bg-[#1e293b]">
            {/* Header com Nubi */}
            <div className="w-full h-[250px] lg:h-[300px] flex flex-col items-center justify-center bg-gradient-to-r from-[#2da0af] to-blue-500 dark:bg-[#22415A]">
                <div className="flex w-[90%] sm:w-[70%] md:w-[60%] xl:w-[40%] lg:justify-center flex-col items-center lg:gap-y-2">
                    <div className="w-full md:w-full flex items-center">
                        <div className="flex w-full flex-col text-left justify-center text-gray-100 gap-y-3">
                            <p className="text-2xl xl:text-5xl md:text-3xl font-bold">Nubi conselhos</p>
                            <p className="hidden lg:flex text-sm lg:text-lg">Além de dar conselhos, o Nubi mostra como se proteger e quais passos seguir durante um alagamento. Segurança vem em primeiro lugar!</p>
                        </div>
                        <div className="w-1/2 ">
                            <img
                                className={`w-full h-full transform transition-all duration-1000 
                          ${animateNubi ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
                                src={img4}
                                alt="Nubi"
                            />
                        </div>
                    </div>
                    <div className="w-full bg-[#1a3246] border border-cyan-300 p-5 rounded-2xl text-gray-100 font-semibold break-words text-left ml-4">
                        <p className="xl:text-lg">Dica: {frase}</p>
                    </div>
                </div>
            </div>

            {/* Onda decorativa */}
            <svg
                viewBox="0 0 1889 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full"
            >
                <defs>
                    <linearGradient id="darkGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2da0af" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>

                    <linearGradient id="lightGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2da0af" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>

                <path
                    d="M0 51 C462 51 462 153 924 153 C1414 153 1414 68 1905 68 L1905 0 L0 0 Z"
                    fill="url(#lightGradient)"
                    className="dark:fill-[url(#darkGradient)] transition-all duration-500"
                />
            </svg>

            {/* Seção de Conteúdo Educativo */}
            <div className="w-[90%] sm:w-[80%] md:w-[70%] lg:w-[80%] xl:w-[60%] sm:p-5 flex items-center flex-col gap-y-6 lg:gap-y-16 mt-6">
                
                {/* Vídeo educativo do YouTube */}
                <div className="w-full">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                            📚 Conteúdo Educativo
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Aprenda sobre os riscos das enchentes e como se proteger
                        </p>
                    </div>
                    <div className="w-full h-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/aIR6khgsc3A"
                            title="Entenda os riscos das enchentes"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* Guia de alertas de inundação */}
                <div className="w-full h-full grid gap-y-6 lg:gap-y-16 rounded-lg hover:shadow-xl transition-all bg-white dark:bg-[#1b263b] dark:text-white p-6">
                    <div className="text-center mb-4">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                            🚨 Guia de Emergência
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Passos essenciais para se proteger durante uma enchente
                        </p>
                    </div>
                    {alertasInundacao.map((alerta, index) => (
                        <div className="lg:flex lg:justify-center lg:items-center rounded-2xl dark:border border-[#2da0af] grid gap-y-8 gap-x-8 shadow-2xl p-6 lg:p-8 bg-gradient-to-br from-white to-blue-50 dark:from-[#1b263b] dark:to-[#22415A]" key={index}>
                            <div className="flex flex-col items-center justify-center xl:gap-y-4 w-full lg:w-[55%]">
                                <span className="text-lg xl:text-xl dark:text-gray-100 text-gray-900 font-medium mb-4 text-center">{alerta.titulo}</span>
                                <img
                                    className="w-full h-auto min-h-[180px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[100px] object-contain rounded-3xl shadow-md"
                                    src={alerta.imagemSrc}
                                    alt={`Imagem de alerta sobre ${alerta.titulo}`}
                                />
                            </div>
                            <div className="lg:w-[45%] flex items-center">
                                <ul className="list-disc pl-6 grid gap-y-4">
                                    {alerta.dicas.map((dica, dicaIndex) => (
                                        <li className="bg-[#5e90bb11] dark:bg-[#31506b59] dark:text-gray-100 p-2 xl:p-4 rounded-md text-gray-900" key={dicaIndex} dangerouslySetInnerHTML={{ __html: dica }}></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Divisor visual */}
                <div className="w-full flex items-center gap-4 my-8">
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2da0af] to-transparent"></div>
                    <div className="px-6 py-3 bg-gradient-to-r from-[#2da0af] to-blue-500 rounded-full shadow-lg">
                        <span className="text-white font-bold text-lg">🎮</span>
                    </div>
                    <div className="flex-1 h-[2px] bg-gradient-to-r from-transparent via-[#2da0af] to-transparent"></div>
                </div>

                {/* Seção de Jogo Educativo */}
                <div className="w-full mb-8">
                    <div className="text-center mb-6">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                            🎮 Jogo Educativo
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Aprenda brincando! Teste seus conhecimentos sobre prevenção de enchentes
                        </p>
                    </div>
                    <div className="w-full h-full aspect-video rounded-xl overflow-hidden shadow-2xl">
                        <video
                            autoPlay
                            muted
                            playsInline
                            loop
                            width="100%"
                            height="100%"
                            src={jogo}
                            title="Jogo educativo"
                        >
                        </video>
                    </div>
                </div>

            </div>
        </div>
    );
}