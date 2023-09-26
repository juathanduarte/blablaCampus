import { api } from '../api';

interface AcceptRidePayload {
  departureDate: string;
  driverRegistration: string;
  passengerRegistration: string;
}

export async function rejectRide(payload: AcceptRidePayload): Promise<void> {
  await api.put(`/carpool/reject-ride`, payload);
}
