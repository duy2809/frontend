import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { CurriedGetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';

const production = process.env.NODE_ENV === 'production';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
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
