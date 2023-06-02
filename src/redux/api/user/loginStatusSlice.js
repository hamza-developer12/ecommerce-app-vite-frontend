import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const checkLogStatus = createAsyncThunk(
  "logStatus",
  async (data, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://ecommerce-app-backend-tau.vercel.app/api/users/login-status`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  loading: false,
  data: {},
  error: null,
};

const logStatusSlice = createSlice({
  name: "logStatus",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(checkLogStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkLogStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(checkLogStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logStatusSlice.reducer;
