import "./Header.css";
import { useEffect } from 'react';
import logo from "../../assets/light/logo.png";
import moon from "../../assets/light/moon.png";
import sun from "../../assets/light/sun.png";
import logout from "../../assets/light/logout.png";
import { useUserContext } from "../../_auth/AuthContext"
import { applyStoredTheme, toggleTheme } from '../../api/theme';


const Header = ( {onConfirm}) => {
  const { user } = useUserContext()

  useEffect(() => {
    applyStoredTheme();
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <img src={user.imageUrl} alt="User Avatar" className="user-avatar" />
        <div className="user-info">
          <p className="user-title">Aloha,</p>
          <h2>{user.name}</h2>
        </div>
      </div>

      <div className="header-center">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="header-right">
        <div className="theme-icons" onClick={toggleTheme}>
          <img src={sun} alt="Sun Icon" className="icon" id="sun-icon" />
          <img src={moon} alt="Moon Icon" className="icon" id="moon-icon" />
        </div>
        <button className="logout-button" onClick={onConfirm}>
        <img src={logout} alt="Logout Icon" className="icon logout-icon" />
        </button>
        
      </div>
    </header>
  );
}

export default Header;
