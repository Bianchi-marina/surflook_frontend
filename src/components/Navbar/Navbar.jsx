import { NavLink } from "react-router-dom";
import "./Navbar.css";

import homeInactive from "../../assets/inactive/home.png";

import searchInactive from "../../assets/inactive/loc.png";

import weatherInactive from "../../assets/inactive/weather.png";

import profileInactive from "../../assets/inactive/profile.png";

import createPost from "../../assets/light/post.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-icons">
        <NavLink to="/">
          <img src={homeInactive} alt="Home" className="icon" />
        </NavLink>
        <NavLink to="/search">
          <img src={searchInactive} alt="Search" className="icon" />
        </NavLink>
        <NavLink to="/weather">
          <img src={weatherInactive} alt="Weather" className="icon" />
        </NavLink>
        <NavLink to="/profile">
          <img src={profileInactive} alt="Profile" className="icon" />
        </NavLink>
      </div>
      <button className="navbar-create-post">
        <img src={createPost} alt="Create Post" className="icon-post" />
      </button>
    </nav>
  );
};

export default Navbar;
