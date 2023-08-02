import { createAsyncThunk } from '@reduxjs/toolkit';
import { getReviewsByProductApi, postReviewApi } from 'app/api/review';
import { NewComment } from 'app/api/review';

export const getReviewsByProductThunk = createAsyncThunk(
  'reviews/product',
  async (id: number) => {
    const { data } = await getReviewsByProductApi(id);
    return data;
  },
);

export const postReviewThunk = createAsyncThunk(
  'reviews/post',
  async (param: NewComment) => {
    const { data } = await postReviewApi(param);
    return data;
  },
);
