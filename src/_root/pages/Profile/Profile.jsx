import "./Profile.css";
import GridPost from "../../../components/GridPost/GridPost";
import user from "../../../assets/light/profile.png";
import edit from "../../../assets/light/edit.png"

const Profile = () => {
  return (
    <section className="profile-container">
      <div className="profile-content">
        <div className="profile-infos">
          <div className="user-container">
            <img src={user} alt="User Avatar" className="user-avatar" />
            <div className="user-info">
              <p className="user-title">Aloha,</p>
              <h2>Username</h2>
            </div>
          </div>
          <button className="edit-profile-button"><img src={edit} alt="" className=""/></button>
        </div>

        <div className="intro-text">
          <h2>Seus Checks</h2>
          <p>Aqui você pode visualizar, editar e excluir seus checks</p>
        </div>
        <GridPost />
      </div>
    </section>
  );
};

export default Profile;
