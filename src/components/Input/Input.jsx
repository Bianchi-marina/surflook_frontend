import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(
  function InputComponent(
    { type, placeholder, error, label, ...props },
    ref,
  ) {
    return (
      <div className={styles.flexInput}>
        <label className={styles.label}>
          <span className={styles.labelInput}>{label}</span>
          <input
            className={styles.input}
            ref={ref}
            type={type}
            placeholder={placeholder}
            {...props}
          />
        </label>
        {error ? <p className={styles.error}>{error.message}</p> : null}
      </div>
    );
  }
);

export default Input;
