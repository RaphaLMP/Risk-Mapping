import img from "../img/alerta_celular.png"
import img1 from "../img/coferir_chuva.png"
import img2 from "../img/pegar_doc.png"
import img3 from "../img/local_seguro.jpeg"
import img4 from "../img/nubi_oculos.png"
import { useEffect, useState } from "react"

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

    const [frase, setFrase] = useState("");

    useEffect(() => {
        setTimeout(() => setAnimateNubi(true), 100);
        const fraseAleatoria = frases[Math.floor(Math.random() * frases.length)];
        setFrase(fraseAleatoria);
    }, []);

    return (
        <div className="flex items-center flex-col bg-center w-full dark:bg-[#1e293b]">
            <div className="w-full h-[400px] flex flex-col items-center justify-center grid-rows-2 gap-6 bg-[#5e90bbab] dark:bg-[#22415A]">
                <div className="flex items-center">
                    <img
                        className={`h-[120px] w-[120px] xl:h-[250px] xl:w-[250px] transform transition-all duration-1000 
                          ${animateNubi ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
                        src={img4}
                        alt="Nubi"
                    />
                    <div className="text-blue-950 dark:text-amber-50 lg:w-[50%] ml-4">
                        <p className="text-2xl xl:text-3xl font-semibold">Nubi conselhos</p>
                        <p className="text-lg xl:text-lg">{frase}</p>
                    </div>
                </div>
            </div>
            <div className="w-full bg-green-400flex items-center justify-center max-w-3xl aspect-video rounded-xl overflow-hidden shadow-lg">
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
            <div>
                <img className="h-[400px] w-[600px]" src={img} alt="" />
                <p>Moradores de regiões propensas a inundações devem manter-se informados sobre as condições meteorológicas</p>
                <p>No Risk Mapping verifique quantidade de chuva, temperatura, e quantidade de alertas de alagamento</p>
                <p>Verifique locais seguros próximos como: escolas, igrejas, departamento de policia e hospitais</p>
            </div>
            <img className="h-[400px] w-[600px]" src={img1} alt="" />
            <img className="h-[400px] w-[600px]" src={img2} alt="" />
            <img className="h-[400px] w-[600px]" src={img3} alt="" />
        </div >
    );
}
