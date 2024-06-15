import closeIcon from "@/assets/light/close.png";
import styles from "./PopupForm.module.css";
import { useState } from "react"; 

const PopupForm = ({ isOpen, onClose, onSubmit, title, subtitle, children }) => {
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  const handleSubmit = async (event) => {
    setLoading(true); 
    try {
      await onSubmit(event);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.popupOverlay}>
      <div className={styles.popupContent}>
        <button className={styles.closeButton} onClick={onClose}>
          <img src={closeIcon} alt="Close" />
        </button>
        <div className={styles.popupInfos}>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <form className={styles.popupForm} onSubmit={handleSubmit}>
          {children}
          {loading ? ( 
            <div className={styles.loadingIndicator}>Enviando seu check...</div>
            ) : (
              <button type="submit">Salvar</button>
            )}
        </form>
        </div>
       
      </div>
    </div>
  );
};

export default PopupForm;