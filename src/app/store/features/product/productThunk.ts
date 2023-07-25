import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getProductApi,
  getProductsApi,
  postProductApi,
  putProductApi,
  deleteProductApi,
  getCrawlProductsApi,
  getProductsByCategoryApi,
} from 'app/api/product';
import { Product, NewProduct } from 'modals/Product';

export const getProductsThunk = createAsyncThunk('products', async () => {
  const { data } = await getProductsApi();
  return data;
});

export const getCrawlProductsThunk = createAsyncThunk(
  'products/crawl',
  async (source: string) => {
    const { data } = await getCrawlProductsApi(source);
    return data;
  },
);

export const getProductThunk = createAsyncThunk(
  'product',
  async (id: number) => {
    const { data } = await getProductApi(id);
    return data;
  },
);

export const getProductsByCategoryThunk = createAsyncThunk(
  'products/category',
  async (id: number) => {
    const { data } = await getProductsByCategoryApi(id);
    return data;
  },
);

export const postProductThunk = createAsyncThunk(
  'product/post',
  async (param: NewProduct) => {
    const { data } = await postProductApi(param);
    return data;
  },
);

export const putProductThunk = createAsyncThunk(
  'product/put',
  async (param: Product) => {
    const { data } = await putProductApi(param);
    return data;
  },
);

export const deleteProductThunk = createAsyncThunk(
  'product/delete',
  async (id: number) => {
    await deleteProductApi(id);
    return id;
  },
);
