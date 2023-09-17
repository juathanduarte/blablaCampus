import { api } from '../api';

export async function deleteVehicle(plate: string) {
  const { data } = await api.delete(`/vehicle/${plate}`);
  return data;
}
