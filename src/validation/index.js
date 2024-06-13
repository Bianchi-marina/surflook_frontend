import { z }from 'zod';

export const signinFormSchema = z.object({
  email: z.string().email('Email inválido.').min(5, 'Necessário mais de 5 caracteres'),
  password: z.string().min(6, 'Senha deve possuir mais de 6 caracteres'),
});

export const signupFormSchema = z.object({
  name: z.string().min(2, 'Username deve possuir mais de 2 caracteres'),
  email: z.string().email('Email inválido.').min(5, 'Necessário mais de 5 caracteres'),
  password: z.string().min(6, 'Senha deve possuir mais de 6 caracteres'),
});


export const postSchema = z.object({
  description: z.string().min(1, "Escreva uma descrição do mar").max(280, "Texto até 280 caracteres"),
  cidade: z.string().min(2, "Precisa de pelo menos 2 caracteres"),
  praia: z.string().min(2, "Precisa de pelo menos 2 caracteres"),
  estado: z.string().length(2, "Precisa de pelo menos 2 caracteres").regex(/^[A-Za-z]+$/, "Estado só com letras"),
  mediaUrl: z.any(),
});