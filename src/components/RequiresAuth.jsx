import { useContext } from "react";
import { AuthContext } from "../contexts/auth-context";
import { Navigate, useLocation } from "react-router-dom";

export const RequiresAuth = ({ children }) => {
  const { token, currentUser } = useContext(AuthContext);
  const location = useLocation();
  return token || currentUser ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }}></Navigate>
  );
};
