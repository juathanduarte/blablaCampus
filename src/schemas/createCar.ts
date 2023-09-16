import { z } from 'zod';

export const createCarSchema = z.object({
  marca: z.string().nonempty({ message: 'Marca inválida' }),
  modelo: z.string().nonempty({ message: 'Modelo inválido' }),
  placa: z.string().nonempty({ message: 'Placa inválida' }),
  renavam: z.string().nonempty({ message: 'Renavam inválido' }),
  chassi: z.string().nonempty({ message: 'Chassi inválido' }),
  ano: z.string().nonempty({ message: 'Ano inválido' }),
  cor: z.string().nonempty({ message: 'Cor inválida' }),
});

export type CreateCarSchema = z.infer<typeof createCarSchema>;
