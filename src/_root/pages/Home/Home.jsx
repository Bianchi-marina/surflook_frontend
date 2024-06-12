import "./Home.css";
import overlay from "../../../assets/light/overlay.png";
import { useEffect, useState } from "react";
import { deleteAllPosts } from "../../../api/api";
import GridPost from "../../../components/GridPost/GridPost";
import { getRecentPosts } from "../../../api/api";

const Home = () => {
  const [posts, setPosts] = useState(null);

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

    const interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);

      if (now.getTime() === midnight.getTime()) {
        deleteAllPosts();
      }
    }, 60000);
    console.log( "POSTS",posts)

    return () => clearInterval(interval);
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
