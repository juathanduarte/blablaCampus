import { Vehicle } from '../../types/Vehicle';
import { api } from '../api';

type CreateVehicleParams = Omit<
  Vehicle,
  'user' | 'created_at' | 'updated_at' | 'user_registration'
>;

export const createVehicle = async (vehicle: CreateVehicleParams) => {
  const { data } = await api.post<Vehicle>('/vehicle', {
    ...vehicle,
  });
  return data;
};
