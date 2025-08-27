import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";

const formVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, x: -50, transition: { duration: 0.3 } },
};

const RegisterForm = ({ switchForm, userType, setUserType }) => {
  return (
    <motion.form
      key="register"
      variants={formVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col gap-4"
    >
      <h2 className="text-3xl font-bold text-center text-cyan-600 mb-6">
        Регистрация
      </h2>
      <div className="flex items-center border rounded-lg px-3 py-2">
        <FaUser className="text-gray-400 mr-2" />
        <input type="text" placeholder="Име" className="w-full outline-none" />
      </div>
      <div className="flex items-center border rounded-lg px-3 py-2">
        <FaEnvelope className="text-gray-400 mr-2" />
        <input type="email" placeholder="Имейл" className="w-full outline-none" />
      </div>
      <div className="flex items-center border rounded-lg px-3 py-2">
        <FaLock className="text-gray-400 mr-2" />
        <input type="password" placeholder="Парола" className="w-full outline-none" />
      </div>

      <div className="flex gap-4 mt-2">
        <button
          type="button"
          onClick={() => setUserType("person")}
          className={`flex-1 py-2 rounded-lg border ${
            userType === "person" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Частно лице
        </button>
        <button
          type="button"
          onClick={() => setUserType("company")}
          className={`flex-1 py-2 rounded-lg border ${
            userType === "company" ? "bg-cyan-600 text-white" : "bg-gray-100 text-gray-700"
          }`}
        >
          Фирма
        </button>
      </div>

      {userType === "company" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center border rounded-lg px-3 py-2"
        >
          <FaUser className="text-gray-400 mr-2" />
          <input type="text" placeholder="Име на фирма" className="w-full outline-none" />
        </motion.div>
      )}

      <button className="bg-cyan-600 text-white py-2 rounded-lg font-semibold hover:bg-cyan-700 transition">
        Регистрация
      </button>
      <p className="text-sm text-gray-600 text-center mt-2">
        Вече имате акаунт?{" "}
        <span
          className="text-cyan-600 cursor-pointer hover:underline"
          onClick={() => switchForm(true)}
        >
          Вход
        </span>
      </p>
    </motion.form>
  );
};

export default RegisterForm;
