import { z } from 'zod';

export const collegeSpotSchema = z.object({
  name: z.string().nonempty({ message: 'Campo obrigatório' }),
  cep: z
    .string()
    .nonempty({ message: 'Campo obrigatório' })
    .length(8, { message: 'CEP deve ter 8 caracteres' }),
  state: z
    .string()
    .nonempty({ message: 'Campo obrigatório' })
    .length(2, { message: 'Estado deve ter 2 caracteres' }),
  city: z.string().nonempty({ message: 'Campo obrigatório' }),
  neighborhood: z.string().nonempty({ message: 'Campo obrigatório' }),
  street: z.string().nonempty({ message: 'Campo obrigatório' }),
  number: z.string().nonempty({ message: 'Campo obrigatório' }),
  complement: z.string().optional(),
});

export type CollegeSpotSchema = z.infer<typeof collegeSpotSchema>;
