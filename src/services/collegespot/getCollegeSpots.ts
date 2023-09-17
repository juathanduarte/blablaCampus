import { api } from '../api';

export async function getCollegeSpots() {
  const { data } = await api.get('/collegeSpot');
  return data;
}
