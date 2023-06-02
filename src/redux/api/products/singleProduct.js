import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchSingleProduct = createAsyncThunk(
  "singleProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://ecommerce-app-backend-tau.vercel.app/api/products/product/${productId}`
      );
      return response.data;
    } catch (error) {
      console.log(error.response.data.msg);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  product: {},
  error: null,
  loading: false,
};

const singleProductSlice = createSlice({
  name: "singleProductSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.product = action.payload;
      })
      .addCase(fetchSingleProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default singleProductSlice.reducer;
