import { useState } from "react";
import PopupForm from "../PopupForm/PopupForm";

const PopupEditProfile = ({ isOpen, onClose, onEditProfile }) => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, about });
    onClose();
  };

  return (
    <PopupForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Atualize o seu perfil"
      subtitle="Vamos dropar juntos :)"
    >
      <>
        <label>
          <input
            id="name-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // className="popup__form-input popup__form-input_name"
            placeholder="Avatar"
            type="text"
            name="cidade"
            minLength={2}
            maxLength={40}
            required
          />
        </label>
        <label>
          <input
            id="about-input"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            // className="popup__form-input popup__form-input_about"
            placeholder="Username"
            type="text"
            name="praia"
            minLength={2}
            maxLength={200}
            required
          />
        </label>
      </>
    </PopupForm>
  );
};

export default PopupEditProfile;
