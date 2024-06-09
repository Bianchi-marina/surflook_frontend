import styles from './Signin.module.css';
import Background from '../../assets/_auth/banner.png';
import Logo from '../../assets/_auth/logo.png';
import Input from '../../components/Input/Input';
import { useForm } from 'react-hook-form';
import { signinFormSchema } from '../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';

const Signin = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinFormSchema),
  });

  const submit = (formData) => {
    console.log(formData);
    reset();
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
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
              <Input
                type="text"
                label="Email"
                placeholder="Email"
                error={errors.email}
                {...register('email')}
              />
              <Input
                type="password"
                label="Password"
                placeholder="password"
                {...register('password')}
              />
              <button className={styles.buttonEnviar} type="submit">
                Entrar
              </button>
            </form>
            <div className={styles.inscreva}>
              <p className={styles.textInscreva}>Ainda não possui uma conta?</p>
              <Link to={'/sign-up'} className={styles.linkInscreva}>
                Inscreva-se aqui
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.imgContainer}>
          <img
            className={styles.img}
            src={Background}
            alt="imagem de fundo"
          />
        </div>
      </div>
    </main>
  );
};

export default Signin;
