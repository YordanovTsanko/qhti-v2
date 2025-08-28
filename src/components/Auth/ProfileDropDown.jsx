import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/auth/authSlice";
import { useToastContext } from "../Toast/ToastProvider";

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

const links = [
  { label: "Моят Профил", path: "/profile" },
  { label: "Обяви", path: "/" },
  { label: "Любими", path: "/favorites" },
  { label: "Настройки", path: "/settings" },
  { label: "Моят Бележник", path: "/notes" },
  { label: "Изход", path: "/logout", isLogout: true },
];

const ProfileDropDown = ({ isOpen, closeDropdown }) => {
  const dispatch = useDispatch();
  const { showToast } = useToastContext();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      closeDropdown?.();
      showToast("✅ Успешен изход!");
    } catch (err) {
      showToast("❌ Грешка при изход!");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-[200px] bg-white shadow-lg p-4 rounded-lg flex flex-col gap-2 z-50"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {links.map((link) =>
            link.isLogout ? (
              <button
                key={link.label}
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700 text-left w-full transition"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.label}
                to={link.path}
                className="text-blue-800 hover:text-cyan-600 transition"
                onClick={() => closeDropdown?.()}
              >
                {link.label}
              </Link>
            )
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropDown;
