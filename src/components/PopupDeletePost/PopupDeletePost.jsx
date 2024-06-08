import PopupConfirmation from "../PopupConfirmation/PopupConfirmation"

const PopupDeletePost = ({ isOpen, onClose, onConfirm }) => {
    return (
      <PopupConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={onConfirm}
        title="Excluir Post"
        subtitle="Tem certeza de que deseja excluir este post?"
      />
    );
  };

export default PopupDeletePost
