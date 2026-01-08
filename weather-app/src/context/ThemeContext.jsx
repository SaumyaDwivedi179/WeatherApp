import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const THEME_STORAGE_KEY = "theme";
const THEME_LIGHT = "light";
const THEME_DARK = "dark";
const DEFAULT_THEME = THEME_LIGHT;

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    document.documentElement.setAttribute("data-theme", savedTheme);
    return savedTheme;
  });

  const toggleTheme = () => {
    setCurrentTheme((previousTheme) => {
      const nextTheme = previousTheme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT;
      localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      document.documentElement.setAttribute("data-theme", nextTheme);
      return nextTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme: currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
