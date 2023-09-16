import { CollegeSpotSchema } from '../../schemas/collegeSpot';
import { api } from '../api';

export async function createCollegeSpot(collegeSpot: CollegeSpotSchema) {
  const { data } = await api.post('/collegeSpot', collegeSpot);
  return data;
}

export async function isNameAvailable(name: string): Promise<{ exists: boolean }> {
  const { data } = await api.post('/collegeSpot/is-name-available', { name });
  return { exists: Boolean(data?.exists) };
}
