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

export interface ResetPasswordParam {
  token: string | null;
  new_password: string;
}

export const loginApi = async (
  param: LoginParam,
): Promise<AxiosResponse<LoginRespone>> => api.post('/auth/login', param);

export const getUserApi = async (): Promise<AxiosResponse<User>> =>
  api.get('auth/getUser');

export const postMailApi = async (
  param: MailParam,
): Promise<AxiosResponse<void>> => api.post('/mail/reset-password', param);

export const postResetPasswordApi = async (
  param: ResetPasswordParam,
): Promise<AxiosResponse<void>> => api.post('/users/reset-password', param);
