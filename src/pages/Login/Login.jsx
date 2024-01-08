import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import "./login.css";
import { AuthContext } from "../../contexts/auth-context";

export function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { loginHandler } = useContext(AuthContext);

  function handleInput(e) {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    loginHandler(loginDetails);
  }

  function handleTestLogin() {
    setLoginDetails({
      ...loginDetails,
      email: "booknook@gmail.com",
      password: "Booknook123$",
    });
  }

  const handleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  const handleDropCopyPaste = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="login-page-container">
      <div className="login-container">
        <h2>Sign In</h2>
        <form onSubmit={handleLoginSubmit} className="form-container">
          <label className="block">
            Email Address
            <input
              className="block input"
              type="text"
              placeholder="bookNook@gmail.com"
              name={"email"}
              value={loginDetails.email}
              required
              onChange={handleInput}
            />
          </label>
          <label className="block login-password">
            Password
            <input
              className="block input password-input"
              type={isShowPassword ? "text" : "password"}
              placeholder="********"
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password should contain min 8 charcters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
              name={"password"}
              onPaste={handleDropCopyPaste}
              onDrop={handleDropCopyPaste}
              onCopy={handleDropCopyPaste}
              required
              value={loginDetails.password}
              onChange={handleInput}
            />
            {isShowPassword ? (
              <VisibilityOffIcon
                className="visibility-icon"
                onClick={handleShowPassword}
              />
            ) : (
              <VisibilityIcon
                className="visibility-icon"
                onClick={handleShowPassword}
              />
            )}
          </label>

          <button type="submit" className="login-button block">
            Login
          </button>
          <button
            type="submit"
            onClick={handleTestLogin}
            className="login-test-cred-button block"
          >
            Login with Test User
          </button>
        </form>
        <p className="new-account-link">
          <Link to={"/signup"} className="new-account-link">
            Create New Account
          </Link>
        </p>
      </div>
    </div>
  );
}
