import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const dropdownVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -10, scale: 0.95, transition: { duration: 0.2 } },
};

const AuthDropDown = ({ isOpen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className=" w-[200px] bg-white shadow-lg p-4 rounded-lg flex flex-col gap-2 z-50"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Link
            to="/auth/login"
            className="text-blue-800 hover:text-cyan-600 transition"
          >
            Вход
          </Link>
          <Link
            to="/auth/register"
            className="text-blue-800 hover:text-cyan-600 transition"
          >
            Регистрация
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthDropDown;
