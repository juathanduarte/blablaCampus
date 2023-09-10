import { z } from 'zod';

export const userSchema = z.object({
  registration: z.string().nonempty({ message: 'Matrícula inválida' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  name: z.string().nonempty({ message: 'Nome inválido' }),
  isBlocked: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  vehicles: z.string().nonempty({ message: 'Veículo inválido' }),
  type: z.enum(['USER', 'ADMIN']),
});

export type User = z.infer<typeof userSchema>;
