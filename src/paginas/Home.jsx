import MapComponent from "../componentes/Mapa";

export default function Home() {
  // const [darkMode, setDarkMode] = useState(false)
  // useEffect(() => {
  //   var theme = localStorage.getItem("theme")
  //   theme == "dark" ? setDarkMode(true) : setDarkMode(false)
  // }, []);
  return (
    <>
      <div className="w-full flex flex-col items-center bg-gray-100 dark:bg-[#0e1e2e] transition-colors duration-500">
        <div
          className="w-full h-[400px] bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-[#0b1724] dark:to-[#142435] py-20 relative transition-all duration-500">
        </div>

        <div className="w-[90%] md:w-[60%] -mt-72 relative z-10 backdrop-blur-md bg-white/10 dark:bg-[#0e1e2e]/70 rounded-2xl shadow-xl p-6 mb-12 transition-colors duration-500">
          <MapComponent />
        </div>

        <style>{`
          :root{--grad-start:rgba(235,245,255,1);--grad-mid:rgba(210,230,245,.95);--grad-end:rgba(190,215,230,.9);--grad-highlight:rgba(120,180,255,.3);--grad-accent:rgba(160,210,255,.2)}
          
          .dark{--grad-start:rgba(8,15,25,1);--grad-mid:rgba(10,25,40,1);--grad-end:rgba(6,15,25,1);--grad-highlight:rgba(40,90,180,.25);--grad-accent:rgba(100,150,220,.15)}`
          }</style>
      </div>
    </>
  );
}