import { AxiosResponse } from 'axios';
import { Order } from 'modals/Order';
import { api } from './axios';

type ProductInCart = {
  product_id: number;
  quantity: number;
};

export type NewOrder = {
  user_id: number;
  payment_id: number;
  products: ProductInCart[];
};

export const getOrdersApi = async (): Promise<AxiosResponse<Order[]>> =>
  api.get('/orders');

export const getOrdersByUserApi = async (
  id: number,
): Promise<AxiosResponse<Order[]>> => api.get(`/orders/user/${id}`);

export const postOrderApi = async (
  param: NewOrder,
): Promise<AxiosResponse<Order>> => api.post('/orders', param);
