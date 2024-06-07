import './GridPost.css';

const GridPost = () => {
  return (
    <div className="grid-post">
      <div className="post">
        <img src="image-url" alt="Post" className="post-image" />
        <div className="post-content">
          <p className="username">Username</p>
          <div className="tags">
            <span className="tag">Cidade</span>
            <span className="tag">Praia</span>
            <span className="tag">Hora</span>
          </div>
          <p className="description">Descrição do post</p>
        </div>
      </div>
    </div>
  );
};

export default GridPost;