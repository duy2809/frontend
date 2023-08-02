import { AxiosResponse } from 'axios';
import { Review } from 'modals/Review';
import { api } from './axios';

export type NewComment = {
  product_id: number;
  user_id: number;
  content: string;
  star: number;
};

export const getReviewsByProductApi = async (
  id: number,
): Promise<AxiosResponse<Review[]>> => api.get(`/reviews/product/${id}`);

export const postReviewApi = async (
  param: NewComment,
): Promise<AxiosResponse<Review>> => api.post('/reviews', param);
