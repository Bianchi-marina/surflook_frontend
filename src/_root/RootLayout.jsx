import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PopupCreatePost from "../components/PopupCreatePost/PopupCreatePost";
import PopupLogout from "../components/PopupLogout/PopupLogout";
import { INITIAL_USER, useUserContext } from "../_auth/AuthContext";
import { signOutAccount } from "../api/api";

import { Outlet } from "react-router-dom";
import { PostsProvider } from "./PostsContext";

const RootLayout = () => {
  const navigate = useNavigate();
  const { setUser, setIsAuthenticated } = useUserContext();
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const [isLogoutOpen, setLogoutOpen] = useState(false);

  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      signOutAccount();
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PostsProvider>
    <div className="root-layout">
      <PopupCreatePost
        isOpen={isCreatePostOpen}
        onClose={() => setCreatePostOpen(false)}
      />

      <PopupLogout
        isOpen={isLogoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />

      <Header className="header" onConfirm={() => setLogoutOpen(true)} />

      <Navbar className="navbar" onCreatePost={() => setCreatePostOpen(true)} />
   
        <section>
          <Outlet className="main" />
        </section>
      
      <Footer className="footer" />
    </div>
    </PostsProvider>
  );
};

export default RootLayout;
