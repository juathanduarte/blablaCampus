import { CollegeSpotSchema } from '../../schemas/collegeSpot';
import { api } from '../api';

export async function editCollegeSpot({
  collegeSpot,
  previousName,
}: {
  collegeSpot: CollegeSpotSchema;
  previousName: string;
}) {
  const { data } = await api.put('/collegeSpot', {
    ...collegeSpot,
    name: previousName,
    newName: collegeSpot.name,
  });

  return data;
}
