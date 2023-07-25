import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import productReducer from './features/product/productSlice';
import paymentReducer from './features/payment/paymentSlice';
import brandReducer from './features/brand/brandSlice';
import categoryReducer from './features/category/categorySlice';

const production = process.env.NODE_ENV === 'production';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
  product: productReducer,
  payment: paymentReducer,
  brand: brandReducer,
  category: categoryReducer,
});

const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
  production ? getDefaultMiddleware() : getDefaultMiddleware().concat(logger);

export const store = configureStore({
  reducer: rootReducer,
  middleware,
  devTools: !production,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
