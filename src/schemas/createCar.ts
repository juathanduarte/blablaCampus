import { z } from 'zod';

export const createCarSchema = z.object({
  brand: z.string().nonempty({ message: 'Marca inválida' }),
  model: z.string().nonempty({ message: 'Modelo inválido' }),
  plate: z.string().nonempty({ message: 'Placa inválida' }),
  reindeer: z.string().nonempty({ message: 'Renavam inválido' }),
  chassis: z.string().nonempty({ message: 'Chassi inválido' }),
  year: z.string().nonempty({ message: 'Ano inválido' }),
  seats: z.string().nonempty({ message: 'Cor inválida' }),
  color: z.string().nonempty({ message: 'Cor inválida' }),
});

export type CreateCarSchema = z.infer<typeof createCarSchema>;
