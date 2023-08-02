import { createSlice } from '@reduxjs/toolkit';
import { Review } from 'modals/Review';
import { getReviewsByProductThunk, postReviewThunk } from './reviewThunk';

interface State {
  reviewsByProduct: {
    data: Review[];
    loading: boolean;
    error: boolean;
  };
  postReview: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
}

const initialState: State = {
  reviewsByProduct: {
    data: [],
    loading: false,
    error: false,
  },
  postReview: {
    loading: false,
    error: false,
    result: false,
  },
};

export const userSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    resetReviewsByProduct: (state) => {
      state.reviewsByProduct = initialState.reviewsByProduct;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReviewsByProductThunk.pending, (state) => {
      state.reviewsByProduct.loading = true;
    });
    builder.addCase(getReviewsByProductThunk.rejected, (state) => {
      state.reviewsByProduct.loading = false;
      state.reviewsByProduct.error = true;
    });
    builder.addCase(getReviewsByProductThunk.fulfilled, (state, action) => {
      state.reviewsByProduct.loading = false;
      state.reviewsByProduct.data = action.payload;
    });
    builder.addCase(postReviewThunk.pending, (state) => {
      state.postReview.loading = true;
    });
    builder.addCase(postReviewThunk.rejected, (state) => {
      state.postReview.loading = false;
      state.postReview.error = true;
    });
    builder.addCase(postReviewThunk.fulfilled, (state) => {
      state.postReview.loading = false;
      state.postReview.result = true;
      state.postReview.error = false;
    });
  },
});

export default userSlice.reducer;
export const { resetReviewsByProduct } = userSlice.actions;
