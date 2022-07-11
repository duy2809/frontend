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

export interface MailParam {
  email: string;
}

export const loginApi = async (
  param: LoginParam,
): Promise<AxiosResponse<LoginRespone>> => api.post('/auth/login', param);

export const getUserApi = async (): Promise<AxiosResponse<User>> =>
  api.get('auth/getUser');

export const postMailApi = async (
  param: MailParam,
): Promise<AxiosResponse<void>> => api.post('/mail/reset-password', param);
