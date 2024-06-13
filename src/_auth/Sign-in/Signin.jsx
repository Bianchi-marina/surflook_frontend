import styles from "./Signin.module.css";
import Background from "../../assets/_auth/banner.png";
import Logo from "../../assets/_auth/logo.png";
import { Link} from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { signInAccount } from '../../api/api';
import { useUserContext } from '../AuthContext';
import { signinFormSchema } from '../../validation/index';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [signinError, setSigninError] = useState('');
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();

 
  useEffect(() => {
    if (touched.email || touched.password) {
      const result = signinFormSchema.safeParse({ email, password });
      if (!result.success) {
        setErrors(result.error.formErrors.fieldErrors);
      } else {
        setErrors({});
      }
    }
  }, [email, password, touched]);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const result = signinFormSchema.safeParse({ email, password });
    if (!result.success) {
      setErrors(result.error.formErrors.fieldErrors);
      return;
    }

    const response = await signInAccount(email, password);
    if (response.error) {
      setSigninError(response.error);
    } else {
      await checkAuthUser();
      navigate('/');
    }
  };


  return (
    <main className={styles.main}>
      <div className={styles.containerLogin}>
        <div className={styles.loginFormulario}>
          <div className={styles.titleAndFormContainer}>
            <div className={styles.logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={styles.titleContainer}>
              <h1 className={styles.h1}>Aloha, surfista!</h1>
              <p className={styles.description}>
                Será que hoje está valendo a queda?
              </p>
            </div>
            <form className={styles.form} onSubmit={handleSignIn}>
            <div className={styles.flexInput}>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              
                />
               {touched.email && errors.email && <span className={styles.error}>{errors.email}</span>}
              </div>
              <div className={styles.flexInput}>
                <input
                  className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 
                />
                {touched.password && errors.password && <span className={styles.error}>{errors.password}</span>}
              </div>
              {signinError && <div className={styles.error}>{signinError}</div>}
              <button className={styles.buttonEnviar} type="submit">
                Entrar
              </button>
            </form>
            <div className={styles.inscreva}>
              <p className={styles.textInscreva}>Ainda não possui uma conta?</p>
              <Link to={"/sign-up"} className={styles.linkInscreva}>
                Inscreva-se aqui
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={Background} alt="imagem de fundo" />
        </div>
      </div>
    </main>
  );
};

export default Signin;
