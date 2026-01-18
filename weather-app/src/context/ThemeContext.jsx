import { THEME } from '../constants/theme';
import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

const THEME_STORAGE_KEY = "theme";
const DEFAULT_THEME = THEME.LIGHT; //enum

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || DEFAULT_THEME;
    document.documentElement.setAttribute("data-theme", savedTheme);
    return savedTheme;
  });

  const toggleTheme = () => {
    setCurrentTheme((previousTheme) => {
      const nextTheme = previousTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT;
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
