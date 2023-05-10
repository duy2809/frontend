import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken } from 'utils/auth';
import {
  getUserApi,
  loginApi,
  LoginParam,
  postMailApi,
  MailParam,
  ResetPasswordParam,
  postResetPasswordApi,
  signupApi,
} from 'app/api/auth';
import { NewUser } from 'modals/User';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (param: LoginParam) => {
    const { data } = await loginApi(param);
    setAccessToken(data.access_token);
    window.location.href = '/';
  },
);

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (param: NewUser) => {
    await signupApi(param);
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

export const postResetPasswordThunk = createAsyncThunk(
  'users/reset-password',
  async (param: ResetPasswordParam) => {
    await postResetPasswordApi(param);
    window.location.href = '/';
  },
);
