import { CollegeSpot } from '../../types/CollegeSpot';
import { api } from '../api';

export async function getCollegeSpots(): Promise<CollegeSpot[]> {
  const { data } = await api.get('/collegeSpot');
  return data.data;
}
