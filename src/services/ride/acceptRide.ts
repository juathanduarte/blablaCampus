import { api } from '../api';

interface AcceptRidePayload {
  departureDate: string;
  driverRegistration: string;
  passengerRegistration: string;
}

export async function acceptRide(payload: AcceptRidePayload): Promise<void> {
  await api.put(`/carpool/accept-ride`, payload);
}
