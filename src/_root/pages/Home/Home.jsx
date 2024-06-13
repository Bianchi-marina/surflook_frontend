import { useEffect, useState } from "react";
import GridPost from "../../../components/GridPost/GridPost";
import { getRecentPosts } from "../../../api/api";
import {OverlayLogo} from "../../../components/OverlayLogo/OverlayLogo"
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

  console.log(posts)

  return (
    <section className="home-container">
      <div className="home-content">
        <div className="intro-text">
          <p>
            Compartilhe com seus amigos surfistas as condições atuais do mar.
          </p>
          <p>*Os posts são deletados automaticamente ao término do dia</p>
        </div>
        {posts == [] ? (
          <GridPost posts={posts} />
        ) : (
          <OverlayLogo />
        )}
      </div>
    </section>
  );
};

export default Home;
