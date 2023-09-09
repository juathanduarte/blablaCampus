import { z } from 'zod';

export const userSchema = z.object({
  registration: z.string().nonempty({ message: 'Matrícula inválida' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  name: z.string().nonempty({ message: 'Nome inválido' }),
  type: z.string().nonempty({ message: 'Tipo inválido' }),
  isBlocked: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  vehicles: z.string().nonempty({ message: 'Veículo inválido' }),
});

export type User = z.infer<typeof userSchema>;
