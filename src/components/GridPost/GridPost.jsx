import "./GridPost.css";
import { useState } from "react";
import { useUserContext } from "../../_auth/AuthContext";
import { formatTimeSince } from "../../api/formatTimeSince";
import { deletePost } from "../../api/api";

const GridPost = ({ posts, deleteIcon }) => {
  const { user } = useUserContext();
  const [loading, setLoading] = useState(false);

  const handleDeleteClick = async (postId, mediaUrl) => {
    setLoading(true);
    try {
      await deletePost(postId, mediaUrl);
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log("posts", posts);

  return (
    <div className="grid-post">
      {posts.map((post) => (
        <div key={post.$id} className="post">
          <div className="post-media">
            {post.mediaUrl ? (
              post.mediaType === "mp4" || post.mediaType === "quicktime" ? (
                <video
                  loop
                  controls
                  className="post-image"
                  src={post.mediaUrl}
                  type={`video/${post.mediaType}`}
                />
              ) : (
                <img src={post.mediaUrl} alt="Post" className="post-image" />
              )
            ) : (
              <div className="no-media">Nenhuma mídia</div>
            )}
            <div className="post-icons">
              {user.userId === post.creator.$id && (
                <div>
                  {loading === post.$id ? (
                    <div>Deletando este check...</div>
                  ) : (
                    <button
                      onClick={() => handleDeleteClick(post.$id, post.mediaUrl)}
                      className="post-icon"
                    >
                      {deleteIcon}
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
          <div className="post-content">
            <div className="post-infos">
              <div className="post-creator">
                <img
                  src={post.creator.imageUrl}
                  alt="User Avatar"
                  className="user-avatar"
                />
                <p className="creator">{post.creatorName}</p>
              </div>
              <p className="time-ago">{formatTimeSince(post.created_at)}</p>
            </div>
            <div className="tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="description">{post.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridPost;
