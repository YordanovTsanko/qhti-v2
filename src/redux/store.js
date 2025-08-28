import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/auth/authSlice";

const isDev = process.env.REACT_APP_NODE === "DEV";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: isDev, 
});
