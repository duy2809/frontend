import { createSlice } from '@reduxjs/toolkit';
import { postPaymentThunk } from './paymentThunk';

interface State {
  url: {
    data: string;
    loading: boolean;
    error: boolean;
  };
}

const initialState: State = {
  url: {
    data: '',
    loading: false,
    error: false,
  },
};

export const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    resetUrl: (state) => {
      state.url = initialState.url;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postPaymentThunk.pending, (state) => {
      state.url.loading = true;
    });
    builder.addCase(postPaymentThunk.rejected, (state) => {
      state.url.loading = false;
      state.url.error = true;
    });
  },
});

export default paymentSlice.reducer;
export const { resetUrl } = paymentSlice.actions;
