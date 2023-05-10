import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  getUsersApi,
  postUserApi,
  putUserApi,
  deleteUserApi,
} from 'app/api/user';
import { User, NewUser } from 'modals/User';

export const getUsersThunk = createAsyncThunk('users', async () => {
  const { data } = await getUsersApi();
  return data;
});

export const getUserThunk = createAsyncThunk('user', async (id: number) => {
  const { data } = await getUserApi(id);
  return data;
});

export const postUserThunk = createAsyncThunk(
  'user/post',
  async (param: NewUser) => {
    const { data } = await postUserApi(param);
    return data;
  },
);

export const putUserThunk = createAsyncThunk(
  'user/put',
  async (param: User) => {
    const { data } = await putUserApi(param);
    return data;
  },
);

export const deleteUserThunk = createAsyncThunk(
  'user/delete',
  async (id: number) => {
    await deleteUserApi(id);
    return id;
  },
);
