import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfigs";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/register", {
        firstName,
        lastName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(
       error?.response?.data?.message || "Възникна грешка."
      );
    }
  }
);
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      
      return rejectWithValue(
       error?.response?.data?.message || "Възникна грешка."
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    status: "idle",
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
    //POST - register 
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
    //POST - login 
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
