import React, { createContext, useContext } from "react";
import Toast from "./Toast";
import { useToast } from "./useToast";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const { toast, showToast, hideToast } = useToast();

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

export const useToastContext = () => useContext(ToastContext);
