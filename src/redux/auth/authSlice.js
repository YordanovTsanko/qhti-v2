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

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    try {
      const authJson = localStorage.getItem("auth");
      const parsedAuth = authJson ? JSON.parse(authJson) : null;
      const refreshToken = parsedAuth?.refreshToken;

      if (refreshToken) {
        await api.post("auth/logout", null, { params: { refreshToken } });
      }

      localStorage.removeItem("auth");

      return true;
    } catch (error) {
      console.error(error);
      return rejectWithValue("Неуспешен изход");
    }
  }
);
// GET CURRENT USER
export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || "Неуспешно зареждане на потребителя"
      );
    }
  }
);

const initialState = {
  user: null,
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
        state.error = null;
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
      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.expiresIn = null;
        state.tokenType = null;
        state.isAuthenticated = false;
        state.status = "idle";
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.error = action.payload;
      })
      //get user
      .addCase(fetchCurrentUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = action.payload;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
