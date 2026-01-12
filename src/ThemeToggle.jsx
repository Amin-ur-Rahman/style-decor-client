import { useState, useEffect } from "react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Initialize state directly from localStorage or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return savedTheme || (prefersDark ? "dark" : "light");
  });

  // Apply theme changes to DOM whenever theme state changes
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="hover:bg-neutral/30 p-2 rounded-lg transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <MdOutlineDarkMode size={24} className="text-text-primary" />
      ) : (
        <MdOutlineLightMode size={24} className="text-text-primary" />
      )}
    </button>
  );
}
