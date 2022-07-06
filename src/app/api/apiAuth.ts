import { AxiosResponse } from 'axios';
import { User } from 'modals/User';
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

export const getUserApi = async (token: string): Promise<AxiosResponse<User>> =>
  api.get('auth/getUser', {
    headers: { Authorization: token },
  });
