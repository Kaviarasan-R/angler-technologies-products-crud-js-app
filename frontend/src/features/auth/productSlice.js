import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "../../services/productService";

const initialState = {
  loading: false,
  hasMore: false,
  error: null,
  message: "",
  productData: [],
};

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (productData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const user = state.auth.user;
      return await productService.getProduct(productData, user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // returns error message with the help of async thunkAPI
      // it can be used in extraReducers function by addCase.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "product/searchProduct",
  async (productData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const user = state.auth.user;
      return await productService.searchProduct(productData, user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // returns error message with the help of async thunkAPI
      // it can be used in extraReducers function by addCase.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const user = state.auth.user;
      return await productService.addProduct(productData, user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // returns error message with the help of async thunkAPI
      // it can be used in extraReducers function by addCase.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (productData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const user = state.auth.user;
      return await productService.updateProduct(productData, user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // returns error message with the help of async thunkAPI
      // it can be used in extraReducers function by addCase.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const user = state.auth.user;
      return await productService.deleteProduct(productData, user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      // returns error message with the help of async thunkAPI
      // it can be used in extraReducers function by addCase.
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.hasMore = false;
      state.error = null;
      state.productData = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = [...state.productData, ...action.payload];
        state.hasMore = action.payload.length > 0;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.productData = [...state.productData, ...action.payload];
        state.hasMore = action.payload.length > 0;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.message = "";
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Product added successfully";
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.message = "";
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.message = "";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.message = "Product added successfully";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.message = "";
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { reset } = productSlice.actions;
export default productSlice.reducer;
