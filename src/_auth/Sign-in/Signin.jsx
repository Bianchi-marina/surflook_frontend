import styles from "./Signin.module.css";
import Background from "../../assets/_auth/banner.png";
import Logo from "../../assets/_auth/logo.png";
import { Link} from "react-router-dom";

import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { signInAccount } from '../../api/api';
import { useUserContext } from '../AuthContext';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { checkAuthUser } = useUserContext();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const response = await signInAccount(email, password);
    if (response) {
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
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
