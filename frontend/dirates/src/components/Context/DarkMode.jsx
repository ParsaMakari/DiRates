import { createContext, useState, useEffect } from "react";

export const DarkModeContext = createContext(false);
export const SetDarkModeContext = createContext(null);

export function DarkModeContextProvider({ children }) {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("DarkMode");
    return saved === "true";
  });
  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }

    localStorage.setItem("DarkMode", darkMode);
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={darkMode}>
      <SetDarkModeContext.Provider value={toggleDarkMode}>
        {children}
      </SetDarkModeContext.Provider>
    </DarkModeContext.Provider>
  );
}
