import { createContext, useState } from "react";
import { loginService } from "../services/auth-services/loginService";
import { useNavigate } from "react-router-dom";
import { signupService } from "../services/auth-services/signupService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage?.token)
    const [currentUser, setCurrentUser] = useState(localStorage?.user)
    const navigate = useNavigate()

  async function loginHandler({ email, password }) {
    try {
      const response = await loginService(email, password);
      const {
        status,
        data: { foundUser, encodedToken },
      } = response;

      if(status === 200) {
        localStorage.setItem("loginDetails", JSON.stringify({user: foundUser, token: encodedToken}))
        setToken(encodedToken)
        setCurrentUser(foundUser)
        navigate("/products")
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function signupHandler ({firstName, lastName, email, password}) {
    try {
      const response = await signupService(email, password, firstName, lastName)
      const {
        status,
        data: { encodedToken },
      } = response;

      if (status === 201) {
        localStorage.setItem(
          "loginDetails",
          JSON.stringify({
            token: encodedToken,
          })
        );
        setToken(encodedToken);
        navigate("/login");
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider value={{ loginHandler, token, currentUser, signupHandler }}>
      {children}
    </AuthContext.Provider>
  );
}
