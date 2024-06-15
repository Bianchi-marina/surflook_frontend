import closeIcon from "../../assets/light/close.png";
import styles from "../PopupForm/PopupForm.module.css";

const PopupConfirmation = ({ isOpen, onClose, onConfirm, title, subtitle }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className={styles.popupInfos}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className={styles.button}>
          <button className={styles.yesButton} onClick={onConfirm}>Sim</button>
          <button className={styles.noButton} onClick={onClose}>Não</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupConfirmation;
