import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`px-3 py-2 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm font-semibold
        ${isHome
          ? "bg-white/420 backdrop-blur-md hover:bg-white/30 text-white"
          : "bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-white"
        }`}
      aria-label="Alternar tema"
    >
      {darkMode ? (
        <Sun size={18} className={`${isHome ? "text-yellow-300" : "text-yellow-400"}`} />
      ) : (
        <Moon size={18} className={`${isHome ? "text-indigo-300" : "text-indigo-500"}`} />
      )}
    </button>
  );
}