import { Review } from '../../types/Review';
import { api } from '../api';

export async function getReceivedReviews(registration: string): Promise<Review[]> {
  const { data } = await api.get(`/review/user/${registration}/received`);

  return data.data;
}
