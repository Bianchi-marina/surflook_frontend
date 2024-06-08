import closeIcon from "../../assets/light/close.png";
import styles from "./PopupForm.module.css";

const PopupForm = ({ isOpen, onClose, onSubmit, title, subtitle, children }) => {
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
        <form className={styles.popupForm} onSubmit={onSubmit}>
          {children}
          <button type="submit">Submit</button>
        </form>
        </div>
       
      </div>
    </div>
  );
};

export default PopupForm;