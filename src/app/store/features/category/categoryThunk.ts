import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCategoriesApi } from 'app/api/category';

export const getCategoriesThunk = createAsyncThunk('categories', async () => {
  const { data } = await getCategoriesApi();
  return data;
});
