import { NavLink } from "react-router-dom";
import "./footer.css";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

export function Footer() {
  const { isUserLoggedIn } = useContext(AuthContext);
  return (
    <div className="footer-component-container">
      <footer className="footer-container">
        <div className="links-container">
          <p className="bold">Book Nook</p>
          <p>Because life is better with books...</p>
          <p> @2023 Book Nook</p>
        </div>

        <div className="links-container">
          <p className="bold">CONNECT WITH ME</p>
          <p>
            <NavLink
              to={"https://github.com/TusharAnekar"}
              target="_blank"
              rel="noopener norefferrer"
              className={"links"}
            >
              Github
            </NavLink>
          </p>
          <p>
            <NavLink
              to={"https://twitter.com/TusharAnekar"}
              target="_blank"
              rel="noopener norefferrer"
              className={"links"}
            >
              Twitter
            </NavLink>
          </p>
          <p>
            <NavLink
              to={"https://www.linkedin.com/in/tusharanekar/"}
              target="_blank"
              rel="noopener norefferrer"
              className={"links"}
            >
              LinkedIn
            </NavLink>
          </p>
        </div>

        <div className="links-container">
          <p className="bold">Quick Links</p>
          {isUserLoggedIn?.isLoggedIn ? (
            <div className="links-container">
              <p>
                <NavLink to={"/"} className={"links"}>
                  Home
                </NavLink>
              </p>
              <p>
                <NavLink to={"/products"} className={"links"}>
                  Books
                </NavLink>
              </p>
              <p>
                <NavLink to={"/wishlist"} className={"links"}>
                  Wishlist
                </NavLink>
              </p>
              <p>
                <NavLink to={"/cart"} className={"links"}>
                  Cart
                </NavLink>
              </p>
              <p>
                <NavLink to={"/user-profile"} className={"links"}>
                  Profile
                </NavLink>
              </p>
            </div>
          ) : (
            <div className="links-container">
              <p>
                <NavLink to={"/login"} className={"links"}>
                  Login
                </NavLink>
              </p>
              <p>
                <NavLink to={"/signup"} className={"links"}>
                  Sign Up
                </NavLink>
              </p>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
