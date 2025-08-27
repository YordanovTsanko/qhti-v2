import React from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock } from "react-icons/fa";

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const LoginForm = ({ switchForm }) => {
  return (
    <motion.form
      key="login"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-4"
    >
      <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
        Вход
      </h2>
      <div className="flex items-center border rounded-lg px-3 py-2">
        <FaEnvelope className="text-gray-400 mr-2" />
        <input
          type="email"
          placeholder="Имейл"
          className="w-full outline-none"
        />
      </div>
      <div className="flex items-center border rounded-lg px-3 py-2">
        <FaLock className="text-gray-400 mr-2" />
        <input
          type="password"
          placeholder="Парола"
          className="w-full outline-none"
        />
      </div>
      <button className="bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition">
        Вход
      </button>
      <p className="text-sm text-gray-600 text-center mt-2">
        Нямате акаунт?{" "}
        <span
          className="text-cyan-600 cursor-pointer hover:underline"
          onClick={() => switchForm(false)}
        >
          Регистрация
        </span>
      </p>
    </motion.form>
  );
};

export default LoginForm;
