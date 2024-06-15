import "./Profile.css";
import { useEffect, useState } from "react";
import GridPost from "../../../components/GridPost/GridPost";
import { useUserContext } from "../../../_auth/AuthContext";
import { getUserPosts } from "../../../api/api";
import overlay from "/src/assets/light/overlay.png";
import trashIcon from "/src/assets/light/trash.png";

const Profile = () => {
  const { user } = useUserContext();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const userPosts = async () => {
      try {
        const posts = await getUserPosts(user.userId);
        setPosts(posts);
      } catch (error) {
        console.error("Não foi possivel pegar os posts desse user:", error);
      }
    };
    if (user) {
      userPosts();
    }
  }, [user]);

  const deleteIcon = <img src={trashIcon} alt="Delete" className="post-icon" />;

  return (
    <>
      <section className="profile-container">
      <div className="user-container">
        <img src={user.imageUrl} alt="User Avatar" className="user-avatar" />
        <div className="user-info">
          <p className="user-title">Aloha,</p>
          <h2>{user.name}</h2>
        </div>
      </div>
        <div className="profile-content"> 
          <div className="intro-text">
            <h2>Seus Checks</h2>
            <p>Aqui você pode visualizar e excluir seus checks</p>
          </div>
          {posts.length > 0 ? (
            <GridPost posts={posts} deleteIcon={deleteIcon} />
          ) : (
            <div className="overlay-container">
              <img src={overlay} alt="overlay logo" className="overlay-logo" />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Profile;
