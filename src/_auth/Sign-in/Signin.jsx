import styles from "./Signin.module.css";
import Background from "../../assets/_auth/banner.png";
import Logo from "../../assets/_auth/logo.png";
import { Link,  useNavigate} from "react-router-dom";

import { useState } from "react";
import { useAuth } from "../AuthContext";

const Signin = () => {
  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password)
    navigate('/')
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
            <form className={styles.form} onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
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
