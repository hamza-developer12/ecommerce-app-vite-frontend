import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_URL;
export const userLogin = createAsyncThunk(
  "userLogin",
  async (data, thunkAPI) => {
    try {
      const response = await axios.post(
        `https://ecommerce-app-backend-tau.vercel.app/api/users/login`,
        {
          email: data.email,
          password: data.password,
        }
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
const initialState = {
  error: null,
  logInfo: {},
  loading: false,
};
const userLoginSlice = createSlice({
  name: "loginSlice",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.logInfo = action.payload;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userLoginSlice.reducer;
