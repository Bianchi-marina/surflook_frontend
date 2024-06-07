import './Profile.css';
import GridPost from '../../../components/GridPost/GridPost';

const Profile = () => {
  return (
    <section className="profile-container">
      <div className="profile-content">
        <div className="intro-text">
          <h2>Seus Checks</h2>
          <p>Aqui você pode visualizar, editar e excluir seus posts</p>
        </div>
        {/* <div className="user-posts">
          {userPosts.length === 0 ? (
            <p>Você ainda não fez nenhum check-in.</p>
          ) : (
            <GridPost posts={userPosts} />
          )}
        </div> */}
        <GridPost />
      </div>
    </section>
  )
}

export default Profile
