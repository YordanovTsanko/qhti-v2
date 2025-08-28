import React, { useState, useMemo, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import LoginForm from "../components/Auth/LoginForm";
import RegisterForm from "../components/Auth/RegisterForm";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoginInitial = useMemo(
    () => location.pathname === "/auth" || location.pathname === "/auth/login",
    [location.pathname]
  );

  const [isLogin, setIsLogin] = useState(isLoginInitial);
  const [userType, setUserType] = useState("person");

  const switchForm = (login) => {
    setIsLogin(login);
    navigate(login ? "/auth/login" : "/auth/register");
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-600 to-blue-800 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-4 sm:p-8 relative">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <LoginForm switchForm={switchForm} />
          ) : (
            <RegisterForm
              switchForm={switchForm}
              userType={userType}
              setUserType={setUserType}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthPage;
