import { api } from '../api';

interface CreateReviewProps {
  reviewedRegistration: string;
  carpoolDepartureDate: string;
  carpoolDriverRegistration: string;
  rating: number;
  comment: string;
}

export async function createReview(review: CreateReviewProps) {
  // console.log(review);
  await api.post('/review', review);
}
