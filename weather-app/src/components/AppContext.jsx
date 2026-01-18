import { useTheme } from '../context/ThemeContext';
import { THEME } from '../constants/theme';

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const buttonLabel = theme === THEME.LIGHT ? '🌙 Dark' : '☀️ Light';

  return (
    <button
      onClick={toggleTheme}
       className="theme-toggle-button absolute top-2 right-2"
    >
      {buttonLabel}
    </button>
  );
}
