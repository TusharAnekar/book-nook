import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Navigate, useLocation } from "react-router-dom";

export const RequiresAuth = ({ children }) => {
  const { isLoggedIn,token , currentUser } = useContext(AuthContext);
  const location = useLocation();
  return isLoggedIn || token || currentUser ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }}></Navigate>
  );
};
