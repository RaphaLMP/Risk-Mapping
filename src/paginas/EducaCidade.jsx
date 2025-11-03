// src/pages/EducaCidade.jsx
export default function EducaCidade() {
    return (
        <div className="w-full h-[100vh] flex flex-col items-center grid-rows-2 gap-6 dark:bg-[#132235]">
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
                <p>test</p>
            </div>

        </div>
    );
}
