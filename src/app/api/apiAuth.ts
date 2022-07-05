import { AxiosResponse } from 'axios';
import { api } from './axios';

export interface LoginParam {
  email: string;
  password: string;
}

interface LoginRespone {
  access_token: string;
}

export const loginApi = async (
  param: LoginParam,
): Promise<AxiosResponse<LoginRespone>> => api.post('/auth/login', param);
