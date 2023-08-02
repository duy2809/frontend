import { AxiosResponse } from 'axios';
import { Product, NewProduct } from 'modals/Product';
import { api } from './axios';

export type Query = {
  id: number;
  page?: string;
  orderBy?: string;
  sortBy?: string;
  brand?: string;
};

export const getProductsApi = async (): Promise<AxiosResponse<Product[]>> =>
  api.get('/products');

export const postProductApi = async (
  param: NewProduct,
): Promise<AxiosResponse<Product>> => api.post('/products', param);

export const getProductApi = async (
  id: number,
): Promise<AxiosResponse<Product>> => api.get(`/products/${id}`);

export const getProductsByCategoryApi = async (
  param: Query,
): Promise<AxiosResponse<Product[]>> => {
  const { id, page, orderBy, sortBy, brand } = param;
  return api.get(`/products/category/${id}`, {
    params: {
      page,
      orderBy,
      sortBy,
      brand,
    },
  });
};

export const putProductApi = async (
  param: Product,
): Promise<AxiosResponse<Product>> => api.put(`/products/${param.id}`, param);

export const deleteProductApi = async (
  id: number,
): Promise<AxiosResponse<void>> => api.delete(`/products/${id}`);

export const getCrawlProductsApi = async (
  source: string,
): Promise<AxiosResponse<Product[]>> => api.get(`/products/crawl/${source}`);
