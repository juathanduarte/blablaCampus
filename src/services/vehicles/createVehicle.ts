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

export const isPlateAvailable = async (plate: string): Promise<{ exists: boolean }> => {
  const { data } = await api.post(`/vehicle/is-plate-available`, {
    plate,
  });
  return { exists: Boolean(data?.exists) };
};

export const isChassesAvailable = async (chassis: string): Promise<{ exists: boolean }> => {
  const { data } = await api.post(`/vehicle/is-chassis-available`, {
    chassis,
  });
  return { exists: Boolean(data?.exists) };
};

export const isReindeerAvailable = async (reindeer: string): Promise<{ exists: boolean }> => {
  const { data } = await api.post(`/vehicle/is-reindeer-available`, {
    reindeer,
  });
  return { exists: Boolean(data?.exists) };
};
