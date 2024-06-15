import { useEffect, useState } from "react";
import GridPost from "../../../components/GridPost/GridPost";
import { getRecentPosts } from "../../../api/api";
import overlay from "@/assets/light/overlay.png";
import "./Home.css";

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const recentPosts = await getRecentPosts();
        setPosts(recentPosts.documents);
      } catch (error) {
        console.error("Erro ao buscar posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <section className="home-container">
      <div className="home-content">
        <div className="intro-text">
          <p>
            Compartilhe com seus amigos surfistas as condições atuais do mar.
          </p>
          <p>*Os posts são deletados automaticamente ao término do dia</p>
        </div>
        {posts ? (
          <GridPost posts={posts} />
        ) : (
          <div className="overlay-container">
            <img src={overlay} alt="overlay logo" className="overlay-logo" />
          </div>
        )}
      </div>
    </section>
  );
};

export default Home;
