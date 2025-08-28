import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axiosConfigs";

// REGISTER
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
      return rejectWithValue(
        error?.response?.data?.message || "Възникна грешка."
      );
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post("auth/login", { email, password });

      // Save tokens in localStorage
      localStorage.setItem("auth", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Възникна грешка."
      );
    }
  }
);

// REFRESH TOKEN
export const refreshToken = createAsyncThunk(
  "auth/refreshToken",
  async (_, { getState, rejectWithValue }) => {
    try {
      const refreshToken =
        getState().auth.refreshToken ||
        JSON.parse(localStorage.getItem("auth"))?.refreshToken;
      const response = await api.post("auth/refresh", null, {
        params: { refreshToken },
      });

      // update localStorage
      localStorage.setItem("auth", JSON.stringify(response.data));

      return response.data;
    } catch (error) {
      return rejectWithValue("Сесията е изтекла. Влезте отново.");
    }
  }
);

const initialState = {
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  tokenType: null,
  status: "idle",
  error: null,
  isAuthenticated: false,
};

// Hydrate from localStorage
const savedAuth = localStorage.getItem("auth");
if (savedAuth) {
  const parsed = JSON.parse(savedAuth);
  initialState.accessToken = parsed.accessToken;
  initialState.refreshToken = parsed.refreshToken;
  initialState.expiresIn = parsed.expiresIn;
  initialState.tokenType = parsed.tokenType;
  initialState.isAuthenticated = true;
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
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

      // login
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.expiresIn = action.payload.expiresIn;
        state.tokenType = action.payload.tokenType;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // refresh
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.expiresIn = action.payload.expiresIn;
        state.tokenType = action.payload.tokenType;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
