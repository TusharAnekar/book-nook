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
          <label>
            Email Address
            <input
              type="text"
              placeholder="bookNook@gmail.com"
              name={"email"}
              value={loginDetails.email}
              onChange={handleInput}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              placeholder="********"
              name={"password"}
              value={loginDetails.password}
              onChange={handleInput}
            />
          </label>

          <button type="submit">Login</button>
          <button type="submit" onClick={handleTestLogin}>Login with Test User</button>
        </form>
        <Link to={"/signup"} className="new-account-link">Create New Account</Link>
      </div>
    </div>
  );
}
