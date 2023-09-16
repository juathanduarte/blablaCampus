import { Vehicle } from '../../types/Vehicle';
import { api } from '../api';

export async function editVehicle({
  vehicle,
  oldPlate,
}: {
  vehicle: Omit<Vehicle, 'user_registration' | 'user'>;
  oldPlate: string;
}) {
  const { data } = await api.put(`/vehicle/${oldPlate}`, {
    ...vehicle,
    year: Number(vehicle.year),
    seats: Number(vehicle.seats),
    newPlate: vehicle.plate,
  });
}
