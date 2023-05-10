import { AxiosResponse } from 'axios';
import { User, NewUser } from 'modals/User';
import { api } from './axios';

export const getUsersApi = async (): Promise<AxiosResponse<User[]>> =>
  api.get('users');

export const postUserApi = async (
  param: NewUser,
): Promise<AxiosResponse<User>> => api.post('/users', param);

export const putUserApi = async (param: User): Promise<AxiosResponse<User>> =>
  api.put(`/users/${param.id}`, param);

export const deleteUserApi = async (id: number): Promise<AxiosResponse<void>> =>
  api.delete(`/users/${id}`);

export const getUserApi = async (id: number): Promise<AxiosResponse<User>> =>
  api.get(`/users/${id}`);
