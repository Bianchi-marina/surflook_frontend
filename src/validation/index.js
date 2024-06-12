import { z }from 'zod';

export const signinFormSchema = z.object({
  email: z.string().email('Email inválido, tente novamente.').min(5, 'Email precisa ter mais de 5 caracteres'),
  password: z.string().min(6, 'Senha deve possuir mais de 6 caracteres'),
});

export const signupFormSchema = z.object({
  name: z.string().min(2, 'Username deve possuir mais de 2 caracteres'),
  email: z.string().email('Tente novamente.').min(5, 'Email precisa ter mais de 5 caracteres'),
  password: z.string().min(6, 'Senha deve possuir mais de 6 caracteres'),
});