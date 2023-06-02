import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const fetchProducts = createAsyncThunk(
  "allProducts",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://ecommerce-app-backend-tau.vercel.app/api/products/`
      );

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.msg);
    }
  }
);

const initialState = {
  error: null,
  products: {},
  loading: false,
};
const getAllProductsSlice = createSlice({
  name: "allProducts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default getAllProductsSlice.reducer;
