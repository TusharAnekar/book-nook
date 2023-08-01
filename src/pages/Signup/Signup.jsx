import { Link } from "react-router-dom";

import "./signup.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/auth-context";

export function Signup() {
  const [signupDetails, setSignupDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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
          <label className="block">
            Password
            <input
              type="password"
              placeholder="********"
              name="password"
              value={signupDetails.password}
              required
              onChange={handleInput}
              className="block input"
            />
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
