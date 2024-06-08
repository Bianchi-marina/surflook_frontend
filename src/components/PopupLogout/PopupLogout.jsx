import PopupConfirmation from "../PopupConfirmation/PopupConfirmation"

const PopupLogout = ({ isOpen, onClose, onConfirm }) => {
    return (
      <PopupConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Sair do SurfLook"
        subtitle="Tem certeza de que deseja sair?"
      />
    );
  };

  export default PopupLogout;