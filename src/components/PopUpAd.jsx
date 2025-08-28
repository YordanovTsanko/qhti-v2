import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PopUpAd = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const firstTimeout = setTimeout(() => setShow(true), 2000);

    const interval = setInterval(() => setShow(true), 8000);

    return () => {
      clearTimeout(firstTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed bottom-0 sm:bottom-5 sm:right-5 w-full sm:w-80 md:w-96 bg-white shadow-xl sm:rounded-lg p-4 z-50 flex flex-col"
        >
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setShow(false)}
              className="text-gray-500 hover:text-gray-800 font-bold"
            >
              X
            </button>
          </div>
          <div className="text-center">
            <img src="https://cdn1.efbet.com/efbet/landingpage/images/landing%20slider_Zlatka_Blago_756%D1%85396_eng.png" alt="yachts.bgad" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PopUpAd;
