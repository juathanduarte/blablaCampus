import { z } from 'zod';

export const createCarSchema = z.object({
  brand: z.string().nonempty({ message: 'Marca inválida' }),
  model: z.string().nonempty({ message: 'Modelo inválido' }),
  plate: z.string().nonempty({ message: 'Placa inválida' }),
  reindeer: z.string().nonempty({ message: 'Renavam inválido' }),
  chassis: z.string().nonempty({ message: 'Chassi inválido' }),
  color: z.string().nonempty({ message: 'Cor inválida' }),
  year: z.number().int().positive({ message: 'Ano inválido' }),
  seats: z.number().int().positive({ message: 'Quantidade de assentos inválida' }),
});

export type CreateCarSchema = z.infer<typeof createCarSchema>;
