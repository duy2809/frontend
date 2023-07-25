import { createSlice } from '@reduxjs/toolkit';
import { Product } from 'modals/Product';
import {
  getProductsThunk,
  getProductThunk,
  postProductThunk,
  putProductThunk,
  deleteProductThunk,
  getCrawlProductsThunk,
  getProductsByCategoryThunk,
} from './productThunk';

interface State {
  products: {
    data: Product[];
    loading: boolean;
    error: boolean;
  };
  productsByCategory: {
    data: Product[];
    loading: boolean;
    error: boolean;
  };
  product: {
    data: Product | null;
    loading: boolean;
    error: boolean;
  };
  postProduct: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
  putProduct: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
  deleteProduct: {
    loading: boolean;
    error: boolean;
    result: boolean;
  };
  crawlProducts: {
    data: Product[];
    loading: boolean;
    error: boolean;
  };
}

const initialState: State = {
  products: {
    data: [],
    loading: false,
    error: false,
  },
  productsByCategory: {
    data: [],
    loading: false,
    error: false,
  },
  crawlProducts: {
    data: [],
    loading: false,
    error: false,
  },
  product: {
    data: null,
    loading: false,
    error: false,
  },
  postProduct: {
    loading: false,
    error: false,
    result: false,
  },
  putProduct: {
    loading: false,
    error: false,
    result: false,
  },
  deleteProduct: {
    loading: false,
    error: false,
    result: false,
  },
};

export const userSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = initialState.product;
    },
    resetCrawlProducts: (state) => {
      state.crawlProducts = initialState.crawlProducts;
    },
    resetProductsByCategory: (state) => {
      state.productsByCategory = initialState.productsByCategory;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.pending, (state) => {
      state.products.loading = true;
    });
    builder.addCase(getProductsThunk.rejected, (state) => {
      state.products.loading = false;
      state.products.error = true;
    });
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.products.loading = false;
      state.products.data = action.payload;
    });
    builder.addCase(getProductsByCategoryThunk.pending, (state) => {
      state.productsByCategory.loading = true;
    });
    builder.addCase(getProductsByCategoryThunk.rejected, (state) => {
      state.productsByCategory.loading = false;
      state.productsByCategory.error = true;
    });
    builder.addCase(getProductsByCategoryThunk.fulfilled, (state, action) => {
      state.productsByCategory.loading = false;
      state.productsByCategory.data = action.payload;
    });
    builder.addCase(getProductThunk.pending, (state) => {
      state.product.loading = true;
    });
    builder.addCase(getProductThunk.rejected, (state) => {
      state.product.loading = false;
      state.product.error = true;
    });
    builder.addCase(getProductThunk.fulfilled, (state, action) => {
      state.product.loading = false;
      state.product.data = action.payload;
    });
    builder.addCase(postProductThunk.pending, (state) => {
      state.postProduct.loading = true;
    });
    builder.addCase(postProductThunk.rejected, (state) => {
      state.postProduct.loading = false;
      state.postProduct.error = true;
    });
    builder.addCase(postProductThunk.fulfilled, (state) => {
      state.postProduct.loading = false;
      state.postProduct.result = true;
      state.postProduct.error = false;
    });
    builder.addCase(putProductThunk.pending, (state) => {
      state.putProduct.loading = true;
    });
    builder.addCase(putProductThunk.rejected, (state) => {
      state.putProduct.loading = false;
      state.putProduct.error = true;
    });
    builder.addCase(putProductThunk.fulfilled, (state) => {
      state.putProduct.loading = false;
      state.putProduct.result = true;
      state.putProduct.error = false;
    });
    builder.addCase(deleteProductThunk.pending, (state) => {
      state.deleteProduct.loading = true;
    });
    builder.addCase(deleteProductThunk.rejected, (state) => {
      state.deleteProduct.loading = false;
      state.deleteProduct.error = true;
    });
    builder.addCase(deleteProductThunk.fulfilled, (state) => {
      state.deleteProduct.loading = false;
      state.deleteProduct.result = true;
      state.deleteProduct.error = false;
    });
    builder.addCase(getCrawlProductsThunk.pending, (state) => {
      state.crawlProducts.loading = true;
    });
    builder.addCase(getCrawlProductsThunk.rejected, (state) => {
      state.crawlProducts.loading = false;
      state.crawlProducts.error = true;
    });
    builder.addCase(getCrawlProductsThunk.fulfilled, (state, action) => {
      state.crawlProducts.loading = false;
      state.crawlProducts.data = action.payload;
    });
  },
});

export default userSlice.reducer;
export const { resetProduct, resetCrawlProducts, resetProductsByCategory } =
  userSlice.actions;
