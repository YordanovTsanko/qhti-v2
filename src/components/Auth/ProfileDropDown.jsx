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

const links = [
  { label: "Обяви", path: "/" },
  { label: "Любими", path: "/favorites" },
  { label: "Моят Профил", path: "/profile" },
  { label: "Настройки", path: "/settings" },
  { label: "Моят Бележник", path: "/notes" },
  { label: "Изход", path: "/logout", isLogout: true },
];

const ProfileDropDown = ({ isOpen }) => {
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
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`transition ${
                link.isLogout
                  ? "text-red-600 hover:text-red-700"
                  : "text-blue-800 hover:text-cyan-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileDropDown;
