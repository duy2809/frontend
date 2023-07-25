import { AxiosResponse } from 'axios';
import { api } from './axios';

export type PaymentParam = {
  amount: number;
};

export const postPaymentApi = async (
  param: PaymentParam,
): Promise<AxiosResponse<string>> =>
  api.post('/payments/create-payment-url', param);
