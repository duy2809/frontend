import { AxiosResponse } from 'axios';
import { Brand } from 'modals/Brand';
import { api } from './axios';

export const getBrandsApi = async (): Promise<AxiosResponse<Brand[]>> =>
  api.get('/brands');

export const getBrandsByCategoryApi = async (
  id: number,
): Promise<AxiosResponse<Brand[]>> => api.get(`/brands/category/${id}`);
