import img from "../img/alerta_celular.png"
import img1 from "../img/coferir_chuva.png"
import img2 from "../img/pegar_doc.png"
import img3 from "../img/local_seguro.jpeg"
import img4 from "../img/nubi_oculos.png"
import { useEffect, useState } from "react"

export default function EducaCidade() {
    const [animateNubi, setAnimateNubi] = useState(false);
    useEffect(() => {
        setTimeout(() => setAnimateNubi(true), 100); // delay curto
    }, []);

    return (
        <div className=" bg-[#5e90bbab] dark:bg-[#22415A] w-full">
        <div className="w-full h-fulls flex flex-col items-center grid-rows-2 gap-6 dark:bg-[#132235]">
            <div className="flex items-center">
                <img
                    className={`h-[120px] w-[120px] xl:h-[250px] xl:w-[250px] transform transition-all duration-1000 
                          ${animateNubi ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-20"}`}
                    src={img4}
                    alt="Nubi"
                />
                <div className="text-blue-950 dark:text-amber-50 lg:w-[50%] ml-4">
                    <p className="text-2xl xl:text-3xl font-semibold">Oi, eu sou o Nubi!</p>
                    <p className="text-lg xl:text-lg">Veja aqui os alertas e áreas de risco da sua cidade.</p>
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
            <img className="h-[400px] w-[600px]" src={img} alt="" />
            <img className="h-[400px] w-[600px]" src={img1} alt="" />
            <img className="h-[400px] w-[600px]" src={img2} alt="" />
            <img className="h-[400px] w-[600px]" src={img3} alt="" />
        </div >
    );
}
