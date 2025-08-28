import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Toast = ({ message, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-x-0 top-5 flex justify-center z-50 pointer-events-none">
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.35, type: "spring" }}
            className="pointer-events-auto bg-white text-blue-800 px-4 min-w-[300px] md:min-w-[500px] py-4 rounded-lg shadow-lg"
          >
            <div className="flex items-center justify-between gap-3">
              <span>{message}</span>
              <button
                onClick={onClose}
                className="text-sm text-blue-800 hover:text-cyan-600 transition duration-300"
              >
                ✕
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
