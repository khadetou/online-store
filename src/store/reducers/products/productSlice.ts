import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsService from "store/actions/products";

interface ProductState {
  products: any;
  product: any;
  page: number;
  pages: number;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  message: string;
}

const initialState: ProductState = {
  products: [],
  product: null,
  page: 0,
  pages: 0,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// CREATE PRODUCTS
export const createProducts = createAsyncThunk(
  "products/create",
  async (productsData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productsService.createProducts(productsData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue({ message });
    }
  }
);

// GET ALL PRODUCTS
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (data: any, thunkAPI: any) => {
    try {
      return await productsService.getAllProducts(
        data.req,
        data.keyword,
        data.pageNumber
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// GET PRODUCT BY
export const getProductById = createAsyncThunk(
  "product/getById",
  async (id: string, thunkAPI: any) => {
    try {
      return await productsService.getProductById(id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// DELETE PRODUCT
export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (id: string, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productsService.deleteProduct(id, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

// UPDATE PRODUCTS
export const updateProduct = createAsyncThunk(
  "product/update",
  async (productsData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      const { id } = productsData.id;
      return await productsService.updateProduct(productsData.Data, token, id);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
// CREATE REVIEWS
export const createReviews = createAsyncThunk(
  "create/review",
  async (productsData: any, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await productsService.createReview(
        productsData.id,
        productsData.data,
        token
      );
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    reset: (state: ProductState) => initialState,
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(createProducts.pending, (state: ProductState) => {
        state.isLoading = true;
      })
      .addCase(createProducts.fulfilled, (state: ProductState, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products.push(action.payload);
      })
      .addCase(createProducts.rejected, (state: ProductState, action: any) => {
        (state.isLoading = false),
          (state.isError = true),
          (state.message = action.payload);
      })
      .addCase(getAllProducts.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
        state.products = action.payload.products;
      })
      .addCase(getAllProducts.rejected, (state: any, action: any) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getProductById.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(getProductById.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(getProductById.rejected, (state: any, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(updateProduct.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state: any, action: any) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.product = action.payload;
      })
      .addCase(updateProduct.rejected, (state: any, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(deleteProduct.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = state.products.filter(
          (product: any) => product._id !== action.payload.id
        );
      })
      .addCase(createReviews.rejected, (state: any, action: any) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload;
      })
      .addCase(createReviews.pending, (state: any) => {
        state.isLoading = true;
      })
      .addCase(createReviews.fulfilled, (state: any, action: any) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.product = action.payload;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
