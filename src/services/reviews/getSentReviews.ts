import { Review } from '../../types/Review';
import { api } from '../api';

export async function getSentReviews(registration: string): Promise<Review[]> {
  const { data } = await api.get(`/review/user/${registration}/sent`);

  return data.data;
}
