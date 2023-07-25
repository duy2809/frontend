import { createAsyncThunk } from '@reduxjs/toolkit';
import { getBrandsApi, getBrandsByCategoryApi } from 'app/api/brand';

export const getBrandsThunk = createAsyncThunk('brands', async () => {
  const { data } = await getBrandsApi();
  return data;
});

export const getBrandsByCategoryThunk = createAsyncThunk(
  'brands/category',
  async (id: number) => {
    const { data } = await getBrandsByCategoryApi(id);
    return data;
  },
);
