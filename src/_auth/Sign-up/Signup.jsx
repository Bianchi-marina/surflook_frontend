import { Link , useNavigate} from "react-router-dom";
import Logo from "@/assets/_auth/logo.png";
import logovideo from "@/assets/logo-video.mp4";
import styles from "./Signup.module.css";
import { useState, useEffect } from "react";

import { createUserAccount } from '../../api/api';
import {signupFormSchema } from '../../validation/index'

const Signup = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [signupError, setSignupError] = useState('');

  const navigate = useNavigate()

  useEffect(() => {
    const { name, email, password } = user;
    if (touched.name || touched.email || touched.password) {
      const result = signupFormSchema.safeParse({ name, email, password });
      if (!result.success) {
        setErrors(result.error.formErrors.fieldErrors);
      } else {
        setErrors({});
      }
    }
  }, [user, touched]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, password: true });
    const result = signupFormSchema.safeParse(user);
    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }

    const response = await createUserAccount(user);
    if (response.error) {
      setSignupError(response.error);
    } else {
      console.log(response);
      navigate('/sign-in');
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.containerLogin}>
      <div className={styles.imgContainer}>
          <video
            className={styles.videoBackground}
            autoPlay
            loop
            muted
            playsInline
          >
            <source src={logovideo} type="video/mp4" />
          </video>
        </div>
        <div className={styles.loginFormulario}>
          <div className={styles.titleAndFormContainer}>
            <div className={styles.logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={styles.titleContainer}>
              <h1 className={styles.h1}>Entre nessa onda</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.flexInput}>
                <input
                  className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                  type="name"
                  placeholder="Nome de usuário"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                {touched.name && errors.name && <span className={styles.error}>{errors.name}</span>}
              </div>
              <div className={styles.flexInput}>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  type="email"
                  placeholder="E-mail"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  
                />
                {touched.email && errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              <div className={styles.flexInput}>
                <input
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  type="password"
                  placeholder="Senha"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  
                />
                {touched.password && errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>
              {signupError && <div className={styles.error}>{signupError}</div>}
              <button className={styles.buttonEnviar} type="submit">
                Cadastrar
              </button>
            </form>
            <div className={styles.inscreva}>
              <p className={styles.textInscreva}>Já possui uma conta?</p>
              <Link to="/sign-in" className={styles.linkInscreva}>
                Faça login aqui
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;
