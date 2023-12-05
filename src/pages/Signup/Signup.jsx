import { Link } from "react-router-dom";

import "./signup.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export function Signup() {
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);

  const { signupHandler } = useContext(AuthContext);

  function handleInput(e) {
    setSignupDetails({ ...signupDetails, [e.target.name]: e.target.value });
  }

  function handleSignupSubmit(e) {
    e.preventDefault();
    signupHandler(signupDetails);
    setSignupDetails({
      ...signupDetails,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  }

  const handleShowPassword = () => {
    setIsShowPassword((prev) => !prev);
  };

  return (
    <div className="signup-container">
      <div className="form-details-container">
        <h2>Signup</h2>
        <form onSubmit={handleSignupSubmit}>
          <label className="block">
            First Name
            <input
              type="text"
              placeholder="Test"
              name="firstName"
              value={signupDetails.firstName}
              required
              onChange={handleInput}
              className="block input"
            />
          </label>
          <label className="block">
            Last Name
            <input
              type="text"
              placeholder="Admin"
              name="lastName"
              value={signupDetails.lastName}
              required
              onChange={handleInput}
              className="block input"
            />
          </label>
          <label className="block">
            Email Address
            <input
              type="email"
              placeholder="booknook@gmail.com"
              name="email"
              value={signupDetails.email}
              required
              onChange={handleInput}
              className="block input"
            />
          </label>
          <label className="block login-password">
            Password
            <input
              type={isShowPassword ? "text" : "password"}
              placeholder="********"
              name="password"
              value={signupDetails.password}
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
              title="Password should contain min 8 charcters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character"
              required
              onChange={handleInput}
              className="block input"
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
          <button type="submit">Create New Account</button>
        </form>
        <p className="login-link">
          <Link to={"/login"} className="login-link">
            Already have an account
          </Link>
        </p>
      </div>
    </div>
  );
}
