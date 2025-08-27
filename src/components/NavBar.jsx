import React, { useState, useRef, useEffect } from "react";
import { FaRegHeart } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { Link, useNavigate,  } from "react-router-dom";
import AuthDropDown from "./Auth/AuthDropDown";

const NavBar = () => {
  const [authModal, setAuthModal] = useState(false);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate()
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

  return (
    <div className="w-full flex justify-between items-center z-30 relative max-w-[1280px] mx-auto py-4 px-4 xl:px-0">
      <div className="flex items-center gap-7">
        <img src="/white-logo.png" alt="logo" className="w-44 h-auto" />
        <Link to="/" className="text-white hover:text-gray-300 text-md">
          Начало
        </Link>
        <Link to="/ads" className="text-white hover:text-gray-300 text-md">
          Услуги
        </Link>
        <Link to="/ads" className="text-white hover:text-gray-300 text-md">
          Блог
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <FaRegHeart className="text-white text-2xl cursor-pointer" />
        <div
          ref={profileRef}
          onClick={() => setAuthModal((prev) => !prev)}
          className="flex items-end cursor-pointer"
        >
          <IoPersonSharp className="text-white text-2xl" />
          <IoMdArrowDropdown className="text-white text-md" />
        </div>
        <button onClick={() => navigate("/auth/login")} className="bg-white py-2 px-4 rounded-md border border-white text-blue-800 hover:bg-blue-800 hover:text-white transition duration-500">
          Добавяне на обява
        </button>
      </div>

      <div className="absolute top-16 right-4 xl:right-0" ref={dropdownRef}>
        <AuthDropDown isOpen={authModal} />
      </div>
    </div>
  );
};

export default NavBar;
