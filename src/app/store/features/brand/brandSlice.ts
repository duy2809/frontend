import { createSlice } from '@reduxjs/toolkit';
import { Brand } from 'modals/Brand';
import { getBrandsThunk, getBrandsByCategoryThunk } from './brandThunk';

interface State {
  brands: {
    data: Brand[];
    loading: boolean;
    error: boolean;
  };
  brandsByCategory: {
    data: Brand[];
    loading: boolean;
    error: boolean;
  };
}

const initialState: State = {
  brands: {
    data: [],
    loading: false,
    error: false,
  },
  brandsByCategory: {
    data: [],
    loading: false,
    error: false,
  },
};

export const userSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    resetBrands: (state) => {
      state.brands = initialState.brands;
    },
    resetBrandsByCategory: (state) => {
      state.brandsByCategory = initialState.brandsByCategory;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getBrandsThunk.pending, (state) => {
      state.brands.loading = true;
    });
    builder.addCase(getBrandsThunk.rejected, (state) => {
      state.brands.loading = false;
      state.brands.error = true;
    });
    builder.addCase(getBrandsThunk.fulfilled, (state, action) => {
      state.brands.loading = false;
      state.brands.data = action.payload;
    });
    builder.addCase(getBrandsByCategoryThunk.pending, (state) => {
      state.brandsByCategory.loading = true;
    });
    builder.addCase(getBrandsByCategoryThunk.rejected, (state) => {
      state.brandsByCategory.loading = false;
      state.brandsByCategory.error = true;
    });
    builder.addCase(getBrandsByCategoryThunk.fulfilled, (state, action) => {
      state.brandsByCategory.loading = false;
      state.brandsByCategory.data = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { resetBrands, resetBrandsByCategory } = userSlice.actions;
