import { useTheme } from '../context/ThemeContext';

const THEME_LIGHT = "light";
const BUTTON_POSITION_TOP = "20px";
const BUTTON_POSITION_RIGHT = "20px";
const BUTTON_SCALE_HOVER = "1.05";
const BUTTON_SCALE_NORMAL = "1";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const handleMouseEnter = (event) => {
    event.target.style.transform = `scale(${BUTTON_SCALE_HOVER})`;
  };

  const handleMouseLeave = (event) => {
    event.target.style.transform = `scale(${BUTTON_SCALE_NORMAL})`;
  };

  const buttonLabel = theme === THEME_LIGHT ? '🌙 Dark' : '☀️ Light';

  return (
    <button 
      onClick={toggleTheme}
      className="theme-toggle-button"
      style={{
        position: 'absolute',
        top: BUTTON_POSITION_TOP,
        right: BUTTON_POSITION_RIGHT,
        padding: '10px 20px',
        borderRadius: '8px',
        border: 'none',
        cursor: 'pointer',
        fontSize: '14px',
        fontWeight: '600',
        transition: 'all 0.3s ease',
        backgroundColor: 'var(--theme-button-background)',
        color: 'var(--theme-button-text)',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {buttonLabel}
    </button>
  );
}
