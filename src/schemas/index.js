import { z }from 'zod';

export const signinFormSchema = z.object({
  email: z.string().email('').min(5),
  password: z.string(),
});

export const signupFormSchema = z.object({
  username: z.string().min(2),
  email: z.string().email('').min(5),
  password: z.string(),
});