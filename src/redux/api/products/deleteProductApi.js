import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const deleteProduct = createAsyncThunk(
  "singleProduct",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(
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
  details: {},
  error: null,
  loading: false,
};

const deleteProductSlice = createSlice({
  name: "singleProductSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.details = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default deleteProductSlice.reducer;
