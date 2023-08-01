import { Link } from "react-router-dom";
import { useContext, useState } from "react";

import "./login.css";
import { AuthContext } from "../../contexts/auth-context";

export function Login() {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
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
              onChange={handleInput}
            />
          </label>
          <label className="block">
            Password
            <input
              className="block input"
              type="password"
              placeholder="********"
              name={"password"}
              value={loginDetails.password}
              onChange={handleInput}
            />
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
