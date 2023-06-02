import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const addProduct = createAsyncThunk(
  "newProduct",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://ecommerce-app-backend-tau.vercel.app/api/products/create`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  error: null,
  details: {},
  loading: false,
};
const addProductSlice = createSlice({
  name: "addProductSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default addProductSlice.reducer;
