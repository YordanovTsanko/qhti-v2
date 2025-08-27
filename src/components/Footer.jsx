import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-cyan-600 p-4 mt-8">
      <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div>
          <h2 className="text-md font-semibold text-white text-center md:text-start">ЗА ЯХТИ.БГ</h2>
          <p className="text-sm text-white mt-1 text-center md:text-start">Общи условия</p>
          <p className="text-sm text-white mt-1 text-center md:text-start">Политика за поверителност</p>
          <p className="text-sm text-white mt-1 text-center md:text-start">Политика за ползване на бисквитки</p>
        </div>

        <div className="flex flex-col items-center md:items-end">
          <img src="/white-logo.png" alt="yachts.bg logo" className="w-44 h-auto" />
          <p className="text-sm text-white mt-4">БИОНД МЕДИА ООД</p>
          <a href="mailto:info@yachts.bg" className="text-sm text-white mt-1">info@yachts.bg</a>

          <div className="flex items-center gap-2 mt-3">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebook className="text-white text-2xl cursor-pointer" />
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="text-white text-2xl cursor-pointer" />
            </a>
          </div>
        </div>
      </div>
      <div>
        <p className="text-sm text-white text-center mt-6">
          &copy; {new Date().getFullYear()} Qhti.bg. Всички права запазени.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
