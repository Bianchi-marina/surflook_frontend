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
        <NavLink to="/" activeClassName="active">
          <img src={homeInactive} alt="Home" className="icon" />
        </NavLink>
        <NavLink to="/search" activeClassName="active">
          <img src={searchInactive} alt="Search" className="icon" />
        </NavLink>
        <NavLink to="/weather" activeClassName="active">
          <img src={weatherInactive} alt="Weather" className="icon" />
        </NavLink>
        <NavLink to="/profile" activeClassName="active">
          <img src={profileInactive} alt="Profile" className="icon" />
        </NavLink>
      </div>
      <div className="navbar-create-post">
        <img src={createPost} alt="Create Post" className="icon-post" />
      </div>
    </nav>
  );
};

export default Navbar;
