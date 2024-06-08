import "./Header.css";
import logo from "../../assets/light/logo.png";
import moon from "../../assets/light/moon.png";
import sun from "../../assets/light/sun.png";
import logout from "../../assets/light/logout.png";
import user from "../../assets/light/profile.png";

const Header = ( {onConfirm}) => {

  function toggleTheme() {
    const html = document.querySelector("html");
    const images = document.querySelectorAll("img");
  
    if (html.getAttribute("data-theme") === "light") {
      html.setAttribute("data-theme", "dark");
      images.forEach(img => {
        img.src = img.src.replace("/light/", "/dark/"); 
      });
    } else {
      html.setAttribute("data-theme", "light");
      images.forEach(img => {
        img.src = img.src.replace("/dark/", "/light/"); 
      });
    }
  }
  
  return (
    <header className="header">
      <div className="header-left">
        <img src={user} alt="User Avatar" className="user-avatar" />
        <div className="user-info">
          <p className="user-title">Aloha,</p>
          <h2>Username</h2>
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
