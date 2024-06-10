import { forwardRef } from 'react';
import styles from './Input.module.css';

const Input = forwardRef(
  function InputComponent(
    { type, placeholder, error, label, id, ...props },
    ref,
  ) {
    return (
      <div className={styles.flexInput}>
        <label className={styles.label} htmlFor={id}>
          <span className={styles.labelInput}>{label}</span>
          <input
            className={`${styles.input} ${error ? styles.errorInput : ''}`}
            ref={ref}
            type={type}
            placeholder={placeholder}
            id={id}
            {...props}
            aria-invalid={error ? 'true' : 'false'}
          />
        </label>
        {error ? <p className={styles.error}>{error.message}</p> : null}
      </div>
    );
  }
);

export default Input;

