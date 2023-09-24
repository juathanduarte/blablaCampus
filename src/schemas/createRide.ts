import { z } from 'zod';

export const createCarpool = z.object({
  originCampusName: z.string().nonempty(),
  destinationCampusName: z.string().nonempty(),
  day: z.date(),
  time: z.date(),
  availableSeats: z.number().int().positive(),
  vehiclePlate: z.string().nonempty(),
});

export type CreateCarpool = z.infer<typeof createCarpool>;
