import { useState, useCallback } from "react";

export const useToast = () => {
  const [toast, setToast] = useState({ message: "", isVisible: false });

  const showToast = useCallback((message, duration = 9000) => {
    setToast({ message, isVisible: true });
    setTimeout(() => {
      setToast({ message: "", isVisible: false });
    }, duration);
  }, []);

  return { toast, showToast, hideToast: () => setToast({ message: "", isVisible: false }) };
};
