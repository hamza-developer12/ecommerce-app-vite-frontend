import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const fetchByCategory = createAsyncThunk(
  "categoryWise",
  async (catName, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://ecommerce-app-backend-tau.vercel.app/api/categories/category/${catName}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  error: null,
  loading: false,
  products: {},
};
const categorySlice = createSlice({
  name: "productsByCategory",
  initialState,

  extraReducers: (builder) => {
    builder
      .addCase(fetchByCategory.pending, (state) => {})
      .addCase(fetchByCategory.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(fetchByCategory.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default categorySlice.reducer;
