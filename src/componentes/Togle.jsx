import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const [darkMode, setDarkMode] = useState(false);

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
    <div className="">
      <header className="p-4 flex justify-start md:justify-end">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-300 shadow-md hover:shadow-lg"
          aria-label="Alternar tema"
        >
          {darkMode ? (
            <Sun size={24} color="#fbbf24" />
          ) : (
            <Moon size={24} color="#6366f1" />
          )}
        </button>
      </header>
    </div>
  );
}