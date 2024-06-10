import { Link, useNavigate } from "react-router-dom";
import Logo from "../../assets/_auth/logo.png";
import Background from "../../assets/_auth/banner.png";
import styles from "./Signup.module.css";
import { useState } from "react";
import { useAuth } from "../AuthContext";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    await signup(name, email, password);
    navigate('/sign-in')
  };

  return (
    <main className={styles.main}>
      <div className={styles.containerLogin}>
        <div className={styles.imgContainer}>
          <img className={styles.img} src={Background} alt="imagem de fundo" />
        </div>
        <div className={styles.loginFormulario}>
          <div className={styles.titleAndFormContainer}>
            <div className={styles.logo}>
              <img src={Logo} alt="logo" />
            </div>
            <div className={styles.titleContainer}>
              <h1 className={styles.h1}>Entre nessa onda</h1>
            </div>
            <form className={styles.form} onSubmit={handleSignup}>
              <input
                type="name"
                placeholder="Nome de usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
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
