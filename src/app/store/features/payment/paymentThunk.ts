import { createAsyncThunk } from '@reduxjs/toolkit';
import { postPaymentApi } from 'app/api/payment';
import { PaymentParam } from 'app/api/payment';

export const postPaymentThunk = createAsyncThunk(
  'product/post',
  async (param: PaymentParam) => {
    const { data } = await postPaymentApi(param);
    window.location.href = data;
  },
);
