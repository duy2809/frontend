import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from 'modals/Product';

export interface CartItem extends Product {
  quantityInCart: number;
}

interface State {
  cart: CartItem[];
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
        itemInCart.quantityInCart += 1;
      } else {
        state.cart.push({
          ...action.payload,
          quantityInCart: 1,
        });
      }
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart) itemInCart.quantityInCart += 1;
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const itemInCart = state.cart.find((item) => item.id === action.payload);
      if (itemInCart) {
        if (itemInCart.quantityInCart === 1) {
          itemInCart.quantityInCart = 1;
        } else {
          itemInCart.quantityInCart -= 1;
        }
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const removeItem = state.cart.filter(
        (item) => item.id !== action.payload,
      );
      state.cart = removeItem;
    },
    removeAllItem: (state) => {
      state.cart = [];
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  removeAllItem,
} = cartSlice.actions;
