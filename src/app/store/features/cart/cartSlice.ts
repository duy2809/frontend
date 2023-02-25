import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from 'utils/data';

export interface CartItem {
  id: number;
  images: string[];
  name: string;
  price: number;
  quantity: number;
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
    addToCart: (state, action: PayloadAction<IProduct>) => {
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
  },
});

export default cartSlice.reducer;
export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
