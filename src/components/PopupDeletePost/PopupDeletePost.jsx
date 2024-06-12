import PopupConfirmation from "../PopupConfirmation/PopupConfirmation"

const PopupDeletePost = ({ isOpen, onClose, onConfirm }) => {
    return (
      <PopupConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onClick={onConfirm}
        title="Excluir Check"
        subtitle="Tem certeza de que deseja excluir este check?"
      />
    );
  };

export default PopupDeletePost
