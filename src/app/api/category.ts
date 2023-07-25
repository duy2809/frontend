import { AxiosResponse } from 'axios';
import { Category } from 'modals/Category';
import { api } from './axios';

export const getCategoriesApi = async (): Promise<AxiosResponse<Category[]>> =>
  api.get('/categories');
