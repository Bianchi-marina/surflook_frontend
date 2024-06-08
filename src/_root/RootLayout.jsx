import { useState } from "react";

import Header from "../components/Header/Header";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import PopupCreatePost from "../components/PopupCreatePost/PopupCreatePost";
import PopupLogout from "../components/PopupLogout/PopupLogout";


import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const [isCreatePostOpen, setCreatePostOpen] = useState(false);
  const handleCreatePost = (postData) => {
    console.log("Post created:", postData);
    // Adicione lógica para criar o post, como fazer uma chamada API
  };
  const [isLogoutOpen, setLogoutOpen] = useState(false);
  const handleLogout = () => {
    console.log("saiu");
    // Adicione lógica para criar o post, como fazer uma chamada API
  };
 

  return (
    <div className="root-layout">
      <PopupCreatePost
        isOpen={isCreatePostOpen}
        onClose={() => setCreatePostOpen(false)}
        onCreatePost={handleCreatePost}
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
  );
};

export default RootLayout;
