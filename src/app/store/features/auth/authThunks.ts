import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken } from 'utils/auth';
import {
  getUserApi,
  loginApi,
  LoginParam,
  postMailApi,
  MailParam,
} from 'app/api/apiAuth';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (param: LoginParam) => {
    const { data } = await loginApi(param);
    setAccessToken(data.access_token);
    window.location.href = '/';
  },
);

export const getUserThunk = createAsyncThunk('auth/getUser', async () => {
  const { data } = await getUserApi();
  return data;
});

export const postMailThunk = createAsyncThunk(
  'auth/forgot-password',
  async (param: MailParam) => {
    await postMailApi(param);
  },
);
