import "./Profile.css";
import { useState } from "react";
import GridPost from "../../../components/GridPost/GridPost";
import edit from "../../../assets/light/edit.png";
import PopupEditProfile from "../../../components/PopupEditProfile/PopupEditProfile";
import PopupDeletePost from "../../../components/PopupDeletePost/PopupDeletePost";
import { useUserContext } from "../../../_auth/AuthContext";

const Profile = () => {
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isDeletePostOpen, setDeletePostOpen] = useState(false);

  const { user } = useUserContext();

  return (
    <>
      <PopupEditProfile
        isOpen={isEditProfileOpen}
        onClose={() => setEditProfileOpen(false)}
      />
      <PopupDeletePost
       isOpen={isDeletePostOpen}
       onClose={() => setDeletePostOpen(false)}
        />

      <section className="profile-container">
        <div className="profile-content">
          <div className="profile-infos">
            <div className="user-container">
              <img src={user.imageUrl} alt="User Avatar" className="user-avatar" />
              <div className="user-info">
                <p className="user-title">Aloha,</p>
                <h2>{user.name}</h2>
              </div>
            </div>
            <button
              className="edit-profile-button"
              onClick={() => setEditProfileOpen(true)}
            >
              <img src={edit} alt="" className="" />
            </button>
          </div>

          <div className="intro-text">
            <h2>Seus Checks</h2>
            <p>Aqui você pode visualizar, editar e excluir seus checks</p>
          </div>
          <GridPost  onConfirm={() => setDeletePostOpen(true)}/>
        </div>
      </section>
    </>
  );
};

export default Profile;
