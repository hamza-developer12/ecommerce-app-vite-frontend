import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const registerUser = createAsyncThunk(
  "userRegistration",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://ecommerce-app-backend-tau.vercel.app/api/users/register`,
        {
          name: data.name,
          email: data.email,
          password: data.password,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);

const initialState = {
  error: null,
  data: {},
  loading: false,
};
const registerSlice = createSlice({
  name: "registerUser",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default registerSlice.reducer;
