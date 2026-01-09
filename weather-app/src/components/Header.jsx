
import { ThemeToggle } from './ThemeToggle.jsx'  

const Header = () => (
  <header className="header-glass">
    <div className="header-content">
      <div className="header-left">
        <h1 className="header-title">Weatherly</h1>
        <p className="header-subtitle">
          Get instant weather updates for any city worldwide
        </p>
      </div>
      <ThemeToggle />  {}
    </div>
  </header>
)

export default Header
