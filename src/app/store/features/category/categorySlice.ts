import { createSlice } from '@reduxjs/toolkit';
import { Category } from 'modals/Category';
import { getCategoriesThunk } from './categoryThunk';

interface State {
  categories: {
    data: Category[];
    loading: boolean;
    error: boolean;
  };
}

const initialState: State = {
  categories: {
    data: [],
    loading: false,
    error: false,
  },
};

export const userSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCategories: (state) => {
      state.categories = initialState.categories;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategoriesThunk.pending, (state) => {
      state.categories.loading = true;
    });
    builder.addCase(getCategoriesThunk.rejected, (state) => {
      state.categories.loading = false;
      state.categories.error = true;
    });
    builder.addCase(getCategoriesThunk.fulfilled, (state, action) => {
      state.categories.loading = false;
      state.categories.data = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { resetCategories } = userSlice.actions;
