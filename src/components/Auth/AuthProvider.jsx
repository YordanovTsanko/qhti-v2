import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../../redux/auth/authSlice";

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);

  useEffect(() => {
    if (accessToken) {
      dispatch(fetchCurrentUser());
    }
  }, [accessToken, dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
