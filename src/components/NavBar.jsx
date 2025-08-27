import React, { useState, useRef, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AuthDropDown from "./Auth/AuthDropDown";
import { RiMenu2Fill, RiApps2AddLine, RiCloseLine } from "react-icons/ri";

const NavBar = () => {
  const [authModal, setAuthModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const navStyle =
    location.pathname === "/auth" ||
    location.pathname.startsWith("/auth/") ||
    location.pathname === "/";

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setAuthModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const mobileMenuVariants = {
    hidden: {
      x: "-100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      x: "-100%",
      opacity: 0,
      transition: {
        type: "tween",
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const menuItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: (i) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
  };

  return (
    <>
      <div
        className={`w-full mx-auto py-4 px-4 xl:px-0 relative z-50 ${
          !navStyle && "bg-blue-800"
        }`}
      >
        <div className="max-w-[1280px] flex justify-between items-center mx-auto">
          {/* Mobile Menu Button */}
          <RiMenu2Fill
            className="text-white text-2xl cursor-pointer md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            <img src="/white-logo.png" alt="logo" className="w-44 h-auto" />
            <div className="flex items-center gap-7">
              <Link to="/" className="text-white hover:text-gray-300 text-md">
                Начало
              </Link>
              <Link
                to="/ads"
                className="text-white hover:text-gray-300 text-md"
              >
                Услуги
              </Link>
              <Link
                to="/ads"
                className="text-white hover:text-gray-300 text-md"
              >
                Блог
              </Link>
            </div>
          </div>

          {/* Mobile Logo - Centered */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <img src="/white-logo.png" alt="logo" className="w-32 h-auto" />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <FaRegHeart className="text-white text-2xl cursor-pointer hidden sm:block" />
            <div
              ref={profileRef}
              onClick={() => setAuthModal((prev) => !prev)}
              className=" items-end cursor-pointer hidden sm:flex"
            >
              <IoPersonSharp className="text-white text-2xl" />
              <IoMdArrowDropdown className="text-white text-md" />
            </div>
            <RiApps2AddLine className="text-white text-2xl cursor-pointer md:hidden" />
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-white hidden md:block py-2 px-4 rounded-md border border-white text-blue-800 hover:bg-blue-800 hover:text-white transition duration-500"
            >
              Добавяне на обява
            </button>
          </div>

          {/* Desktop Auth Dropdown */}
          <div className="absolute top-16 right-4 xl:right-0" ref={dropdownRef}>
            <AuthDropDown isOpen={authModal} />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay and Sidebar */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Sidebar */}
            <motion.div
              className="fixed top-0 left-0 h-full w-80 bg-blue-900 z-50 md:hidden shadow-2xl"
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-blue-700">
                  <img
                    src="/white-logo.png"
                    alt="logo"
                    className="w-36 h-auto"
                  />
                  <RiCloseLine
                    className="text-white text-3xl cursor-pointer hover:text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>

                {/* Navigation Links */}
                <div className="flex flex-col p-6 space-y-6">
                  {[
                    { to: "/", label: "Начало" },
                    { to: "/ads", label: "Услуги" },
                    { to: "/ads", label: "Блог" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.to}
                      variants={menuItemVariants}
                      initial="hidden"
                      animate="visible"
                      custom={index}
                    >
                      <Link
                        to={item.to}
                        className="text-white hover:text-gray-300 text-lg font-medium block py-2 transition-colors duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Bottom Section */}
                <div className="mt-auto p-6 border-t border-blue-700">
                  <motion.button
                    variants={menuItemVariants}
                    initial="hidden"
                    animate="visible"
                    custom={3}
                    onClick={() => {
                      navigate("/auth/login");
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-white py-3 px-4 rounded-md text-blue-800 font-medium hover:bg-gray-100 transition duration-300"
                  >
                    Добавяне на обява
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
