import { createAsyncThunk } from '@reduxjs/toolkit';
import { setAccessToken, getAccessToken } from 'utils/auth';
import { getUserApi, loginApi, LoginParam } from 'app/api/apiAuth';

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
