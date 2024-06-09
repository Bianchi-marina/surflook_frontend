import { useForm } from 'react-hook-form';
import { signupFormSchema } from '../../schemas/index';
import { zodResolver } from '@hookform/resolvers/zod';
import Input from '../../components/Input/Input';
import { Link } from 'react-router-dom';
import Logo from '../../assets/_auth/logo.png';
import Background from '../../assets/_auth/banner.png';
import styles from './Signup.module.css';

const SignUp = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupFormSchema),
  });

  const submit = (formData) => {
    console.log(formData);
    reset();
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
              <h1 className={styles.h1}>Crie sua conta</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(submit)}>
              <Input
                type="text"
                label="Username"
                placeholder="Username"
                error={errors.username}
                {...register('username')}
              />
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
                placeholder="Password"
                error={errors.password}
                {...register('password')}
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

export default SignUp;

