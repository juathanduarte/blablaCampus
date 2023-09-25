import { CreateCarpool } from '../../schemas/createRide';
import { api } from '../api';

export async function createRide(ride: CreateCarpool) {
  const departureDate = new Date(ride.day);
  const departureTime = new Date(ride.time);
  console.log('time', departureTime);
  departureDate.setHours(departureTime.getHours());
  departureDate.setMinutes(departureTime.getMinutes());
  departureDate.setSeconds(departureTime.getSeconds());

  console.log({ departureTime });
  console.log({ departureDate });

  const { data } = await api.post('/carpool', {
    originCampusName: ride.originCampusName,
    destinationCampusName: ride.destinationCampusName,
    departureDate: departureDate,
    vehiclePlate: ride.vehiclePlate,
    availableSeats: ride.availableSeats,
  });

  console.log('data', data);
  console.log('DTIME RETURN', new Date(data.departure_date).toLocaleTimeString());
}
