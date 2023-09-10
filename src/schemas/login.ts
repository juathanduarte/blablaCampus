import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido' }),
  password: z.string().nonempty({ message: 'Senha inválida' }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
