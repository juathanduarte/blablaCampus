import { z } from 'zod';

export const editCollegeSpotSchema = z.object({
  name: z.string().nonempty({ message: 'Nome inválido' }),
  newName: z.string().nonempty({ message: 'Nome inválido' }),
  cep: z.string().nonempty({ message: 'CEP inválido' }),
  state: z.string().nonempty({ message: 'Estado inválido' }),
  city: z.string().nonempty({ message: 'Cidade inválida' }),
  neighborhood: z.string().nonempty({ message: 'Bairro inválido' }),
  street: z.string().nonempty({ message: 'Rua inválida' }),
  number: z.number().positive({ message: 'Número inválido' }),
  complement: z.string().optional(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type EditCollegeSpot = z.infer<typeof editCollegeSpotSchema>;
