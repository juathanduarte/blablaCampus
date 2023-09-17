import { api } from '../api';

export async function deleteCollegeSpot(name: string) {
  const response = await api.delete(`/collegeSpot`, {
    data: {
      name: name,
    },
  });

  return response.data;
}
