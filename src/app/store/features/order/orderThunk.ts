import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi, getOrdersByUserApi, postOrderApi } from 'app/api/order';
import { NewOrder } from 'app/api/order';

export const getOrdersThunk = createAsyncThunk('orders', async () => {
  const { data } = await getOrdersApi();
  return data;
});

export const getOrdersByUserThunk = createAsyncThunk(
  'orders/user',
  async (id: number) => {
    const { data } = await getOrdersByUserApi(id);
    return data;
  },
);

export const postOrderThunk = createAsyncThunk(
  'orders/post',
  async (param: NewOrder) => {
    const { data } = await postOrderApi(param);
    if (param.payment_id === 1) window.location.href = '/order/result';
  },
);
