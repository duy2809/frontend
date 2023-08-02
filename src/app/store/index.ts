import { combineReducers, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import userReducer from './features/user/userSlice';
import productReducer from './features/product/productSlice';
import paymentReducer from './features/payment/paymentSlice';
import brandReducer from './features/brand/brandSlice';
import categoryReducer from './features/category/categorySlice';
import orderReducer from './features/order/orderSlice';
import reviewReducer from './features/review/reviewSlice';

import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const production = process.env.NODE_ENV === 'production';

const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer,
  user: userReducer,
  product: productReducer,
  payment: paymentReducer,
  brand: brandReducer,
  category: categoryReducer,
  order: orderReducer,
  review: reviewReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const middleware = (getDefaultMiddleware: CurriedGetDefaultMiddleware) =>
//   production ? getDefaultMiddleware() : getDefaultMiddleware().concat(logger);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(logger),
  devTools: !production,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
