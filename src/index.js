import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastProvider } from "./components/Toast/ToastProvider";
import AuthProvider from "./components/Auth/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

const AppWrapper = (
  <Provider store={store}>
    <ToastProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
  </Provider>
);

if (process.env.REACT_APP_NODE === "DEV") {
  root.render(<React.StrictMode>{AppWrapper}</React.StrictMode>);
} else {
  root.render(AppWrapper);
}
