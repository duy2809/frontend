import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'utils/data';

export interface ItemCart {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
}

interface State {
  cart: ItemCart[];
}

const initialState: State = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id,
      );
      if (itemInCart) {
        itemInCart.quantity += 1;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart) itemInCart.quantity += 1;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart) {
        if (itemInCart.quantity === 1) {
          itemInCart.quantity = 1;
        } else {
          itemInCart.quantity -= 1;
        }
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload,
      );
      state.cart = removeItem;
    },
  },
});

export default cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
