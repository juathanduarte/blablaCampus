import { z } from 'zod';

export const registerSchema = z
  .object({
    name: z.string().nonempty({ message: 'Campo obrigatório' }),
    email: z.string().email({ message: 'E-mail inválido' }),
    registration: z.string().nonempty({ message: 'Campo obrigatório' }),
    // min 8, Uppercase, Lowercase, Number, Special Character
    password: z
      .string()
      .min(8, { message: 'Mínimo 8 dígitos' })
      .regex(/[a-z]+/, { message: 'Mínimo 1 letra minuscula' })
      .regex(/[A-Z]+/, { message: 'Mínimo 1 letra maiuscula' })
      .regex(/[@$!%*#?&]+/, { message: 'Minimo 1 caracter especial' })
      .regex(/\d+/, { message: 'Mínimo 1 dígito' })
      .refine((value) => value.length >= 8, { message: 'Mínimo 8 dígitos' }),
    // compare with password
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: 'As senhas não coincidem',
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
