import axios from 'axios';
import { BASE_URL } from 'constants/api';
import { getAccessToken } from 'utils/auth';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

api.interceptors.request.use((req) => {
  const token = getAccessToken();
  if (token) {
    req.headers = {
      ...req.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return req;
});

axios.interceptors.response.use(
  (res) => res,
  // Do something with response data or handle error
);
