import { createSlice } from '@reduxjs/toolkit';
import { Order } from 'modals/Order';
import {
  getOrdersThunk,
  getOrdersByUserThunk,
  postOrderThunk,
} from './orderThunk';

interface State {
  orders: {
    data: Order[];
    loading: boolean;
    error: boolean;
  };
  ordersByUser: {
    data: Order[];
    loading: boolean;
    error: boolean;
  };
  postOrder: {
    data: Order;
    loading: boolean;
    error: boolean;
  };
}

const initialState: State = {
  orders: {
    data: [],
    loading: false,
    error: false,
  },
  ordersByUser: {
    data: [],
    loading: false,
    error: false,
  },
  postOrder: {
    data: {} as Order,
    loading: false,
    error: false,
  },
};

export const userSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrders: (state) => {
      state.orders = initialState.orders;
    },
    resetOrdersByUser: (state) => {
      state.ordersByUser = initialState.ordersByUser;
    },
    resetPostOrder: (state) => {
      state.postOrder = initialState.postOrder;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersThunk.pending, (state) => {
      state.orders.loading = true;
    });
    builder.addCase(getOrdersThunk.rejected, (state) => {
      state.orders.loading = false;
      state.orders.error = true;
    });
    builder.addCase(getOrdersThunk.fulfilled, (state, action) => {
      state.orders.loading = false;
      state.orders.data = action.payload;
    });
    builder.addCase(getOrdersByUserThunk.pending, (state) => {
      state.ordersByUser.loading = true;
    });
    builder.addCase(getOrdersByUserThunk.rejected, (state) => {
      state.ordersByUser.loading = false;
      state.ordersByUser.error = true;
    });
    builder.addCase(getOrdersByUserThunk.fulfilled, (state, action) => {
      state.ordersByUser.loading = false;
      state.ordersByUser.data = action.payload;
    });
    builder.addCase(postOrderThunk.pending, (state) => {
      state.postOrder.loading = true;
    });
    builder.addCase(postOrderThunk.rejected, (state) => {
      state.postOrder.loading = false;
      state.postOrder.error = true;
    });
    builder.addCase(postOrderThunk.fulfilled, (state, action) => {
      state.postOrder.loading = false;
      state.postOrder.error = false;
      state.postOrder.data = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { resetOrders, resetOrdersByUser, resetPostOrder } =
  userSlice.actions;
