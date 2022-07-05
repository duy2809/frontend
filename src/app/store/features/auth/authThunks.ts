import { createAsyncThunk } from '@reduxjs/toolkit';
import { RoleCode } from 'constants/roles';
import { User } from 'modals/User';
import { getAccessToken, setAccessToken } from 'utils/auth';
import { loginApi, LoginParam } from 'app/api/apiAuth';

export const loginThunk = createAsyncThunk(
  'auth/login',
  async (param: LoginParam) => {
    // fake login
    const { data } = await loginApi(param);
    setAccessToken(data.access_token);
    window.location.href = '/';
  },
);

export const getUserThunk = createAsyncThunk('auth/getUser', async () => {
  // fake get user
  const token = getAccessToken() as string;
  const user: User = {
    id: 1,
    name: 'User',
    role: token.split('_')[0] as RoleCode,
  };
  await new Promise((res) => {
    setTimeout(() => {
      res(user);
    }, 1000);
  });
  return user;
});
