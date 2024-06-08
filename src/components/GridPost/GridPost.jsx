import "./GridPost.css";
import fotoIcon from "../../assets/light/image.png"; // Certifique-se de usar o caminho correto para os ícones
import trashIcon from "../../assets/light/trash.png";
import likeIcon from "../../assets/light/like.svg";

const GridPost = ({ onConfirm }) => {
  return (
    <div className="grid-post">
      <div className="post">
        <div className="post-media">
          <img src="" alt="Post" className="post-image" />
          <div className="post-icons">
            <span className="icon">
              <img src={fotoIcon} alt="Foto Icon" />
            </span>
            <button className="post-icon" onClick={onConfirm}>
              <img src={trashIcon} alt="Trash Icon" />
            </button>
           
          </div>
          <div className="like-container">
              <button className="post-icon">
                <img src={likeIcon} alt="Like Icon" />
              </button>
            </div>
        </div>
        <div className="post-content">
          <p className="username">Username</p>
          <div className="tags">
            <span className="tag">Cidade</span>
            <span className="tag">Praia</span>
            <span className="tag">Hora</span>
          </div>
          <p className="description">Description</p>
        </div>
      </div>
    </div>
  );
};

export default GridPost;
