import { api } from '../api';

export async function requestRide(payload: { departureDate: string; driverRegistration: string }) {
  const { data, config, headers, request } = await api.post(`/carpool/request-ride`, payload);

  console.log({
    data,
    config,
    headers,
    request,
  });

  return data;
}
